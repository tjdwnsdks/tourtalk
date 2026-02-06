"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/contexts/AppContext";
import { t } from "@/lib/i18n";
import { GoogleLogo } from "@/components/ui/GoogleLogo";
import { KakaoLogo } from "@/components/ui/KakaoLogo";

export default function LoginPage() {
  const router = useRouter();
  const { language, setUserName } = useApp();
  const tr = t(language).login;

  const handleSocialLogin = (provider: "google" | "kakao") => {
    // MVP 0: 실제 로그인 없이 시뮬레이션. 첫 방문으로 간주하고 프로필로 이동
    if (provider === "google") setUserName("User");
    if (provider === "kakao") setUserName("User");
    router.push("/onboarding/profile");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 pb-12">
      <div className="text-center mb-[50px]" id="title-box">
        <h1 className="text-4xl font-bold text-gray-900 mb-[50px]">{tr.title}</h1>
        <p className="text-lg text-gray-600">🌏 🗣️ 💬</p>
        <p className="text-base text-gray-600 mt-2">{tr.subtitle}</p>
        <p className="text-base text-gray-600">{tr.tagline}</p>
      </div>
      <div className="w-full max-w-sm space-y-3">
        <button
          type="button"
          onClick={() => handleSocialLogin("google")}
          className="w-full h-12 min-h-[44px] flex items-center justify-center gap-3 rounded-lg border bg-white transition-colors hover:bg-gray-50 border-[#E0E0E0]"
        >
          <GoogleLogo className="shrink-0 w-6 h-6" />
          <span className="font-medium text-[#3C4043]">{tr.googleLogin}</span>
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin("kakao")}
          className="w-full h-12 min-h-[44px] flex items-center justify-center gap-3 rounded-lg bg-[#FEE500] transition-colors hover:bg-[#f5dc00]"
        >
          <KakaoLogo className="shrink-0 w-6 h-6" />
          <span className="font-medium text-[#212121]">{tr.kakaoLogin}</span>
        </button>
      </div>
      <p className="mt-8 text-xs text-gray-500 text-center max-w-xs">
        {tr.termsNote}
      </p>
    </main>
  );
}
