# Handoff to Engineering

## Purpose

Translate a Ready spec into engineering-facing requirements. Engineering owns implementation approach, phasing, and technical decisions.

## Inputs
- Spec package folder
- Any linked artifacts (Figma, screenshots, research notes)

## Outputs
- Requirement IDs mapped to acceptance scenarios
- **Traceability matrix** (REQ → Acceptance → Spec section)
- Risk notes and open questions
- Success criteria summary
- **Implementation Surface** (from SCOPE: files created/modified, shared types, tokens, routes, components)
- **Contract dependencies** (from CONTRACTS.md if it exists: types/components this spec consumes from others)

## Principles
- **WHAT, not HOW**: Define outcomes, not implementation
- **WHY matters**: Include context for prioritization decisions
- **Engineering owns**: Phasing, task breakdown, technical approach
- Do not invent scope beyond spec files
- If acceptance is ambiguous, list exact questions
