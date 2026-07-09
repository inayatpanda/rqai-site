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
- ClinicalPROMs: set the real annual price, fix the spoke pricing page
  (still shows the stale GBP 49 lifetime in Terms and GBP 200 mock on the
  pricing page), then add the price here in products.ts.
- ResearchAssistant: create the LemonSqueezy product (buy link is a
  placeholder slug), add `research` to PRODUCT_URLS in
  helm/scripts/fulfil-sales.mjs (buyers currently get a key with no
  download link), and remove the four "open source" claims on the spoke
  site (AccordionSection.tsx, TrustStrip.tsx, data/marketing.ts:62,
  PricingPage.tsx:89).
- Scribble: confirm the GBP 29/yr app price, then add it to products.ts.
- Chapbook: confirm the price, then add it to products.ts.
- Helm: set RESEND_API_KEY so licence emails send automatically.
