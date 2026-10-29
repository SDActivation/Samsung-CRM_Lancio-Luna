import { NOW, type Channel, type Customer, type Variant } from '../domain/model';
import { defaultPolicy, type ContactPolicy } from '../domain/config';
export type Eligibility={status:'candidate'|'suppressed'|'needs_review';reasons:string[];onboarding:boolean};
export function evaluateEligibility(customer:Customer,variant:Pick<Variant,'channel'|'hq_mandatory'>,history=customer.recent_contact_timestamps,policy:ContactPolicy=defaultPolicy,at=NOW):Eligibility{
 const channel=variant.channel;const reasons:string[]=[];
 if(customer.suppression_flags.includes('global_opt_out'))reasons.push('GLOBAL_OPT_OUT');
 if(!customer.marketing_consent_by_channel[channel])reasons.push('NO_CHANNEL_CONSENT');
 const available:Record<Channel,boolean>={EMAIL:customer.eligible_email,PUSH:customer.eligible_push,WHATSAPP:customer.eligible_whatsapp,MEMBERS_CARD:customer.eligible_members};
 if(!available[channel])reasons.push('CHANNEL_UNAVAILABLE');
 const purchased=customer.suppression_flags.includes('recent_luna_purchase');if(purchased)reasons.push('RECENT_LUNA_PURCHASE: route to consent-checked onboarding / education');
 const now=Date.parse(at);const recent=(days:number,c?:Channel)=>history.filter(h=>(!c||h.channel===c)&&Date.parse(h.timestamp)<=now&&Date.parse(h.timestamp)>now-days*86400000).length;
 const cap=channel==='EMAIL'?policy.email:channel==='PUSH'?policy.push:channel==='WHATSAPP'?policy.whatsapp:Infinity;
 const channelCap=recent(channel==='WHATSAPP'?14:7,channel)>=cap;const globalCap=recent(7)>=policy.global;
 if(channelCap)reasons.push('CHANNEL_FREQUENCY_CAP');if(globalCap)reasons.push('GLOBAL_FREQUENCY_CAP');
 const hard=reasons.some(x=>/OPT_OUT|CONSENT|UNAVAILABLE|PURCHASE/.test(x));
 if(hard)return {status:'suppressed',reasons,onboarding:purchased};
 if((channelCap||globalCap)&&variant.hq_mandatory)return {status:'needs_review',reasons:[...reasons,'HQ_PLAYBOOK_CONFLICT: resolve with HQ; no silent cancellation'],onboarding:false};
 return {status:reasons.length?'suppressed':'candidate',reasons:reasons.length?reasons:['Channel consent and illustrative contact caps satisfied; campaign approval still required'],onboarding:false};
}
