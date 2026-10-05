export type Reading = {
  id: string;
  user_id: string;
  recorded_at: string;
  systolic: number;
  diastolic: number;
  pulse: number | null;
  note: string | null;
  created_at: string;
};

export type RangePreset = "7" | "15" | "30" | "custom";

export function presetToStartDate(preset: Exclude<RangePreset, "custom">): Date {
  const days = Number(preset);
  const d = new Date();
  d.setDate(d.getDate() - (days - 1));
  d.setHours(0, 0, 0, 0);
  return d;
}

export function classifyReading(systolic: number, diastolic: number) {
  if (systolic >= 180 || diastolic >= 120) return { label: "Crisis", color: "#dc2626" };
  if (systolic >= 140 || diastolic >= 90) return { label: "Stage 2", color: "#ea580c" };
  if (systolic >= 130 || diastolic >= 80) return { label: "Stage 1", color: "#f59e0b" };
  if (systolic >= 120) return { label: "Elevated", color: "#eab308" };
  return { label: "Normal", color: "#16a34a" };
}
