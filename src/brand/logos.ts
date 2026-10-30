import black from './logo-manifest.json';
import white from './logo-white-manifest.json';
import { logoDataUri, whiteLogoDataUri } from './logo-data';
export const logoAssets=[black,white];
export const logoForBackground=(background:'black'|'white')=>background==='black'?white:black;
export const logoUri=(id:string)=>id===white.asset_id?whiteLogoDataUri:id===black.asset_id?logoDataUri:null;
export const logoById=(id:string|null)=>logoAssets.find(l=>l.asset_id===id)??null;
