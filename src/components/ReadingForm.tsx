"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Reading } from "@/lib/readings";

export default function ReadingForm({
  userId,
  onSaved,
}: {
  userId: string;
  onSaved: (reading: Reading) => void;
}) {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setSystolic("");
    setDiastolic("");
    setPulse("");
    setNote("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const sys = Number(systolic);
    const dia = Number(diastolic);
    const pul = pulse ? Number(pulse) : null;

    if (!sys || !dia) {
      setError("Systolic and diastolic are required.");
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const { data, error: insertError } = await supabase
      .from("readings")
      .insert({
        user_id: userId,
        systolic: sys,
        diastolic: dia,
        pulse: pul,
        note: note || null,
      })
      .select()
      .single();
    setSaving(false);

    if (insertError || !data) {
      setError(insertError?.message ?? "Could not save reading.");
      return;
    }

    reset();
    onSaved(data as Reading);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      <h2 className="mb-3 text-sm font-semibold text-gray-700">New reading</h2>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Systolic
          </label>
          <input
            type="number"
            inputMode="numeric"
            required
            value={systolic}
            onChange={(e) => setSystolic(e.target.value)}
            placeholder="120"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Diastolic
          </label>
          <input
            type="number"
            inputMode="numeric"
            required
            value={diastolic}
            onChange={(e) => setDiastolic(e.target.value)}
            placeholder="80"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Pulse
          </label>
          <input
            type="number"
            inputMode="numeric"
            value={pulse}
            onChange={(e) => setPulse(e.target.value)}
            placeholder="70"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="mb-1 block text-xs font-medium text-gray-500">
          Note (optional)
        </label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. after walk, morning"
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={saving}
        className="mt-3 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {saving ? "Saving..." : "Add reading"}
      </button>
    </form>
  );
}
