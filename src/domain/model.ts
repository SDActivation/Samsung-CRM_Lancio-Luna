import { z } from 'zod';
export const CHANNELS = ['EMAIL','PUSH','WHATSAPP','MEMBERS_CARD'] as const;
export const STAGES = ['PRE_TEASER','TEASER','PRE_ORDER','LAUNCH','SUSTAIN'] as const;
export const SEGMENTS = ['S1','S2','S3','S4','S5'] as const;
export type Channel = typeof CHANNELS[number];
export type Stage = typeof STAGES[number];
export type Segment = typeof SEGMENTS[number];
export const CustomerSchema = z.object({
 customer_id:z.string().regex(/^sim_\d{6}$/),segment_id:z.string(),primary_segment_id:z.string(),memberships:z.array(z.enum(SEGMENTS)),
 eligible_email:z.boolean(),eligible_push:z.boolean(),eligible_whatsapp:z.boolean(),eligible_members:z.boolean(),eligible_smartthings:z.boolean(),
 marketing_consent_by_channel:z.record(z.string(),z.boolean()),rewards_tier:z.enum(['none','silver','gold']),points_band:z.enum(['low','medium','high']),owned_categories:z.array(z.string()),device_age_months:z.number(),smartthings_activity_band:z.enum(['low','medium','high']),members_activity_band:z.enum(['low','medium','high']),engagement_score:z.number(),purchase_recency_days:z.number(),rfm_score:z.number(),premium_propensity:z.number(),luna_interest_signal:z.number(),novelty_interest:z.boolean(),household_use_hypothesis:z.boolean(),preferred_channel:z.enum(CHANNELS),locale:z.literal('en-GB'),recent_contact_timestamps:z.array(z.object({channel:z.enum(CHANNELS),timestamp:z.string()})),suppression_flags:z.array(z.string()),journey_stage:z.enum(STAGES),last_action:z.string(),synthetic:z.literal(true)
});
export type Customer = z.infer<typeof CustomerSchema>;
export type Issue = {code:string;severity:'error'|'warning'|'info';status:'pass'|'fail'|'needs_review'|'not_applicable';source_id:string;message:string;remediation:string};
export const CopySchema = z.object({subject:z.string().min(1),preheader:z.string().min(1),hero_title:z.string().min(1),body:z.string().min(1),cta:z.string().min(1)});
export const VariantSchema = z.object({variant_id:z.string(),campaign_id:z.literal('LUNA_DEMO_2026'),synthetic:z.literal(true),segment_id:z.enum(SEGMENTS),stage:z.enum(STAGES),channel:z.enum(CHANNELS),customer_example_id:z.string(),insight_ids:z.array(z.string()).min(1),objective:z.string(),rationale:z.string(),content_blocks:z.array(z.string()),copy:CopySchema,visual_asset_id:z.string(),landing_ref:z.string(),rewards_policy:z.enum(['none','tier_eligible','points_offer_pending_approval']),template_id:z.string(),brand_snapshot_version:z.literal('1.1'),brand_rule_ids:z.array(z.string()),production_approved:z.literal(false),eligibility:z.enum(['candidate','suppressed','needs_review']),eligibility_reasons:z.array(z.string()),qa_status:z.enum(['pass','fail','needs_review']),qa_issues:z.array(z.string()),version:z.number(),disclaimer:z.string(),promo_valid_until:z.string().nullable(),hq_mandatory:z.boolean(),push_surface:z.enum(['Members','Shop']).nullable()});
export type Variant = z.infer<typeof VariantSchema>;
export type Insight = {insight_id:string;segment_id:Segment;metric:string;synthetic_value:number;baseline:number;interpretation:string;action:string;confidence_label:'illustrative';provenance:'simulated_CRM'|'market_hypothesis';assumptions:string};
export const SEED = 20261029;
export const NOW = '2026-10-29T12:00:00.000Z';
