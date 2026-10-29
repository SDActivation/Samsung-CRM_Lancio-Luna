# Deployment

- Site: https://luna-crm-variant-studio.vercel.app
- Functional application name: Samsung CRM Activation Studio
- Product: Luna
- Release: V3 / specification 2.1
- GitHub: https://github.com/SDActivation/Samsung-CRM_Lancio-Luna
- Vercel team: SD ACTIVATION
- Project: luna-crm-variant-studio (technical URL/project ID retained)
- Project ID: prj_lGK7tlXmjFHQxYY2EuCtUZb5OUX5
- Production branch: main
- Frontend: React / TypeScript / Vite
- Same-origin backend: /api/handoff, native Node.js Web Request/Response Vercel Function
- Build gate: unit tests followed by TypeScript and Vite production build
- Production is public. Application login and credentials are intentionally absent.

The GitHub integration automatically builds main for production and branches for preview. The existing technical URL is retained so earlier links continue to work; it is not the displayed tool name.

No environment variables or service credentials are required by the current mock/manual connector. Live mode always fails closed. No external tenant call, recipient list, schedule or send exists. Future live integration is explicitly unconfigured and requires separate verified documentation/access/authorization and durable infrastructure.

Local development serves the same request handler through the Vite middleware. Private Markdown specifications are ignored by Git, excluded from uploaded source and denied by the local development file server. Static output contains only the application and verified local assets.
