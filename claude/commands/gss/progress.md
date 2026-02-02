---
name: gss:progress
description: Show spec inventory and status
allowed-tools:
  - Read
  - Bash
  - Write
  - Task
  - AskUserQuestion
---
<objective>
List all specs in .planning/specs and show their STATE.md status.
</objective>

<process>
1. Find .planning/specs/*/STATE.md
2. Print a short table: spec_id | name | status | open_questions_count | last_updated
</process>
