# Spec Review: SPEC-003-watermarking-service

**Review Date:** 2026-02-02
**Reviewer:** PAI (automated)
**Status:** ✅ PASS

---

## Summary

The spec is well-structured with good edge case coverage. Two blocking questions need resolution before engineering starts.

---

## Findings

### FAIL (Blocking)

| # | Finding | Location | Issue |
|---|---------|----------|-------|
| 1 | **Shared deck scenario undefined** | SCOPE / ACCEPTANCE | What if deck owner shares a deck with another user? Can the shared user see clean images after purchase? This is a permission edge case that could cause security issues or UX confusion. |
| 2 | **Signed URL TTL unspecified** | SCOPE (NFRs) | "Cryptographic proof of purchase" is mentioned but no TTL for signed URLs. Should clean URLs be valid for 5 minutes? 1 hour? Forever? |

### WARN (Should Fix)

| # | Finding | Location | Resolution |
|---|---------|----------|------------|
| 1 | Feature flag name undefined | SCOPE | ✅ PATCHED — Added `WATERMARK_ENABLED` |
| 2 | Card regeneration not in edge cases | ACCEPTANCE | ✅ PATCHED — Added edge case #8 |
| 3 | No clean_access_granted event | ACCEPTANCE | ✅ PATCHED — Added to analytics scenario |
| 4 | "Visible diagonal watermark" vague | ACCEPTANCE | Acceptable — visual verification in QA |
| 5 | Admin access undefined | SCOPE | Acceptable — assume admins use existing admin tools |
| 6 | Partial payment state undefined | SCOPE | Acceptable — Stripe webhooks handle this |

### PASS

| Check | Status |
|-------|--------|
| Edge cases ≥ 5 | ✅ 8 edge cases |
| Out of scope ≥ 3 | ✅ 5 items |
| Open questions ≤ 2 | ✅ 2 questions |
| P0 scenarios present | ✅ 4 scenarios |
| Gherkin format | ✅ Yes |

---

## Patches Applied

### 01-SCOPE.md
- Added: Feature flag name `WATERMARK_ENABLED`

### 04-ACCEPTANCE.md
- Added: Edge case #8 (card regeneration cleanup)
- Added: `clean_access_granted` event to analytics scenario

---

## Blocking Questions — RESOLVED

### Q1: Shared Deck Access ✅
**Decision:** No — only purchaser gets clean access (simpler)
**Applied:** Added to SCOPE out-of-scope list

### Q2: Signed URL TTL ✅
**Decision:** Long-lived (24h+) — paying customers "own" their images
**Rationale:** Watermarking prevents *unpurchased* access. Once purchased, minimal security needed.
**Applied:** Updated NFRs in SCOPE

---

## Recommendation

**✅ PASS** — All blocking questions resolved. Spec is Ready for handoff.

Next: Run `/gss:handoff SPEC-003` to generate engineering requirements.

---

## Changelog

| Date | Change |
|------|--------|
| 2026-02-02 | Initial review completed |
| 2026-02-02 | Patched: feature flag name, edge case #8, clean_access_granted event |
