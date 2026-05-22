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

  try {
    return new Response(await getLLMText(page), {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('[llms.mdx]', slug?.join('/') ?? '', error);
    return new Response('Failed to generate markdown for this page.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

export function generateStaticParams() {
  return source.generateParams();
}
