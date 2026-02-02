<purpose>
Create a complete spec package from intake to Ready gate.
Agents draft sections; human reviews and refines.

Called from /gss:new-spec and /gss:update-spec.
</purpose>

<tiers>
Determine tier based on complexity:
- **Micro**: Config change, copy tweak, minor fix → single file, no agents
- **Standard**: Most features → BRIEF, SCOPE, ACCEPTANCE + 3 agents
- **Full**: Complex multi-screen features → all 5 files + all agents
</tiers>

<artifacts>
Target directory: .planning/specs/{{SPEC_ID}}-{{SPEC_SLUG}}/

Micro tier:
- SPEC.md (single file)

Standard tier:
- 00-BRIEF.md
- 01-SCOPE.md
- 04-ACCEPTANCE.md
- STATE.md

Full tier:
- 00-BRIEF.md
- 01-SCOPE.md
- 02-UX.md
- 03-DATA.md
- 04-ACCEPTANCE.md
- STATE.md
</artifacts>

<process>

<step name="load_context">
Read (if exists):
- .planning/spec-config.json (for audience, tier defaults, enforcement settings)
- .planning/PROJECT.md (optional project context)
- Any referenced docs provided by user
</step>

<step name="determine_tier">
Ask user or infer from request complexity:
- Micro: "just", "small", "tweak", "fix", single-sentence request
- Standard: feature request, new capability, most work
- Full: multi-screen, multi-role, complex integrations

If unclear, ask:
"Is this a quick fix (micro), a typical feature (standard), or a complex multi-part feature (full)?"
</step>

<step name="intake">
Use the Product Questioning Protocol:
@./.claude/get-shit-specd/references/product-questioning.md

Adapt depth to tier:
- Micro: 3 questions (what, why, done-when)
- Standard: 10 questions (skip deep UX)
- Full: all questions

Record unknowns as assumptions + open questions.
</step>

<step name="write_brief_and_scope">
Main flow writes:
- 00-BRIEF.md (problem, JTBD, goal, constraints, risks)
- 01-SCOPE.md (in/out with priorities, dependencies, NFRs)

These require intake context, so main flow handles them.
</step>

<step name="spawn_drafting_agents" tier="standard,full">
For Standard tier, spawn in parallel:
- gss-acceptance-writer → draft 04-ACCEPTANCE.md

For Full tier, spawn in parallel:
- gss-ux-designer → draft 02-UX.md
- gss-data-modeler → draft 03-DATA.md

Wait for parallel agents to complete.

Then spawn:
- gss-acceptance-writer → draft 04-ACCEPTANCE.md (needs UX+DATA for Full tier)
</step>

<step name="spawn_quality_agents" tier="standard,full">
Spawn sequentially:
1. gss-spec-synthesizer → check coherence across files, flag contradictions
2. gss-spec-checker → enforce Ready gate requirements

If checker returns FAIL:
- Show issues to user
- Patch files or add to open questions
- Re-run checker
</step>

<step name="human_review">
Present all drafted files to user for review.
User edits as needed.
Re-run checker after significant edits.
</step>

<step name="ready_gate">
Compute Ready gate per spec-config.json:
- all required files exist
- open questions <= max (default 3)
- every in-scope item has acceptance scenario
- edge cases >= min (default 3)
- out of scope >= 2 items
- at least one P0 requirement

Write STATE.md with status and changelog.
</step>

</process>

<agent_spawn_reference>
When spawning agents, use Task tool with:
- subagent_type: "general-purpose" (agents are prompts, not registered types)
- prompt: Include agent file content + spec files written so far
- model: "haiku" for drafting, "sonnet" for checking

Example:
Task(
  subagent_type="general-purpose",
  prompt="You are gss-ux-designer. [agent instructions]. Draft 02-UX.md based on: [BRIEF] [SCOPE]",
  model="haiku"
)
</agent_spawn_reference>
