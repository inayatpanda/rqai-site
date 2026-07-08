# DNS fixes — project subdomains

Owner action list to make every project link resolve. Probed **2026-07-08**
(`node scripts/check-links.mjs`). Nameservers are Hostinger
(`solar.dns-parking.com`, `lunar.dns-parking.com`), so all records below are
edited in **Hostinger hPanel → Domains → rqai.co.uk → DNS / Nameservers** (and,
for the Netlify one, in the Netlify dashboard too).

The site's product data always uses the intended final URLs and the ship-time
link checker downgrades any unreachable project to a "coming soon" card with no
dead link. **After the DNS changes below propagate, just re-run the deploy — the
next link check flips those projects to Live with no code change.**

## Status at last probe

| Project | Subdomain | Now | Live? | Action |
|---|---|---|---|---|
| OrthoPortfolio | `topp.rqai.co.uk` | A → `91.108.107.144` | ❌ dead | Re-point (below) |
| OrthoConsultantPrep | `consultantprep.rqai.co.uk` | A → `91.108.107.144` | ❌ dead | Re-point (below) |
| Scribble | `scribble.rqai.co.uk` | A → `91.108.107.144` | ❌ dead | Switch to Netlify CNAME (below) |
| ClinicalPROMs | `clinicalproms.rqai.co.uk` | A → `195.200.9.166`, `89.116.109.109` | ✅ live | none |
| Chapbook | `chapbook.rqai.co.uk` | CNAME → `inayat-studio.netlify.app` | ✅ live | none (this is the proven pattern) |
| AudioQuill | `audioquill.rqai.co.uk` | A → `91.108.103.81`, `89.116.109.176` | ✅ live | none |
| ResearchAssistant | `researchassistant.rqai.co.uk` | CNAME → `research-assistant-bn5.pages.dev` | ✅ live | none — see note |

The three dead subdomains all point at the **same stale IP `91.108.107.144`**,
which times out on both 80 and 443 — an old/decommissioned server. The healthy
Hostinger siblings resolve to the current Hostinger web hosts (e.g. the apex
`rqai.co.uk` → `195.200.9.144` / `185.77.97.228`).

## 1. `topp.rqai.co.uk` (OrthoPortfolio) — re-point off the dead server

1. In hPanel → DNS, **delete** the `A` record `topp` → `91.108.107.144`.
2. Recreate the `topp` subdomain so it serves the OrthoPortfolio build from the
   current Hostinger host. Simplest reliable route: in hPanel → **Subdomains**,
   remove and re-add `topp`; hPanel then writes a fresh `A` record to the live
   server (the same host the working siblings use, e.g. `195.200.9.166`), and
   redeploy OrthoPortfolio into that subdomain's web root.
3. Verify: `curl -I https://topp.rqai.co.uk` returns `200`.

## 2. `consultantprep.rqai.co.uk` (OrthoConsultantPrep) — same fix

Identical to topp: delete the `A` record `consultantprep` → `91.108.107.144`,
recreate the `consultantprep` subdomain in hPanel so it points at the live
Hostinger host, and redeploy OrthoConsultantPrep there. Verify with
`curl -I https://consultantprep.rqai.co.uk` → `200`.

## 3. `scribble.rqai.co.uk` (Scribble) — move to Netlify (chapbook pattern)

Scribble is already live at **`scribble-pwa.netlify.app`** (returns `200`).
Point the subdomain there, mirroring chapbook:

1. **Netlify** → the `scribble-pwa` site → *Domain management* → **Add a domain
   alias** → `scribble.rqai.co.uk` (Netlify provisions the TLS certificate).
2. **Hostinger hPanel → DNS**: delete the `A` record `scribble` →
   `91.108.107.144`, then add:

   ```
   Type:  CNAME
   Name:  scribble
   Value: scribble-pwa.netlify.app
   TTL:   3600
   ```
3. Verify: `curl -I https://scribble.rqai.co.uk` returns `200`.

## Note — `researchassistant.rqai.co.uk` (ResearchAssistant)

**Update to the earlier "no DNS record / no product" assumption:** as of the
2026-07-08 probe this subdomain **already resolves and is live** — it has a
`CNAME → research-assistant-bn5.pages.dev` (Cloudflare Pages) and answers `200`
with a real early deployment. No DNS action is required.

Because the link checker found it reachable, the site will treat
ResearchAssistant as **Live** and link out to it. Its copy still describes the
project honestly as *in development* and makes no capability claims. If you would
rather hold the project back as "coming soon" until it is further along, that is
a product decision (e.g. take the Cloudflare Pages deployment down, or gate the
CTA) — the data model itself is truthful either way.

## After the fixes

Re-run the GitHub Action (push to `main` or *Run workflow*). The pre-build
`check-links` step re-probes every URL, rewrites `src/data/liveness.json`, and
the newly reachable projects render as Live automatically — no code change.
