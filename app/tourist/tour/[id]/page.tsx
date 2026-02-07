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
  const { language, tourMessages, addTourMessage, userName } = useApp();
  const tr = t(language).tourist;
  const common = t(language).common;
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [guideTours, setGuideTours] = useState<Tour[]>([]);
  const [sending, setSending] = useState(false);

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
    toast.loading(common.playing, { id: "play" });
    await new Promise((r) => setTimeout(r, 2000));
    setPlayingId(null);
    toast.success(common.playComplete, { id: "play" });
  };

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
          <Button
            variant="outline"
            onClick={() => handleSendMessage(3)}
            disabled={sending}
          >
            💬 {tr.more}
          </Button>
        </div>
        <div className="flex justify-center mb-6">
          <Button
            variant="danger"
            size="lg"
            onClick={() => handleSendMessage(5)}
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
