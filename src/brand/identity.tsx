import logo from './logo-manifest.json';
export { logo };
export const TOOL_NAME='Samsung CRM Activation Studio';
export const PRODUCT_NAME='Luna';
export function BrandLogo({compact=false}:{compact?:boolean}){return <span className={`samsung-logo-mat ${compact?'compact':''}`}><img src={logo.file} width={compact?100:138} alt="Samsung"/></span>;}
