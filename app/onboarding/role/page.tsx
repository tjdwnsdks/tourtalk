"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/contexts/AppContext";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/layout/Header";

export default function RolePage() {
  const router = useRouter();
  const { language, setRole, setOnboardingDone, onboardingDone, role } = useApp();
  const tr = t(language).role;

  const handleGuide = () => {
    setRole("guide");

    if (onboardingDone) {
      // 설정 변경 모드: 역할만 변경하고 돌아가기
      router.back();
    } else {
      // 온보딩 모드: 완료 처리하고 Guide 메인으로
      setOnboardingDone(true);
      router.push("/guide");
    }
  };

  const handleTourist = () => {
    setRole("tourist");

    if (onboardingDone) {
      router.back();
    } else {
      setOnboardingDone(true);
      router.push("/tourist");
    }
  };

  return (
    <>
      <Header
        title="TourTalk"
        showBack
        backHref={onboardingDone ? (role === "guide" ? "/guide" : "/tourist") : "/onboarding/emergency"}
      />
      <main className="p-4 max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-center mb-6">{tr.howToUse}</h2>
        <div className="space-y-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleGuide}>
            <div className="text-center py-4">
              <span className="text-4xl">🎤</span>
              <h3 className="text-lg font-bold mt-2">{tr.guide}</h3>
              <p className="text-sm text-gray-600 mt-1">{tr.guideDesc}</p>
            </div>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleTourist}>
            <div className="text-center py-4">
              <span className="text-4xl">👥</span>
              <h3 className="text-lg font-bold mt-2">{tr.tourist}</h3>
              <p className="text-sm text-gray-600 mt-1">{tr.touristDesc}</p>
            </div>
          </Card>
        </div>
        <p className="text-sm text-gray-500 text-center mt-6">💡 {tr.changeLater}</p>
      </main>
    </>
  );
}
