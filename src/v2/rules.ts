import { CLOCK, defaultPolicy, type Microcluster, type Profile, type Match, type Touchpoint, type Policy, type Variant } from './model';
export type Evaluation={result:Match;reason:string};
const result=(value:boolean|null|undefined,yes:string,no:string):Evaluation=>value==null?{result:'unknown',reason:'Required evidence is unknown, unavailable or not permitted.'}:value?{result:'match',reason:yes}:{result:'no_match',reason:no};
export function evaluateMembership(p:Profile,mc:Microcluster,policy:Policy=defaultPolicy):Evaluation{const id=mc.microcluster_id;const curated=p.curated_matches.includes(id);
 if(id==='MC060'){if(p.identity_status!=='anonymous')return {result:'no_match',reason:'Identity is known; not the anonymous prospect definition.'};return curated?{result:'match',reason:'Anonymous high-interest curated fixture; contextual acquisition only.'}:{result:'unknown',reason:'Anonymous identity alone does not establish the declared high-propensity fixture.'};}
 if(id==='MC061')return result(p.purchase_age_days==null?null:p.purchase_age_days<=30&&p.relationship_state==='first_time','New customer within the source-deck 30-day window.','Not a first-time customer in the last 30 days.');
 if(id==='MC069')return result(p.support_requested,'Support request exists; respect the expressed request and preferences.','No relevant support request.');
 if(id==='MC070')return result(p.purchase_at!==null,'Luna purchase recorded; delivery and setup remain separate.','No Luna purchase recorded.');
 if(id==='MC094')return result(p.purchase_at?false:p.cart_valid==null||p.cart_abandoned==null?null:p.cart_valid&&p.cart_abandoned,'Valid abandoned mock cart, no later purchase.','Cart is invalid, not abandoned, or purchase has stopped recovery.');
 if(id==='MC098')return result(p.purchase_at?p.setup_complete:false,'Purchase and completed setup recorded; regular use is an additional signal.','Purchase and setup are not both complete.');
 if(id==='MC099'){if(p.usage_observation_status!=='known'||policy.no_usage_days==null)return {result:'unknown',reason:'Lawful observed usage and an explicit inactivity window are required. Missing telemetry is not inactivity.'};return result(p.purchase_at?p.no_usage_observed:false,`No use observed during a configured illustrative ${policy.no_usage_days}-day window. Assistance only.`, 'No qualifying observed inactivity.');}
 if(id==='MC100')return result(curated,'Curated weak-signal research fixture; no automatic commercial pressure.','No research audience evidence.');
 if(mc.family_id==='F09'&&p.audience_type!=='B2B')return {result:'no_match',reason:'Business definitions require a separate business contact and account.'};
 if(p.purchase_at&&mc.family_id==='F06')return {result:'no_match',reason:'An existing Luna purchaser is not a no-purchase acquisition prospect.'};
 return curated?{result:'match',reason:'Membership explicitly declared in a curated synthetic fixture; not a calibrated CRM rule.'}:{result:'unknown',reason:'No matching declared fixture or approved quantitative threshold. No match is inferred.'};
}
export function resolveTouchpoint(mc:Microcluster,resolution:Touchpoint|null=null):{touchpoint:Touchpoint|null;reason:string;origin:string}{const l=mc.source_channel_label.toLowerCase();
 if(l.startsWith('landing'))return {touchpoint:'LANDING_PAGE',reason:'Contextual landing in source deck.',origin:'provided_deck'};
 if(l.includes('appropriate service')||l.includes(' or ')||l.startsWith('push →')||l.includes('members/app'))return {touchpoint:resolution,reason:resolution?'Explicit demo mapping; channel still requires permission.':'Source surface is ambiguous; needs_channel_resolution.',origin:'implementation_proposal'};
 const touchpoint:Touchpoint=l.includes('members push')?'PUSH_MEMBERS':l.includes('samsung shop')&&l.includes('push')?'PUSH_SHOP':l.includes('samsung.com banner')?'WEB_BANNER':l.includes('samsung rewards + members')||l==='samsung members'?'MEMBERS_CONTENT':'EMAIL';
 return {touchpoint,reason:'Normalized from original source channel label; purchase-channel affinity remains separate.',origin:'provided_deck'};
}
export type Eligibility={status:Variant['activation_eligibility'];reasons:string[]};
export function evaluateEligibility(p:Profile,v:Pick<Variant,'touchpoint'|'microcluster_ids'|'journey_stage'|'campaign_phase'|'audience_type'>,policy:Policy=defaultPolicy):Eligibility{const reasons:string[]=[];const personal=!['WEB_BANNER','LANDING_PAGE'].includes(v.touchpoint);
 if(v.audience_type==='B2B'&&(p.audience_type!=='B2B'||!p.account_id))return {status:'suppressed',reasons:['B2B_ACCOUNT_REQUIRED: account and consumer profiles cannot be interchanged.']};
 if(personal&&p.identity_status==='anonymous')return {status:'suppressed',reasons:['ANONYMOUS_PERSONAL_CONTACT: contextual landing only until identification and lawful permission.']};
 if(p.global_opt_out&&personal)return {status:'suppressed',reasons:['GLOBAL_OPT_OUT']};
 const permission=p.permissions[v.touchpoint];if(permission===false)return {status:'suppressed',reasons:['NO_SURFACE_PERMISSION: no automatic channel fallback.']};if(permission==null)return {status:'needs_input',reasons:['SURFACE_PERMISSION_UNKNOWN']};
 if(v.microcluster_ids.includes('MC094')&&(p.purchase_at||p.cart_valid!==true||p.cart_abandoned!==true))return {status:p.cart_valid==null?'needs_input':'suppressed',reasons:['CART_RECOVERY_STOPPED: requires a valid abandoned cart and no later purchase.']};
 if(p.purchase_at&&['DISCOVER','CONSIDER','CONVERT'].includes(v.journey_stage))return {status:'suppressed',reasons:['POST_PURCHASE_ACQUISITION_SUPPRESSION: route to delivery / setup context; do not assume either is complete.']};
 if(v.microcluster_ids.includes('MC075')&&p.marketplace_data_status==='unavailable')return {status:'needs_input',reasons:['MARKETPLACE_EVIDENCE_UNAVAILABLE: no third-party shopper data invented.']};
 if(v.microcluster_ids.some(id=>['MC077','MC080','MC066'].includes(id)))return {status:'needs_input',reasons:['OFFER_TERMS_UNDEFINED: no finance, trade-in or incentive terms supplied.']};
 if(v.microcluster_ids.includes('MC100')&&v.journey_stage==='CONVERT')return {status:'suppressed',reasons:['EXPERIMENTAL_AUDIENCE_RESEARCH_ONLY']};
 const now=Date.parse(CLOCK);const recent=p.contact_history.filter(h=>now-Date.parse(h.at)<7*86400000&&Date.parse(h.at)<=now);const same=p.contact_history.filter(h=>h.touchpoint===v.touchpoint&&now-Date.parse(h.at)<(v.touchpoint==='WHATSAPP'?14:7)*86400000&&Date.parse(h.at)<=now);
 const cap=v.touchpoint==='EMAIL'?policy.email:v.touchpoint.startsWith('PUSH')?policy.push:v.touchpoint==='WHATSAPP'?policy.whatsapp:Infinity;
 if(personal&&(recent.length>=policy.global||same.length>=cap)){reasons.push('ILLUSTRATIVE_FREQUENCY_CAP');if(['PRE_TEASER','LAUNCH'].includes(v.campaign_phase)&&!policy.hq_priority_defined)return {status:'needs_resolution',reasons:[...reasons,'HQ_CONFLICT: priority unresolved; do not silently cancel HQ or override opt-out.']};return {status:'suppressed',reasons};}
 return {status:'candidate',reasons:[personal?'Identity and this surface’s permission verified in the synthetic fixture.':'Contextual surface only; no personal contact authorized.','Campaign approval is separate from activation eligibility.']};
}
export const resolvedRules=(catalogue:readonly Microcluster[])=>catalogue.map(mc=>({microcluster_id:mc.microcluster_id,source_slide:mc.source_slide,membership_origin:mc.microcluster_id==='MC061'?'provided_deck_30_days':'curated_demo_fixture_or_explicit_evidence',numeric_threshold:mc.microcluster_id==='MC061'?30:null,threshold_approval:mc.microcluster_id==='MC061'?'source_deck':'not_specified',...resolveTouchpoint(mc),mapping_origin:'implementation_proposal',approval_status:'needs_review'}));
