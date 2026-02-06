/**
 * 유틸리티 함수
 */

/** 6자리 투어 코드 생성 (Mock) */
export function generateTourCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/** 상대 시간 표시 (예: 5분 전) */
export function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "방금 전";
  if (diffMins < 60) return `${diffMins}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  return `${diffDays}일 전`;
}

/** 이메일 정확 일치 검색 (개인정보 보호 - PRD 1210-1244) */
export function searchUserByEmail(
  email: string,
  userDatabase: { email: string }[]
): typeof userDatabase {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return [];
  return userDatabase.filter(
    (user) => user.email.toLowerCase() === normalized
  );
}
