import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { NextRequest, NextResponse, type NextFetchEvent } from 'next/server';
import { i18n } from '@/lib/i18n';

const i18nMiddleware = createI18nMiddleware(i18n);

/** 无 `time` 查询参数时重定向到带当前时间戳的同一 URL（用于缓存穿透等） */
function redirectWithTime(request: NextRequest): NextResponse | null {
  if (request.nextUrl.searchParams.has('time')) {
    return null;
  }

  const url = request.nextUrl.clone();
  url.searchParams.set('time', String(Date.now()));
  return NextResponse.redirect(url);
}

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  const timeRedirect = redirectWithTime(request);
  if (timeRedirect) {
    return timeRedirect;
  }

  return i18nMiddleware(request, event);
}

export const config = {
  // Matcher ignoring API routes, Next.js internals, and static assets
  // Important: exclude metadata routes like `/robots.txt` and `/sitemap.xml`
  // so they won't be redirected to `/{lang}/...` which would 404 unless you implement localized metadata routes.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets/|robots\\.txt|sitemap\\.xml|llms?\\.txt|llm-full\\.txt|llms-full\\.txt).*)',
  ],
};
