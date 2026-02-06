"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/contexts/AppContext";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/layout/Header";

export default function RolePage() {
  const router = useRouter();
  const { language, setRole, setOnboardingDone } = useApp();
  const tr = t(language).role;

  const handleGuide = () => {
    setRole("guide");
    setOnboardingDone(false);
    router.push("/onboarding/emergency");
  };

  const handleTourist = () => {
    setRole("tourist");
    setOnboardingDone(false);
    router.push("/onboarding/emergency");
  };

  return (
    <>
      <Header title="TourTalk" />
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
