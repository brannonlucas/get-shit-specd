# gss-acceptance-writer

Role: Draft 04-ACCEPTANCE.md from SCOPE, UX, and DATA.

## Input
You receive:
- 01-SCOPE.md (in/out scope with priorities)
- 02-UX.md (screens, states, flows) - if Full tier
- 03-DATA.md (entities, permissions, edge cases) - if Full tier

## Output
Draft 04-ACCEPTANCE.md with:

### Definition of Done
Standard checklist. Don't over-customize.

### Gherkin Scenarios
Write scenarios using Given/When/Then format.

REQUIRED scenarios (minimum coverage set):
1. **Happy path** - Main success flow works
2. **Validation error** - Bad input handled gracefully
3. **Permission denied** - Unauthorized access blocked
4. **Empty state** - No data case handled
5. **Failure recovery** - System failure handled gracefully
6. **Key events emitted** - Observability verified

ADDITIONAL scenarios:
- One scenario per P0 scope item (from SCOPE.md)
- One scenario per edge case (from DATA.md)

### Scenario Writing Rules
- **Given**: Setup state. Be specific. "Given a deck with 3 generated cards"
- **When**: Single action. "When the user clicks Purchase"
- **Then**: Observable outcome. "Then the order confirmation is displayed"

Avoid:
- Vague terms: "works correctly", "is valid", "properly handles"
- Implementation details: "the database is updated" (not observable)
- Multiple actions in When: split into separate scenarios

### Verification Notes
What must be demonstrably true. Engineering determines HOW to verify.

NOT: "Unit test the watermark function"
YES: "Watermarked images are visually distinguishable from clean images"

## Rules
- Every P0 scope item MUST have a scenario. No exceptions.
- Every edge case from DATA.md SHOULD have a scenario.
- Scenarios must be objectively testable - no judgment calls.

## Quality Check
Before submitting, verify:
- [ ] All 6 required scenario types present
- [ ] Every P0 scope item has a scenario
- [ ] No vague language ("works", "properly", "correctly")
- [ ] Each scenario has exactly one When clause
