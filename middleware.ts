import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { NextRequest, NextResponse, type NextFetchEvent } from 'next/server';
import { i18n } from '@/lib/i18n';

const i18nMiddleware = createI18nMiddleware(i18n);

function isHomePath(pathname: string): boolean {
  return i18n.languages.some(
    (lang) => pathname === `/${lang}` || pathname === `/${lang}/`,
  );
}

/** 首页直开无 `time` 时重定向补参（仅 /{lang}，不含文档等子路径） */
function redirectHomeWithTime(request: NextRequest): NextResponse | null {
  const { pathname, searchParams } = request.nextUrl;
  if (!isHomePath(pathname) || searchParams.has('time')) {
    return null;
  }

  const url = request.nextUrl.clone();
  url.searchParams.set('time', String(Date.now()));
  return NextResponse.redirect(url);
}

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  const homeTimeRedirect = redirectHomeWithTime(request);
  if (homeTimeRedirect) {
    return homeTimeRedirect;
  }

  return i18nMiddleware(request, event);
}

export const config = {
  // Matcher ignoring API routes, Next.js internals, and static assets
  // Important: exclude metadata routes like `/robots.txt` and `/sitemap.xml`
  // so they won't be redirected to `/{lang}/...` which would 404 unless you implement localized metadata routes.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets/|robots\\.txt|sitemap\\.xml|llms?\\.txt|(?:en|zh|ja)/llms\\.mdx|llm-full\\.txt|llms-full\\.txt).*)',
  ],
};
