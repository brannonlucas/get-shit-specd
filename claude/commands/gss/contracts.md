---
name: gss:contracts
description: Extract shared contracts from Ready specs for parallel development
allowed-tools:
  - Read
  - Glob
  - Grep
  - Task
  - Write
---
<objective>
Read all Ready specs, identify shared surfaces (types, tokens, routes, components, files), and generate CONTRACTS.md with ownership boundaries for parallel agent dispatch.
</objective>

<process>

<step name="find_specs">
Read .planning/specs/ directory.
Collect all specs with status Ready or Handed Off (check STATE.md in each).
If fewer than 2 specs found, report: "Contracts require at least 2 Ready specs. Found {{count}}." and stop.
</step>

<step name="collect_surfaces">
For each qualifying spec, read 01-SCOPE.md and extract the Implementation Surface section:
- Files Created
- Files Modified
- Shared Surfaces (types, tokens, routes, components)

If a spec lacks an Implementation Surface section, WARN and skip it.
</step>

<step name="spawn_contract_architect">
Spawn the gss-contract-architect agent with:
- All collected Implementation Surface data
- Project context (existing types, tokens, routes from codebase)
- List of spec IDs being coordinated

The agent analyzes overlaps, detects conflicts, and drafts CONTRACTS.md.

Use Task tool:
  subagent_type: "general-purpose"
  prompt: Include gss-contract-architect agent instructions + collected surfaces
  model: "sonnet"
</step>

<step name="write_contracts">
Write the agent's output to .planning/CONTRACTS.md.
If CONTRACTS.md already exists, archive the previous version as CONTRACTS.prev.md.
</step>

<step name="report">
Present summary to user:
- Number of specs analyzed
- Shared surfaces found
- Conflicts detected (if any)
- File ownership matrix overview
</step>

</process>
