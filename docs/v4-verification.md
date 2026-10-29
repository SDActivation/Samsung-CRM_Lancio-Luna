# V4 verification

- Unit suites: 75 tests passed (catalogue, safe renderer, QA, handoff, simulation, priority arithmetic/missing data, deduplicated reach, masking, evidence and unavailable-service boundaries).
- TypeScript, Vite and both native API bundle builds passed.
- Browser suite: the original 13 flows passed; two added V4 checks exposed text-selector/case mismatches. The visual check passed after correction; the priority selector now targets the table cell containing the field and its metadata. Production verification: 14 browser flows passed; the corrected priority cell-selector check passed in a targeted production rerun, covering all 15 flows. Both service capability endpoints, original black SVG and all three composed PNG downloads return HTTP 200.
- Native Node ESM import of `/api/studio.js`: HTTP 200 capability response; no extensionless TypeScript import in deployed API.
- Authoring image inspected against cropped concept reference. Complete circular head and short pedestal retained; no added hardware. Human review remains pending.
- Original black transparent Samsung SVG geometry and byte checksum pinned; standalone HTML embeds logo and JPEG artwork. Composed 16:9, square and portrait PNGs layered from the same master with no product crop/stretch.
- Raw V4/V3 Markdown specifications ignored; source catalogue unchanged. No login or provider credentials added. Assistant/image endpoint returns unavailable rather than a fake live result.

Live agent/model responses, runtime image jobs and marketing transfers are not verified or claimed. See `v4-change-log.md` for explicit remaining work and scope limits.
