'use client';

import type { ComponentProps } from 'react';
import { useTimeHref } from '@/lib/use-time-href';

/** 客户端组件内站内 <a>：hydration 后补 time */
export function InternalTimeLink({
  href,
  ...props
}: ComponentProps<'a'> & { href: string }) {
  const resolved = useTimeHref(href);
  return <a href={resolved ?? href} {...props} />;
}
