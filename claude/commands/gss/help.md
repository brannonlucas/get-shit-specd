---
name: gss:help
description: Show available get-shit-specd commands
allowed-tools:
  - Read
---
<objective>
Explain the GSS (Get Shit Specd) workflow and available commands.
</objective>

<process>

## What is GSS?

GSS is a spec workflow that produces outcome-focused specs. Specs define WHAT must be true and WHY it matters — engineering determines HOW to build it.

## Commands

### Setup & Configuration
- `/gss:setup` — Interactive setup for new projects (audience, tier, strictness)
- `/gss:settings` — View or edit existing spec-config.json

### Spec Creation
- `/gss:new-spec` — Create a new spec package (runs intake → drafts → quality gates)
- `/gss:update-spec` — Modify an existing spec

### Quality & Review
- `/gss:review-spec` — Red-team a spec for ambiguity and missing states
- `/gss:handoff` — Generate requirements mapping for engineering

### Status
- `/gss:progress` — Show all specs and their status (Draft/Review/Ready)

## Typical Flow

```
1. /gss:setup          ← First time only
2. /gss:new-spec       ← Create spec with intake questions
3. /gss:review-spec    ← Red-team for gaps
4. /gss:handoff        ← Generate engineering requirements
```

## Spec Tiers

| Tier | Files | Agents | When |
|------|-------|--------|------|
| Micro | SPEC.md | None | Quick fixes |
| Standard | BRIEF, SCOPE, ACCEPTANCE | 2 | Most features |
| Full | All 5 files | 6 | Complex features |

## More Info

- Config reference: `.claude/get-shit-specd/references/spec-config.md`
- Workflow details: `.claude/get-shit-specd/workflows/`
- Agent definitions: `.claude/agents/gss-*.md`

</process>
