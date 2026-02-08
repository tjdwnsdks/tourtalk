"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, User, AlertCircle, UserCog, LogOut } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { t } from "@/lib/i18n";

export function Hamburger() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { language, logout } = useApp();
  const tr = t(language);

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/");
  };

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
          <div className="absolute left-0 top-full mt-1 z-20 w-64 rounded-xl border border-gray-200 bg-white shadow-lg py-2">
            {/* 설정 섹션 헤더 */}
            <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {tr.menu.settings}
            </div>

            {/* Profile 설정 */}
            <Link
              href="/onboarding/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-800 hover:bg-gray-50 transition-colors min-h-[44px]"
            >
              <User className="w-5 h-5 text-gray-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium">{tr.menu.profile}</div>
                <div className="text-xs text-gray-500 truncate">{tr.menu.profileDesc}</div>
              </div>
            </Link>

            {/* Emergency 설정 */}
            <Link
              href="/onboarding/emergency"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-800 hover:bg-gray-50 transition-colors min-h-[44px]"
            >
              <AlertCircle className="w-5 h-5 text-gray-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium">{tr.menu.emergency}</div>
                <div className="text-xs text-gray-500 truncate">{tr.menu.emergencyDesc}</div>
              </div>
            </Link>

            {/* Role 설정 */}
            <Link
              href="/onboarding/role"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-800 hover:bg-gray-50 transition-colors min-h-[44px]"
            >
              <UserCog className="w-5 h-5 text-gray-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium">{tr.menu.role}</div>
                <div className="text-xs text-gray-500 truncate">{tr.menu.roleDesc}</div>
              </div>
            </Link>

            {/* 구분선 */}
            <div className="border-t border-gray-100 my-2"></div>

            {/* 로그아웃 버튼 */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors min-h-[44px] w-full text-left"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              <div className="font-medium">{tr.menu.logout}</div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
