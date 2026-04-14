# Documentation Changelog

## Format

- Date
- Document changed
- Reason
- Impact
- Parity/Upgrade status

## 2026-04-14

- `docs/prd/system-prd.md`
  - Reason: cleaned and made source of truth explicit
  - Impact: removes ambiguity between PRD and rewrite spec
  - Status: parity exact for governance, intentional upgrade for clarity

- `docs/prd/system-rewrite-spec.md`
  - Reason: reduced ambiguity and focused document on migration only
  - Impact: rewrite spec no longer defines product scope
  - Status: intentional upgrade

- `docs/architecture/system-architecture.md`
  - Reason: aligned with Nuxt 4+ and reusable enterprise structure
  - Impact: architecture is more precise and modular
  - Status: intentional upgrade

- `docs/features/core-features.md`
  - Reason: aligned feature priorities with parity-first enterprise starter
  - Impact: clearer implementation order and reusable patterns
  - Status: intentional upgrade

- `docs/development/development-workflow.md`
  - Reason: added docs parity and sync expectations
  - Impact: workflow now enforces docs maintenance
  - Status: intentional upgrade

- `docs/development/docs-sync-checklist.md`
  - Reason: added an explicit sync checklist for implementation flow
  - Impact: documents now have a concrete sync checkpoint
  - Status: intentional upgrade

- `docs/deployment/deployment-guide.md`
  - Reason: aligned deployment guidance with Nuxt fullstack starter
  - Impact: deployment expectations are clearer
  - Status: intentional upgrade

- `docs/deployment/implementasi-iis-dan-ubuntu-systemd.md`
  - Reason: deprecated legacy deployment note and pointed to the new guide
  - Impact: removes confusion around deployment references
  - Status: intentional upgrade

- `docs/governance/docs-governance.md`
  - Reason: introduced ownership and review rules for docs
  - Impact: docs maintenance is now governed explicitly
  - Status: intentional upgrade

- `docs/governance/docs-quality-gate.md`
  - Reason: defined quality gate before publication
  - Impact: low-quality docs can be rejected earlier
  - Status: intentional upgrade

- `docs/templates/*`
  - Reason: added reusable document templates
  - Impact: new docs can be created consistently
  - Status: intentional upgrade
