import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "@/contexts/AppContext";

export const metadata: Metadata = {
  title: "TourTalk - 다국어 실시간 통역 투어 가이드",
  description: "AI 기반 다국어 실시간 통역 투어 가이드 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="light" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-gray-50 text-gray-900">
        <AppProvider>
          {children}
          <Toaster position="top-center" toastOptions={{ duration: 2500 }} />
        </AppProvider>
      </body>
    </html>
  );
}
