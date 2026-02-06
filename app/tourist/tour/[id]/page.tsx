"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useApp } from "@/contexts/AppContext";
import { fakeTours } from "@/lib/mockData";
import { getRelativeTime } from "@/lib/utils";
import type { Tour } from "@/types";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/layout/Header";

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
  const { language, tourMessages } = useApp();
  const tr = t(language).tourist;
  const common = t(language).common;
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [guideTours, setGuideTours] = useState<Tour[]>([]);

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

  if (!tour) {
    return (
      <>
        <Header title="Tour" showBack backHref="/tourist" />
        <main className="p-4">
          <p>투어를 찾을 수 없습니다.</p>
          <Link href="/tourist"><Button className="mt-4">투어 참여</Button></Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Header
        title={`${tour.name} (#${tour.id})`}
        showBack
        backHref="/tourist"
        right={<><span>⚙️</span><span>🆘</span></>}
      />
      <main className="p-4 max-w-lg mx-auto">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
          <span className="text-lg">🎤</span>
          <span className="font-bold">{tour.guideName}</span>
          <span className="text-green-600">🟢</span>
          <span className="text-sm text-gray-600">👥 {tour.participants}명</span>
        </div>

        <div className="space-y-4 mb-6">
          {translatedForMe.length === 0 ? (
            <p className="text-gray-500 text-sm">아직 수신된 메시지가 없습니다. 가이드가 메시지를 보내면 여기에 번역된 내용이 표시됩니다.</p>
          ) : (
            translatedForMe.map((m) => (
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

        <div className="flex gap-2 justify-center mb-4">
          <Link href={`/tourist/request?tourId=${id}`}>
            <Button variant="outline">🎤 {tr.question}</Button>
          </Link>
          <Button variant="outline">📷 {tr.photo}</Button>
          <Button variant="outline">💬 {tr.more}</Button>
        </div>
        <div className="flex justify-center">
          <Button variant="danger" size="lg">
            🆘 {tr.emergency}
          </Button>
        </div>
      </main>
    </>
  );
}
