import { mkdirSync, writeFileSync } from 'node:fs';
import { defaultPlan } from '../src/v2/model';
import { generateSyntheticProfiles, generateSyntheticAccounts, deriveInsights } from '../src/v2/simulator';
import { selectDemoVariants } from '../src/v2/engine';
import { exportBundle } from '../src/v2/export';
const profiles=generateSyntheticProfiles(),accounts=generateSyntheticAccounts(profiles),insights=deriveInsights(profiles),generation=selectDemoVariants(profiles,defaultPlan);
const bundle=exportBundle(generation.variants,profiles,accounts,defaultPlan,generation.report,insights);mkdirSync('data-fixtures',{recursive:true});for(const [name,value] of Object.entries(bundle))writeFileSync(`data-fixtures/${name.endsWith('.json')?name:name+'.json'}`,JSON.stringify(value,null,2));console.log(JSON.stringify({profiles:profiles.length,accounts:accounts.length,source_microclusters:100,...generation.report},null,2));
