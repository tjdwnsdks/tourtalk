"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/contexts/AppContext";
import { Hamburger } from "./Hamburger";
import { LanguageSelector } from "./LanguageSelector";

type HeaderProps = {
  title?: string;
  showBack?: boolean;
  backHref?: string;
  right?: React.ReactNode;
};

export function Header({ title = "TourTalk", showBack, backHref = "/", right }: HeaderProps) {
  const router = useRouter();
  const { role } = useApp();

  const handleLogoClick = () => {
    if (role === "guide") {
      router.push("/guide");
    } else if (role === "tourist") {
      router.push("/tourist");
    } else {
      router.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-2 min-w-0">
        {showBack ? (
          <Link
            href={backHref}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
            aria-label="뒤로"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        ) : (
          <Hamburger />
        )}
        <h1
          className="font-bold text-lg truncate cursor-pointer hover:opacity-70 active:opacity-50 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleLogoClick();
            }
          }}
          aria-label="홈으로 이동"
        >
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        {right}
        <LanguageSelector />
      </div>
    </header>
  );
}
