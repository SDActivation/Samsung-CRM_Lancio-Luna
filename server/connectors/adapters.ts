import { preparePackage, sha256 } from '../../src/integrations/package';
import { getCapabilities } from '../../src/integrations/capabilities';
import type { Destination, HandoffRequest, MarketingOpsAdapter, TransferReceipt, ReceiptItem } from '../../src/integrations/contracts';
export class MockAdapter implements MarketingOpsAdapter{
 constructor(private readonly destination:Destination){}
 getVerifiedCapabilities(){return getCapabilities(this.destination,'mock');}
 async validateHandoff(request:HandoffRequest){return (await preparePackage(request)).validation;}
 async prepareHandoff(request:HandoffRequest){return preparePackage(request);}
 async readReceipt(_id:string):Promise<TransferReceipt|null>{return null;}
 async transferDraft(request:HandoffRequest):Promise<TransferReceipt>{const prepared=await this.prepareHandoff(request);const blocked=!prepared.validation.valid||!request.operator_confirmed;const manual=request.mode==='manual_handoff';
 const items:ReceiptItem[]=prepared.items.map((item,index)=>{let state:ReceiptItem['state']=blocked?'blocked_validation':manual?'package_exported':'simulated';let warning:string|null=null,retry_allowed=false;
 if(!blocked&&!manual){if(request.scenario==='partial_failure'&&index%2===1){state='failed';warning='Simulated item failure. No provider request occurred.';retry_allowed=true;}
 if(request.scenario==='timeout'&&index===prepared.items.length-1){state='outcome_unknown';warning='Simulated timeout: reconcile outcome before any retry. Never resubmit an unknown live outcome automatically.';}
 if(request.scenario==='rate_limit'){state='failed';warning='Simulated rate limit. A future live adapter must respect documented Retry-After and retry bounds.';retry_allowed=true;}
 if(request.scenario==='permission_denied'){state='failed';warning='Simulated authorization failure. Stop the batch and verify authorized permissions.';}}
 return {variant_id:item.variant_id,version:item.version,idempotency_key:item.idempotency_key,payload_checksum:item.payload_checksum,state,warning,retry_allowed,asset_transferred:false,draft_created:false,production_approved:false,scheduled:false,sent:false,remote_id:null,remote_url:null};});
 const summary={simulated:items.filter(i=>i.state==='simulated').length,exported:items.filter(i=>i.state==='package_exported').length,failed:items.filter(i=>i.state==='failed'||i.state==='blocked_validation').length,unknown:items.filter(i=>i.state==='outcome_unknown').length,real_transfers:0 as const};
 const state=blocked?'blocked_validation':summary.unknown?'outcome_unknown':summary.failed?'failed':manual?'package_exported':'simulated';
 const receiptId=await sha256(prepared.handoff_id+'|'+request.scenario+'|'+request.mode);return {receipt_id:'demo_receipt_'+receiptId.slice(0,20),correlation_id:'local_'+receiptId.slice(20,40),handoff_id:prepared.handoff_id,package_checksum:prepared.package_checksum,destination:this.destination,mode:request.mode,environment:prepared.environment,state,timestamp:new Date().toISOString(),operator_confirmed:request.operator_confirmed,items,summary,remote_id:null,remote_url:null,production_approved:false,scheduled:false,sent:false,persistence:'Browser-local demo ledger; no authoritative vendor status or durable live job',message:blocked?(!request.operator_confirmed?'Operator acknowledgement missing.':prepared.validation.issues.filter(i=>i.severity==='error').map(i=>i.code).join(', ')):manual?'Package exported — manual import required. No provider request occurred.':'Demo — transfer simulated. No external request, remote draft, approval, schedule or send occurred.'};
 }
}
export class StensulAdapter implements MarketingOpsAdapter{
 getVerifiedCapabilities(){return getCapabilities('stensul','live_draft');}
 async validateHandoff(request:HandoffRequest){return (await preparePackage({...request,mode:'live_draft',destination:'stensul'})).validation;}
 async prepareHandoff(request:HandoffRequest){return preparePackage({...request,mode:'live_draft',destination:'stensul'});}
 async readReceipt(_id:string):Promise<TransferReceipt|null>{return null;}
 async transferDraft(_request:HandoffRequest):Promise<TransferReceipt>{throw new Error('LIVE_CONNECTOR_NOT_CONFIGURED: verified tenant contract, permissions, module/asset mappings and operator authorization are required. No request was made.');}
}
export class MarketingOperationsAdapter extends StensulAdapter{
 getVerifiedCapabilities(){return getCapabilities('marketing_operations','live_draft');}
 async prepareHandoff(request:HandoffRequest){return preparePackage({...request,mode:'live_draft',destination:'marketing_operations'});}
 async validateHandoff(request:HandoffRequest){return (await this.prepareHandoff(request)).validation;}
}
