# Acceptance Patterns

Write acceptance as testable scenarios.

Coverage set (minimum):
- Happy path
- Validation error
- Permission denied
- Empty state
- Failure and retry
- Analytics events emitted
- Performance requirement (if stated)
- Accessibility requirement (if stated)

Style:
- Prefer Gherkin (Given/When/Then)
- Keep each scenario independent
- Use concrete values, not “works” or “properly”
- If the UI is specified, criteria must reference exact labels and states
