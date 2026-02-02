---
name: gss:update-spec
description: Update an existing spec package
allowed-tools:
  - Read
  - Bash
  - Write
  - Task
  - AskUserQuestion
---
<objective>
Update an existing spec package after scope changes, UX changes, or new constraints.
Re-run the spec checker and update STATE.md.
</objective>

<execution_context>
@./.claude/get-shit-specd/workflows/create-spec.md
</execution_context>

<process>
1. Ask for spec_id or detect from .planning/specs/ if only one exists.
2. Read existing files.
3. Ask only questions needed to resolve changes.
4. Patch files and re-run spec_check.
5. Update STATE.md.
</process>
