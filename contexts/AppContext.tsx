"use client";

import React, { createContext, useContext, useCallback, useState, useEffect } from "react";
import type { LanguageCode, UserRole, Participant } from "@/types";
import type { EmergencyContact, Tour, Message } from "@/types";

const LANGUAGE_KEY = "tourtalk_language";
const ROLE_KEY = "tourtalk_role";
const USER_NAME_KEY = "tourtalk_user_name";
const EMERGENCY_KEY = "tourtalk_emergency";
const TOURS_KEY = "tourtalk_my_tours";
const GUIDE_TOURS_KEY = "tourtalk_guide_tours";
const TOUR_MESSAGES_KEY = "tourtalk_tour_messages";
const TOUR_PARTICIPANTS_KEY = "tourtalk_tour_participants";
const COMPLETED_ONBOARDING = "tourtalk_onboarding_done";

type AppState = {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  role: UserRole;
  setRole: (r: UserRole) => void;
  userName: string;
  setUserName: (name: string) => void;
  emergencyContacts: EmergencyContact[];
  setEmergencyContacts: (contacts: EmergencyContact[]) => void;
  myTourIds: string[];
  addTourId: (id: string) => void;
  guideTours: Tour[];
  addGuideTour: (tour: Tour) => void;
  tourMessages: Record<string, Message[]>;
  addTourMessage: (tourId: string, message: Message) => void;
  tourParticipants: Record<string, Participant[]>;
  addTourParticipant: (tourId: string, participant: Participant) => void;
  onboardingDone: boolean;
  setOnboardingDone: (done: boolean) => void;
  logout: () => void;
};

const defaultLanguage: LanguageCode = "ko";

const AppContext = createContext<AppState | null>(null);

function loadStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveStorage(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(defaultLanguage);
  const [role, setRoleState] = useState<UserRole>(null);
  const [userName, setUserNameState] = useState("");
  const [emergencyContacts, setEmergencyContactsState] = useState<EmergencyContact[]>([]);
  const [myTourIds, setMyTourIds] = useState<string[]>([]);
  const [guideTours, setGuideTours] = useState<Tour[]>([]);
  const [tourMessages, setTourMessages] = useState<Record<string, Message[]>>({});
  const [tourParticipants, setTourParticipants] = useState<Record<string, Participant[]>>({});
  const [onboardingDone, setOnboardingDoneState] = useState(false);

  useEffect(() => {
    setLanguageState(loadStorage(LANGUAGE_KEY, defaultLanguage));
    setRoleState(loadStorage(ROLE_KEY, null));
    setUserNameState(loadStorage(USER_NAME_KEY, ""));
    setEmergencyContactsState(loadStorage<EmergencyContact[]>(EMERGENCY_KEY, []));
    setMyTourIds(loadStorage<string[]>(TOURS_KEY, []));
    setGuideTours(loadStorage<Tour[]>(GUIDE_TOURS_KEY, []));
    setTourMessages(loadStorage<Record<string, Message[]>>(TOUR_MESSAGES_KEY, {}));
    setTourParticipants(loadStorage<Record<string, Participant[]>>(TOUR_PARTICIPANTS_KEY, {}));
    setOnboardingDoneState(loadStorage(COMPLETED_ONBOARDING, false));
  }, []);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    saveStorage(LANGUAGE_KEY, lang);
  }, []);

  const setRole = useCallback((r: UserRole) => {
    setRoleState(r);
    saveStorage(ROLE_KEY, r);
  }, []);

  const setUserName = useCallback((name: string) => {
    setUserNameState(name);
    saveStorage(USER_NAME_KEY, name);
  }, []);

  const setEmergencyContacts = useCallback((contacts: EmergencyContact[]) => {
    setEmergencyContactsState(contacts);
    saveStorage(EMERGENCY_KEY, contacts);
  }, []);

  const addTourId = useCallback((id: string) => {
    setMyTourIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      saveStorage(TOURS_KEY, next);
      return next;
    });
  }, []);

  const addGuideTour = useCallback((tour: Tour) => {
    setGuideTours((prev) => {
      if (prev.some((t) => t.id === tour.id)) return prev;
      const next = [...prev, tour];
      saveStorage(GUIDE_TOURS_KEY, next);
      return next;
    });
  }, []);

  const addTourMessage = useCallback((tourId: string, message: Message) => {
    setTourMessages((prev) => {
      const list = prev[tourId] ?? [];
      const next = { ...prev, [tourId]: [...list, message] };
      saveStorage(TOUR_MESSAGES_KEY, next);
      return next;
    });
  }, []);

  const addTourParticipant = useCallback((tourId: string, participant: Participant) => {
    setTourParticipants((prev) => {
      const list = prev[tourId] ?? [];
      // 중복 체크: 이미 같은 이메일의 참여자가 있으면 추가하지 않음
      if (list.some((p) => p.email === participant.email)) {
        return prev;
      }
      const next = { ...prev, [tourId]: [...list, participant] };
      saveStorage(TOUR_PARTICIPANTS_KEY, next);
      return next;
    });
  }, []);

  const setOnboardingDone = useCallback((done: boolean) => {
    setOnboardingDoneState(done);
    saveStorage(COMPLETED_ONBOARDING, done);
  }, []);

  const logout = useCallback(() => {
    // 모든 localStorage 데이터 초기화
    if (typeof window !== "undefined") {
      localStorage.removeItem(LANGUAGE_KEY);
      localStorage.removeItem(ROLE_KEY);
      localStorage.removeItem(USER_NAME_KEY);
      localStorage.removeItem(EMERGENCY_KEY);
      localStorage.removeItem(TOURS_KEY);
      localStorage.removeItem(GUIDE_TOURS_KEY);
      localStorage.removeItem(TOUR_MESSAGES_KEY);
      localStorage.removeItem(TOUR_PARTICIPANTS_KEY);
      localStorage.removeItem(COMPLETED_ONBOARDING);
    }

    // 상태 초기화
    setLanguageState(defaultLanguage);
    setRoleState(null);
    setUserNameState("");
    setEmergencyContactsState([]);
    setMyTourIds([]);
    setGuideTours([]);
    setTourMessages({});
    setTourParticipants({});
    setOnboardingDoneState(false);
  }, []);

  const value: AppState = {
    language,
    setLanguage,
    role,
    setRole,
    userName,
    setUserName,
    emergencyContacts,
    setEmergencyContacts,
    myTourIds,
    addTourId,
    guideTours,
    addGuideTour,
    tourMessages,
    addTourMessage,
    tourParticipants,
    addTourParticipant,
    onboardingDone,
    setOnboardingDone,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
