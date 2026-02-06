"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useApp } from "@/contexts/AppContext";
import { fakeTours, fakeParticipants, guideQuickMessages, fakeTranslate } from "@/lib/mockData";
import { getRelativeTime } from "@/lib/utils";
import type { Message } from "@/types";
import type { LanguageCode } from "@/types";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/Badge";

const LANG_CODES: LanguageCode[] = ["ko", "en", "vi", "zh-CN", "zh-TW", "ja", "th", "id"];

type Tab = "message" | "participants" | "stats";

export default function GuideTourManagePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { language, tourMessages, addTourMessage, guideTours } = useApp();
  const tr = t(language).tourManage;
  const common = t(language).common;
  const [tab, setTab] = useState<Tab>("message");
  const [inputText, setInputText] = useState("");
  const [sending, setSending] = useState(false);

  const allTours = [...guideTours, ...fakeTours];
  const tour = allTours.find((t) => t.id === id);
  const messages = (tourMessages[id] ?? []) as Message[];

  const byLang = fakeParticipants.reduce<Record<string, typeof fakeParticipants>>((acc, p) => {
    const lang = p.language;
    if (!acc[lang]) acc[lang] = [];
    acc[lang].push(p);
    return acc;
  }, {});

  const onlineCount = fakeParticipants.filter((p) => p.isOnline).length;

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || sending) return;
    setSending(true);
    toast.loading(common.sending, { id: "send-msg" });
    await new Promise((r) => setTimeout(r, 500));
    const translatedTexts: Record<string, string> = {};
    for (const lang of LANG_CODES) {
      translatedTexts[lang] = fakeTranslate(text.trim(), lang);
    }
    const msg: Message = {
      id: `msg-${Date.now()}`,
      tourId: id,
      senderId: "guide1",
      senderName: "Guide",
      senderRole: "guide",
      originalText: text.trim(),
      translatedTexts,
      timestamp: new Date().toISOString(),
      isEmergency: false,
    };
    addTourMessage(id, msg);
    setInputText("");
    setSending(false);
    toast.success(common.messageSent, { id: "send-msg" });
  };

  const handleQuickMessage = (msg: string) => {
    handleSendMessage(msg);
  };

  if (!tour) {
    return (
      <>
        <Header title="투어" showBack backHref="/guide" />
        <main className="p-4">
          <p>투어를 찾을 수 없습니다.</p>
          <Link href="/guide"><Button className="mt-4">가이드 홈</Button></Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Header
        title={`${tour.name} (#${tour.id})`}
        showBack
        backHref="/guide"
        right={
          <>
            <span className="text-red-500 text-sm font-medium">🔴 LIVE</span>
            <span>⚙️</span>
            <span>🆘</span>
          </>
        }
      />
      <main className="p-4 max-w-lg mx-auto">
        <div className="flex gap-1 border-b border-gray-200 mb-4">
          <button
            type="button"
            onClick={() => setTab("message")}
            className={`px-4 py-2 rounded-t-lg font-medium ${
              tab === "message" ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600" : "text-gray-600"
            }`}
          >
            💬 {tr.message}
          </button>
          <button
            type="button"
            onClick={() => setTab("participants")}
            className={`px-4 py-2 rounded-t-lg font-medium ${
              tab === "participants" ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600" : "text-gray-600"
            }`}
          >
            👥 {tr.participants}
          </button>
          <button
            type="button"
            onClick={() => setTab("stats")}
            className={`px-4 py-2 rounded-t-lg font-medium ${
              tab === "stats" ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600" : "text-gray-600"
            }`}
          >
            📊 {tr.stats}
          </button>
        </div>

        {tab === "message" && (
          <>
            <p className="text-sm text-gray-600 mb-2">
              📊 {tour.participants}/{tour.maxParticipants}명 🟢
            </p>
            <p className="text-sm text-gray-500 mb-4">
              🇻🇳 {tour.languages?.vi ?? 0} 🇺🇸 {tour.languages?.en ?? 0} 🇰🇷 {tour.languages?.ko ?? 0}
            </p>
            <div className="mb-4">
              <Button variant="outline" fullWidth className="mb-2">
                🎤 {tr.voiceGuide}
              </Button>
              <div className="flex gap-2">
                <Input
                  placeholder={tr.textPlaceholder}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputText)}
                />
                <Button
                  variant="primary"
                  onClick={() => handleSendMessage(inputText)}
                  disabled={sending || !inputText.trim()}
                >
                  {tr.send}
                </Button>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700 mb-2">─── {tr.quickMessages} ───</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {guideQuickMessages.map((msg) => (
                <Button
                  key={msg}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickMessage(msg)}
                  disabled={sending}
                >
                  {msg}
                </Button>
              ))}
            </div>
            <p className="text-sm font-medium text-gray-700 mb-2">─── {tr.receivedMessages} ───</p>
            <div className="space-y-2">
              <Card className="bg-red-50 border-red-200">
                <p className="font-medium">🔴 Nguyen: 화장실 어디?</p>
                <p className="text-sm text-gray-600">📍 근정전 옆</p>
                <Button variant="ghost" size="sm">{tr.reply}</Button>
              </Card>
              <Card className="bg-yellow-50 border-yellow-200">
                <p className="font-medium">🟡 John: 사진 찍어주세요</p>
                <p className="text-sm text-gray-600">👍 알겠습니다</p>
                <Button variant="ghost" size="sm">{tr.reply}</Button>
              </Card>
              {messages.map((m) => (
                <Card key={m.id}>
                  <p className="text-sm text-gray-600">{m.originalText}</p>
                  <p className="text-xs text-gray-400">{getRelativeTime(m.timestamp)}</p>
                </Card>
              ))}
            </div>
          </>
        )}

        {tab === "participants" && (
          <>
            <p className="text-sm text-gray-600 mb-2">
              {tr.totalParticipants} ({fakeParticipants.length}/{tour.maxParticipants})
            </p>
            <div className="flex gap-2 mb-4">
              <Button variant="outline" size="sm">➕ {tr.inviteParticipants}</Button>
              <Button variant="outline" size="sm">📋 {tr.exportList}</Button>
            </div>
            <p className="text-sm font-medium text-gray-700 mb-2">─── {tr.byLanguage} ───</p>
            <div className="space-y-4">
              {Object.entries(byLang).map(([lang, list]) => (
                <div key={lang}>
                  <p className="font-medium text-gray-700 mb-1">
                    {list[0]?.flag} {list[0]?.languageName} ({list.length}명) ▼
                  </p>
                  <div className="space-y-1 pl-2">
                    {list.map((p) => (
                      <Card key={p.id} className="flex items-center justify-between py-2">
                        <div>
                          <span>{p.isOnline ? "🟢" : "🔴"}</span>
                          <span className="ml-2">{p.name}</span>
                          {!p.isOnline && (
                            <span className="text-xs text-gray-500 ml-1">(오프라인)</span>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">💬</Button>
                          <Button variant="ghost" size="sm">🚫 {tr.kick}</Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-2">
              <Button variant="outline" fullWidth>{tr.pauseTour}</Button>
              <Button variant="danger" fullWidth>{tr.endTour}</Button>
            </div>
          </>
        )}

        {tab === "stats" && (
          <>
            <p className="text-lg font-medium mb-4">{tr.totalParticipants}</p>
            <p className="text-2xl font-bold mb-6">총 {fakeParticipants.length}명</p>
            <p className="text-sm font-medium text-gray-700 mb-2">{tr.languageDistribution}</p>
            <ul className="space-y-1 mb-6">
              <li>🇻🇳 베트남어: 10명 (33%)</li>
              <li>🇺🇸 English: 8명 (27%)</li>
              <li>🇰🇷 한국어: 5명 (17%)</li>
              <li>🇨🇳 简体中文: 4명 (13%)</li>
              <li>🇹🇼 繁體中文: 2명 (7%)</li>
              <li>🇯🇵 日本語: 1명 (3%)</li>
            </ul>
            <p className="text-sm font-medium text-gray-700 mb-2">접속 상태</p>
            <p className="mb-4">🟢 {tr.online}: {onlineCount}명 (90%)</p>
            <p className="mb-6">🔴 {tr.offline}: {fakeParticipants.length - onlineCount}명 (10%)</p>
            <p className="text-sm font-medium text-gray-700 mb-2">{tr.activityStats}</p>
            <p>{tr.totalMessages}: 45건</p>
            <p>{tr.questions}: 12건</p>
            <p>{tr.emergencyAlerts}: 0건</p>
          </>
        )}
      </main>
    </>
  );
}
