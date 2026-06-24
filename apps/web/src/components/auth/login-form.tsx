"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { roles, type Role } from "@/lib/auth";
import type { Dictionary, Locale } from "@/lib/i18n";

type LoginFormProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function LoginForm({ locale, dictionary }: LoginFormProps) {
  const router = useRouter();
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
    setMessage(res.ok ? "OTP sent (mock)." : dictionary.auth.invalid);
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
      setMessage(dictionary.auth.invalid);
      return;
    }

    setMessage(dictionary.auth.success);
    router.push(`/${locale}/account`);
  };

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">{dictionary.auth.title}</h1>
      <div className="space-y-3">
        <label className="block text-sm">
          {dictionary.auth.phoneLabel}
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
            placeholder="+989xxxxxxxxx"
          />
        </label>
        <label className="block text-sm">
          {dictionary.auth.roleLabel}
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
          {dictionary.auth.requestCode}
        </Button>
      </div>

      <div className="space-y-3">
        <label className="block text-sm">
          {dictionary.auth.codeLabel}
          <input
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
            placeholder="123456"
          />
        </label>
        <Button onClick={verifyOtp} disabled={verifying || !otp || !phone}>
          {dictionary.auth.verifyCode}
        </Button>
      </div>

      {message ? <p className="text-sm text-zinc-700">{message}</p> : null}
    </section>
  );
}
