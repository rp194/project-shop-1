const fallbackOtp = "123456";

export const getOtpCode = (): string => process.env.OTP_MOCK_CODE ?? fallbackOtp;

export const isPhone = (value: string): boolean => /^\+?\d{10,15}$/.test(value);
