# Acceptance

## Definition of done
- All acceptance scenarios pass
- Observability goals met
- Security constraints satisfied
- Performance within budget (< 500ms)

## Gherkin scenarios

```gherkin
Feature: Watermarking Service

  @P0
  Scenario: Watermark applied on card generation
    Given a user has uploaded a photo for face-swap
    When the face-swap job completes successfully
    Then the card preview image has a visible diagonal "PREVIEW" watermark
    And a clean (unwatermarked) version is stored separately
    And the card record references both image versions

  @P0
  Scenario: Preview shows watermarked image for unpurchased deck
    Given a deck with generated cards exists
    And the deck has not been purchased
    When the user views the card preview
    Then the watermarked image is displayed
    And the clean image URL is not exposed to the client

  @P0
  Scenario: Clean image accessible after purchase
    Given a deck with generated cards exists
    And the user completes a Stripe purchase
    When the payment webhook confirms success
    Then the clean image URL becomes accessible
    And the card preview can display the unwatermarked version

  @P0
  Scenario: Unauthorized clean URL access denied
    Given a deck with generated cards exists
    And the deck has not been purchased
    When an unauthenticated request attempts to access the clean image URL
    Then the response is 403 Forbidden
    And an access_denied event is logged with deck_id and IP

  @P1
  Scenario: Wrong user cannot access clean images
    Given a deck owned by user A with generated cards
    And user A has purchased the deck
    When user B requests the clean image URL
    Then the response is 403 Forbidden

  @P1
  Scenario: Watermark processing failure and retry
    Given a face-swap job is in progress
    When the watermark application fails
    Then the step is retried up to 3 times
    And if all retries fail, the card status is set to "failed"
    And a watermark_failed event is logged with error details

  @P2
  Scenario: Processing time within budget
    Given a face-swap job completes
    When watermarking is applied
    Then the watermark step completes in under 500ms
    And the duration is logged for monitoring

  @P2
  Scenario: Key events emitted for observability
    Given a user triggers face-swap
    When watermarking completes successfully
    Then events are emitted including:
      | event              | properties                    |
      | watermark_applied  | card_id, deck_id, duration_ms |
      | preview_ready      | card_id, deck_id, has_watermark |
      | clean_access_granted | deck_id, user_id |
```

## Edge cases (minimum 5 required)

| # | Edge case | Expected behavior |
|---|-----------|-------------------|
| 1 | Face-swap fails after watermark step completes | Watermarked image orphaned in R2; cleanup job removes it |
| 2 | Purchase refunded after clean access granted | Clean access revoked via refund webhook |
| 3 | Deck deleted while images exist | Both watermarked and clean images deleted from R2 |
| 4 | Purchase completes before all cards generated | New cards watermarked, then immediately accessible clean |
| 5 | Concurrent requests for same clean URL | Single presigned URL generated, cached briefly |
| 6 | Watermark processing times out | Retry with exponential backoff, fail after 3 attempts |
| 7 | R2 upload fails for clean version | Retry upload, card marked failed if persistent |
| 8 | Card regenerated after initial generation | Old watermarked + clean images deleted, new ones created |

## Verification notes

What must be demonstrably true (engineering determines how to verify):
- Watermarked images are visually distinguishable from clean versions
- Clean URLs cannot be accessed without valid purchase proof
- Processing failures don't leave the system in inconsistent state
- Key lifecycle events are observable in logs/metrics
