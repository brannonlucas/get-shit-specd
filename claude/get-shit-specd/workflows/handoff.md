<purpose>
Translate a Ready spec package into engineering-facing requirements.
Produces HANDOFF.md in the spec folder.

This handoff defines WHAT must be true and WHY. Engineering determines HOW to build it and WHEN to ship phases.
</purpose>

<process>

<step name="read_spec">
Read:
- Spec files (BRIEF, SCOPE, UX, DATA, ACCEPTANCE)
- Any linked artifacts
</step>

<step name="map_requirements">
Use requirement IDs from SCOPE (REQ-{SPEC_ID}-{PRIORITY}-{SEQ}).
Map each requirement to its acceptance scenarios from 04-ACCEPTANCE.md.
Requirements describe OUTCOMES, not tasks.
</step>

<step name="generate_traceability_matrix">
Create a traceability matrix linking:
- Requirement ID → Acceptance scenario numbers → Spec source file:section

Example format:
| REQ ID | Acceptance Scenarios | Source |
|--------|---------------------|--------|
| REQ-001-P0-01 | 1.1.1, 1.1.2, 1.1.3 | 01-SCOPE.md#email-signup |

This enables:
- Coverage verification (every REQ has acceptance criteria)
- Change impact analysis (which acceptance scenarios if REQ changes)
- Engineering trace-back to product intent
</step>

<step name="summarize_context">
Extract from BRIEF:
- Problem statement (why this matters)
- Success criteria (how we know it works)
- Key risks (what could go wrong)
</step>

<step name="note_open_items">
List:
- Open questions from spec
- Assumptions that need validation
- Dependencies on other work
</step>

<step name="surface_implementation">
Extract from 01-SCOPE.md Implementation Surface section:
- Files created (exclusive ownership)
- Files modified (shared)
- Shared surfaces (types, tokens, routes, components)

If .planning/CONTRACTS.md exists:
- Read contracts relevant to this spec
- List contract dependencies (types/components this spec consumes from others)
- List contracts this spec provides to others
- Include suggested branch name and dispatch order from CONTRACTS.md
</step>

<step name="write_handoff">
Write HANDOFF.md with:
- Requirements mapped to acceptance scenarios
- Problem context and success criteria
- Risks and open questions
- Implementation Surface (files, types, tokens, routes, components)
- Contract dependencies (if CONTRACTS.md exists)
- Dispatch section: suggested branch name, owned files, contract dependencies
- NO engineering tasks, phases, or technical approach decisions
</step>

</process>
