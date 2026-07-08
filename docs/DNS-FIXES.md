# DNS fixes — project subdomains

Owner action list for the project subdomains. Latest probe **2026-07-08 20:18Z**
(`node scripts/check-links.mjs`). Nameservers are Hostinger
(`solar.dns-parking.com`, `lunar.dns-parking.com`), so DNS records are edited in
**Hostinger hPanel → Domains → rqai.co.uk → DNS / Nameservers**.

The site's product data always uses the intended final URLs and the ship-time
link checker downgrades any unreachable project to a "coming soon" card with no
dead link. **Re-running the deploy re-probes every URL and flips any newly
reachable project to Live with no code change.**

## Current status — all seven projects are LIVE ✅

As of the 2026-07-08 20:18Z probe **every project URL answers `200` and serves
its real app.** No DNS action is required to ship working links.

| Project | Subdomain | Now | Live? | Serves |
|---|---|---|---|---|
| OrthoPortfolio | `topp.rqai.co.uk` | A → `91.108.107.144` (LiteSpeed) | ✅ live | real app — "TOPP — T&O Portfolio Pathway" |
| OrthoConsultantPrep | `consultantprep.rqai.co.uk` | A → `91.108.107.144` (LiteSpeed) | ✅ live | real app — "OrthoConsultantPrep" |
| Scribble | `scribble.rqai.co.uk` | A → `91.108.107.144` (LiteSpeed) | ✅ live | real Scribble PWA |
| ClinicalPROMs | `clinicalproms.rqai.co.uk` | A → `195.200.9.166`, `89.116.109.109` | ✅ live | — |
| Chapbook | `chapbook.rqai.co.uk` | CNAME → `inayat-studio.netlify.app` | ✅ live | — (Netlify custom-domain pattern) |
| AudioQuill | `audioquill.rqai.co.uk` | A → `91.108.103.81`, `89.116.109.176` | ✅ live | — |
| ResearchAssistant | `researchassistant.rqai.co.uk` | CNAME → `research-assistant-bn5.pages.dev` | ✅ live | early Cloudflare Pages deployment |

### What changed since the earlier (18:36Z) probe

At the first Task-2 probe, `topp`, `consultantprep` and `scribble` all pointed at
the **same IP `91.108.107.144` and that server was timing out on 80 and 443** — it
looked decommissioned. By 20:18Z **that server is back up (Hostinger LiteSpeed)
and now serves all three real apps.** So the three previously-"dead" subdomains
are live with no change on our side.

⚠️ **Flakiness note:** `91.108.107.144` was unreachable at 18:36Z and healthy at
20:18Z the same day. topp / consultantprep / scribble liveness therefore rides on
a host that flapped once today. The link checker re-probes at deploy time, so if
that box is down at deploy the three degrade to "coming soon" automatically (no
dead links) and recover on the next deploy once it is back. If it proves
unreliable, the cleanest fix is to move each subdomain onto the same durable host
its healthy siblings use (or, for Scribble, onto Netlify — see §2). No action is
required today.

## 1. `scribble.rqai.co.uk` — Netlify alias attempt (this task)

**Outcome: alias NOT written from here — documented instead (deliberately).**

- The Netlify site serving `scribble-pwa.netlify.app` was identified:
  **site `scribble-pwa`, id `09b2802e-eada-45f0-b637-24a6ca2c559f`, team
  `inayatc2002` (Personal Projects).** Current `custom_domain: none`,
  `domain_aliases: []`.
- The authorised action (append to `domain_aliases`) is **rejected by the API**:
  `422 — "You cannot update domain aliases while primary custom domain is not
  set."` The proven "chapbook pattern" is in fact a **primary custom domain**, not
  an alias: the `inayat-studio` site has `custom_domain: chapbook.rqai.co.uk`.
- Setting a site's **primary custom domain** is a bigger change than the "append an
  alias, do not touch other settings" scope this task was given — and it is now
  **unnecessary**, because `scribble.rqai.co.uk` is already live from Hostinger.
  Doing it while DNS still points at Hostinger would also leave a failing TLS-cert
  state in the Netlify dashboard until DNS is switched. So it was left for the
  owner as a one-click decision below.

**If you want Scribble on Netlify anyway** (recommended if the Hostinger box above
proves flaky — Netlify is the more durable host, and this mirrors Chapbook):

1. **Netlify** → `scribble-pwa` site → *Domain management* → **Add a custom
   domain** → `scribble.rqai.co.uk` (set as the primary custom domain; Netlify then
   provisions the TLS certificate once DNS points at it).
2. **Hostinger hPanel → DNS**: delete the `A` record `scribble` →
   `91.108.107.144`, then add:

   ```
   Type:  CNAME
   Name:  scribble
   Value: scribble-pwa.netlify.app
   TTL:   3600
   ```
3. Verify: `curl -I https://scribble.rqai.co.uk` returns `200` from Netlify.

Until then, no action — Scribble already answers `200` from Hostinger and the site
links to it.

## 2. `topp` / `consultantprep` — contingency only (currently live)

Both answer `200` today from `91.108.107.144`. **No action required.** Keep this
only as a contingency if that host goes down again: in hPanel → **Subdomains**,
re-point / re-add the subdomain to the live Hostinger host the healthy siblings
use (e.g. `195.200.9.166`) and redeploy the build there; verify
`curl -I https://<sub>.rqai.co.uk` → `200`.

## Note — `researchassistant.rqai.co.uk`

Live: `CNAME → research-assistant-bn5.pages.dev` (Cloudflare Pages), answers `200`
with an early deployment. No DNS action. The site treats it as Live and links out;
its copy describes the project honestly as in development and makes no capability
claims. Holding it back as "coming soon" would be a product decision (take the
Pages deployment down or gate the CTA) — the data model is truthful either way.

## After any change

Re-run the GitHub Action (push to `main` or *Run workflow*). The pre-build
`check-links` step re-probes every URL, rewrites `src/data/liveness.json`, and the
reachable projects render as Live automatically — no code change.
