"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/contexts/AppContext";
import { searchUserByEmail } from "@/lib/utils";
import { fakeParticipants } from "@/lib/mockData";
import type { EmergencyContact } from "@/types";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";

const MAX_CONTACTS = 5;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

export default function EmergencyPage() {
  const router = useRouter();
  const { language, role, emergencyContacts, setEmergencyContacts, setOnboardingDone, onboardingDone } = useApp();
  const tr = t(language).emergency;
  const trCommon = t(language).common;
  const [searchEmail, setSearchEmail] = useState("");
  const [searchEmailError, setSearchEmailError] = useState("");
  const [searchResult, setSearchResult] = useState<{ id: string; name: string; email: string; isMember: boolean } | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addEmailError, setAddEmailError] = useState("");
  const [addRelation, setAddRelation] = useState("");
  const [showEmptyWarning, setShowEmptyWarning] = useState(false);
  // 수정 기능 관련 상태
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editEmailError, setEditEmailError] = useState("");
  const [editRelation, setEditRelation] = useState("");

  const handleSearch = () => {
    const normalized = searchEmail.trim().toLowerCase();
    if (!normalized) {
      setSearchResult(null);
      setSearchEmailError("");
      return;
    }
    if (!isValidEmail(searchEmail)) {
      setSearchEmailError("올바른 이메일 형식을 입력해주세요.");
      setSearchResult(null);
      return;
    }
    setSearchEmailError("");
    const matches = fakeParticipants.filter((u) => u.email.toLowerCase() === normalized);
    if (matches.length > 0) {
      setSearchResult({
        id: matches[0].id,
        name: matches[0].name,
        email: matches[0].email,
        isMember: true, // fakeParticipants는 모두 회원
      });
    } else {
      setSearchResult(null);
    }
  };

  const handleAddFromSearch = (user: { id: string; name: string; email: string; isMember: boolean }) => {
    if (emergencyContacts.length >= MAX_CONTACTS) return;
    const newContact: EmergencyContact = {
      id: user.id,
      name: user.name,
      email: user.email,
      relation: "",
      isMember: user.isMember,
    };
    setEmergencyContacts([...emergencyContacts, newContact]);
    setSearchEmail("");
    setSearchResult(null);
  };

  const handleAddDirect = () => {
    if (emergencyContacts.length >= MAX_CONTACTS) return;
    if (!addEmail.trim()) {
      setAddEmailError("이메일을 입력해주세요.");
      return;
    }
    if (!isValidEmail(addEmail)) {
      setAddEmailError("올바른 이메일 형식을 입력해주세요.");
      return;
    }
    setAddEmailError("");
    const newContact: EmergencyContact = {
      id: `direct-${Date.now()}`,
      name: addName.trim() || "연락처",
      email: addEmail.trim(),
      relation: addRelation.trim(),
      isMember: false,
    };
    setEmergencyContacts([...emergencyContacts, newContact]);
    setAddName("");
    setAddEmail("");
    setAddRelation("");
    setShowAddForm(false);
  };

  const handleRemove = (id: string) => {
    setEmergencyContacts(emergencyContacts.filter((c) => c.id !== id));
  };

  // 수정 시작 핸들러
  const handleStartEdit = (contact: EmergencyContact) => {
    setEditingId(contact.id);
    setEditName(contact.name);
    setEditEmail(contact.email);
    setEditRelation(contact.relation);
    setEditEmailError("");
    setShowAddForm(false); // 직접 추가 폼 닫기
  };

  // 수정 취소 핸들러
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditEmail("");
    setEditRelation("");
    setEditEmailError("");
  };

  // 수정 저장 핸들러
  const handleSaveEdit = () => {
    // 이메일 유효성 검사 (기존 isValidEmail 함수 재사용)
    if (!editEmail.trim()) {
      setEditEmailError("이메일을 입력해주세요.");
      return;
    }
    if (!isValidEmail(editEmail)) {
      setEditEmailError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    setEditEmailError("");

    // 연락처 배열 업데이트 (map으로 해당 항목만 수정)
    const updatedContacts = emergencyContacts.map((c) => {
      if (c.id === editingId) {
        return {
          ...c,
          name: editName.trim() || c.name, // 비어있으면 기존 이름 유지
          email: editEmail.trim(),
          relation: editRelation.trim(),
        };
      }
      return c;
    });

    setEmergencyContacts(updatedContacts);
    handleCancelEdit();
  };

  const handleDone = () => {
    if (emergencyContacts.length === 0) {
      setShowEmptyWarning(true);
      return;
    }

    // 온보딩 완료 여부에 따라 분기
    if (onboardingDone) {
      // 설정 수정 모드: 역할에 따라 메인 페이지로 이동
      if (role === "guide") {
        router.push("/guide");
      } else if (role === "tourist") {
        router.push("/tourist");
      } else {
        router.push("/");
      }
    } else {
      // 온보딩 모드
      router.push("/onboarding/role");
    }
  };

  return (
    <>
      <Header
        title={tr.title}
        showBack
        backHref={onboardingDone ? (role === "guide" ? "/guide" : "/tourist") : "/onboarding/profile"}
      />
      <main className="p-4 max-w-lg mx-auto">
        <p className="text-gray-600 mb-6">🆘 {tr.subtitle}</p>

        <div className="space-y-4 mb-6">
          <p className="text-sm font-medium text-gray-700">{tr.searchMember}</p>
          <div className="flex gap-2">
            <Input
              placeholder={tr.searchPlaceholder}
              value={searchEmail}
              onChange={(e) => {
                setSearchEmail(e.target.value);
                if (searchEmailError) setSearchEmailError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              type="email"
              error={searchEmailError || undefined}
            />
            <Button variant="primary" onClick={handleSearch}>🔍</Button>
          </div>
          <p className="text-xs text-gray-500">💡 {tr.searchHint}</p>
          {searchResult && (
            <Card className="flex items-center justify-between">
              <div>
                <p className="font-medium">👤 {searchResult.name}</p>
                <p className="text-sm text-gray-600">{searchResult.email}</p>
                <span className="text-xs">{searchResult.isMember ? `✓ ${tr.member}` : tr.nonMember}</span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleAddFromSearch(searchResult)}
                disabled={emergencyContacts.length >= MAX_CONTACTS}
              >
                {tr.add}
              </Button>
            </Card>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-2">{tr.or}</p>
        {!showAddForm ? (
          <Button variant="outline" fullWidth onClick={() => {
            setShowAddForm(true);
            setEditingId(null); // 수정 모드 닫기
          }} className="mb-6">
            ➕ {tr.addEmail}
          </Button>
        ) : (
          <Card className="mb-6 space-y-3">
            <Input label={tr.relation} value={addRelation} onChange={(e) => setAddRelation(e.target.value)} placeholder="엄마" />
            <Input label={tr.name} value={addName} onChange={(e) => setAddName(e.target.value)} placeholder="" />
            <Input
              label={tr.email}
              type="email"
              value={addEmail}
              onChange={(e) => {
                setAddEmail(e.target.value);
                if (addEmailError) setAddEmailError("");
              }}
              placeholder=""
              error={addEmailError || undefined}
            />
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setShowAddForm(false)}>{tr.cancel}</Button>
              <Button variant="primary" onClick={handleAddDirect} disabled={!addEmail.trim()}>{tr.add}</Button>
            </div>
          </Card>
        )}

        <p className="text-sm font-medium text-gray-700 mb-2">
          {tr.contactsTitle} ({emergencyContacts.length}/{MAX_CONTACTS})
        </p>
        <div className="space-y-2 mb-6">
          {emergencyContacts.map((c) => {
            const isEditing = editingId === c.id;

            if (isEditing) {
              // 수정 모드: 기존 직접 입력 폼과 동일한 구조
              return (
                <Card key={c.id} className="space-y-3">
                  <Input
                    label={tr.relation}
                    value={editRelation}
                    onChange={(e) => setEditRelation(e.target.value)}
                    placeholder="엄마"
                  />
                  <Input
                    label={tr.name}
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder=""
                  />
                  <Input
                    label={tr.email}
                    type="email"
                    value={editEmail}
                    onChange={(e) => {
                      setEditEmail(e.target.value);
                      if (editEmailError) setEditEmailError("");
                    }}
                    placeholder=""
                    error={editEmailError || undefined}
                  />
                  <div className="flex gap-2">
                    <Button variant="ghost" onClick={handleCancelEdit}>
                      {tr.cancel}
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit} disabled={!editEmail.trim()}>
                      {trCommon.save}
                    </Button>
                  </div>
                </Card>
              );
            } else {
              // 표시 모드: 기존 UI + 수정 버튼 추가
              return (
                <Card key={c.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">👤 {c.name}</p>
                    {c.relation && <p className="text-xs text-gray-500">{c.relation}</p>}
                    <p className="text-xs">{c.isMember ? `✓ ${tr.member}` : tr.nonMember}</p>
                    <p className="text-sm text-gray-600">{c.email}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleStartEdit(c)}>
                      ✏️
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleRemove(c.id)}>
                      ×
                    </Button>
                  </div>
                </Card>
              );
            }
          })}
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="flex-1 min-w-0 !bg-[#ebebeb] hover:!bg-[#e0e0e0]"
            onClick={() => {
              if (onboardingDone) {
                // 설정 수정 모드: 역할에 따라 메인 페이지로 이동
                if (role === "guide") {
                  router.push("/guide");
                } else if (role === "tourist") {
                  router.push("/tourist");
                } else {
                  router.push("/");
                }
              } else {
                // 온보딩 모드
                router.push("/onboarding/role");
              }
            }}
          >
            {tr.later}
          </Button>
          <Button variant="primary" className="flex-1 min-w-0" onClick={handleDone}>
            {onboardingDone ? trCommon.save : tr.done}
          </Button>
        </div>
      </main>

      {showEmptyWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <p className="text-center text-gray-800">긴급 연락망 리스트에 이메일을 추가하세요</p>
            <Button fullWidth className="mt-4" onClick={() => setShowEmptyWarning(false)}>
              확인
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
