'use client';

import NextLink from 'next/link';
import { type ComponentProps, forwardRef } from 'react';
import { useTimeHref } from '@/lib/use-time-href';

type TimeLinkProps = ComponentProps<'a'> & {
  prefetch?: boolean;
};

/** fumadocs FrameworkProvider 用 Link：hydration 后补 time，避免 mismatch */
const TimeLink = forwardRef<HTMLAnchorElement, TimeLinkProps>(
  function TimeLink({ href, ...props }, ref) {
    const resolved = useTimeHref(typeof href === 'string' ? href : undefined);
    if (!resolved) {
      return <a ref={ref} href={href} {...props} />;
    }
    return <NextLink ref={ref} href={resolved} {...props} />;
  },
);

TimeLink.displayName = 'TimeLink';

export default TimeLink;
