"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useApp } from "@/contexts/AppContext";
import { fakeTours, getTourName, fakeTranslate, quickRequestPresets } from "@/lib/mockData";
import { getRelativeTime } from "@/lib/utils";
import type { Tour, Message, LanguageCode } from "@/types";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/layout/Header";

const LANG_CODES: LanguageCode[] = ["ko", "en", "vi", "zh-CN", "zh-TW", "ja", "th", "id"];

const GUIDE_TOURS_KEY = "tourtalk_guide_tours";
function loadGuideTours(): Tour[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(GUIDE_TOURS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function TouristMainPage() {
  const params = useParams();
  const id = params.id as string;
  const { language, tourMessages, addTourMessage, userName, emergencyContacts } = useApp();
  const tr = t(language).tourist;
  const common = t(language).common;
  const emergencyTr = t(language).emergency;
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [guideTours, setGuideTours] = useState<Tour[]>([]);
  const [sending, setSending] = useState(false);
  const [showPlayingPopup, setShowPlayingPopup] = useState(false);
  const [playingDots, setPlayingDots] = useState(1);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  useEffect(() => {
    setGuideTours(loadGuideTours());
  }, []);

  const allTours = [...fakeTours, ...guideTours];
  const tour = allTours.find((t) => t.id === id);
  const messages = (tourMessages[id] ?? []) as { id: string; originalText: string; translatedTexts: Record<string, string>; timestamp: string }[];

  const translatedForMe = messages.map((m) => ({
    ...m,
    text: m.translatedTexts[language] ?? m.translatedTexts.en ?? m.originalText,
  }));

  const handlePlay = async (msgId: string) => {
    setPlayingId(msgId);
    setPlayingDots(1);
    setShowPlayingPopup(true);
    // TODO: 실제 TTS API 연동 시 음성 재생
  };

  /** 재생 팝업 닫기 */
  const handleClosePlayingPopup = () => {
    setShowPlayingPopup(false);
    setPlayingId(null);
  };

  /** 재생 중 팝업 표시 중일 때 마침표 1 → 2 → 3 → 1 반복 애니메이션 */
  useEffect(() => {
    if (!showPlayingPopup) return;
    const interval = setInterval(() => {
      setPlayingDots((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 400);
    return () => clearInterval(interval);
  }, [showPlayingPopup]);

  const handleSendMessage = async (presetIndex: number) => {
    if (sending) return;
    setSending(true);
    toast.loading(common.sending, { id: "send-tourist-msg" });
    await new Promise((r) => setTimeout(r, 1000));

    const preset = quickRequestPresets[presetIndex];
    const koreanText = preset.ko;

    // 메시지 번역 - preset 객체 사용
    const translatedTexts: Record<string, string> = {};
    for (const lang of LANG_CODES) {
      translatedTexts[lang] = (preset[lang as keyof typeof preset] as string) || preset.en || koreanText;
    }

    // 메시지 객체 생성
    const msg: Message = {
      id: `msg-tourist-${Date.now()}`,
      tourId: id,
      senderId: "tourist1",
      senderName: userName || "Tourist",
      senderRole: "tourist",
      originalText: koreanText,
      translatedTexts,
      timestamp: new Date().toISOString(),
      isEmergency: presetIndex === 5, // "🙋 도와주세요"
    };

    addTourMessage(id, msg);
    setSending(false);
    toast.success(common.messageSent, { id: "send-tourist-msg" });
  };

  const handleEmergencySend = async () => {
    setSending(true);
    toast.loading(common.sending, { id: "emergency" });
    await new Promise((r) => setTimeout(r, 1000));
    toast.success(common.emergencySent, { id: "emergency" });
    setSending(false);
    setShowEmergencyModal(false);
  };

  if (!tour) {
    return (
      <>
        <Header title="Tour" showBack backHref="/tourist" />
        <main className="p-4">
          <p>{tr.tourNotFound}</p>
          <Link href="/tourist"><Button className="mt-4">{tr.joinTourPage}</Button></Link>
        </main>
      </>
    );
  }

  return (
    <>
      {/* 재생 중 팝업: 나가기 버튼 클릭 시에만 닫힘 */}
      {showPlayingPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div
            className="w-[70%] max-w-[300px] aspect-square flex flex-col items-center justify-center gap-3 rounded-2xl bg-white shadow-xl p-4"
          >
            <span className="text-4xl" aria-hidden>🔊</span>
            <p className="text-lg font-medium text-gray-800 min-w-[4em] text-center flex-1 flex items-center justify-center">
              {common.playing.replace(/\.+$/, "")}
              {".".repeat(playingDots)}
            </p>
            <Button
              variant="primary"
              className="w-full mt-auto"
              onClick={handleClosePlayingPopup}
            >
              {common.exit}
            </Button>
          </div>
        </div>
      )}
      {/* 긴급 알림 팝업 */}
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
                {emergencyTr.cancel}
              </Button>
              <Button variant="danger" fullWidth onClick={handleEmergencySend} disabled={sending}>
                🚨 전송
              </Button>
            </div>
          </div>
        </div>
      )}
      <Header
        title={`${getTourName(tour, language)} (#${tour.id})`}
        showBack
        backHref="/tourist"
      />
      <main className="p-4 max-w-lg mx-auto">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
          <span className="text-lg">🎤</span>
          <span className="font-bold">{tour.guideName}</span>
          <span className="text-green-600">🟢</span>
          <span className="text-sm text-gray-600">👥 {tour.participants} {tr.participantsCount}</span>
        </div>

        <div className="flex gap-2 justify-center mb-4">
          <Link href={`/tourist/request?tourId=${id}`}>
            <Button variant="outline" disabled={sending}>🎤 {tr.question}</Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => handleSendMessage(1)}
            disabled={sending}
          >
            📷 {tr.photo}
          </Button>
          {/* <Button
            variant="outline"
            onClick={() => handleSendMessage(3)}
            disabled={sending}
          >
            💬 {tr.more}
          </Button> */}
        </div>
        <div className="flex justify-center mb-6">
          <Button
            variant="danger"
            size="lg"
            onClick={() => setShowEmergencyModal(true)}
            disabled={sending}
          >
            🆘 {tr.emergency}
          </Button>
        </div>

        <div className="space-y-4">
          {translatedForMe.length === 0 ? (
            <p className="text-gray-500 text-sm">{tr.noMessages}</p>
          ) : (
            [...translatedForMe].reverse().map((m) => (
              <Card key={m.id} className="space-y-2">
                <p className="text-base font-medium">🔊 {m.text}</p>
                <p className="text-xs text-gray-500">({m.originalText})</p>
                <p className="text-xs text-gray-400">📢 {getRelativeTime(m.timestamp)}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePlay(m.id)}
                  disabled={playingId !== null}
                >
                  🔊 {tr.listen}
                </Button>
              </Card>
            ))
          )}
        </div>
      </main>
    </>
  );
}
