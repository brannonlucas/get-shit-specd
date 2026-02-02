# SPEC: Watermarking Service
Owner: Brannon
Date: 2026-02-02
Status: Ready

## Problem
Users can screenshot or download preview images of generated cards without purchasing. This:
1. Devalues the product (free "good enough" versions)
2. Reduces purchase conversion
3. Exposes IP without compensation

## User and context
End users viewing their generated card previews before purchasing a deck. They interact with card previews in the deck detail view and card gallery.

## JTBD
When I'm previewing my generated playing cards, I want to see a clear preview with a visible watermark, so I can evaluate quality while understanding I need to purchase to get the clean version.

## Goal (v1)
Apply a visible watermark to all newly generated card preview images. Clean (unwatermarked) versions become accessible only after successful deck purchase via Stripe.

## Success metrics
- [P0] 100% of new card previews have watermarks applied
- [P0] 0% of unpurchased cards accessible without watermark
- [P1] No significant increase in face-swap job failure rate
- [P1] Face-swap completion time increase < 500ms

## Constraints
- Must integrate into existing Inngest face-swap pipeline
- Watermark must be visually clear but not obscure card quality assessment
- Cannot break existing R2 storage patterns
- Must work within Cloudflare Workers compute limits
- Clean URLs must be cryptographically secured (no guessable paths)

## Risks
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Watermarking adds excessive latency | Medium | High | Budget 500ms, measure in step metrics |
| Storage costs double | Low | Medium | Monitor R2 costs, acceptable for MVP |
| Clean URLs leak | Low | High | Signed URLs with short TTL |
| Sharp/Satori fails in Workers | Medium | High | Test locally first, have fallback |

## Assumptions
1. Diagonal text overlay is sufficient deterrent (vs. invisible watermarks)
2. Users accept watermarked previews as standard e-commerce practice
3. Sharp or Satori can handle watermark rendering in Workers environment

## Open questions
1. What opacity level balances visibility vs. preview quality? (40-60% range)

## Resolved questions
1. ~~Should watermark include deck ID for traceability?~~ → No, keep simple
2. ~~Signed URL TTL?~~ → Long-lived (24h+) — paying customers "own" their images
