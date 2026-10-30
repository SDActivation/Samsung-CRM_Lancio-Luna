import registry from './visual-manifest.json';
import type { Profile, Variant, Microcluster } from '../v2/model';
export const visuals=registry;
export type VisualWorld='living_design'|'music'|'kitchen'|'smart_work';
export const familyId='LUNA_LAUNCH_KV',canonicalProductId='LUNA_PRODUCT_APPEARANCE_V001';
export function assetById(id:string){return visuals.find(a=>a.asset_id===id)||(id==='LUNA_LAUNCH_KV_ARTWORK_V001'||id==='luna_concept_asset_pending'?visuals[0]:null);}
export function visualForVariant(v:Pick<Variant,'visual_asset_id'>){return assetById(v.visual_asset_id);}
export function resolveVisual(mc:Microcluster,p:Profile){const d=p.dimensions.D11;const pref=d?.value&&typeof d.value==='object'?d.value as Record<string,unknown>:{};const declaredWork=pref.home_work_interest===true&&/declared/.test(d.provenance);let world:VisualWorld='living_design',reason='Neutral living/design fallback declared: no stronger usable scene signal.';let rule='VISUAL_NEUTRAL_FALLBACK_2.4';
 if(mc.microcluster_id==='MC043'&&declaredWork){world='smart_work';reason='MC043 plus explicitly declared home-working preference in D11; no B2B or productivity capability inferred.';rule='VISUAL_HOME_WORK_DECLARED_2.4';}
 else if(mc.family_id==='F03'){world='music';reason=`${mc.microcluster_id} music/audio need from source family F03; contextual scene only.`;rule='VISUAL_MUSIC_NEED_2.4';}
 else if(mc.family_id==='F04'||pref.cooking_frequency==='frequent'||Array.isArray(pref.declared_preferences)&&pref.declared_preferences.includes('MC037')){world='kitchen';reason=`${mc.microcluster_id}: cooking need or explicit declared cooking signal; no ingredient scanning implied.`;rule='VISUAL_COOKING_NEED_2.4';}
 else if(mc.family_id==='F05'){reason=`${mc.microcluster_id} design need; living/design scene. MC043 alone never establishes home-working preference.`;rule='VISUAL_DESIGN_NEED_2.4';}
 const asset=visuals.find(a=>a.visual_world_id===world);return {world,asset,visual_selection_rule_id:rule,selected_visual_reason:reason};}
export const languagePolicy={version:'copy-it-2.4.1',ui_locale:'en',campaign_locale:'it-IT',hero_locale:'en',font_status:'Arial fallback — authorized Samsung font files unavailable',ui_theme_version:'samsung-bw-2.4.1'};
export const customerDisclaimer='Demo RFP — lancio commerciale simulato. Nessun messaggio inviato. Proposta soggetta a revisione creativa, prodotto, brand e legale.';
export const visualDisclaimer='Visual di concept generato con AI — proposta RFP, non campagna ufficiale Samsung';
