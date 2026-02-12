<purpose>
Red-team the spec to find ambiguity, missing states, and non-testable acceptance.
Produces a REVIEW.md in the spec folder.
</purpose>

<process>

<step name="read_spec">
Read the 5 spec files and STATE.md.
</step>

<step name="attack">
Find:
- implicit scope
- hidden permission assumptions
- missing error/empty/loading states
- acceptance that cannot be objectively verified
- data/UX mismatches
- analytics gaps
- missing Implementation Surface (no files created/modified listed)
- file ownership conflicts with other specs in .planning/specs/ (check their Implementation Surfaces)
</step>

<step name="patch_or_questions">
If fixable without new info, patch files.
If not, produce a numbered question list that blocks readiness.
</step>

<step name="write_review">
Write REVIEW.md with:
- Findings
- Proposed edits (by file)
- Blocking questions (if any)
- Updated Ready status recommendation
</step>

</process>
