# Product Questioning Protocol (Spec Intake)

Goal: Convert a vague idea into a testable spec package.

Principles:
- Ask the minimum number of questions that change build decisions.
- If unknown, write explicit assumptions and track them as Open Questions.
- Prefer outcomes over implementation.
- Enumerate states. Most spec failures are missing empty/loading/error/permission states.

Question stack (ask in this order):

1) User and context
- Who is the user?
- What is the moment they need this?
- What do they do today?

2) Problem and desired outcome
- What is painful today?
- What does “better” look like in 1-2 sentences?
- What is the smallest v1 that delivers the outcome?

3) Scope boundaries
- What must be in v1?
- What is explicitly out of scope?
- What constraints matter (time, policy, platform, performance)?

4) UX and states
- What is the primary flow?
- What are the key screens?
- What are the loading/empty/error states?
- What are the permissions and roles?

5) Acceptance and verification
- What must be true for you to say “this is done”?
- What is the highest-risk edge case?
- What can we measure?

Always end intake with:
- Top 5 ambiguities that would change the build
- Assumptions list
- Open questions list with owners and dates
