import Link from "next/link";
import type { PropsWithChildren } from "react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { getDictionary, isLocale, localeDirection, type Locale } from "@/lib/i18n";

type LocaleLayoutProps = PropsWithChildren<{
  params: Promise<{ locale: string }>;
}>;

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const selectedLocale: Locale = isLocale(locale) ? locale : "en";
  const dictionary = await getDictionary(selectedLocale);

  return (
    <MobileShell>
      <header
        dir={localeDirection(selectedLocale)}
        className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4"
      >
        <Link href={`/${selectedLocale}`} className="font-semibold">
          {dictionary.common.brand}
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link href={`/${selectedLocale}/login`}>{dictionary.common.login}</Link>
          <Link href={`/${selectedLocale}/account`}>{dictionary.common.account}</Link>
          <Link href={`/${selectedLocale === "fa" ? "en" : "fa"}`} className="rounded-md border px-2 py-1">
            {selectedLocale === "fa" ? dictionary.common.switchToEn : dictionary.common.switchToFa}
          </Link>
        </nav>
      </header>
      <main lang={selectedLocale} dir={localeDirection(selectedLocale)} className="rounded-xl border border-zinc-200 bg-white p-4 sm:p-6">
        {children}
      </main>
    </MobileShell>
  );
}
