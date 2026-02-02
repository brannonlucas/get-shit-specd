# Engineering Handoff: SPEC-003 Watermarking Service

**Spec:** SPEC-003
**Status:** Ready
**Date:** 2026-02-02

---

## Problem Context

Users can screenshot or download preview images of generated cards without purchasing. This:
1. Devalues the product (free "good enough" versions)
2. Reduces purchase conversion
3. Exposes IP without compensation

**User context:** End users viewing generated card previews before purchasing a deck. They interact with previews in deck detail view and card gallery.

**Job to be done:** When previewing generated playing cards, users see a clear preview with a visible watermark, so they can evaluate quality while understanding they need to purchase to get the clean version.

---

## Success Criteria

| Priority | Criterion |
|----------|-----------|
| P0 | 100% of new card previews have watermarks applied |
| P0 | 0% of unpurchased cards accessible without watermark |
| P1 | No significant increase in face-swap job failure rate |
| P1 | Face-swap completion time increase < 500ms |

---

## Requirements

### WM-001: Watermark Applied on Generation
**Priority:** P0
**Outcome:** Preview images have visible diagonal "PREVIEW" watermark after face-swap completion.
**Acceptance:** Scenario 1 — card preview has visible watermark, clean version stored separately, card record references both.

### WM-002: Clean Images Require Purchase
**Priority:** P0
**Outcome:** Clean (unwatermarked) versions only accessible after successful Stripe purchase.
**Acceptance:** Scenario 3 — payment webhook confirms success, clean URL becomes accessible.

### WM-003: Dual Storage
**Priority:** P0
**Outcome:** Both watermarked and clean versions stored in R2.
**Acceptance:** Scenario 1 — both versions stored, card record references both.

### WM-004: Unauthorized Access Denied
**Priority:** P1
**Outcome:** Requests for clean images without valid purchase proof return 403 Forbidden.
**Acceptance:** Scenario 4 — unauthenticated access returns 403, event logged. Scenario 5 — wrong user returns 403.

### WM-005: Graceful Retry on Failure
**Priority:** P1
**Outcome:** Watermark processing failures retry up to 3 times before marking card as failed.
**Acceptance:** Scenario 6 — retries up to 3 times, card status set to "failed" if all fail, error event logged.

### WM-006: Observability
**Priority:** P2
**Outcome:** Key lifecycle events emitted for monitoring: watermark_applied, preview_ready, clean_access_granted.
**Acceptance:** Scenario 7 — processing under 500ms, duration logged. Scenario 8 — events emitted with required properties.

---

## Edge Cases

| # | Edge Case | Expected Behavior |
|---|-----------|-------------------|
| 1 | Face-swap fails after watermark completes | Orphaned image cleaned up |
| 2 | Purchase refunded after clean access granted | Clean access revoked via refund webhook |
| 3 | Deck deleted while images exist | Both versions deleted from R2 |
| 4 | Purchase completes before all cards generated | New cards watermarked, then immediately accessible clean |
| 5 | Concurrent requests for same clean URL | Single presigned URL generated, cached briefly |
| 6 | Watermark processing times out | Retry with exponential backoff, fail after 3 attempts |
| 7 | R2 upload fails for clean version | Retry upload, card marked failed if persistent |
| 8 | Card regenerated after initial generation | Old images deleted, new ones created |

---

## Key Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Watermarking adds excessive latency | Medium | High | Budget 500ms, measure in step metrics |
| Storage costs double | Low | Medium | Monitor R2 costs, acceptable for MVP |
| Clean URLs leak | Low | High | Signed URLs; post-purchase customers "own" images |
| Sharp/Satori fails in Workers | Medium | High | Test locally first, have fallback |

---

## Dependencies

| Dependency | Status | Notes |
|------------|--------|-------|
| Inngest face-swap function | Exists | Will be modified to add watermark step |
| R2 storage service | Exists | Will store both versions |
| Stripe payment webhooks | Exists | Triggers unlock of clean versions |
| Replicate face-swap API | Exists | No changes needed |

---

## Open Items

### Open Questions
1. **Opacity level:** What percentage (40-60% range) balances visibility vs. preview quality? (Engineering to determine via testing)

### Assumptions to Validate
1. Diagonal text overlay is sufficient deterrent (vs. invisible watermarks)
2. Users accept watermarked previews as standard e-commerce practice
3. Sharp or Satori can handle watermark rendering in Workers environment

### Out of Scope (v1)
1. Customizable watermark design — fixed "PREVIEW" text
2. PDF/export watermarking — preview images only
3. Backfilling existing cards — new cards only
4. Invisible/steganographic watermarks
5. Per-card purchase unlock — deck-level only
6. Shared deck clean access — purchaser only

---

## Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| Performance | Watermark processing < 500ms per card |
| Security | Clean URLs require purchase validation; long-lived (24h+) post-purchase |
| Accessibility | Watermark text not conveyed to screen readers (decorative) |
| Observability | Success/failure rates visible, alert on >5% failure rate |
| Rollout | Feature flag `WATERMARK_ENABLED`, backout without affecting existing cards |

---

## Verification Notes

What must be demonstrably true (engineering determines verification method):
- Watermarked images are visually distinguishable from clean versions
- Clean URLs cannot be accessed without valid purchase proof
- Processing failures don't leave system in inconsistent state
- Key lifecycle events are observable in logs/metrics

---

*Generated from SPEC-003 | Ready for engineering*
