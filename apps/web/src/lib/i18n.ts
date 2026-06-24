export const locales = ["fa", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fa";
export const fallbackLocale: Locale = "en";

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const mergeDeep = (
  target: Record<string, unknown>,
  source: Record<string, unknown>
): Record<string, unknown> => {
  const output: Record<string, unknown> = { ...target };

  for (const [key, value] of Object.entries(source)) {
    if (isObject(value) && isObject(output[key])) {
      output[key] = mergeDeep(
        output[key] as Record<string, unknown>,
        value
      );
      continue;
    }

    output[key] = value;
  }

  return output;
};

export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);

export const localeDirection = (locale: Locale): "rtl" | "ltr" =>
  locale === "fa" ? "rtl" : "ltr";

export const getLocaleFromPathname = (pathname: string): Locale | null => {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return firstSegment && isLocale(firstSegment) ? firstSegment : null;
};

export type Dictionary = {
  common: {
    brand: string;
    switchToFa: string;
    switchToEn: string;
    account: string;
    login: string;
  };
  home: {
    title: string;
    subtitle: string;
    cta: string;
  };
  auth: {
    title: string;
    phoneLabel: string;
    roleLabel: string;
    requestCode: string;
    verifyCode: string;
    codeLabel: string;
    success: string;
    invalid: string;
  };
  account: {
    title: string;
    signedInAs: string;
    accessDenied: string;
  };
};

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  fa: () => import("@/dictionaries/fa").then((m) => m.default),
  en: () => import("@/dictionaries/en").then((m) => m.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const fallback = await dictionaries[fallbackLocale]();
  if (locale === fallbackLocale) {
    return fallback;
  }

  const localized = await dictionaries[locale]();
  return mergeDeep(fallback as Record<string, unknown>, localized as Record<string, unknown>) as Dictionary;
};
