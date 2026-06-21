import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "KenTranslate – AI-Powered English ↔ Kɛnyaŋ Translation",
  description: "Bridging English and Kɛnyaŋ Through AI.",
  icons: {
    icon: '/favicon.svg?v=2',
    shortcut: '/favicon.svg?v=2',
    apple: '/favicon.svg?v=2',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
