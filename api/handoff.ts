import { IntegrationRequest } from '../src/integrations/contracts';
import { getCapabilities } from '../src/integrations/capabilities';
import { MockAdapter } from '../server/connectors/adapters';
const headers={'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers});
export async function GET(){return json({default_mode:'mock',application_login:false,external_writes_enabled:false,destinations:[getCapabilities('stensul'),getCapabilities('marketing_operations')]});}
export async function POST(request:Request){
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return json({error:'ORIGIN_NOT_ALLOWED'},403);
 if(!request.headers.get('content-type')?.startsWith('application/json'))return json({error:'JSON_REQUIRED'},415);
 const text=await request.text();if(new TextEncoder().encode(text).byteLength>2_000_000)return json({error:'PAYLOAD_TOO_LARGE'},413);
 let raw:unknown;try{raw=JSON.parse(text);}catch{return json({error:'INVALID_JSON'},400);}
 const parsed=IntegrationRequest.safeParse(raw);if(!parsed.success)return json({error:'INVALID_HANDOFF_REQUEST',issues:parsed.error.issues.map(i=>({path:i.path.join('.'),message:i.message}))},400);
 const input=parsed.data;
 if(input.mode==='live_draft')return json({error:'LIVE_CONNECTOR_NOT_CONFIGURED',message:'External writes are disabled. No tenant, credential, verified import contract or authorized live workspace is configured.',external_writes_enabled:false},409);
 try{const adapter=new MockAdapter(input.destination);const handoff=await adapter.prepareHandoff(input);
 if(input.action==='validate')return json({validation:handoff.validation,package_summary:{handoff_id:handoff.handoff_id,items:handoff.items.length,checksum:handoff.package_checksum},connection:adapter.getVerifiedCapabilities()});
 if(input.action==='prepare')return json({handoff});
 if(!input.operator_confirmed)return json({error:'OPERATOR_CONFIRMATION_REQUIRED'},400);
 const receipt=await adapter.transferDraft(input);return json({handoff,receipt},handoff.validation.valid?200:422);
 }catch{console.error('Mock handoff failed; no external request was made.');return json({error:'HANDOFF_FAILED',message:'The local simulation could not be completed. No external request occurred.'},500);}
}
export default {async fetch(request:Request){if(request.method==='GET')return GET();if(request.method==='POST')return POST(request);return new Response('Method not allowed',{status:405,headers:{Allow:'GET, POST','Cache-Control':'no-store'}});}};
