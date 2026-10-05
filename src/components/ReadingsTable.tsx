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

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
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
          {sorted.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-6 text-center text-gray-400">
                No readings yet.
              </td>
            </tr>
          )}
          {sorted.map((r) => {
            const status = classifyReading(r.systolic, r.diastolic);
            return (
              <tr key={r.id} className="border-t border-gray-100">
                <td className="px-4 py-2 whitespace-nowrap text-gray-600">
                  {format(new Date(r.recorded_at), "MMM d, yyyy HH:mm")}
                </td>
                <td className="px-4 py-2 font-medium">{r.systolic}</td>
                <td className="px-4 py-2 font-medium">{r.diastolic}</td>
                <td className="px-4 py-2">{r.pulse ?? "—"}</td>
                <td className="px-4 py-2">
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
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
  );
}
