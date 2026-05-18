'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

/**
 * 客户端导航兜底：URL 无 `time` 时 replace 为带当前时间戳的地址。
 * 与服务端 middleware 行为一致。
 */
export function EnsureTimeQueryParam() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.has('time')) return;

    const next = new URLSearchParams(searchParams.toString());
    next.set('time', String(Date.now()));
    router.replace(`${pathname}?${next.toString()}`);
  }, [pathname, searchParams, router]);

  return null;
}
