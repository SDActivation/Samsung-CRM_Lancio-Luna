import logo from './logo-manifest.json';
import white from './logo-white-manifest.json';
export { logo };
export const TOOL_NAME='Samsung CRM Activation Studio';
export const PRODUCT_NAME='Luna';
export function BrandLogo({compact=false,inverse=false}:{compact?:boolean;inverse?:boolean}){return <span className={`samsung-logo-mat ${compact?'compact':''}`}><img src={inverse?white.file:logo.file} width={compact?100:138} alt="Samsung"/></span>;}
