export const ANNUAL_LABOR_BENEFIT_CENTS=10000;
export type BenefitInput={laborCents:number;materialsCents:number;alreadyRedeemedCents:number};
export type BenefitBreakdown={
 laborCents:number;materialsCents:number;availableBenefitCents:number;
 tlnmContributionCents:number;customerOwesCents:number;remainingBenefitCents:number;
};
export function calculateKeysHappenBenefit(input:BenefitInput):BenefitBreakdown{
 const {laborCents,materialsCents,alreadyRedeemedCents}=input;
 for(const n of [laborCents,materialsCents,alreadyRedeemedCents]){
  if(!Number.isSafeInteger(n)||n<0)throw new Error("Amounts must be nonnegative integer cents");
 }
 const availableBenefitCents=Math.max(0,ANNUAL_LABOR_BENEFIT_CENTS-alreadyRedeemedCents);
 const tlnmContributionCents=Math.min(laborCents,availableBenefitCents);
 return {
  laborCents,materialsCents,availableBenefitCents,tlnmContributionCents,
  customerOwesCents:laborCents+materialsCents-tlnmContributionCents,
  remainingBenefitCents:availableBenefitCents-tlnmContributionCents
 };
}
