/** Release circuit breaker: enable only after the existing database is restored
 * and account creation, enquiry insert and portfolio requests pass live checks.
 * Keep this server-owned; it is not a user role or an authorization claim.
 */
export const BUSINESS_REQUESTS_AVAILABLE = false;
export const BUSINESS_UNAVAILABLE_MESSAGE = "Business onboarding and enquiries are temporarily unavailable. Requests are not being accepted right now. Please check back shortly.";
