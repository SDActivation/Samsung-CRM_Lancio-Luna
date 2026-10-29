import { NOW, type Customer, type Issue, type Variant } from '../domain/model';
import { copyLimits, journeyRules } from '../domain/config';
import { assetManifest, brandRules } from '../brand/registry';
export const faultLabels={disclaimer:'Missing disclaimer',landing:'CTA / landing mismatch',length:'Copy over limit',consent:'Channel without consent',rewards:'Unapproved Rewards offer',duplicate:'Duplicate creative ID',naming:'Invalid naming',expiry:'Promotion without validity'};
export type Fault=keyof typeof faultLabels;
export function applyFaults(variant:Variant,faults:Fault[]):Variant{const v=structuredClone(variant);if(faults.includes('disclaimer'))v.disclaimer='';if(faults.includes('landing'))v.landing_ref='/mock/landing/luna/wrong';if(faults.includes('length'))v.copy.body='Long copy. '.repeat(150);if(faults.includes('rewards')||faults.includes('expiry'))v.rewards_policy='points_offer_pending_approval';if(faults.includes('naming'))v.variant_id='untracked-draft';return v;}
export function runPreflightQA(v:Variant,options:{customer?:Customer;all?:Variant[];faults?:Fault[];rules?:typeof brandRules}={}):Issue[]{const issues:Issue[]=[];
 const add=(code:string,status:Issue['status'],message:string,remediation:string,source_id='DEMO_POLICY')=>issues.push({code,status,severity:status==='fail'?'error':status==='needs_review'?'warning':'info',source_id,message,remediation});
 if(!/^LUNA-S[1-5]-(PRE_TEASER|TEASER|PRE_ORDER|LAUNCH|SUSTAIN)-(EMAIL|PUSH|WHATSAPP|MEMBERS_CARD)$/.test(v.variant_id))add('INVALID_NAMING','fail','Creative ID does not match the deterministic naming convention.','Restore the generated creative ID.');
 if(options.all?.filter(x=>x.variant_id===v.variant_id).length!>1||options.faults?.includes('duplicate'))add('DUPLICATE_ID','fail','A creative ID occurs more than once.','Regenerate the matrix and remove the duplicate.');
 if(!v.disclaimer)add('MISSING_DISCLAIMER','fail','The required synthetic / legal disclaimer is missing.','Restore the legal placeholder and send it for legal review.');
 if(v.landing_ref!==`/mock/landing/luna/${journeyRules[v.stage].landing_type}`)add('CTA_LANDING_MISMATCH','fail','CTA intent and landing registry do not match.','Use the registered landing for this phase.');
 if(v.copy.body.length>copyLimits[v.channel].body||v.copy.hero_title.length>copyLimits[v.channel].title)add('COPY_OVER_LIMIT','fail','Copy exceeds the illustrative channel limit.','Shorten copy; technical limits still need channel-owner validation.');
 if(options.faults?.includes('consent')||(options.customer&&!options.customer.marketing_consent_by_channel[v.channel]))add('NO_CHANNEL_CONSENT','fail','The selected customer has no consent for this channel.','Suppress this contact. Re-evaluate consent before any fallback.');
 if(v.rewards_policy==='points_offer_pending_approval'){add('REWARDS_UNAPPROVED','needs_review','A proposed Rewards offer has no approved terms.','Remove the offer or obtain approved terms and eligibility.');if(!v.promo_valid_until)add('PROMO_VALIDITY_MISSING','fail','The proposed promotion has no validity window.','Remove the promotion or define an approved validity window.');}
 if(v.promo_valid_until&&Date.parse(v.promo_valid_until)<Date.parse(NOW))add('PROMO_EXPIRED','fail','The proposed promotion has expired.','Suppress the promotion and request approved replacement.');
 if(!assetManifest.some(a=>a.asset_id===v.visual_asset_id))add('UNKNOWN_ASSET','fail','Asset is not in the local registry.','Choose a registered local placeholder.');
 add('CONTENT_SCHEMA','pass','Required copy fields and route are present.','Validate again after edits.');
 const clear=(options.rules??brandRules).find(r=>r.id==='LOGO_CLEAR_SPACE_RATIO');
 if(clear?.value===null||!clear)add('LOGO_CLEAR_SPACE_NOT_VERIFIED','needs_review','Numeric lettermark clear space is unverified.','Obtain a readable authorized guide and logo asset.','LETTERMARK_GUIDE_2026');
 add('FONT_FALLBACK_ACTIVE','needs_review','Arial is active; authorized Samsung fonts were not supplied.','Provide licensed local font files.','DEM_B2C_01');
 add('CREATIVE_ASSET_PENDING_APPROVAL','needs_review','Neutral placeholders are not approved Luna assets.','Replace with an authorized asset pack and review crops.','DEMO_POLICY');
 add('LEGAL_AND_CAMPAIGN_APPROVAL_PENDING','needs_review','Legal, product claims and final campaign approval are pending.','Complete brand, legal and creative review.','DEMO_POLICY');
 add('TONE_HUMAN_REVIEW','needs_review','Tone checks require human editorial review.','Review English copy against the approved launch brief.','BRAND_STORY');
 add('AUDIO','not_applicable','Static, silent communication.','No audio action required.','BRAND_SOUND');return issues;}
export function qaStatus(issues:Issue[]):Variant['qa_status']{return issues.some(i=>i.status==='fail')?'fail':issues.some(i=>i.status==='needs_review')?'needs_review':'pass';}
