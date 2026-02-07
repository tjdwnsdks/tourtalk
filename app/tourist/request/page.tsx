"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useApp } from "@/contexts/AppContext";
import { quickRequestPresets, fakeTranslate } from "@/lib/mockData";
import { t } from "@/lib/i18n";
import type { Message, LanguageCode } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";

const LANG_CODES: LanguageCode[] = ["ko", "en", "vi", "zh-CN", "zh-TW", "ja", "th", "id"];

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
  const { language, emergencyContacts, addTourMessage, userName } = useApp();
  const tr = t(language).tourist;
  const common = t(language).common;
  const emergencyTr = t(language).emergency;
  const [customText, setCustomText] = useState("");
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [showRecordingPopup, setShowRecordingPopup] = useState(false);
  const [recordingDots, setRecordingDots] = useState(1);

  const presetLabel = (preset: (typeof quickRequestPresets)[0]) => {
    const key = LANG_MAP[language] ?? "en";
    return (preset[key] ?? preset.ko) as string;
  };

  const handlePreset = async (preset: (typeof quickRequestPresets)[0]) => {
    if (!tourId) return;
    const koreanText = preset.ko;
    setSending(true);
    toast.loading(common.sending, { id: "req" });
    await new Promise((r) => setTimeout(r, 1000));

    // 메시지 번역 - preset 객체 사용
    const translatedTexts: Record<string, string> = {};
    for (const lang of LANG_CODES) {
      translatedTexts[lang] = (preset[lang as keyof typeof preset] as string) || preset.en || koreanText;
    }

    // 메시지 객체 생성
    const msg: Message = {
      id: `msg-tourist-${Date.now()}`,
      tourId: tourId,
      senderId: "tourist1",
      senderName: userName || "Tourist",
      senderRole: "tourist",
      originalText: koreanText,
      translatedTexts,
      timestamp: new Date().toISOString(),
      isEmergency: false,
    };

    addTourMessage(tourId, msg);
    toast.success(common.messageSent, { id: "req" });
    setSending(false);
    router.push(`/tourist/tour/${tourId}`);
  };

  const handleCustomSend = async () => {
    if (!customText.trim() || !tourId) return;
    const text = customText.trim();
    setSending(true);
    toast.loading(common.sending, { id: "req" });
    await new Promise((r) => setTimeout(r, 1000));

    // 메시지 번역
    const translatedTexts: Record<string, string> = {};
    for (const lang of LANG_CODES) {
      translatedTexts[lang] = fakeTranslate(text, lang);
    }

    // 메시지 객체 생성
    const msg: Message = {
      id: `msg-tourist-${Date.now()}`,
      tourId: tourId,
      senderId: "tourist1",
      senderName: userName || "Tourist",
      senderRole: "tourist",
      originalText: text,
      translatedTexts,
      timestamp: new Date().toISOString(),
      isEmergency: false,
    };

    addTourMessage(tourId, msg);
    toast.success(common.messageSent, { id: "req" });
    setSending(false);
    setCustomText("");
    router.push(`/tourist/tour/${tourId}`);
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

  /** 녹음 버튼 클릭 - 녹음중 팝업 표시 */
  const handleVoiceRecord = () => {
    setRecordingDots(1);
    setShowRecordingPopup(true);
    // TODO: 실제 녹음 API 연동
  };

  /** 녹음 팝업 닫기 - 녹음된 메시지 전송 후 이전 화면으로 이동 */
  const handleCloseRecording = async () => {
    if (!tourId) return;

    setSending(true);
    toast.loading(common.sending, { id: "voice-msg" });
    await new Promise((r) => setTimeout(r, 1000));

    // 녹음된 메시지 생성
    const koreanText = "녹음된 메시지";
    const translatedTexts: Record<string, string> = {};
    for (const lang of LANG_CODES) {
      translatedTexts[lang] = fakeTranslate(koreanText, lang);
    }

    // 메시지 객체 생성
    const msg: Message = {
      id: `msg-tourist-voice-${Date.now()}`,
      tourId: tourId,
      senderId: "tourist1",
      senderName: userName || "Tourist",
      senderRole: "tourist",
      originalText: koreanText,
      translatedTexts,
      timestamp: new Date().toISOString(),
      isEmergency: false,
    };

    addTourMessage(tourId, msg);
    toast.success(common.messageSent, { id: "voice-msg" });
    setSending(false);
    setShowRecordingPopup(false);
    router.push(`/tourist/tour/${tourId}`);
  };

  /** 녹음중 팝업 표시 중일 때 마침표 1 → 2 → 3 → 1 반복 애니메이션 */
  useEffect(() => {
    if (!showRecordingPopup) return;
    const interval = setInterval(() => {
      setRecordingDots((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 400);
    return () => clearInterval(interval);
  }, [showRecordingPopup]);

  return (
    <>
      {/* 녹음중 팝업: 완료 버튼 클릭 시에만 닫히고 이전 화면으로 이동 */}
      {showRecordingPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div
            className="w-[70%] max-w-[300px] aspect-square flex flex-col items-center justify-center gap-3 rounded-2xl bg-white shadow-xl p-4"
          >
            <span className="text-4xl" aria-hidden>🎤</span>
            <p className="text-lg font-medium text-gray-800 min-w-[4em] text-center flex-1 flex items-center justify-center">
              {common.recording.replace(/\.+$/, "")}
              {".".repeat(recordingDots)}
            </p>
            <Button
              variant="primary"
              className="w-full mt-auto"
              onClick={handleCloseRecording}
            >
              {emergencyTr.done}
            </Button>
          </div>
        </div>
      )}
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
        <div className="flex gap-2 mb-4">
          <Input
            placeholder=""
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCustomSend()}
          />
          <Button variant="primary" onClick={handleCustomSend} disabled={sending || !customText.trim()}  className="!min-w-[80px]">
            {tr.send}
          </Button>
        </div>

        <Button
          fullWidth
          variant="outline"
          className="mb-6"
          onClick={handleVoiceRecord}
        >
          🎤 {common.recording.replace(/\.+$/, "")}
        </Button>

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
