---
name: gss:settings
description: Create or edit .planning/spec-config.json
allowed-tools:
  - Read
  - Bash
  - Write
  - Task
  - AskUserQuestion
---
<objective>
Ensure spec preferences exist at .planning/spec-config.json without overwriting existing GSD config.
</objective>

<process>
1. If .planning/spec-config.json does not exist, create it with sensible defaults from:
@./.claude/get-shit-specd/references/spec-config.md

2. If it exists, show current settings and allow updates.
</process>
