'use client';

import { useEffect, useState } from 'react';
import { appendTimeToInternalHref } from '@/lib/append-time-query';

/**
 * 首屏与 SSR 使用原始 href，hydration 后再补 time，避免服务端/客户端时间戳不一致。
 */
export function useTimeHref(href: string | undefined): string | undefined {
  const [resolved, setResolved] = useState(href);

  useEffect(() => {
    if (typeof href === 'string') {
      setResolved(appendTimeToInternalHref(href));
    } else {
      setResolved(href);
    }
  }, [href]);

  return resolved;
}
