"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import toast from "react-hot-toast";
import { useApp } from "@/contexts/AppContext";
import { generateTourCode } from "@/lib/utils";
import type { Tour } from "@/types";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";

export default function TourCreatePage() {
  const router = useRouter();
  const { language, userName, addGuideTour } = useApp();
  const tr = t(language).tourCreate;
  const [step, setStep] = useState<"form" | "created">("form");
  const [name, setName] = useState("");
  const [date, setDate] = useState("2026-02-10");
  const [time, setTime] = useState("09:00");
  const [maxParticipants, setMaxParticipants] = useState(30);
  const [createdTour, setCreatedTour] = useState<Tour | null>(null);
  // 유효성 검사 오류 메시지
  const [nameError, setNameError] = useState("");
  const [dateError, setDateError] = useState("");

  const handleCreate = () => {
    // 유효성 검사 초기화
    setNameError("");
    setDateError("");

    let hasError = false;

    // 투어 이름 검사
    if (!name.trim()) {
      setNameError("제목을 입력하시오");
      hasError = true;
    }

    // 투어 날짜 검사 (오늘 날짜보다 이전인지 확인)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setDateError("날짜가 올바르지 않습니다");
      hasError = true;
    }

    // 오류가 있으면 중단
    if (hasError) {
      return;
    }

    const code = generateTourCode();
    const tour: Tour = {
      id: code,
      name: name.trim(),
      date,
      startTime: time,
      participants: 0,
      maxParticipants,
      status: "active",
      guideId: "guide1",
      guideName: userName || "Guide",
    };
    addGuideTour(tour);
    setCreatedTour(tour);
    setStep("created");
    toast.success(tr.created);
  };

  const handleCopy = () => {
    if (!createdTour) return;
    navigator.clipboard.writeText(createdTour.id);
    toast.success("복사됨");
  };

  const handleStartTour = () => {
    if (!createdTour) return;
    router.push(`/guide/tour/${createdTour.id}`);
  };

  if (step === "created" && createdTour) {
    return (
      <>
        <Header title={tr.created} showBack backHref="/guide" />
        <main className="p-4 max-w-lg mx-auto">
          <p className="text-gray-600 mb-6">{tr.inviteTitle}</p>
          <Card className="mb-4">
            <p className="text-sm text-gray-600 mb-1">{tr.tourCode}</p>
            <p className="text-2xl font-mono font-bold tracking-widest mb-2">
              {createdTour.id}
            </p>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              📋 {tr.copy}
            </Button>
          </Card>
          <Card className="mb-4 p-6 flex justify-center">
            <QRCode value={createdTour.id} size={200} level="M" />
          </Card>
          <div className="flex gap-2 mb-4">
            <Button variant="outline" size="sm">💾 {tr.saveImage}</Button>
            <Button variant="outline" size="sm">📤 {tr.shareKakao}</Button>
            <Button variant="outline" size="sm">📤 {tr.shareSms}</Button>
          </div>
          <Button fullWidth variant="primary" onClick={handleStartTour}>
            {tr.startTour}
          </Button>
        </main>
      </>
    );
  }

  return (
    <>
      <Header title={tr.title} showBack backHref="/guide" />
      <main className="p-4 max-w-lg mx-auto">
        <div className="space-y-4">
          <Input
            label={tr.name}
            placeholder={tr.namePlaceholder}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (nameError) setNameError("");
            }}
            error={nameError || undefined}
          />
          <Input
            label={tr.date}
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              if (dateError) setDateError("");
            }}
            error={dateError || undefined}
          />
          <Input
            label={tr.time}
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {tr.expectedSize}
            </label>
            <div className="flex gap-2 flex-wrap">
              {[10, 20, 30, 50].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setMaxParticipants(n)}
                  className={`px-4 py-2 rounded-xl border-2 min-h-[44px] ${
                    maxParticipants === n
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  ~{n}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-500">💡 {tr.autoLangNote}</p>
        </div>
        <Button fullWidth className="mt-8" onClick={handleCreate}>
          {tr.create}
        </Button>
      </main>
    </>
  );
}
