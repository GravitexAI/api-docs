'use client';

import { ThemeToggle } from 'fumadocs-ui/components/layout/theme-toggle';

/**
 * 文档站展示版本：`version：` + 年月日(YYYYMMDD) + 自增序号（同日多次发版则递增末几位）。
 * 发版前请按规则更新本常量。
 */
export const DOC_SITE_VERSION = '2026052201';

/**
 * 主题切换左侧版本文案（与 fumadocs DocsLayout / HomeLayout 的 themeSwitch.component 对接）。
 */
export function ThemeSwitchWithVersion() {
  return (
    <div className="ms-auto flex flex-row items-center gap-1.5 shrink-0">
      <span className="text-fd-muted-foreground text-xs whitespace-nowrap">
        version：{DOC_SITE_VERSION}
      </span>
      <ThemeToggle className="p-0" />
    </div>
  );
}
