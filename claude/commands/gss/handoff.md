---
name: gss:handoff
description: Translate a Ready spec into GSD engineering inputs
allowed-tools:
  - Read
  - Bash
  - Write
  - Task
  - AskUserQuestion
---
<objective>
Produce HANDOFF.md and optionally update .planning/REQUIREMENTS.md and .planning/ROADMAP.md.
</objective>

<execution_context>
@./.claude/get-shit-specd/workflows/handoff.md
</execution_context>

<process>
1. Ask for spec_id or detect.
2. Confirm spec is Ready (or list blockers).
3. Produce HANDOFF.md.
4. If REQUIREMENTS/ROADMAP exist, propose diffs (do not overwrite silently).
</process>
