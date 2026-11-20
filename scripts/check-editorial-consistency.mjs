import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
const file = (p) => readFileSync(p, "utf8");
const expected = {
  "src/app/page.tsx": ["Keys happen.", "A little foresight. A lot less drama."],
  "src/app/for-businesses/page.tsx": ["Many doors. Fewer headaches."],
  "src/app/for-locksmiths/page.tsx": ["More jobs that fit. Less chasing leads."],
  "src/app/keys-happen/page.tsx": ["Your future self will thank you."],
  "src/app/pricing/page.tsx": ["An extra cushion?", "Enrollment closed"],
  "src/app/for-property-managers/page.tsx": ["One less thing for your tenants to call you about."],
  "src/app/landlords/page.tsx": ["Fresh start. Fewer key dramas."],
  "src/app/for-real-estate-agents/page.tsx": ["A great closing deserves a smooth handover."],
  "src/app/services/page.tsx": ["Know the price. Lose the guesswork."],
  "src/app/locations/page.tsx": ["Your building has a postcode."],
  "src/app/about/page.tsx": ["Keys happen. Drama doesn't have to."],
  "src/app/trust-safety/page.tsx": ["Keys happen. Pressure shouldn't."],
  "src/app/partner-tech/page.tsx": ["Good jobs. Your choice.", "Your skills. Your schedule."],
  "src/app/contact/page.tsx": ["Something on your mind? Start here."],
  "src/app/how-it-works/page.tsx": ["Small plan. Big difference."],
  "src/app/concierge/page.tsx": ["Locked out? Start with the move you might have missed."],
  "src/app/[city]/page.tsx": ["More doors in", "Fewer locksmith headaches."],
  "src/app/[city]/[service]/page.tsx": ["Fresh tenant. Fresh keys."],
  "src/lib/b2b.ts": [
    "New tenant. Fresh keys. Fewer surprises.",
    "A whole portfolio. Fewer key headaches.",
    "One building. Many doors. A smarter key strategy.",
    "Fewer keys. More control.",
    "How much will those turnover keys really cost?",
    "The handover checklist you'll be glad you kept."
  ],
  "src/components/b2b/BusinessPage.tsx": ["Get the straight answers", "/faq"],
  "src/app/faq/page.tsx": ["The useful stuff, without the small print hunt.", "TSquare Ventures LLC", "24-hour"]
};
for(const [path,phrases] of Object.entries(expected)) {
  const text=file(path);
  for(const phrase of phrases) assert.ok(text.includes(phrase), `${path} is missing ${JSON.stringify(phrase)}`);
}
const config=file("next.config.ts");
assert.ok(!config.includes('source: "/pricing"'), "Pricing must remain public");
assert.ok(file("src/lib/business-only.ts").includes('"book"'), "Booking must stay closed");
assert.ok(file("src/lib/business-availability.ts").includes("false"), "Business intake must remain gated");
console.log(`Editorial consistency: ${Object.keys(expected).length} public templates and safety guards PASS`);
