# get-shit-specd (GSS)

Spec-first development workflow for [Claude Code](https://claude.ai/code). Transform vague ideas into engineering-ready specifications.

## What is GSS?

GSS is a structured workflow that helps you think through features **before** writing code. It guides you through:

1. **Problem Definition** — What are you solving and for whom?
2. **Scope** — What's in, what's out, what are the dependencies?
3. **UX Design** — Screens, flows, states, copy (Full tier only)
4. **Data Modeling** — Entities, permissions, state machines (Full tier only)
5. **Acceptance Criteria** — Gherkin scenarios that define "done"

The output is an engineering-ready handoff document with requirements mapped to testable acceptance criteria.

## Requirements

- [Bun](https://bun.sh) v1.0 or later

```bash
# Install Bun (if needed)
curl -fsSL https://bun.sh/install | bash
```

## Installation

```bash
cd your-project
bunx get-shit-specd init
```

This creates:
- `.claude/commands/gss/` — Slash commands
- `.claude/agents/gss-*` — AI agents for drafting and review
- `.claude/get-shit-specd/` — Workflows, templates, references
- `.planning/spec-config.json` — Your preferences
- `.planning/specs/` — Where specs live

## Usage

After installation, use these commands in Claude Code:

| Command | Description |
|---------|-------------|
| `/gss:setup` | Configure preferences (audience, tier, strictness) |
| `/gss:new-spec` | Create a new spec package |
| `/gss:review-spec <id>` | Red-team a spec for gaps |
| `/gss:handoff <id>` | Generate engineering requirements |
| `/gss:progress` | Show spec inventory and status |
| `/gss:help` | Show all commands |

### Typical Workflow

```
/gss:setup                          # One-time configuration
/gss:new-spec                       # Start a new feature spec
  → Answer intake questions
  → AI drafts spec files
  → Quality gates enforce completeness
/gss:review-spec SPEC-001           # Red-team for gaps
/gss:handoff SPEC-001               # Generate engineering doc
```

## Spec Tiers

| Tier | Files | Best For |
|------|-------|----------|
| **Micro** | Single BRIEF+SCOPE combined | Bug fixes, small changes |
| **Standard** | BRIEF + SCOPE + ACCEPTANCE | Most features |
| **Full** | All 5 files including UX + DATA | Complex features, new surfaces |

## Configuration

Edit `.planning/spec-config.json`:

```json
{
  "audience": "external",           // solo, small_team, external
  "default_tier": "standard",       // micro, standard, full
  "min_edge_cases": 5,              // Minimum edge cases required
  "min_out_of_scope": 3,            // Minimum out-of-scope items
  "max_open_questions": 2,          // Maximum unresolved questions
  "require_gherkin": true           // Require Gherkin format
}
```

### Audience Presets

| Audience | Style | Edge Cases | Out of Scope |
|----------|-------|------------|--------------|
| `solo` | Informal, minimal docs | 2+ | 1+ |
| `small_team` | Clear, some context | 3+ | 2+ |
| `external` | Formal, full context | 5+ | 3+ |

## Spec Package Structure

A complete spec package (Standard tier):

```
.planning/specs/SPEC-001-feature-name/
├── 00-BRIEF.md       # Problem, JTBD, success metrics
├── 01-SCOPE.md       # In/out scope, dependencies, NFRs
├── 04-ACCEPTANCE.md  # Gherkin scenarios, edge cases
├── STATE.md          # Status tracking
├── REVIEW.md         # Red-team findings (after review)
└── HANDOFF.md        # Engineering requirements (after handoff)
```

Full tier adds:
- `02-UX.md` — Screens, flows, states, copy
- `03-DATA.md` — Entities, permissions, state machines

## Philosophy: WHAT/WHY, not HOW/WHEN

GSS specs define:
- **WHAT** must be true (outcomes, acceptance criteria)
- **WHY** it matters (problem, success metrics)

They do NOT define:
- **HOW** to build it (architecture, file paths, implementation)
- **WHEN** to ship it (phases, sprints, task breakdowns)

Engineering determines HOW and WHEN during implementation.

## Example

See `examples/SPEC-003-watermarking-service/` for a complete spec package demonstrating:
- Problem definition with clear JTBD
- Scoped outcomes with P0/P1/P2 priorities
- 8 Gherkin acceptance scenarios
- 8 edge cases with expected behaviors
- Engineering handoff with requirement IDs

## Updating

```bash
bunx get-shit-specd update
```

This updates GSS files while preserving your `spec-config.json`.

## License

MIT
