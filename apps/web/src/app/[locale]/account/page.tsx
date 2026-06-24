import Link from "next/link";
import { cookies } from "next/headers";
import { canAccessRole, isRole, type Role } from "@/lib/auth";
import { getDictionary, isLocale, localeDirection, type Locale } from "@/lib/i18n";

type AccountPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AccountPage({ params }: AccountPageProps) {
  const { locale } = await params;
  const selectedLocale: Locale = isLocale(locale) ? locale : "en";
  const dictionary = await getDictionary(selectedLocale);

  const cookieStore = await cookies();
  const roleValue = cookieStore.get("session_role")?.value;
  const role: Role | null = roleValue && isRole(roleValue) ? roleValue : null;

  if (!role || !canAccessRole(role, "customer")) {
    return (
      <section dir={localeDirection(selectedLocale)} className="space-y-3">
        <h1 className="text-xl font-semibold">{dictionary.account.title}</h1>
        <p>{dictionary.account.accessDenied}</p>
        <Link href={`/${selectedLocale}/login`} className="text-sm underline">
          {dictionary.common.login}
        </Link>
      </section>
    );
  }

  return (
    <section dir={localeDirection(selectedLocale)} className="space-y-3">
      <h1 className="text-xl font-semibold">{dictionary.account.title}</h1>
      <p>
        {dictionary.account.signedInAs}: <strong>{role}</strong>
      </p>
    </section>
  );
}
