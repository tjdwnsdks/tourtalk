"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Mic, Users, MessageSquare, BarChart3, Circle, Search } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { fakeTours, getParticipantsForTour, guideQuickMessages, fakeTranslate, getTourName, fakeParticipants } from "@/lib/mockData";
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

// 샘플 받은 메시지 다국어 데이터
const sampleMessages: Record<LanguageCode, { message1: string; reply1: string; message2: string; reply2: string }> = {
  ko: {
    message1: "🟡 John: 사진 찍어주세요",
    reply1: "👍 알겠습니다",
    message2: "🔴 Nguyen: 화장실 어디?",
    reply2: "📍 근정전 옆",
  },
  en: {
    message1: "🟡 John: Please take a photo",
    reply1: "👍 Sure",
    message2: "🔴 Nguyen: Where is the restroom?",
    reply2: "📍 Next to Geunjeongjeon",
  },
  vi: {
    message1: "🟡 John: Chụp ảnh giúp tôi",
    reply1: "👍 Được rồi",
    message2: "🔴 Nguyen: Nhà vệ sinh ở đâu?",
    reply2: "📍 Bên cạnh Geunjeongjeon",
  },
  "zh-CN": {
    message1: "🟡 John: 请给我拍照",
    reply1: "👍 好的",
    message2: "🔴 Nguyen: 洗手间在哪里？",
    reply2: "📍 勤政殿旁边",
  },
  "zh-TW": {
    message1: "🟡 John: 請給我拍照",
    reply1: "👍 好的",
    message2: "🔴 Nguyen: 洗手間在哪裡？",
    reply2: "📍 勤政殿旁邊",
  },
  ja: {
    message1: "🟡 John: 写真を撮ってください",
    reply1: "👍 承知しました",
    message2: "🔴 Nguyen: トイレはどこですか？",
    reply2: "📍 勤政殿の隣",
  },
  th: {
    message1: "🟡 John: ช่วยถ่ายรูปให้หน่อย",
    reply1: "👍 ได้เลย",
    message2: "🔴 Nguyen: ห้องน้ำอยู่ไหน？",
    reply2: "📍 ข้างพระที่นั่งกึนจองจอน",
  },
  id: {
    message1: "🟡 John: Tolong fotokan saya",
    reply1: "👍 Baik",
    message2: "🔴 Nguyen: Di mana toilet?",
    reply2: "📍 Di samping Geunjeongjeon",
  },
};

