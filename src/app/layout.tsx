import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import UserActionLogger from "@/components/UserActionLogger";

const enableActionLogger = process.env.NEXT_PUBLIC_ENABLE_ACTION_LOGGER === "1";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Sascha Schumbera — AI Developer",
  description:
    "AI-orientierter Softwareentwickler mit Schwerpunkt auf KI-gestützten Anwendungen und Automatisierungslösungen. Erfahrung in Finance, Banking und End-to-End AI-Produktentwicklung.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {enableActionLogger ? <UserActionLogger /> : null}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
