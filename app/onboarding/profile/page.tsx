"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/contexts/AppContext";
import { t, languageNames, languageFlags } from "@/lib/i18n";
import type { LanguageCode } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Header } from "@/components/layout/Header";

const LANGUAGES: LanguageCode[] = ["ko", "en", "vi", "zh-CN", "zh-TW", "ja", "th", "id"];

export default function ProfilePage() {
  const router = useRouter();
  const { language, setLanguage, setUserName, userName } = useApp();
  // "User"는 로그인 시 기본값이므로 이름 칸에 채우지 않음
  const [name, setName] = useState(() => (userName && userName !== "User" ? userName : ""));
  const [phone, setPhone] = useState("");
  const [selectedLang, setSelectedLang] = useState(language);
  const [nameError, setNameError] = useState(false);

  // 헤더에서 언어 변경 시 프로필 화면 언어도 동기화
  useEffect(() => {
    setSelectedLang(language);
  }, [language]);

  const tr = t(selectedLang).profile;

  const handleNext = () => {
    const trimmed = name.trim();
    const isEmpty = trimmed === "";
    const isOnlyDigits = /^\d+$/.test(trimmed);
    if (isEmpty || isOnlyDigits) {
      setNameError(true);
      return;
    }
    setNameError(false);
    setUserName(trimmed);
    setLanguage(selectedLang);
    router.push("/onboarding/role");
  };

  return (
    <>
      <Header title={tr.welcome} showBack backHref="/" />
      <main className="p-4 max-w-lg mx-auto">
        <p className="text-gray-600 mb-6">{tr.firstTime}</p>
        <div className="space-y-10">
          <div>
            <Input
              label={tr.name}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError(false);
              }}
              
              wrapperClassName="mb-0"
            />
            {nameError && (
              <p className="text-sm text-red-600 mt-0 mb-0">{tr.invalidFormat}</p>
            )}
          </div>
          <div className="hidden">
            <p className="text-sm font-medium text-gray-700 mb-2">{tr.contactMethod}</p>
            <div className="flex flex-wrap gap-2 max-[380px]:flex-col">
              <Button variant="outline" size="md" className="max-[380px]:w-full">📧 {tr.emailOnly}</Button>
              <Button variant="outline" size="md" className="max-[380px]:w-full">📱 {tr.addPhone}</Button>
            </div>
          </div>
          <div>
            <Input
              label={tr.phoneOptional}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+82 10-1234-5678"
              type="tel"
              wrapperClassName="mb-0"
            />
            <p className="text-xs text-gray-500 mt-0 mb-0">💡 {tr.phoneHint}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{tr.language}</label>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value as LanguageCode)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base min-h-[44px]"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {languageFlags[lang]} {languageNames[lang]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button fullWidth className="mt-8" onClick={handleNext}>
          {tr.next}
        </Button>
      </main>
    </>
  );
}
