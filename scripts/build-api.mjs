import { build } from 'esbuild';
await build({entryPoints:['server/routes/handoff.ts'],outfile:'server/generated/handoff.mjs',bundle:true,platform:'node',format:'esm',target:'node24',legalComments:'none',logLevel:'info'});
