"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { t } from "@/lib/i18n";

export function Hamburger() {
  const [open, setOpen] = useState(false);
  const { language } = useApp();
  const tr = t(language);

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
            <Link
              href="/onboarding/emergency"
              onClick={() => setOpen(false)}
              className="block w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-50"
            >
              긴급 연락망 설정
            </Link>
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
