"use client";

import { RangePreset } from "@/lib/readings";

export default function RangeSelector({
  preset,
  onPresetChange,
  customStart,
  customEnd,
  onCustomStartChange,
  onCustomEndChange,
}: {
  preset: RangePreset;
  onPresetChange: (p: RangePreset) => void;
  customStart: string;
  customEnd: string;
  onCustomStartChange: (v: string) => void;
  onCustomEndChange: (v: string) => void;
}) {
  const options: { value: RangePreset; label: string }[] = [
    { value: "7", label: "7 days" },
    { value: "15", label: "15 days" },
    { value: "30", label: "30 days" },
    { value: "custom", label: "Custom" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex rounded-md border border-gray-300 bg-white p-0.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onPresetChange(opt.value)}
            className={`rounded px-3 py-1.5 text-xs font-medium transition ${
              preset === opt.value
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {preset === "custom" && (
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={customStart}
            onChange={(e) => onCustomStartChange(e.target.value)}
            className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-900"
          />
          <span className="text-xs text-gray-400">to</span>
          <input
            type="date"
            value={customEnd}
            onChange={(e) => onCustomEndChange(e.target.value)}
            className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-900"
          />
        </div>
      )}
    </div>
  );
}
