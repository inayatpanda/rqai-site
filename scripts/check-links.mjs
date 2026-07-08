#!/usr/bin/env node
/*
 * check-links.mjs — ship-time liveness probe for every RQAI project URL.
 *
 * Reads the seven (slug, url) pairs straight from src/data/products.ts (the
 * single source of truth), HEAD-or-GETs each with a timeout, and writes
 * src/data/liveness.json. The UI downgrades a project to a "coming soon" state
 * when its entry is `ok: false`, so a dead link NEVER fails the build — this
 * script always exits 0.
 *
 * liveness.json contract:
 *   { "<slug>": { "url": string, "ok": boolean, "checkedAt": string } }
 *
 * Usage:
 *   node scripts/check-links.mjs            # always probes (used by `npm run check-links`)
 *   node scripts/check-links.mjs --ci-only  # probes only under CI; else no-op (offline-safe local builds)
 *
 * Re-running after DNS fixes flips a project to Live with no code change.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const PRODUCTS_TS = resolve(ROOT, 'src/data/products.ts')
const OUT = resolve(ROOT, 'src/data/liveness.json')

const TIMEOUT_MS = 10_000
const ciOnly = process.argv.includes('--ci-only')

// --- offline-safe gating -------------------------------------------------
// Local `npm run build` triggers this via the `prebuild` hook with --ci-only;
// off CI it is a no-op so the build never needs the network (it uses the
// committed liveness.json). The deploy workflow runs `npm run check-links`
// explicitly and sets SKIP_LINK_CHECK on the build step to avoid a double run.
if (ciOnly) {
  if (process.env.SKIP_LINK_CHECK === '1') {
    console.log('[check-links] SKIP_LINK_CHECK set — skipping (already checked this run).')
    process.exit(0)
  }
  if (!process.env.CI) {
    console.log('[check-links] Not CI — skipping probe; using committed liveness.json.')
    process.exit(0)
  }
}

/** Extract (slug, url) pairs from products.ts, in document order. */
async function readTargets() {
  const src = await readFile(PRODUCTS_TS, 'utf8')
  // Anchor to line-start so the Slug type union (`| 'orthoportfolio'`) is ignored.
  const slugs = [...src.matchAll(/^\s*slug:\s*'([^']+)'/gm)].map((m) => m[1])
  const urls = [...src.matchAll(/^\s*url:\s*'([^']+)'/gm)].map((m) => m[1])
  if (slugs.length === 0 || slugs.length !== urls.length) {
    throw new Error(
      `Could not parse matching slug/url pairs from products.ts (slugs=${slugs.length}, urls=${urls.length}).`,
    )
  }
  return slugs.map((slug, i) => ({ slug, url: urls[i] }))
}

/** One request with a hard timeout; resolves to a status number or null on failure. */
async function request(url, method) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      method,
      redirect: 'follow',
      signal: ctrl.signal,
      headers: { 'user-agent': 'rqai-link-check/1.0' },
    })
    return res.status
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

/** A URL is "live" if it answers with a 2xx/3xx status to HEAD or GET. */
async function probe(url) {
  let status = await request(url, 'HEAD')
  // Some servers reject or mishandle HEAD — fall back to GET.
  if (status === null || status >= 400) {
    const got = await request(url, 'GET')
    if (got !== null) status = got
  }
  const ok = status !== null && status >= 200 && status < 400
  return { ok, status }
}

async function main() {
  const targets = await readTargets()
  const checkedAt = new Date().toISOString()
  const liveness = {}
  const rows = []

  for (const { slug, url } of targets) {
    const { ok, status } = await probe(url)
    liveness[slug] = { url, ok, checkedAt }
    rows.push({ slug, url, live: ok ? 'LIVE' : 'DEAD', status: status ?? 'timeout/err' })
  }

  await writeFile(OUT, JSON.stringify(liveness, null, 2) + '\n', 'utf8')

  console.log(`\n[check-links] ${checkedAt}`)
  console.table(rows)
  const dead = rows.filter((r) => r.live === 'DEAD').map((r) => r.slug)
  console.log(
    dead.length
      ? `[check-links] ${dead.length} unreachable (coming-soon in UI): ${dead.join(', ')}`
      : '[check-links] all projects reachable.',
  )
  console.log(`[check-links] wrote ${OUT}`)
}

main().catch((err) => {
  // Never fail the build: log and exit 0.
  console.error('[check-links] error (non-fatal):', err.message)
  process.exit(0)
})
