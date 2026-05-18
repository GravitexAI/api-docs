'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { i18n } from '@/lib/i18n';

function isHomePath(pathname: string): boolean {
  return i18n.languages.some(
    (lang) => pathname === `/${lang}` || pathname === `/${lang}/`,
  );
}

/** 首页客户端导航兜底：无 `time` 时 replace 补参 */
export function EnsureHomeTimeQuery() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!isHomePath(pathname) || searchParams.has('time')) return;

    const next = new URLSearchParams(searchParams.toString());
    next.set('time', String(Date.now()));
    router.replace(`${pathname}?${next.toString()}`);
  }, [pathname, searchParams, router]);

  return null;
}
