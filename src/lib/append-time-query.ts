const TIME_PARAM = 'time';

/** 是否为站内路径（相对根路径，非外链） */
export function isInternalPath(href: string): boolean {
  if (!href || href.startsWith('#')) return false;
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return false;
  if (href.startsWith('//')) return false;
  return href.startsWith('/');
}

/** 站内 href 追加 `time` 查询参数（已有则保留） */
export function appendTimeToInternalHref(href: string): string {
  if (!isInternalPath(href)) return href;

  const hashIndex = href.indexOf('#');
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';
  const pathAndQuery = hashIndex >= 0 ? href.slice(0, hashIndex) : href;

  const queryIndex = pathAndQuery.indexOf('?');
  const pathname =
    queryIndex >= 0 ? pathAndQuery.slice(0, queryIndex) : pathAndQuery;
  const search =
    queryIndex >= 0 ? pathAndQuery.slice(queryIndex + 1) : '';

  const params = new URLSearchParams(search);
  if (!params.has(TIME_PARAM)) {
    params.set(TIME_PARAM, String(Date.now()));
  }

  const qs = params.toString();
  return `${pathname}${qs ? `?${qs}` : ''}${hash}`;
}
