import { LoginForm } from "@/components/auth/login-form";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

type LoginPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  const selectedLocale: Locale = isLocale(locale) ? locale : "en";
  const dictionary = await getDictionary(selectedLocale);

  return <LoginForm locale={selectedLocale} dictionary={dictionary} />;
}
