const fallbackOtp = "123456";

const internationalPhonePattern = /^\+?\d{10,15}$/;
const iranMobilePattern = /^(\+98|0)?9\d{9}$/;

export const getOtpCode = (): string => process.env.OTP_MOCK_CODE ?? fallbackOtp;

export const isPhone = (value: string): boolean => {
  const normalized = value.trim();
  return iranMobilePattern.test(normalized) || internationalPhonePattern.test(normalized);
};

export const getSessionMaxAge = (): number => {
  const fallback = 60 * 60 * 12;
  const raw = process.env.SESSION_MAX_AGE_SECONDS;

  if (!raw) {
    return fallback;
  }

  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};
