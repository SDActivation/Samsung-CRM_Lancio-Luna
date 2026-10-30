# Samsung CRM Activation Studio — V5 / spec 2.4

Public tool: https://luna-crm-variant-studio.vercel.app · no login or application credentials.

A synthetic Luna CRM campaign studio with 100 immutable source micro-clusters, 12 dimensions, six analytical lenses and separate campaign/journey/lifecycle context. The default plan selects 100 coherent, content-deduplicated recipes from the actual candidate pool; unsupported requests expose coverage gaps.

V5 adds a black sidebar/white workspace, original background-appropriate Samsung logos, Italian customer communications (inspirational hero may be English), four actual contextual Luna scenes, agent icon and versioned locale/visual traceability. The four worlds are living/design, music, kitchen and domestic smart working. Source records and the six original personas remain unchanged.

Simulation compares up to three of four prospects and replays one customer's lifecycle with purchase/setup/usage/opt-out controls. Priority & Opportunity computes explainable synthetic rankings, overlap/marginal reach and controlled variable sensitivity. Evidence lookup and creative previews remain available independently of external AI services.

## Run and verify

```sh
npm ci
npm run dev
npm test
npm run build
npx playwright install --with-deps chromium
npm run test:e2e
```

Node 24 is the deployed native API target. `/api/handoff` and `/api/studio` use self-contained ESM bundles produced by `scripts/build-api.mjs`. Vite serves the same handlers during development. Source specs containing private configuration are gitignored and excluded from builds/uploads.

## Assets and export

Original PNG masters, JPEG delivery derivatives, 16:9/1:1/4:5 compositions, contact sheet, manifests/checksums and prompt set are under `public/assets`. `scripts/compose-v5.swift` reproduces native text/logo compositions on macOS using existing artwork; original Samsung logos are never generated or recolored. The app keeps artwork, logo and editable copy as separate layers.

HTML proofs embed the selected artwork and actual original logo. JSON/CSV preserve locale, source/localized copy, selected world, canonical appearance, version and rationale. Mock/manual handoff includes each selected asset once and preserves generated-demo classification; static review HTML references pinned public scene files. Source catalogue and operator rationale are separate from customer copy.

## Current limits

- Live AI chat, in-app image generation and real Stensul/MOPs transfer are **not connected**. No fake live response/job or real send is claimed.
- All profiles/events/results are synthetic; heuristic priority and masking are not measured conversion, uplift or causal importance.
- Generated scene artwork is an RFP concept proposal, not official product photography or a commercial campaign. Human/brand/product/rights approval remains pending.
- Authorized Samsung fonts were not supplied; Arial fallback is explicit and exported. Actual email-client and client dark-mode compatibility remains unverified.

See [V5 changes and review limits](docs/v5-change-log.md), [deployment](docs/deployment.md), [integration contract](docs/integration-contract.md) and historical [V4 implementation notes](docs/v4-change-log.md).
