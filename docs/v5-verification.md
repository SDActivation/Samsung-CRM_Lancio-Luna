# V5 verification

- TypeScript/Vite production build and native ESM API bundles passed.
- 88 unit tests passed, including immutable source taxonomy, locale/source preservation, original white PNG alpha, scene file checksums, actual handoff embedded-byte checksums, explicit home-working evidence, logo background/matte/variant failures and Italian/internal-copy QA.
- All 17 browser flows were covered: 16 passed in the full run, then the keyboard/focus flow passed after correcting return to a launcher that is remounted on drawer close. Existing responsive email checks at 320/375/390/660 px still pass.
- Desktop studio visually inspected: black sidebar/original white transparent logo, white workspace/original black logo, black primary pills, neutral cards and agent icon. Capture: `screenshots/v5-desktop.jpg`.
- Four original artwork scenes visually compared with the editorial geometry crop and selected generated appearance reference. Intact full circular front, light ring, short pedestal and no new hardware. Distinct living/music/kitchen/home-working settings. Contact sheet and composed artwork inspected; human/industrial/brand review remains pending.
- Source catalogue and original English showcase text remain immutable. The default fixture still selects 100 actual content-deduplicated variants and four scene worlds, without inflating counts by crop or profile ID.
- The private V5 spec remains gitignored and is excluded from source upload/build. No app login, real recipients, paid runtime service, provider secret or external send was introduced.

Production browser verification is performed after release. Live AI chat, live image jobs and live marketing transfers remain unavailable and are not included in these pass claims. Arial fallback remains explicit; actual email-client/dark-mode certification is not claimed.

Production checks: 88 unit tests passed against the committed release. Sixteen browser tests passed; the remaining full gallery/customer-destination flow exposed the missing Vercel `/mock/*` SPA rewrite. A specific same-application rewrite was added, preserving `/api` and static assets; the corrected flow is verified after redeployment.
