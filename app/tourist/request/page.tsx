"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useApp } from "@/contexts/AppContext";
import { quickRequestPresets } from "@/lib/mockData";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";

type LangKey = keyof typeof quickRequestPresets[0];

const LANG_MAP: Record<string, LangKey> = {
  ko: "ko",
  en: "en",
  vi: "vi",
  "zh-CN": "zh-CN",
  "zh-TW": "zh-TW",
  ja: "ja",
};

function QuickRequestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tourId = searchParams.get("tourId") || "";
  const { language, emergencyContacts } = useApp();
  const tr = t(language).tourist;
  const common = t(language).common;
  const [customText, setCustomText] = useState("");
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [sending, setSending] = useState(false);

  const presetLabel = (preset: (typeof quickRequestPresets)[0]) => {
    const key = LANG_MAP[language] ?? "en";
    return (preset[key] ?? preset.ko) as string;
  };

  const handlePreset = async (preset: (typeof quickRequestPresets)[0]) => {
    const text = presetLabel(preset);
    setSending(true);
    toast.loading(common.sending, { id: "req" });
    await new Promise((r) => setTimeout(r, 500));
    toast.success(common.messageSent, { id: "req" });
    setSending(false);
    if (tourId) router.push(`/tourist/tour/${tourId}`);
  };

  const handleCustomSend = async () => {
    if (!customText.trim()) return;
    setSending(true);
    toast.loading(common.sending, { id: "req" });
    await new Promise((r) => setTimeout(r, 500));
    toast.success(common.messageSent, { id: "req" });
    setSending(false);
    setCustomText("");
    if (tourId) router.push(`/tourist/tour/${tourId}`);
  };

  const handleEmergencySend = async () => {
    setSending(true);
    toast.loading(common.sending, { id: "emergency" });
    await new Promise((r) => setTimeout(r, 1000));
    toast.success(common.emergencySent, { id: "emergency" });
    setSending(false);
    setShowEmergencyModal(false);
    if (tourId) router.push(`/tourist/tour/${tourId}`);
  };

  return (
    <>
      <Header title={tr.quickRequest} showBack backHref={tourId ? `/tourist/tour/${tourId}` : "/tourist"} />
      <main className="p-4 max-w-lg mx-auto">
        <p className="text-sm font-medium text-gray-700 mb-4">{tr.frequentRequests}</p>
        <div className="space-y-2 mb-6">
          {quickRequestPresets.map((preset, i) => (
            <Card
              key={i}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handlePreset(preset)}
            >
              <p className="font-medium">{presetLabel(preset)}</p>
              <p className="text-xs text-gray-500">{preset.ko}</p>
            </Card>
          ))}
        </div>

        <p className="text-sm font-medium text-gray-700 mb-2">{tr.customInput}</p>
        <div className="flex gap-2 mb-6">
          <Input
            placeholder=""
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCustomSend()}
          />
          <Button variant="ghost" size="sm">🎤</Button>
          <Button variant="primary" onClick={handleCustomSend} disabled={sending || !customText.trim()}>
            {tr.send}
          </Button>
        </div>

        <Button
          fullWidth
          variant="danger"
          size="lg"
          onClick={() => setShowEmergencyModal(true)}
        >
          🆘 {tr.emergencyAlert}
        </Button>
      </main>

      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-bold mb-4">⚠️ 긴급 알림</h3>
            <p className="text-gray-600 mb-4">긴급 알림을 보내시겠습니까?</p>
            <p className="text-sm font-medium text-gray-700 mb-2">📱 알림 대상:</p>
            <ul className="text-sm text-gray-600 mb-4">
              {emergencyContacts.length > 0 ? (
                emergencyContacts.map((c) => (
                  <li key={c.id}>• {c.name} ({c.isMember ? "✅ 앱 푸시" : "📧 이메일"})</li>
                ))
              ) : (
                <li>등록된 연락처 없음</li>
              )}
              <li>• 가이드</li>
            </ul>
            <p className="text-xs text-gray-500 mb-4">
              📍 현재 위치 정보와 투어 정보가 함께 전송됩니다
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" fullWidth onClick={() => setShowEmergencyModal(false)}>
                {t(language).emergency.cancel}
              </Button>
              <Button variant="danger" fullWidth onClick={handleEmergencySend} disabled={sending}>
                🚨 전송
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function QuickRequestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">로딩 중...</div>}>
      <QuickRequestContent />
    </Suspense>
  );
}
