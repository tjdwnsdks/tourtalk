"use client";

import type { EmergencyContact } from "@/types";
import { Button } from "@/components/ui/Button";

type EmergencyModalProps = {
  open: boolean;
  contacts: EmergencyContact[];
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  cancelLabel?: string;
  confirmLabel?: string;
};

export function EmergencyModal({
  open,
  contacts,
  onConfirm,
  onCancel,
  loading = false,
  cancelLabel = "취소",
  confirmLabel = "전송",
}: EmergencyModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
        <h3 className="text-lg font-bold mb-4">⚠️ 긴급 알림</h3>
        <p className="text-gray-600 mb-4">긴급 알림을 보내시겠습니까?</p>
        <p className="text-sm font-medium text-gray-700 mb-2">📱 알림 대상:</p>
        <ul className="text-sm text-gray-600 mb-4">
          {contacts.length > 0 ? (
            contacts.map((c) => (
              <li key={c.id}>• {c.name} ({c.isMember ? "✅ 앱 푸시" : "📧 이메일"})</li>
            ))
          ) : (
            <li>등록된 연락처 없음</li>
          )}
          <li>• 가이드</li>
        </ul>
        <p className="text-xs text-gray-500 mb-4">
          📍 현재 위치 정보와 투어 정보가 함께 전송됩니다
        </p>
        <div className="flex gap-2">
          <Button variant="ghost" fullWidth onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="danger" fullWidth onClick={onConfirm} disabled={loading}>
            🚨 {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
