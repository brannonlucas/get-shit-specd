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
Create requirement IDs, each mapped to one or more acceptance scenarios.
Requirements describe OUTCOMES, not tasks.
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

<step name="write_handoff">
Write HANDOFF.md with:
- Requirements mapped to acceptance scenarios
- Problem context and success criteria
- Risks and open questions
- NO engineering tasks, phases, or file paths
</step>

</process>
