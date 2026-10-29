# V3 / specification 2.1 verification — 29 October 2026

Executed in an isolated Vercel Sandbox because the local environment cannot reach the npm registry. The private V3 Markdown is excluded from source uploads, Git, static output and exports. The user's explicit no-credentials instruction overrides the inherited login section.

## Automated checks

- **67 unit tests passed**: original 100-row source parity/hashes; twelve dimensions/six lenses; ten families; deterministic 10,000-profile simulator and separate accounts; three-state audience/event rules; six distinct personas and persistent-customer journey; parametric target/gap/deduplication; consent, frequency and HQ precedence; brand/source/schema/export checks; original PNG checksum/dimensions; legacy product-ID migration; missing/unverified/distorted logo and product naming; creative-only canonical handoff; public-vs-tenant capability; unsupported surface and missing-asset gates; strict input boundaries; manual/simulated receipts; idempotency; partial/unknown/rate-limit/permission cases; same-origin API behavior; live-mode denial and no external fetch.
- **TypeScript + Vite production build passed.** The new API exports the native Web Request/Response fetch handler. Local Vite development invokes the same handler.
- **13 Playwright browser tests passed**: gallery/catalogue counts/gaps, twelve curated proofs and six distinct people, comparison/surface filters/CSV, persistent journey, QA faults, email widths 320/375/390/660 with long copy/missing visuals/dark preference, mobile navigation/focus, Samsung identity/original-logo ratio/export, server-side mock handoff/receipt persistence/idempotency/live denial, unsupported surface and distinct manual fallback.

## Asset verification

Original PNG acquired from the exact Samsung sample URL specified in V3. PNG dimensions 345×92; SHA-256 1ce75f8e340e2837773c3bed1f7155c1c71b19aa3a5dc54af05e91eb279a9ba5. Original bytes retained locally and in self-contained visual proofs. White lettermark visually inspected; no redraw, crop, recoloring or CSS filter. Full source and review status are in src/brand/logo-manifest.json.

Public Samsung logo guidance and Stensul FAQ / Content API / Content Management / MCP release references were reviewed. General public product capabilities are not tenant authorization and do not establish an import endpoint/schema.

## Explicit limits

No application login or credentials. No live Stensul/MOPs connector, actual remote IDs/URLs, real draft creation, recipient transfer, scheduling or sending. Live adapter entry points fail closed. Receipt history is browser-local and labelled non-authoritative; no durable distributed store is claimed.

The Luna product visual, authorized Samsung fonts, legal copy, numeric clear-space/minimum-size guidance and final campaign approval remain pending. Gmail / Outlook / Apple Mail rendering is NOT TESTED. Browser preview does not certify email-client compatibility. No commercial availability, certified integration, measured uplift or service SLA is claimed.

Production packaging check: Vercel's native ESM runtime did not resolve extensionless TypeScript imports from an unbundled route. The API build now produces a self-contained ESM artifact with esbuild, loaded by the explicit api/handoff.js wrapper. A direct native Node import/fetch smoke check is part of the release verification; application logic remains shared with local tests. No authentication was introduced by this packaging fix.
