---
name: gss:setup
description: Interactive setup for GSS spec configuration
allowed-tools:
  - Read
  - Bash
  - Write
  - AskUserQuestion
---
<objective>
Configure GSS for this project through interactive questions.
Creates .planning/spec-config.json with settings tailored to your team and workflow.
</objective>

<execution_context>
@./.claude/get-shit-specd/references/spec-config.md
</execution_context>

<process>

## Phase 1: Check existing config
```bash
mkdir -p .planning
```

If .planning/spec-config.json exists:
- Show current config
- Ask: "Start fresh or edit existing?"
- If edit, show current values as defaults in questions

## Phase 2: Audience question
Ask using AskUserQuestion:
```
Question: "Who will consume these specs?"
Options:
- "Just me + AI" → solo (lighter detail, faster iteration)
- "Small team (2-5)" → small_team (standard detail)
- "Larger team or contractors" → external (maximum detail, no assumptions)
```

## Phase 3: Default tier question
Ask using AskUserQuestion:
```
Question: "What's your typical spec complexity?"
Options:
- "Quick fixes and small changes" → micro (single file, no agents)
- "Most features" → standard (BRIEF + SCOPE + ACCEPTANCE)
- "Complex multi-part features" → full (all 5 files + all agents)
```

## Phase 4: Strictness question
Ask using AskUserQuestion:
```
Question: "How strict should spec enforcement be?"
Options:
- "Relaxed" → min_edge_cases: 1, min_out_of_scope: 1, max_open_questions: 5
- "Standard (Recommended)" → min_edge_cases: 3, min_out_of_scope: 2, max_open_questions: 3
- "Strict" → min_edge_cases: 5, min_out_of_scope: 3, max_open_questions: 2
```

## Phase 5: Format preferences
Ask using AskUserQuestion:
```
Question: "Do you use Gherkin (Given/When/Then) for acceptance criteria?"
Options:
- "Yes" → require_gherkin: true
- "No, plain language is fine" → require_gherkin: false
```

## Phase 6: Write config
Create .planning/spec-config.json with:
```json
{
  "output_dir": ".planning/specs",
  "id_prefix": "SPEC",
  "audience": "[from Q2]",
  "default_tier": "[from Q3]",

  "require_ascii_wireframes": true,
  "require_gherkin": [from Q5],
  "require_priorities": true,

  "min_edge_cases": [from Q4],
  "min_out_of_scope": [from Q4],
  "max_open_questions": [from Q4],

  "require_p0_coverage": true,
  "require_all_states": true,
  "require_nonfunctional_requirements": true,
  "require_analytics_events": true,

  "agents": {
    "micro_tier": [],
    "standard_tier": ["acceptance-writer", "spec-checker"],
    "full_tier": ["ux-designer", "data-modeler", "acceptance-writer", "synthesizer", "spec-checker"]
  }
}
```

## Phase 7: Confirmation
Print:
- Config file location
- Summary of choices
- Suggest: "Run /gss:new-spec to create your first spec"

</process>

<presets>
## Audience Presets

### solo
- Lighter detail requirements
- min_edge_cases: 2
- Skip synthesizer agent
- Faster iteration

### small_team
- Standard detail
- min_edge_cases: 3
- All agents for full tier
- Balanced rigor

### external
- Maximum detail
- min_edge_cases: 5
- All agents always
- No assumptions about shared context
- require_ascii_wireframes: true

## Strictness Presets

### relaxed
- min_edge_cases: 1
- min_out_of_scope: 1
- max_open_questions: 5
- Good for early exploration

### standard
- min_edge_cases: 3
- min_out_of_scope: 2
- max_open_questions: 3
- Recommended for most teams

### strict
- min_edge_cases: 5
- min_out_of_scope: 3
- max_open_questions: 2
- For high-stakes features or external teams
</presets>
