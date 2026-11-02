import { notFound } from "next/navigation";
import { B2B_GUIDES, businessMetadata, type GuideSlug } from "@/lib/b2b";
import { BusinessPage } from "@/components/b2b/BusinessPage";
import { RekeyCalculator } from "@/components/b2b/RekeyCalculator";
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(B2B_GUIDES).map(slug => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const p = B2B_GUIDES[slug as GuideSlug]; return p ? businessMetadata(p.title, p.description, `/guides/${slug}`) : {}; }
export default async function GuidePage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ visits?: string; cylinders?: string }> }) { const { slug } = await params; const p = B2B_GUIDES[slug as GuideSlug]; if (!p) notFound(); const q = await searchParams; const visits = Math.min(1000, Math.max(1, Math.trunc(Number(q.visits)) || 1)); const cylinders = Math.min(100, Math.max(1, Math.trunc(Number(q.cylinders)) || 2)); return <BusinessPage {...p} path={`/guides/${slug}`} guide eyebrow="Property operations guide">{slug === "turnover-rekey-cost" && <RekeyCalculator visits={visits} cylinders={cylinders} />}</BusinessPage>; }
