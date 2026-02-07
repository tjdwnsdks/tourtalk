"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Settings, AlertCircle, Circle, Pause, Users, Plus } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { t, replaceName } from "@/lib/i18n";
import { fakeTours, getParticipantsForTour, getTourName } from "@/lib/mockData";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Header } from "@/components/layout/Header";

export default function GuideHomePage() {
  const router = useRouter();
  const { language, userName, guideTours } = useApp();
  const tr = t(language).guide;
  const allTours = [...guideTours, ...fakeTours].filter(
    (t) => t.status === "active" || t.status === "waiting"
  );
  const completedTours = [...guideTours, ...fakeTours].filter(
    (t) => t.status === "completed"
  );

  return (
    <>
      <Header
        title={tr.home}
        right={
          <>
            <Settings className="w-5 h-5 text-gray-600" />
            <AlertCircle className="w-5 h-5 text-red-500" />
          </>
        }
      />
      <main className="p-4 max-w-lg mx-auto">
        <h2 className="text-xl font-bold mb-6">
          {replaceName(tr.hello, userName || "Guide")}
        </h2>
        <p className="text-sm font-medium text-gray-600 mb-3">{tr.activeTours}</p>
        <div className="space-y-3 mb-6">
          {allTours.length === 0 ? (
            <p className="text-gray-500 text-sm">활성 투어가 없습니다.</p>
          ) : (
            allTours.map((tour) => (
              <Card key={tour.id} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{getTourName(tour, language)}</h3>
                    <p className="text-sm text-gray-600">#{tour.id}</p>
                  </div>
                  <Badge variant={tour.status === "active" ? "success" : "warning"}>
                    {tour.status === "active" ? (
                      <>
                        <Circle className="w-3 h-3 fill-green-500 text-green-500 inline mr-1" />
                        {tr.live}
                      </>
                    ) : (
                      <>
                        <Pause className="w-3 h-3 inline mr-1" />
                        {tr.waiting}
                      </>
                    )}
                  </Badge>
                </div>
                <p className="text-sm flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {getParticipantsForTour(tour.id).length}/{tour.maxParticipants}{tr.participants}
                </p>
                <Link href={`/guide/tour/${tour.id}`}>
                  <Button variant="primary" size="sm" fullWidth>
                    {tr.openTour}
                  </Button>
                </Link>
              </Card>
            ))
          )}
        </div>
        <Link href="/guide/create">
          <Button fullWidth variant="primary" className="mb-6">
            <Plus className="w-4 h-4 inline mr-1" />
            {tr.newTour}
          </Button>
        </Link>
        {completedTours.length > 0 && (
          <>
            <p className="text-sm font-medium text-gray-600 mb-2">
              {tr.completedTours} ({completedTours.length})
            </p>
            <div className="space-y-2">
              {completedTours.slice(0, 3).map((tour) => (
                <Card key={tour.id}>
                  <p className="font-medium">{getTourName(tour, language)}</p>
                  <p className="text-sm text-gray-600">#{tour.id}</p>
                </Card>
              ))}
              <p className="text-sm text-gray-500">{tr.more} ▼</p>
            </div>
          </>
        )}
      </main>
    </>
  );
}
