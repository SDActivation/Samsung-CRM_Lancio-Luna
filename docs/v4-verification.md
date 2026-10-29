# V4 verification

- Unit suites: 75 tests passed (catalogue, safe renderer, QA, handoff, simulation, priority arithmetic/missing data, deduplicated reach, masking, evidence and unavailable-service boundaries).
- TypeScript, Vite and both native API bundle builds passed.
- Browser suite: 14 tests passed initially; the remaining visual/service test passed after fixing a status-label case mismatch. Production suite is run separately after deployment.
- Native Node ESM import of `/api/studio.js`: HTTP 200 capability response; no extensionless TypeScript import in deployed API.
- Authoring image inspected against cropped concept reference. Complete circular head and short pedestal retained; no added hardware. Human review remains pending.
- Original black transparent Samsung SVG geometry and byte checksum pinned; standalone HTML embeds logo and JPEG artwork. Composed 16:9, square and portrait PNGs layered from the same master with no product crop/stretch.
- Raw V4/V3 Markdown specifications ignored; source catalogue unchanged. No login or provider credentials added. Assistant/image endpoint returns unavailable rather than a fake live result.

Live agent/model responses, runtime image jobs and marketing transfers are not verified or claimed. See `v4-change-log.md` for explicit remaining work and scope limits.
