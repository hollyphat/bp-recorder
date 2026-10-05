"use client";

import { format } from "date-fns";
import { Reading, classifyReading } from "@/lib/readings";
import { createClient } from "@/lib/supabase/client";

export default function ReadingsTable({
  readings,
  onDeleted,
}: {
  readings: Reading[];
  onDeleted: () => void;
}) {
  const handleDelete = async (id: string) => {
    const supabase = createClient();
    await supabase.from("readings").delete().eq("id", id);
    onDeleted();
  };

  const sorted = readings
    .slice()
    .sort((a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime());

  if (sorted.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-4 py-6 text-center text-sm text-gray-400 shadow-sm">
        No readings yet.
      </div>
    );
  }

  return (
    <>
      {/* Card list — small screens */}
      <div className="space-y-2 sm:hidden">
        {sorted.map((r) => {
          const status = classifyReading(r.systolic, r.diastolic);
          return (
            <div
              key={r.id}
              className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs text-gray-500">
                  {format(new Date(r.recorded_at), "MMM d, yyyy HH:mm")}
                </span>
                <span
                  className="shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium text-white"
                  style={{ backgroundColor: status.color }}
                >
                  {status.label}
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-4">
                <div>
                  <span className="text-lg font-semibold text-gray-900">{r.systolic}</span>
                  <span className="text-gray-400">/</span>
                  <span className="text-lg font-semibold text-gray-900">{r.diastolic}</span>
                  <span className="ml-1 text-xs text-gray-500">mmHg</span>
                </div>
                {r.pulse != null && (
                  <div className="text-sm text-gray-600">
                    {r.pulse} <span className="text-xs text-gray-400">bpm</span>
                  </div>
                )}
              </div>
              {r.note && <p className="mt-1 text-sm text-gray-500">{r.note}</p>}
              <button
                onClick={() => handleDelete(r.id)}
                className="mt-2 text-xs text-gray-400 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>

      {/* Table — sm and up */}
      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:block">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs text-gray-500">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Sys</th>
              <th className="px-4 py-2">Dia</th>
              <th className="px-4 py-2">Pulse</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Note</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => {
              const status = classifyReading(r.systolic, r.diastolic);
              return (
                <tr key={r.id} className="border-t border-gray-100">
                  <td className="px-4 py-2 whitespace-nowrap text-gray-600">
                    {format(new Date(r.recorded_at), "MMM d, yyyy HH:mm")}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-900">{r.systolic}</td>
                  <td className="px-4 py-2 font-medium text-gray-900">{r.diastolic}</td>
                  <td className="px-4 py-2 text-gray-700">{r.pulse ?? "—"}</td>
                  <td className="px-4 py-2">
                    <span
                      className="whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium text-white"
                      style={{ backgroundColor: status.color }}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-500">{r.note ?? ""}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-xs text-gray-400 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
