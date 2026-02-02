---
name: gss:new-spec
description: Create a new spec package for a feature
allowed-tools:
  - Read
  - Bash
  - Write
  - Task
  - AskUserQuestion
---
<objective>
Create a new spec package in .planning/specs/ with BRIEF, SCOPE, UX, DATA, ACCEPTANCE, and STATE.
</objective>

<execution_context>
@./.claude/get-shit-specd/workflows/create-spec.md
@./.claude/get-shit-specd/references/product-questioning.md
</execution_context>

<process>

## Phase 1: Setup (mandatory)
1. Ensure .planning exists:
```bash
mkdir -p .planning/specs
```

2. Ensure spec config exists or create it:
- If missing, run /gss:settings logic.

## Phase 2: Intake
Ask the minimum questions to define:
- spec name
- user/context
- v1 goal
- in/out scope
- key screens
- roles/permissions
- acceptance definition

## Phase 3: Create spec folder
Create folder: .planning/specs/SPEC-{{id}}-{{slug}}/
Create 00-04 files and STATE.md using the create-spec workflow.

## Phase 4: Output
Print:
- Spec folder path
- Current status (Draft/Review/Ready)
- Blocking open questions (if any)
- Next command suggestion: /gss:review-spec or /gss:handoff
</process>
