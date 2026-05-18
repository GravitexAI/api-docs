'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import { Suspense, type ReactNode } from 'react';
import { EnsureTimeQueryParam } from './ensure-time-query';
import { GlobalBanner } from './global-banner';

export function Provider({
  children,
  i18n,
  lang,
}: {
  children: ReactNode;
  i18n: Parameters<typeof RootProvider>[0]['i18n'];
  lang?: string;
}) {
  return (
    <RootProvider i18n={i18n}>
      <Suspense fallback={null}>
        <EnsureTimeQueryParam />
      </Suspense>
      {/* <GlobalBanner lang={lang} /> */}
      {children}
    </RootProvider>
  );
}
