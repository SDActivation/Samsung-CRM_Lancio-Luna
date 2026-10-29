export const brandSources=[
 {source_id:'BRAND_LOGO',title:'Samsung Logo',url:'https://www.samsung.com/us/about-us/brand-identity/logo/',status:'Official page rechecked; original white logo asset downloaded from specified Samsung sample source. Campaign approval pending'},
 {source_id:'BRAND_COLOR_TYPE',title:'Samsung Color & Typography',url:'https://www.samsung.com/us/about-us/brand-identity/color-and-typo/',status:'Public guidance documented in supplied specification; fonts not supplied'},
 {source_id:'BRAND_STORY',title:'Samsung Brand Story',url:'https://www.samsung.com/us/about-us/brand-identity/brand-story/',status:'Public tone principles; human copy review required'},
 {source_id:'BRAND_SOUND',title:'Samsung Sound',url:'https://www.samsung.com/us/about-us/brand-identity/sound/',status:'Not applicable to static demo'},
 {source_id:'DEM_B2C_01',title:'B2C sample observations',url:null,status:'Layout reconstructed from section 5.3; original HTML not present in supplied folder'},
 {source_id:'LETTERMARK_GUIDE_2026',title:'2026 Lettermark Guidebook',url:null,status:'Not supplied / password-protected reference; numeric rules unverified'},
 {source_id:'FIGMA_B2B_2025',title:'B2B prototype reference',url:null,status:'Not inspected; no B2C tokens inferred'},
 {source_id:'DEMO_POLICY',title:'Illustrative implementation policy',url:null,status:'Local demo choice; requires HQ validation'}
];
export const brandRules=[
 {id:'BRAND_COLOR_BLUE',value:'#1428A0',source_id:'BRAND_LOGO',source_locator:'Lettermark colours',evidence_type:'official_public',scope:'Lettermark only',approval_status:'public_rule_documented'},
 {id:'DEM_CANVAS_WIDTH',value:660,source_id:'DEM_B2C_01',source_locator:'Specification section 5.3 canvas',evidence_type:'observed_sample',scope:'dem_b2c_dark_v1 desktop',approval_status:'observed'},
 {id:'DEM_CONTENT_WIDTH',value:640,source_id:'DEM_B2C_01',source_locator:'Specification section 5.3 content',evidence_type:'observed_sample',scope:'dem_b2c_dark_v1 desktop',approval_status:'observed'},
 {id:'LOGO_CLEAR_SPACE_RATIO',value:null,source_id:'LETTERMARK_GUIDE_2026',source_locator:'Unread manual',evidence_type:'pending',scope:'Lettermark',approval_status:'needs_review'},
 {id:'LOGO_MIN_WIDTH',value:null,source_id:'LETTERMARK_GUIDE_2026',source_locator:'Unread manual',evidence_type:'pending',scope:'Lettermark',approval_status:'needs_review'},
 {id:'FONT_FALLBACK',value:'Arial, sans-serif',source_id:'DEMO_POLICY',source_locator:'Authorized font files not supplied',evidence_type:'implementation_choice',scope:'All previews',approval_status:'needs_review'},
 {id:'TONE_REVIEW',value:'Human review required',source_id:'BRAND_STORY',source_locator:'The art of expression',evidence_type:'official_public',scope:'Copy',approval_status:'needs_review'}
];
export const templateTokens={version:'2.1',template_id:'dem_b2c_dark_v1',canvas_width:660,content_width:640,background:'#000000',text:'#ffffff',accent:'#CCCEED',headline:'24px / 30px Arial',secondary:'18px / 24px Arial',body:'14px / 20px Arial',cta_width:270,cta_radius:30,logo_observed_width:205,logo_clear_space_ratio:null,logo_min_width_px:null,font_fallback_active:true,source_id:'DEM_B2C_01',evidence_type:'observed_sample',responsive:'Implementation choice; 320/375/390 px QA targets'};
