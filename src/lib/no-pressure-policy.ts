/**
 * Pure policy gate for future server-side quote acceptance.
 * This must be used WITH authenticated authorization, persisted quote state,
 * tamper-proof server timestamps, authorization and transactional job locking.
 */
export type OptionalQuote = {
 id:string;kind:"optional"|"scope_exception"|"urgent_security"|"b2b_preauthorized";
 customerVisibleAt:string;expiresAt:string;providerOnSite:boolean;
 acceptedVersion:number;currentVersion:number;writtenTotalCents:number;
 originalJobClosed:boolean;independentApproval:boolean;
};
export type QuoteDecision={allowed:boolean;reason:string};
const HOUR=60*60*1000;
export function canAcceptAdditionalWork(q:OptionalQuote,now:Date):QuoteDecision {
 const displayed=Date.parse(q.customerVisibleAt),expiry=Date.parse(q.expiresAt);
 if(!Number.isFinite(displayed)||!Number.isFinite(expiry)||!Number.isFinite(now.getTime()))return {allowed:false,reason:"Invalid quote timestamps"};
 if(q.writtenTotalCents<0||!Number.isSafeInteger(q.writtenTotalCents))return {allowed:false,reason:"Invalid disclosed price"};
 if(q.currentVersion!==q.acceptedVersion)return {allowed:false,reason:"Price or terms changed; issue a new quote"};
 if(q.providerOnSite)return {allowed:false,reason:"Approval unavailable while provider is on site"};
 if(now.getTime()<displayed)return {allowed:false,reason:"Quote not yet delivered"};
 if(now.getTime()>expiry)return {allowed:false,reason:"Quote expired"};
 if(q.kind==="optional"){
  if(!q.originalJobClosed)return {allowed:false,reason:"Complete the original job first"};
  if(expiry-displayed<72*HOUR)return {allowed:false,reason:"Quote validity must be at least 72 hours"};
  if(now.getTime()-displayed<24*HOUR)return {allowed:false,reason:"24-hour reflection period still active"};
  return {allowed:true,reason:"Eligible for customer consideration, pending authenticated consent"};
 }
 if(!q.independentApproval)return {allowed:false,reason:"Separate documented authorization required"};
 return {allowed:true,reason:"Exception independently approved; verify specific job authorization"};
}
