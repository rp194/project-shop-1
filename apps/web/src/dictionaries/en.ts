import type { Dictionary } from "@/lib/i18n";

const en: Dictionary = {
  common: {
    brand: "Project Shop 1",
    switchToFa: "FA",
    switchToEn: "EN",
    account: "Account",
    login: "Login",
  },
  home: {
    title: "Core platform foundation is ready",
    subtitle:
      "Mobile-first storefront shell, bilingual routing, and auth building blocks are in place.",
    cta: "Go to login",
  },
  auth: {
    title: "Login with SMS OTP",
    phoneLabel: "Phone number",
    roleLabel: "Role",
    requestCode: "Request code",
    verifyCode: "Verify",
    codeLabel: "OTP code",
    success: "You are signed in.",
    invalid: "Invalid phone or OTP.",
  },
  account: {
    title: "Account",
    signedInAs: "Signed in as",
    accessDenied: "Please login to access this page.",
  },
};

export default en;
