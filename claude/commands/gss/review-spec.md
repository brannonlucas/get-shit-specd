---
name: gss:review-spec
description: Red-team a spec for ambiguity and missing states
allowed-tools:
  - Read
  - Bash
  - Write
  - Task
  - AskUserQuestion
---
<objective>
Find gaps before engineering starts. Produce REVIEW.md and optionally patch spec files.
</objective>

<execution_context>
@./.claude/get-shit-specd/workflows/review-spec.md
</execution_context>

<process>
1. Ask for spec_id or detect.
2. Run the review workflow.
3. Output: PASS/FAIL and any blocking questions.
</process>
