import { notFound } from "next/navigation";
import { B2B_SERVICES, businessMetadata, type B2BServiceSlug } from "@/lib/b2b";
import { BusinessPage } from "@/components/b2b/BusinessPage";
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(B2B_SERVICES).map(slug => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const p = B2B_SERVICES[slug as B2BServiceSlug]; return p ? businessMetadata(p.title, p.description, `/services/${slug}`) : {}; }
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const p = B2B_SERVICES[slug as B2BServiceSlug]; if (!p) notFound(); return <BusinessPage {...p} path={`/services/${slug}`} />; }
