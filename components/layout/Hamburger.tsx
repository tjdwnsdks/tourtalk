"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { t, languageNames, languageFlags } from "@/lib/i18n";
import type { LanguageCode } from "@/types";

export function Hamburger() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useApp();
  const tr = t(language);
  const langs: LanguageCode[] = ["ko", "en", "vi", "zh-CN", "zh-TW", "ja", "th", "id"];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded-lg hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label="메뉴"
      >
        <Menu className="w-6 h-6" />
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-full mt-1 z-20 w-56 rounded-xl border border-gray-200 bg-white shadow-lg py-2">
            <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              {tr.menu.language}
            </div>
            {langs.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => {
                  setLanguage(lang);
                  setOpen(false);
                }}
                className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50"
              >
                <span>{languageFlags[lang]}</span>
                <span>{languageNames[lang]}</span>
              </button>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-2 px-4 text-sm text-gray-500">
              {tr.menu.settings}
            </div>
            <div className="px-4 py-1 text-sm text-gray-500">{tr.menu.help}</div>
            <div className="px-4 py-1 text-sm text-gray-500">{tr.menu.contact}</div>
          </div>
        </>
      )}
    </div>
  );
}
