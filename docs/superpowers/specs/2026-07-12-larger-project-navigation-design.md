# Larger Project Navigation Design

## Goal

Give the desktop project navigation rail more visual presence and larger click targets without changing its destinations, the primary header, or the mobile menu.

## Design

- Increase the `lg` project rail from 40px to 56px high.
- Increase project labels from 14px to 17px with comfortable line height.
- Increase horizontal spacing enough to improve scanning while retaining a single line.
- Preserve horizontal overflow scrolling so every project remains reachable on narrower desktop widths.
- Preserve the existing active and hover colour treatments.
- Do not change project names, internal route destinations, spoke-site URLs, checkout URLs, or payment-gateway configuration.

## Responsive Behaviour

The enlarged rail remains visible from the existing `lg` breakpoint upward. Below that breakpoint, the current Projects dropdown and mobile menu remain unchanged.

## Verification

- Add a source-contract regression test for the 56px rail and 17px labels.
- Run the full tests, type-check, and production build.
- Confirm all seven internal project routes remain present in the rail.
- Audit external project links separately; the hub only routes users to spoke sites, so checkout/payment verification requires testing those spoke applications before launch.

