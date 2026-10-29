# Activation handoff contract

## Implemented

`GET /api/handoff` returns public demo capability status. `POST /api/handoff` accepts a bounded strict creative request with action validate / prepare / simulate, destination stensul / marketing_operations, mode mock / manual_handoff / live_draft, at most 100 variants, reviewer notes, operator acknowledgement and an explicit simulated outcome scenario.

The server validates branding / QA / supported demo surfaces, constructs inline assets from a fixed local registry, computes SHA-256 checksums and idempotency keys and processes one batch. Input has no arbitrary destination URL or credential fields; customer/recipient lists are rejected. Responses are no-store. Cross-origin writes are rejected. There is no application login, per the user's instruction; the API has no permission to make external requests.

The canonical package contains brand Samsung / product Luna, campaign, locale/market context, creative versions, source slides, copy including subject/preheader/sender, internal module mapping, original logo asset checksum, self-contained HTML review proofs, QA and pending approval. It excludes customer example IDs, the synthetic profile database, actual recipient data, access secrets and private source documents.

Static review HTML is not claimed to be editable Stensul modules. Internal header modules are locked; actual governed module IDs remain null/unverified. The Luna product visual is an explicit review placeholder and cannot be called production-ready. Missing logo, unknown assets, invalid branding, unsupported surfaces and incompatible payloads block the demo transfer.

## Modes and receipts

- mock: no external calls; receipt state simulated. No remote ID, remote URL or real draft is created.
- manual_handoff: package_exported; manual import and review required. Not connected.
- live_draft: blocked with HTTP 409 LIVE_CONNECTOR_NOT_CONFIGURED. Public capability evidence does not enable a tenant operation.

A receipt records mode/environment/destination, local correlation ID, versions/checksums/idempotency keys, operator acknowledgement, timestamp, per-item result, warnings and retry guidance. Simulated timeout is outcome_unknown and requires reconciliation; there is no automatic resubmission. Sending, scheduling and production approval are always false.

Browser-local history is labelled non-authoritative; matching receipts replace rather than inflate duplicate simulated counts. No cross-instance durable job/receipt store exists. The live adapters cannot be enabled through a request field, environment toggle or arbitrary endpoint.

## Public evidence / unconfigured tenant

The public sources document Stensul's general capabilities, not a tenant import contract, permissions or entitlement:

- https://stensul.com/faq/ — creation/governance differs from ESP/MAP delivery.
- https://stensul.com/integrations/stensul-content-api/ — query/distribute finalized existing email content; not a universal import API.
- https://stensul.com/blog/product-update-advancing-enterprise-grade-capabilities-at-stensul/ — public brief-to-email-shell capability.
- https://stensul.com/blog/october-release-more-relevant-email-more-opportunities-to-convert/ — assembly from approved modules with setup/availability to verify.

These were reviewed during V3 implementation. No API endpoint, credential, tenant module, WhatsApp template, real sender address, marketing platform choice or universal binary upload is invented.
