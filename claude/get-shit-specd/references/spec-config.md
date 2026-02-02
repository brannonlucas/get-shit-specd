# Spec Config (Preferences)

These preferences drive how specs are written and how strict the checker is.

## Full Configuration

```json
{
  // Output
  "output_dir": ".planning/specs",
  "id_prefix": "SPEC",

  // Audience (affects detail level and agent usage)
  "audience": "solo | small_team | external",

  // Default tier (can override per spec)
  "default_tier": "standard",

  // Content requirements
  "require_ascii_wireframes": true,
  "require_gherkin": true,
  "require_priorities": true,

  // Enforcement thresholds
  "min_edge_cases": 3,
  "min_out_of_scope": 2,
  "max_open_questions": 3,

  // Quality gates
  "require_p0_coverage": true,
  "require_all_states": true,
  "require_nonfunctional_requirements": true,
  "require_analytics_events": true,

  // Agent configuration
  "agents": {
    "micro_tier": [],
    "standard_tier": ["acceptance-writer", "spec-checker"],
    "full_tier": ["ux-designer", "data-modeler", "acceptance-writer", "synthesizer", "spec-checker"]
  }
}
```

## Audience Presets

**solo** (just you + AI):
- Lighter detail, faster iteration
- Skip synthesizer (you hold context)
- min_edge_cases: 2

**small_team** (2-5 close collaborators):
- Standard detail
- All agents for Full tier
- min_edge_cases: 3

**external** (contractors, external team):
- Maximum detail, no assumptions
- All agents always
- min_edge_cases: 5
- require_ascii_wireframes: true (no Figma assumptions)

## Tier Behavior

**Micro tier:**
- Single SPEC.md file
- 3 intake questions
- No agents
- Fast path for simple changes

**Standard tier:**
- BRIEF, SCOPE, ACCEPTANCE
- 10 intake questions
- acceptance-writer + spec-checker agents
- Most features

**Full tier:**
- All 5 files
- All intake questions
- All agents (drafting + quality)
- Complex multi-part features

## Installation

Run `/gss:setup` to create .planning/spec-config.json interactively.

If a project already has config, GSS respects it and doesn't overwrite.
