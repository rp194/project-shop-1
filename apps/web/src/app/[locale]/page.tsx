import Link from "next/link";
import { getDictionary, isLocale, localeDirection, type Locale } from "@/lib/i18n";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const selectedLocale: Locale = isLocale(locale) ? locale : "en";
  const dictionary = await getDictionary(selectedLocale);

  return (
    <section dir={localeDirection(selectedLocale)} className="space-y-3">
      <h1 className="text-2xl font-semibold">{dictionary.home.title}</h1>
      <p className="text-zinc-700">{dictionary.home.subtitle}</p>
      <Link
        href={`/${selectedLocale}/login`}
        className="inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
      >
        {dictionary.home.cta}
      </Link>
    </section>
  );
}
