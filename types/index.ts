/**
 * TourTalk MVP 0 - TypeScript 타입 정의 (PRD 957-1009)
 */

export type TourStatus = "active" | "waiting" | "completed";

export interface Tour {
  id: string;
  name: string;  // 기본 언어 제목 (하위 호환성 유지)
  nameTranslations?: Record<LanguageCode, string>;  // 다국어 번역 추가
  date: string;
  startTime: string;
  maxParticipants: number;
  participants: number;
  status: TourStatus;
  guideId: string;
  guideName: string;
  languages?: Record<string, number>;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  language: string;
  languageName: string;
  flag: string;
  isOnline: boolean;
  joinedAt: string;
  /** 참여 중인 투어 ID (표시 인원수·참여자 목록 일치용) */
  tourId?: string;
}

export interface Message {
  id: string;
  tourId: string;
  senderId: string;
  senderName: string;
  senderRole: "guide" | "tourist";
  originalText: string;
  translatedTexts: Record<string, string>;
  timestamp: string;
  isEmergency: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  email: string;
  relation: string;
  isMember: boolean;
}

export type UserRole = "guide" | "tourist" | null;

export type LanguageCode =
  | "ko"
  | "en"
  | "vi"
  | "zh-CN"
  | "zh-TW"
  | "ja"
  | "th"
  | "id";
