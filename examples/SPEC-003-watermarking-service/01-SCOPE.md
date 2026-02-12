# Scope

## In scope (v1 outcomes)

| Priority | Outcome |
|----------|---------|
| [P0] | Preview images are visibly watermarked after generation |
| [P0] | Clean images require valid purchase to access |
| [P0] | Both watermarked and clean versions stored in R2 |
| [P1] | Unauthorized clean URL access returns 403 |
| [P1] | Failed watermarking retries gracefully |
| [P2] | Watermark processing time logged for monitoring |

## Out of scope

1. **Customizable watermark design** — v1 uses fixed "PREVIEW" diagonal text
2. **PDF/export watermarking** — only preview images, not print-ready exports
3. **Backfilling existing cards** — applies to newly generated cards only
4. **Invisible/steganographic watermarks** — visible deterrent is sufficient for v1
5. **Per-card purchase unlock** — only deck-level purchase unlocks all cards
6. **Shared deck clean access** — only the purchaser can access clean images, not shared users

## Dependencies

| Dependency | Status | Notes |
|------------|--------|-------|
| Inngest face-swap function | Exists | Will be modified to add watermark step |
| R2 storage service | Exists | Will store both versions |
| Stripe payment webhooks | Exists | Triggers unlock of clean versions |
| Replicate face-swap API | Exists | No changes needed |

## Rollout considerations

- **Feature flag:** `WATERMARK_ENABLED` (env var, boolean)
- **Gradual exposure needed:** Yes — new behavior affects card generation
- **Backout requirement:** Set `WATERMARK_ENABLED=false` without affecting existing cards
- **Data migration scope:** None — new cards only

## Non-functional requirements

| Category | Requirement |
|----------|-------------|
| Performance | Watermark processing < 500ms per card |
| Security | Clean URLs require purchase validation; long-lived (24h+) after purchase — customers "own" their images |
| Accessibility | Watermark text not conveyed to screen readers (decorative) |
| Observability | Success/failure rates visible, alert on >5% failure rate |

## Implementation Surface

### Files Created (owned exclusively by this spec)
- lib/watermark.ts
- lib/storage/dual-store.ts
- functions/inngest/watermark-step.ts

### Files Modified (shared — coordinate with other specs)
- functions/inngest/face-swap.ts
- lib/storage/r2.ts
- app/api/cards/[id]/route.ts

### Shared Surfaces
- **Types consumed:** Card, Deck, R2Object
- **Types created:** WatermarkConfig, DualStoreResult
- **Design tokens used:** None (backend service)
- **Routes added:** None (modifies existing card route)
- **Components consumed:** None (backend service)
- **Components created:** None (backend service)
