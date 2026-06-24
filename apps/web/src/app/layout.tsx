import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Shop 1",
  description: "Phase 1 foundation for bilingual e-commerce platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full antialiased">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
