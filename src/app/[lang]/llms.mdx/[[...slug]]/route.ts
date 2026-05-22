import { getLLMText, source } from '@/lib/source';
import { notFound } from 'next/navigation';

// Expand <APIPage /> at request time so copy-markdown includes full API details
export const dynamic = 'force-dynamic';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ lang: string; slug?: string[] }> }
) {
  const { slug, lang } = await params;
  const page = source.getPage(slug, lang);

  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown',
    },
  });
}

export function generateStaticParams() {
  return source.generateParams();
}
