import { CHANNELS, SEGMENTS, STAGES, VariantSchema, type Customer, type Insight, type Variant } from '../domain/model';
import { journeyRules, segmentDefinitions } from '../domain/config';
import { resolveContentBlocks } from '../content/blocks';
import { evaluateEligibility } from './policy';
import { qaStatus, runPreflightQA } from './qa';
export function buildVariantMatrix(customers:Customer[],insights:Insight[]):Variant[]{return SEGMENTS.flatMap(segment=>STAGES.flatMap(stage=>CHANNELS.map(channel=>{
 const customer=customers.find(c=>c.segment_id===segment);
 if(!customer)throw new Error(`No synthetic example for ${segment}`);
 const rule=journeyRules[stage],content=resolveContentBlocks({segment,stage,channel});
 const v:Variant={variant_id:`LUNA-${segment}-${stage}-${channel}`,campaign_id:'LUNA_DEMO_2026',synthetic:true,segment_id:segment,stage,channel,customer_example_id:customer.customer_id,insight_ids:insights.filter(i=>i.segment_id===segment).map(i=>i.insight_id),objective:rule.objective,rationale:`${segmentDefinitions[segment].signal} → ${rule.message_angle}. ${segmentDefinitions[segment].rule}. Illustrative simulator evidence; not real customer behavior.`,content_blocks:content.blocks,copy:content.copy,visual_asset_id:`placeholder_${segment.toLowerCase()}_01`,landing_ref:`/mock/landing/luna/${rule.landing_type}`,rewards_policy:segment==='S5'&&['LAUNCH','SUSTAIN'].includes(stage)?'tier_eligible':'none',template_id:channel==='EMAIL'?'dem_b2c_dark_v1':`${channel.toLowerCase()}_v1`,brand_snapshot_version:'1.1',brand_rule_ids:['BRAND_COLOR_BLUE','DEM_CONTENT_WIDTH','LOGO_CLEAR_SPACE_RATIO','FONT_FALLBACK'],production_approved:false,eligibility:'candidate',eligibility_reasons:[],qa_status:'needs_review',qa_issues:[],version:1,disclaimer:'SYNTHETIC / ILLUSTRATIVE — Luna concept only. Product details, legal terms and brand approval pending. No message will be sent.',promo_valid_until:null,hq_mandatory:['PRE_TEASER','LAUNCH'].includes(stage),push_surface:channel==='PUSH'?(customer.members_activity_band==='high'?'Members':'Shop'):null};
 const eligibility=evaluateEligibility(customer,v);v.eligibility=eligibility.status;v.eligibility_reasons=eligibility.reasons;
 const qa=runPreflightQA(v,{customer});v.qa_status=qaStatus(qa);v.qa_issues=qa.filter(q=>q.status==='fail'||q.status==='needs_review').map(q=>q.code);return VariantSchema.parse(v);
 })));}
