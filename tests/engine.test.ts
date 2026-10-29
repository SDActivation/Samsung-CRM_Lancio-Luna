import { describe, it, expect } from 'vitest';
import { CHANNELS, CustomerSchema, SEGMENTS, STAGES, VariantSchema, NOW, type Customer } from '../src/domain/model';
import { generateSyntheticCustomers, deriveIllustrativeInsights } from '../src/data/customers';
import { buildVariantMatrix } from '../src/engine/matrix';
import { evaluateEligibility } from '../src/engine/policy';
import { applyFaults, runPreflightQA, type Fault } from '../src/engine/qa';
import { exportBundle, toCSV } from '../src/exports/bundle';
import { renderEmail } from '../src/renderers/html';
const customers=generateSyntheticCustomers();const insights=deriveIllustrativeInsights(customers);const variants=buildVariantMatrix(customers,insights);
const clean=():Customer=>({...structuredClone(customers[0]),suppression_flags:[],recent_contact_timestamps:[],eligible_email:true,eligible_push:true,eligible_members:true,eligible_whatsapp:true,marketing_consent_by_channel:Object.fromEntries(CHANNELS.map(c=>[c,true]))});
const v=variants.find(v=>v.channel==='EMAIL'&&v.stage==='TEASER')!;
describe('Reproducible synthetic data and full matrix',()=>{
 it('reproduces all 10,000 records and validates their schema',()=>{expect(customers).toHaveLength(10000);expect(generateSyntheticCustomers()).toEqual(customers);expect(CustomerSchema.array().safeParse(customers).success).toBe(true);expect(generateSyntheticCustomers(12,10)).not.toEqual(customers.slice(0,10));});
 it('has all primary groups, overlaps and an excluded long tail',()=>{for(const s of SEGMENTS)expect(customers.some(c=>c.segment_id===s)).toBe(true);expect(customers.some(c=>c.segment_id==='long_tail')).toBe(true);expect(customers.some(c=>c.memberships.length>1)).toBe(true);});
 it('creates exactly one instance for each 5 × 5 × 4 cell',()=>{expect(variants).toHaveLength(100);expect(new Set(variants.map(v=>v.variant_id)).size).toBe(100);for(const s of SEGMENTS)for(const st of STAGES)for(const c of CHANNELS)expect(variants.filter(v=>v.segment_id===s&&v.stage===st&&v.channel===c)).toHaveLength(1);expect(buildVariantMatrix(customers,insights)).toEqual(variants);});
 it('has traceable nonempty content and never production-approves',()=>{for(const v of variants){expect(VariantSchema.safeParse(v).success).toBe(true);expect(v.production_approved).toBe(false);expect(v.insight_ids.every(id=>insights.some(i=>i.insight_id===id))).toBe(true);expect(['needs_review','fail']).toContain(v.qa_status);}});
 it('does not collect real contact fields',()=>{for(const c of customers.slice(0,100)){expect(Object.keys(c)).not.toContain('email');expect(Object.keys(c)).not.toContain('name');expect(c.customer_id).toMatch(/^sim_\d{6}$/);}});
});
describe('Consent, pressure and HQ precedence',()=>{
 it('suppresses no-consent and channel-unavailable contacts',()=>{const c=clean();c.marketing_consent_by_channel.EMAIL=false;expect(evaluateEligibility(c,v).reasons).toContain('NO_CHANNEL_CONSENT');expect(evaluateEligibility(c,v).status).toBe('suppressed');c.marketing_consent_by_channel.EMAIL=true;c.eligible_email=false;expect(evaluateEligibility(c,v).status).toBe('suppressed');});
 it('global opt-out overrides HQ and purchase routes to education',()=>{const c=clean();c.suppression_flags=['global_opt_out'];expect(evaluateEligibility(c,{...v,hq_mandatory:true}).status).toBe('suppressed');c.suppression_flags=['recent_luna_purchase'];const r=evaluateEligibility(c,v);expect(r.status).toBe('suppressed');expect(r.onboarding).toBe(true);});
 it('caps email at 2 in 7d, WhatsApp at 1 in 14d and global at 3 in 7d',()=>{const c=clean();c.recent_contact_timestamps=[{channel:'EMAIL',timestamp:NOW},{channel:'EMAIL',timestamp:NOW}];expect(evaluateEligibility(c,v).reasons).toContain('CHANNEL_FREQUENCY_CAP');c.recent_contact_timestamps=[{channel:'WHATSAPP',timestamp:'2026-10-19T12:00:00Z'}];expect(evaluateEligibility(c,{...v,channel:'WHATSAPP'}).status).toBe('suppressed');c.recent_contact_timestamps=Array.from({length:3},()=>({channel:'MEMBERS_CARD' as const,timestamp:NOW}));expect(evaluateEligibility(c,v).reasons).toContain('GLOBAL_FREQUENCY_CAP');});
 it('surfaces an HQ conflict instead of silently cancelling',()=>{const c=clean();c.recent_contact_timestamps=Array.from({length:3},()=>({channel:'EMAIL' as const,timestamp:NOW}));const r=evaluateEligibility(c,{...v,hq_mandatory:true});expect(r.status).toBe('needs_review');expect(r.reasons.join()).toContain('HQ_PLAYBOOK_CONFLICT');});
 it('excludes old and future history and never changes consent',()=>{const c=clean();c.recent_contact_timestamps=Array.from({length:8},()=>({channel:'EMAIL' as const,timestamp:'2026-12-01T12:00:00Z'}));expect(evaluateEligibility(c,v).status).toBe('candidate');expect(c.marketing_consent_by_channel.EMAIL).toBe(true);});
});
describe('Preflight failures and approval barriers',()=>{
 const cases:[Fault,string][]=[['disclaimer','MISSING_DISCLAIMER'],['landing','CTA_LANDING_MISMATCH'],['length','COPY_OVER_LIMIT'],['consent','NO_CHANNEL_CONSENT'],['rewards','REWARDS_UNAPPROVED'],['duplicate','DUPLICATE_ID'],['naming','INVALID_NAMING'],['expiry','PROMO_VALIDITY_MISSING']];
 for(const [fault,code] of cases)it(`detects ${fault}`,()=>{expect(runPreflightQA(applyFaults(v,[fault]),{faults:[fault]}).some(i=>i.code===code)).toBe(true);});
 it('keeps clear space pending and sound not applicable',()=>{const q=runPreflightQA(v);expect(q.find(i=>i.code==='LOGO_CLEAR_SPACE_NOT_VERIFIED')?.status).toBe('needs_review');expect(q.find(i=>i.code==='AUDIO')?.status).toBe('not_applicable');expect(q.some(i=>i.code==='LEGAL_AND_CAMPAIGN_APPROVAL_PENDING')).toBe(true);});
 it('detects expired promotions',()=>expect(runPreflightQA({...v,promo_valid_until:'2025-01-01T00:00:00Z'}).some(i=>i.code==='PROMO_EXPIRED')).toBe(true));
});
describe('Safe, complete handoff',()=>{
 it('exports 100 rows including suppressed instances with labels',()=>{const csv=toCSV(variants);expect(csv.split('\r\n')).toHaveLength(101);expect(csv).toContain('SYNTHETIC / ILLUSTRATIVE');expect(csv).toContain('PENDING BRAND VALIDATION');expect(exportBundle(variants,customers,insights)['variants.json']).toHaveLength(100);});
 it('rejects incomplete or schema-invalid exports',()=>{expect(()=>exportBundle(variants.slice(0,99),customers,insights)).toThrow();expect(()=>exportBundle(variants,customers.slice(0,2),insights)).toThrow();});
 it('protects spreadsheet formula cells',()=>expect(toCSV([{...v,copy:{...v.copy,subject:'=HYPERLINK("evil")'}}])).toContain("'=HYPERLINK"));
 it('escapes injected HTML and keeps all destinations local',()=>{const html=renderEmail({...v,copy:{...v.copy,hero_title:'<script>alert(1)</script>'}});expect(html).not.toContain('<script>');expect(html).toContain('&lt;script&gt;');for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g))expect(m[1]).toMatch(/^\/(mock\/landing|assets)\//);expect(html).not.toMatch(/safelinks|tracking|coupon/i);});
});
