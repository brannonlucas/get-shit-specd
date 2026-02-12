<purpose>
Analyze multiple Ready specs to extract shared contracts and file ownership for parallel development.
Produces .planning/CONTRACTS.md consumed by handoff and agent dispatch.

This workflow prevents merge conflicts, duplicated types, and integration failures when multiple features are developed in parallel.
</purpose>

<process>

<step name="discover_specs">
Read .planning/specs/ directory.
For each spec folder, read STATE.md and filter to status: Ready or Handed Off.

If 0-1 qualifying specs:
  - Output: "Contracts extraction requires 2+ Ready specs. Skipping."
  - Exit gracefully (this is not an error).
</step>

<step name="extract_surfaces">
For each qualifying spec, read 01-SCOPE.md.
Extract the Implementation Surface section into structured data:

```
{
  "spec_id": "SPEC-001",
  "files_created": ["app/components/hero.tsx", ...],
  "files_modified": ["app/root.tsx", "app/app.css", ...],
  "types_consumed": ["Deck", "Card"],
  "types_created": ["HeroProps"],
  "tokens_used": ["brand-gold", "surface-primary"],
  "routes_added": ["/deck/:id"],
  "components_consumed": ["Footer", "Layout"],
  "components_created": ["Hero", "CardGrid"]
}
```

If a spec has no Implementation Surface, record a warning but continue.
</step>

<step name="detect_overlaps">
Compare all extracted surfaces:

**File conflicts:**
- Two specs creating the same file → CONFLICT (must resolve before dispatch)
- Two specs modifying the same file → SHARED (needs coordination, not blocking)

**Type conflicts:**
- Same type name created by two specs → CONFLICT
- Same type consumed and created → dependency (note direction)

**Route conflicts:**
- Overlapping route patterns → CONFLICT

**Token gaps:**
- Token referenced but not in codebase → NEW (flag for creation)
</step>

<step name="build_ownership_matrix">
For each file across all specs:

| File | Owner Spec | Also Modified By | Action |
|------|-----------|-----------------|--------|
| app/components/hero.tsx | SPEC-001 | — | Exclusive |
| app/root.tsx | — | SPEC-001, SPEC-002 | Coordinate |

Rules:
- Created files have exactly one owner
- Modified files list all specs that touch them
- Conflicts require resolution before dispatch
</step>

<step name="generate_type_contracts">
For shared types (consumed by one spec, created by another):
- Define the interface with field names and types
- Note which spec owns the definition
- Note which specs depend on it

These become the "API boundary" between parallel work streams.
</step>

<step name="generate_component_contracts">
For shared components (created by one spec, consumed by another):
- Define the props interface
- Note the owner spec
- Note consumer specs

This ensures component APIs are agreed upon before parallel coding starts.
</step>

<step name="write_contracts_md">
Write .planning/CONTRACTS.md using the contracts template.

Sections:
1. Type Contracts
2. Token Contracts
3. Route Contracts
4. Component API Contracts
5. File Ownership Matrix
6. Conflict Warnings

If .planning/CONTRACTS.md already exists, rename to CONTRACTS.prev.md first.
</step>

<step name="summarize">
Report:
- Specs analyzed: {{count}}
- Shared types: {{count}} ({{conflict_count}} conflicts)
- Shared files: {{count}} modified by multiple specs
- Routes: {{count}} total ({{conflict_count}} conflicts)
- Blocking conflicts: {{count}} (must resolve before dispatch)
</step>

</process>
