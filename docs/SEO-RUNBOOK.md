# SEO & visibility runbook (rqai.co.uk)

## One-time, owner (after deploy)
1. **Google Search Console**: add property `rqai.co.uk` (Domain property;
   verify by DNS TXT record in the Hostinger DNS panel). Then Sitemaps ->
   submit `https://rqai.co.uk/sitemap.xml`. Use URL Inspection -> Request
   indexing for the home page and the three flagship pages.
2. **Bing Webmaster Tools**: import the verified Search Console property
   (one click; covers Bing + DuckDuckGo + ChatGPT browsing).
3. **Analytics decision**: GA4 conflicts with the no-tracking stance.
   Recommended: Plausible (paid, EU) or GoatCounter (free) as a single
   cookieless script, or none at all and rely on Search Console. If one is
   added, add its script tag in `index.html` and disclose it on /about.

## Baseline (record once, compare monthly)
- `npx lighthouse https://rqai.co.uk --output=json --output-path=docs/lighthouse-baseline.json`
- Search Console -> Performance: export queries/impressions once indexed.

## Monthly 15-minute ritual
1. Search Console: Performance (queries, pages), Coverage (errors), and
   any manual actions.
2. `npm run check-links` (project URLs still answering).
3. Spot-check one flagship page in an AI answer engine (ask ChatGPT/Claude
   "what is ResearchAssistant by RQAI?") and note wrong claims to fix at
   the source.

## Go-live checklist (commerce, tracked outside this site)
- Swap ALL test Stripe links to live (all seven projects; see rqai-sales/LINKS.md).
- ClinicalPROMs: price now confirmed £200/yr (owner's Stripe payment link)
  and shown on the site (products.ts + llms.txt). What remains: fix the
  spoke site's Terms page, which still contradicts this with a stale GBP 49
  lifetime figure, and swap the test Stripe link to the live one.
- ResearchAssistant: create the LemonSqueezy product (buy link is a
  placeholder slug), add `research` to PRODUCT_URLS in
  helm/scripts/fulfil-sales.mjs (buyers currently get a key with no
  download link), and remove the four "open source" claims on the spoke
  site (AccordionSection.tsx, TrustStrip.tsx, data/marketing.ts:62,
  PricingPage.tsx:89); the spoke site also still shows $60/yr (pricing card, FAQ, and SeoHead.tsx JSON-LD price '60.00' twice) — update to $99/yr and redeploy (repo is on the old Mac; branch feat/pico-decomposer holds uncommitted WIP, so coordinate with the owner).
- Scribble: its test Stripe payment link is DEAD (returns page not found) —
  recreate the link at go-live. Keep the price off the site until then.
- Chapbook: price now confirmed £49/yr (owner's Stripe payment link) and
  shown on the site (products.ts + llms.txt). What remains is the live
  link swap.
- Helm: set RESEND_API_KEY so licence emails send automatically.
