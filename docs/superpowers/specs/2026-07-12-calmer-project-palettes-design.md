# Calmer Project Palettes Design

## Goal

Reduce the visual intensity of every RQAI project identity while keeping each project recognisable. Move AudioQuill from coral/pink to an unmistakably purple identity.

## Palette Direction

- Preserve each project’s current hue family except AudioQuill.
- Reduce saturation and brightness moderately, approximately 15–20% by visual comparison rather than mechanical HSL conversion.
- AudioQuill becomes a deep violet-to-aubergine gradient with lavender highlights and borders.
- Soften coloured borders and shadows slightly so the card colour feels rich rather than luminous.
- Maintain WCAG-readable foreground contrast, including ConsultantPrep’s dark-ink treatment.

## Shared Application

Update the single `PRODUCT_IDENTITIES` source so the calibrated colours propagate consistently to:

- bold cards on the home project showcase;
- bounded project-page hero, button, price and feature accents;
- proof-point values;
- destination-coloured “More from RQAI” cross-link cards.

Do not alter page copy, routes, prices, external URLs, checkout hand-offs or animation behaviour. The already implemented outcome-led write-ups remain intact.

## Verification

- Add a regression test that AudioQuill uses a violet/aubergine palette and no longer uses its coral `#E95F78` origin.
- Confirm all seven identities remain present in the shared source.
- Run tests, type-check and production build.
- Visually compare the home cards and AudioQuill page against the current build.

