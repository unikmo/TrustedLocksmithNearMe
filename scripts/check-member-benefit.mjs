import assert from "node:assert/strict";
import {calculateKeysHappenBenefit as calc} from "../src/lib/keys-happen-benefit.ts";
assert.deepEqual(calc({laborCents:9900,materialsCents:2000,alreadyRedeemedCents:0}),{
 laborCents:9900,materialsCents:2000,availableBenefitCents:10000,tlnmContributionCents:9900,customerOwesCents:2000,remainingBenefitCents:100
});
assert.equal(calc({laborCents:15000,materialsCents:5000,alreadyRedeemedCents:7000}).customerOwesCents,17000);
assert.equal(calc({laborCents:15000,materialsCents:5000,alreadyRedeemedCents:10000}).tlnmContributionCents,0);
assert.equal(calc({laborCents:0,materialsCents:4000,alreadyRedeemedCents:0}).customerOwesCents,4000);
for(const x of [-1,1.2,NaN,Infinity])assert.throws(()=>calc({laborCents:x,materialsCents:0,alreadyRedeemedCents:0}));
console.log("Membership benefit math checks passed");