export default function GuideTourManagePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { language, tourMessages, addTourMessage, guideTours, tourParticipants, addTourParticipant } = useApp();
  const tr = t(language).tourManage;
  const common = t(language).common;
  const touristTr = t(language).tourist;
  const emergencyTr = t(language).emergency;
  const [tab, setTab] = useState<Tab>("message");
  const [inputText, setInputText] = useState("");
  const [sending, setSending] = useState(false);
  const [showPlayingPopup, setShowPlayingPopup] = useState(false);
  const [playingDots, setPlayingDots] = useState(1);
  const [showRecordingPopup, setShowRecordingPopup] = useState(false);
  const [recordingDots, setRecordingDots] = useState(1);
  // 참여자 초대 관련 상태
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchEmailError, setSearchEmailError] = useState("");
  const [searchResult, setSearchResult] = useState<{ id: string; name: string; email: string; isMember: boolean } | null>(null);

  const allTours = [...guideTours, ...fakeTours];
  const tour = allTours.find((t) => t.id === id);
  const messages = (tourMessages[id] ?? []) as Message[];
  // Mock 데이터의 참여자와 동적으로 추가된 참여자를 합침
  const mockParticipants = getParticipantsForTour(id);
  const addedParticipants = tourParticipants[id] ?? [];
  const participantsForTour = [...mockParticipants, ...addedParticipants];

  const byLang = participantsForTour.reduce<Record<string, typeof participantsForTour>>((acc, p) => {
    const lang = p.language;
    if (!acc[lang]) acc[lang] = [];
    acc[lang].push(p);
    return acc;
  }, {});

  const onlineCount = participantsForTour.filter((p) => p.isOnline).length;

  // 이메일 유효성 검사
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = (value: string): boolean => {
    return EMAIL_REGEX.test(value.trim());
  };

  // 회원 검색 핸들러
  const handleSearchParticipant = () => {
    const normalized = searchEmail.trim().toLowerCase();
    if (!normalized) {
      setSearchResult(null);
      setSearchEmailError("");
      return;
    }
    if (!isValidEmail(searchEmail)) {
      setSearchEmailError("올바른 이메일 형식을 입력해주세요.");
      setSearchResult(null);
      return;
    }
    setSearchEmailError("");
    const matches = fakeParticipants.filter((u) => u.email.toLowerCase() === normalized);
    if (matches.length > 0) {
      setSearchResult({
        id: matches[0].id,
        name: matches[0].name,
        email: matches[0].email,
        isMember: true,
      });
    } else {
      setSearchResult(null);
      setSearchEmailError("회원을 찾을 수 없습니다.");
    }
  };

  // 참여자 초대 핸들러
  const handleInviteParticipant = (user: { id: string; name: string; email: string; isMember: boolean }) => {
    // 이미 참여 중인지 확인
    if (participantsForTour.some((p) => p.email?.toLowerCase() === user.email.toLowerCase())) {
      setSearchEmailError("이미 참여 중인 회원입니다.");
      return;
    }

    // 새 참여자 객체 생성 (기본값 사용)
    const newParticipant = {
      id: `invited-${Date.now()}`,
      name: user.name,
      email: user.email,
      language: "ko" as const,
      languageName: "한국어",
      flag: "🇰🇷",
      isOnline: true,
      joinedAt: new Date().toISOString(),
      tourId: id,
    };

    // 투어에 참여자 추가
    addTourParticipant(id, newParticipant);

    toast.success(`${user.name}님을 초대했습니다.`);
    setSearchEmail("");
    setSearchResult(null);
    setShowInviteForm(false);
  };

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

  /** 빠른 메시지 전송 - 이미 번역된 다국어 텍스트 사용 */
  const handleQuickMessage = async (msgIndex: number) => {
    if (sending) return;
    setSending(true);
    toast.loading(common.sending, { id: "send-msg" });
    await new Promise((r) => setTimeout(r, 500));

    const quickMsg = guideQuickMessages[msgIndex];
    const translatedTexts: Record<string, string> = {};
    for (const lang of LANG_CODES) {
      translatedTexts[lang] = (quickMsg[lang as keyof typeof quickMsg] as string) || quickMsg.en || quickMsg.ko;
    }

    const msg: Message = {
      id: `msg-${Date.now()}`,
      tourId: id,
      senderId: "guide1",
      senderName: "Guide",
      senderRole: "guide",
      originalText: quickMsg.ko,
      translatedTexts,
      timestamp: new Date().toISOString(),
      isEmergency: false,
    };
    addTourMessage(id, msg);
    setSending(false);
    toast.success(common.messageSent, { id: "send-msg" });
  };

  /** 받은 메시지 TTS 재생 (듣기) - 화면 중앙 정사각형 팝업 표시 (나가기 버튼으로만 닫기) */
  const handleListen = (_text: string) => {
    setPlayingDots(1);
    setShowPlayingPopup(true);
    // TODO: 실제 TTS API 연동 시 text로 음성 재생
  };

  /** 음성으로 안내하기 - 화면 중앙 '녹음중' 팝업 표시 (완료 버튼으로만 닫기) */
  const handleVoiceGuide = () => {
    setRecordingDots(1);
    setShowRecordingPopup(true);
    // TODO: 실제 녹음 API 연동
  };

  /** 재생 중 팝업 표시 중일 때 마침표 1 → 2 → 3 → 1 반복 애니메이션 */
  useEffect(() => {
    if (!showPlayingPopup) return;
    const interval = setInterval(() => {
      setPlayingDots((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 400);
    return () => clearInterval(interval);
  }, [showPlayingPopup]);

  /** 녹음중 팝업 표시 중일 때 마침표 1 → 2 → 3 → 1 반복 애니메이션 */
  useEffect(() => {
    if (!showRecordingPopup) return;
    const interval = setInterval(() => {
      setRecordingDots((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 400);
    return () => clearInterval(interval);
  }, [showRecordingPopup]);

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
              onClick={() => setShowPlayingPopup(false)}
            >
              {common.exit}
            </Button>
          </div>
        </div>
      )}
      {/* 녹음중 팝업: 완료 버튼 클릭 시에만 닫힘 */}
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
              onClick={() => setShowRecordingPopup(false)}
            >
              {emergencyTr.done}
            </Button>
          </div>
        </div>
      )}
      <Header
        title={`${getTourName(tour, language)} (#${tour.id})`}
        showBack
        backHref="/guide"
      />
      <main className="p-4 max-w-lg mx-auto">
        <div className="flex gap-1 border-b border-gray-200 mb-4">
          <button
            type="button"
            onClick={() => setTab("message")}
            className={`px-4 py-2 rounded-t-lg font-medium flex items-center gap-1 ${
              tab === "message" ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600" : "text-gray-600"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            {tr.message}
          </button>
          <button
            type="button"
            onClick={() => setTab("participants")}
            className={`px-4 py-2 rounded-t-lg font-medium flex items-center gap-1 ${
              tab === "participants" ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600" : "text-gray-600"
            }`}
          >
            <Users className="w-5 h-5" />
            {tr.participants}
          </button>
          <button
            type="button"
            onClick={() => setTab("stats")}
            className={`px-4 py-2 rounded-t-lg font-medium flex items-center gap-1 ${
              tab === "stats" ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600" : "text-gray-600"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            {tr.stats}
          </button>
        </div>

        {tab === "message" && (
          <>
            <p className="text-sm text-gray-600 mb-2">
              📊 {participantsForTour.length}/{tour.maxParticipants}명 🟢
            </p>
            <p className="text-sm text-gray-500 mb-4">
              🇻🇳 {tour.languages?.vi ?? 0} 🇺🇸 {tour.languages?.en ?? 0} 🇰🇷 {tour.languages?.ko ?? 0}
            </p>
            <div className="mb-4">
              <Button variant="outline" fullWidth className="mb-2" onClick={handleVoiceGuide}>
                <Mic className="w-4 h-4 inline mr-1" />
                {tr.voiceGuide}
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
                  className="w-[80px] min-w-[80px] shrink-0"
                  onClick={() => handleSendMessage(inputText)}
                  disabled={sending || !inputText.trim()}
                >
                  {tr.send}
                </Button>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700 mb-2">─── {tr.quickMessages} ───</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {guideQuickMessages.map((msg, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickMessage(idx)}
                  disabled={sending}
                >
                  {msg[language] || msg.ko}
                </Button>
              ))}
            </div>
            <p className="text-sm font-medium text-gray-700 mb-2">─── {tr.receivedMessages} ───</p>
            <div className="space-y-2">
              {[...messages].reverse().map((m) => (
                <Card key={m.id}>
                  <p className="text-sm text-gray-600">{m.originalText}</p>
                  <p className="text-xs text-gray-400">{getRelativeTime(m.timestamp)}</p>
                  <div className="flex gap-1 mt-1">
                    <Button variant="ghost" size="sm" onClick={() => handleListen(m.originalText)}>
                      🔊 {touristTr.listen}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleVoiceGuide}>{tr.reply}</Button>
                  </div>
                </Card>
              ))}
              <Card className="bg-yellow-50 border-yellow-200">
                <p className="font-medium">{sampleMessages[language].message1}</p>
                <p className="text-sm text-gray-600">{sampleMessages[language].reply1}</p>
                <div className="flex gap-1 mt-1">
                  <Button variant="ghost" size="sm" onClick={() => handleListen(sampleMessages[language].message1)}>
                    🔊 {touristTr.listen}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleVoiceGuide}>{tr.reply}</Button>
                </div>
              </Card>
              <Card className="bg-red-50 border-red-200">
                <p className="font-medium">{sampleMessages[language].message2}</p>
                <p className="text-sm text-gray-600">{sampleMessages[language].reply2}</p>
                <div className="flex gap-1 mt-1">
                  <Button variant="ghost" size="sm" onClick={() => handleListen(sampleMessages[language].message2)}>
                    🔊 {touristTr.listen}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleVoiceGuide}>{tr.reply}</Button>
                </div>
              </Card>
            </div>
          </>
        )}

        {tab === "participants" && (
          <>
            <p className="text-sm text-gray-600 mb-2">
              {tr.totalParticipants} ({participantsForTour.length}/{tour.maxParticipants})
            </p>

            {/* 참여자 초대하기 버튼 */}
            {!showInviteForm ? (
              <Button
                variant="outline"
                fullWidth
                className="mb-4"
                onClick={() => setShowInviteForm(true)}
              >
                ➕ {tr.inviteParticipants}
              </Button>
            ) : (
              <Card className="mb-4 space-y-3">
                <p className="text-sm font-medium text-gray-700">{emergencyTr.searchMember}</p>
                <div className="flex gap-2">
                  <Input
                    placeholder={emergencyTr.searchPlaceholder}
                    value={searchEmail}
                    onChange={(e) => {
                      setSearchEmail(e.target.value);
                      if (searchEmailError) setSearchEmailError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleSearchParticipant()}
                    type="email"
                    error={searchEmailError || undefined}
                  />
                  <Button variant="primary" onClick={handleSearchParticipant}>
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
                {searchResult && (
                  <Card className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">👤 {searchResult.name}</p>
                      <p className="text-sm text-gray-600">{searchResult.email}</p>
                      <span className="text-xs">{searchResult.isMember ? `✓ ${emergencyTr.member}` : emergencyTr.nonMember}</span>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleInviteParticipant(searchResult)}
                    >
                      {tr.invite || "초대"}
                    </Button>
                  </Card>
                )}
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowInviteForm(false);
                      setSearchEmail("");
                      setSearchResult(null);
                      setSearchEmailError("");
                    }}
                  >
                    {emergencyTr.cancel}
                  </Button>
                </div>
              </Card>
            )}
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
                        <div className="flex items-center gap-2">
                          <Circle className={`w-3 h-3 ${p.isOnline ? "fill-green-500 text-green-500" : "fill-gray-300 text-gray-300"}`} />
                          <span>{p.name}</span>
                          {!p.isOnline && (
                            <span className="text-xs text-gray-500">(오프라인)</span>
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
            <p className="text-2xl font-bold mb-6">총 {participantsForTour.length}명</p>
            <p className="text-sm font-medium text-gray-700 mb-2">{tr.languageDistribution}</p>
            <ul className="space-y-1 mb-6">
              {Object.entries(byLang).map(([lang, list]) => (
                <li key={lang}>
                  {list[0]?.flag} {list[0]?.languageName}: {list.length}명 (
                  {participantsForTour.length ? Math.round((list.length / participantsForTour.length) * 100) : 0}%)
                </li>
              ))}
            </ul>
            <p className="text-sm font-medium text-gray-700 mb-2">접속 상태</p>
            <p className="mb-4">🟢 {tr.online}: {onlineCount}명 (
              {participantsForTour.length ? Math.round((onlineCount / participantsForTour.length) * 100) : 0}%)</p>
            <p className="mb-6">🔴 {tr.offline}: {participantsForTour.length - onlineCount}명 (
              {participantsForTour.length ? Math.round(((participantsForTour.length - onlineCount) / participantsForTour.length) * 100) : 0}%)</p>
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
