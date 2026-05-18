'use client';

import Link from 'fumadocs-core/link';
import type { ComponentProps } from 'react';
import { useTimeHref } from '@/lib/use-time-href';

/** MDX 相对链接：hydration 后补 time */
export function TimeAnchor({ href, ...props }: ComponentProps<'a'>) {
  const resolved = useTimeHref(typeof href === 'string' ? href : undefined);
  return <Link href={resolved ?? href} {...props} />;
}
