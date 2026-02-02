# Acceptance

Definition of done
- All acceptance scenarios pass
- Observability goals met per DATA.md
- Constraints satisfied per SCOPE.md

## Gherkin scenarios

```gherkin
Feature: {{FEATURE_NAME}}

Scenario: Happy path
  Given {{GIVEN}}
  When {{WHEN}}
  Then {{THEN}}

Scenario: Validation error
  Given {{GIVEN}}
  When {{WHEN}}
  Then {{THEN}}

Scenario: Permission denied
  Given {{GIVEN}}
  When {{WHEN}}
  Then {{THEN}}

Scenario: Empty state
  Given {{GIVEN}}
  When {{WHEN}}
  Then {{THEN}}

Scenario: Failure recovery
  Given {{GIVEN}}
  When {{WHEN}}
  Then {{THEN}}

Scenario: Key events emitted
  Given {{GIVEN}}
  When {{WHEN}}
  Then events include {{EVENTS}}
```

## Verification notes

What must be demonstrably true (engineering determines how to verify):
- {{VERIFICATION_1}}
- {{VERIFICATION_2}}
