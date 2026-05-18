'use client';

import { RootProvider as BaseProvider } from 'fumadocs-ui/provider/base';
import {
  FrameworkProvider,
  type Framework,
} from 'fumadocs-core/framework';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import TimeLink from '@/components/time-link';

export function Provider({
  children,
  i18n,
}: {
  children: ReactNode;
  i18n: Parameters<typeof BaseProvider>[0]['i18n'];
  lang?: string;
}) {
  return (
    <FrameworkProvider
      Link={TimeLink}
      Image={Image as NonNullable<Framework['Image']>}
      usePathname={usePathname}
      useRouter={useRouter}
      useParams={useParams}
    >
      <BaseProvider i18n={i18n}>{children}</BaseProvider>
    </FrameworkProvider>
  );
}
