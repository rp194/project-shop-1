"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { isLocale, type Locale } from "@/lib/i18n";
import { roles, type Role } from "@/lib/auth";

type LoginCopy = {
  title: string;
  phoneLabel: string;
  roleLabel: string;
  requestCode: string;
  verifyCode: string;
  codeLabel: string;
  success: string;
  invalid: string;
};

const copy: Record<Locale, LoginCopy> = {
  en: {
    title: "Login with SMS OTP",
    phoneLabel: "Phone number",
    roleLabel: "Role",
    requestCode: "Request code",
    verifyCode: "Verify",
    codeLabel: "OTP code",
    success: "You are signed in.",
    invalid: "Invalid phone or OTP.",
  },
  fa: {
    title: "ورود با پیامک OTP",
    phoneLabel: "شماره موبایل",
    roleLabel: "نقش",
    requestCode: "دریافت کد",
    verifyCode: "تایید",
    codeLabel: "کد OTP",
    success: "ورود با موفقیت انجام شد.",
    invalid: "شماره یا کد نامعتبر است.",
  },
};

export default function LoginPage() {
  const params = useParams<{ locale: string }>();
  const router = useRouter();
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const dictionary = copy[locale];

  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<Role>("customer");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const requestOtp = async () => {
    setRequesting(true);
    setMessage("");
    const res = await fetch("/api/auth/otp/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    setRequesting(false);
    setMessage(res.ok ? "OTP sent (mock)." : dictionary.invalid);
  };

  const verifyOtp = async () => {
    setVerifying(true);
    setMessage("");
    const res = await fetch("/api/auth/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, code: otp, role }),
    });
    setVerifying(false);

    if (!res.ok) {
      setMessage(dictionary.invalid);
      return;
    }

    setMessage(dictionary.success);
    router.push(`/${locale}/account`);
  };

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">{dictionary.title}</h1>
      <div className="space-y-3">
        <label className="block text-sm">
          {dictionary.phoneLabel}
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
            placeholder="+989xxxxxxxxx"
          />
        </label>
        <label className="block text-sm">
          {dictionary.roleLabel}
          <select
            value={role}
            onChange={(event) => setRole(event.target.value as Role)}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
          >
            {roles.map((entry) => (
              <option key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </select>
        </label>
        <Button onClick={requestOtp} disabled={requesting || !phone}>
          {dictionary.requestCode}
        </Button>
      </div>

      <div className="space-y-3">
        <label className="block text-sm">
          {dictionary.codeLabel}
          <input
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
            placeholder="123456"
          />
        </label>
        <Button onClick={verifyOtp} disabled={verifying || !otp || !phone}>
          {dictionary.verifyCode}
        </Button>
      </div>

      {message ? <p className="text-sm text-zinc-700">{message}</p> : null}
    </section>
  );
}
