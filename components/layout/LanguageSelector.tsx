"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { t, languageNames, languageFlags } from "@/lib/i18n";
import type { LanguageCode } from "@/types";
import { Button } from "@/components/ui/Button";

const LANGUAGES: LanguageCode[] = ["ko", "en", "vi", "zh-CN", "zh-TW", "ja", "th", "id"];

export function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useApp();
  const tr = t(language);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 min-h-[44px]"
        aria-label="언어 선택"
      >
        <Globe className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium">
          {languageFlags[language]} {languageNames[language]}
        </span>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full max-h-[80vh] overflow-y-auto p-4">
            <h2 className="text-lg font-bold mb-4">언어 선택</h2>
            <p className="text-sm text-gray-500 mb-4">자주 사용되는 언어</p>
            <div className="space-y-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    setLanguage(lang);
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-gray-50 text-left"
                >
                  <span>{languageFlags[lang]}</span>
                  <span>{languageNames[lang]}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button
                fullWidth
                variant="primary"
                onClick={() => setOpen(false)}
              >
                {tr.common.confirm}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
