"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { presetToStartDate, Reading, RangePreset } from "@/lib/readings";
import ReadingForm from "@/components/ReadingForm";
import RangeSelector from "@/components/RangeSelector";
import ReadingsChart from "@/components/ReadingsChart";
import ReadingsTable from "@/components/ReadingsTable";

export default function DashboardClient({
  userId,
  userEmail,
  userAvatar,
}: {
  userId: string;
  userEmail: string;
  userAvatar: string | null;
}) {
  const router = useRouter();
  const [preset, setPreset] = useState<RangePreset>("7");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReadings = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();

    let startDate: Date;
    let endDate: Date = new Date();

    if (preset === "custom") {
      if (!customStart || !customEnd) {
        setLoading(false);
        return;
      }
      startDate = new Date(customStart);
      endDate = new Date(customEnd);
      endDate.setHours(23, 59, 59, 999);
    } else {
      startDate = presetToStartDate(preset);
    }

    const { data, error } = await supabase
      .from("readings")
      .select("*")
      .eq("user_id", userId)
      .gte("recorded_at", startDate.toISOString())
      .lte("recorded_at", endDate.toISOString())
      .order("recorded_at", { ascending: false });

    if (!error && data) {
      setReadings(data as Reading[]);
    }
    setLoading(false);
  }, [preset, customStart, customEnd, userId]);

  useEffect(() => {
    fetchReadings();
  }, [fetchReadings]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
        <h1 className="text-lg font-semibold text-gray-800">BP Recorder</h1>
        <div className="flex items-center gap-3">
          {userAvatar && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={userAvatar} alt="" className="h-7 w-7 rounded-full" />
          )}
          <span className="hidden text-sm text-gray-500 sm:inline">{userEmail}</span>
          <button
            onClick={handleSignOut}
            className="text-sm font-medium text-gray-500 hover:text-red-600"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-5 px-4 py-6 sm:px-6">
        <ReadingForm userId={userId} onSaved={fetchReadings} />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-semibold text-gray-700">History & trend</h2>
          <RangeSelector
            preset={preset}
            onPresetChange={setPreset}
            customStart={customStart}
            customEnd={customEnd}
            onCustomStartChange={setCustomStart}
            onCustomEndChange={setCustomEnd}
          />
        </div>

        {loading ? (
          <div className="flex h-72 items-center justify-center rounded-xl border border-gray-200 bg-white text-sm text-gray-400">
            Loading...
          </div>
        ) : (
          <>
            <ReadingsChart readings={readings} />
            <ReadingsTable readings={readings} onDeleted={fetchReadings} />
          </>
        )}
      </main>
    </div>
  );
}
