"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useApp } from "@/contexts/AppContext";
import { fakeTours } from "@/lib/mockData";
import type { Tour } from "@/types";
import { t, replaceName } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/layout/Header";

const GUIDE_TOURS_KEY = "tourtalk_guide_tours";

function loadGuideTours(): Tour[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(GUIDE_TOURS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function TouristJoinPage() {
  const router = useRouter();
  const { language, userName, myTourIds, addTourId } = useApp();
  const tr = t(language).tourist;
  const common = t(language).common;
  const [code, setCode] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [joining, setJoining] = useState(false);
  const [guideCreatedTours, setGuideCreatedTours] = useState<Tour[]>([]);

  useEffect(() => {
    setGuideCreatedTours(loadGuideTours());
  }, []);

  const allTours = [...fakeTours, ...guideCreatedTours];
  const myTours = allTours.filter((t) => myTourIds.includes(t.id));

  const handleJoinByCode = () => {
    const normalized = code.replace(/\s/g, "").toUpperCase();
    const tour = allTours.find((t) => t.id.toUpperCase() === normalized);
    if (!tour) {
      toast.error(common.invalidCode);
      return;
    }
    setSelectedTour(tour);
    setShowConfirm(true);
  };

  const handleConfirmJoin = async () => {
    if (!selectedTour) return;
    setJoining(true);
    toast.loading(common.loading, { id: "join" });
    await new Promise((r) => setTimeout(r, 1000));
    addTourId(selectedTour.id);
    setJoining(false);
    toast.success(common.joinComplete, { id: "join" });
    setShowConfirm(false);
    setSelectedTour(null);
    setCode("");
    router.push(`/tourist/tour/${selectedTour.id}`);
  };

  const handleQRScan = async () => {
    toast.loading("📷 " + common.loading, { id: "qr" });
    await new Promise((r) => setTimeout(r, 1000));
    toast.success(common.scanComplete, { id: "qr" });
    setSelectedTour(allTours[0]);
    setShowConfirm(true);
  };

  return (
    <>
      <Header title="TourTalk" right={<><span>⚙️</span><span>🆘</span></>} />
      <main className="p-4 max-w-lg mx-auto">
        <h2 className="text-xl font-bold mb-6">
          {replaceName(tr.hello, userName || "Tourist")}
        </h2>
        <p className="text-gray-600 mb-6">{tr.join}</p>

        <div className="space-y-4 mb-6">
          <p className="text-sm font-medium text-gray-700">{tr.enterCode}</p>
          <Input
            placeholder={tr.codePlaceholder}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\s/g, "").toUpperCase().slice(0, 6))}
            className="font-mono text-lg tracking-widest"
          />
          <Button fullWidth onClick={handleJoinByCode} disabled={code.length < 4}>
            {tr.joinButton}
          </Button>
        </div>

        <p className="text-sm text-gray-600 mb-2">{tr.or}</p>
        <Button fullWidth variant="outline" onClick={handleQRScan} className="mb-8">
          📷 {tr.scanQR}
        </Button>

        {myTours.length > 0 && (
          <>
            <p className="text-sm font-medium text-gray-700 mb-2">
              {tr.myTours} ({myTours.length})
            </p>
            <div className="space-y-2">
              {myTours.map((tour) => (
                <Card key={tour.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">{tour.name}</p>
                    <p className="text-sm text-gray-600">{tr.guide}: {tour.guideName}</p>
                  </div>
                  <Link href={`/tourist/tour/${tour.id}`}>
                    <Button variant="primary" size="sm">{tr.enter}</Button>
                  </Link>
                </Card>
              ))}
            </div>
          </>
        )}

      </main>

      {showConfirm && selectedTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-bold mb-4">{tr.tourInfo}</h3>
            <p className="font-bold text-xl mb-1">{selectedTour.name}</p>
            <p className="text-sm text-gray-600 mb-4">{tr.guide}: {selectedTour.guideName}</p>
            <p className="text-sm">📅 {selectedTour.date}</p>
            <p className="text-sm">🕐 {selectedTour.startTime} {tr.time}</p>
            <p className="text-sm mb-4">👥 {selectedTour.participants}{tr.participantsCount}</p>
            <p className="text-sm text-gray-600 mb-4">{tr.joinConfirm}</p>
            <div className="flex gap-2">
              <Button variant="ghost" fullWidth onClick={() => { setShowConfirm(false); setSelectedTour(null); }}>
                {tr.cancel}
              </Button>
              <Button fullWidth onClick={handleConfirmJoin} disabled={joining}>
                {tr.joinConfirmButton}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
