# Luna CRM Variant Studio

A React / TypeScript demonstration of a transparent CRM creative workflow: Sense → Brief → Build → Check → Handoff. UI and creative copy are English.

**SYNTHETIC / ILLUSTRATIVE · PENDING BRAND VALIDATION**

The seeded simulator creates 10,000 opaque customer profiles and exactly 100 creative instances: 5 audiences × 5 campaign phases × 4 touchpoints. These are modular combinations, not 100 original concepts or sends. No Samsung service, live sending system, AI API, tracking, remote image or personal data is used at runtime.

## Run

Use Node 22 or 24 and npm. Initial installation requires network access; after installation the demo runs without external services.

```sh
npm install
npm run dev
npm run test
npm run build
npm run data
npx playwright install chromium
npm run test:e2e
```

`npm run data` materializes separately versioned, schema-validated JSON fixtures in `data-fixtures/`. Browser exports provide the same records in a single named-file bundle, plus CSV, eligibility and QA reports. Seed is 20261029; default evaluation time is 2026-10-29 12:00 UTC. Downloaded HTML proofs embed neutral illustrations and open offline.

## Included

- Synthetic profiles, overlapping segment memberships, explicit primary assignment and residual long tail.
- Gallery with segment / phase / channel / status filters, sorting, explainability, mounted responsive email, push lock screen, WhatsApp and Members proofs.
- Three-way comparison, a five-phase persistent-customer journey, reversible click / purchase / opt-out and configurable illustrative contact caps.
- Consent, availability, frequency, purchase and HQ-conflict governance. No automatic channel fallback.
- Preflight fault injection, severity/source/remediation, version delta and offline mock Jira handoff.
- Complete 100-record JSON/CSV handoff, asset / brand registers and synthetic labels.

## Architecture

Pure typed domain and engine modules; React presentation; Zod validates generated customer and creative schemas and export boundaries; Vitest unit tests; Playwright browser flow and responsive proof tests. No database or external credentials required. `docs/assumptions.md` records provenance and open reviews; `docs/demo-script.md` provides the walkthrough.

## Brand and implementation limits

The email master is reconstructed from the sample observations in the provided specification (660/640px, dark base, typography hierarchy, pill CTA and modular footer). The original Outlook HTML was not present in the supplied folder and is not included. The specification and confidential reference materials remain outside this repository.

Arial fallback, logo placeholder and original neutral SVG illustrations are explicit. Product specifications, assets, terms and numeric lettermark clear space remain unapproved. Browser previews do not certify Gmail, Outlook or Apple Mail rendering. No measured uplift, savings, SLA compliance or Samsung approval is claimed. All 100 variants retain `production_approved: false`.

## Deployment

Vite static build output is `dist`. Vercel uses the project configuration; connect the private GitHub repository and use `main` as the production branch. No environment variables are needed. Build must pass unit tests and TypeScript before publication. See `docs/verification.md` for actual verification status.
