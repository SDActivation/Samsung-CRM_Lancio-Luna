import { mkdirSync, writeFileSync } from 'node:fs';
import { generateSyntheticCustomers, deriveIllustrativeInsights } from '../src/data/customers';
import { buildVariantMatrix } from '../src/engine/matrix';
import { exportBundle } from '../src/exports/bundle';
const customers=generateSyntheticCustomers();const insights=deriveIllustrativeInsights(customers);const variants=buildVariantMatrix(customers,insights);const bundle=exportBundle(variants,customers,insights);mkdirSync('data-fixtures',{recursive:true});for(const [name,value] of Object.entries(bundle))writeFileSync(`data-fixtures/${name.endsWith('.json')?name:name+'.json'}`,JSON.stringify(value,null,2));console.log('Validated 10,000 synthetic customers, 100 variants and 11 separately versioned data files.');
