"use client";

import { createClient } from "@/lib/supabase/client";

const features = [
  {
    title: "Log a reading in seconds",
    description: "Systolic, diastolic, pulse — done. The date is recorded for you.",
  },
  {
    title: "Watch your trend, not just numbers",
    description: "A chart of your last 7, 15, 30 days, or any custom range you pick.",
  },
  {
    title: "Your data, from any device",
    description: "Sign in with Google and pick up right where you left off — phone, tablet, laptop.",
  },
];

export default function LoginPage() {
  const signInWithGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21s-7.5-4.6-10-9.3C.5 8.1 2.3 4.5 6 4.5c2.1 0 3.6 1.2 4.5 2.4.3.4.9.4 1.2 0C12.6 5.7 14.1 4.5 16.2 4.5c3.7 0 5.5 3.6 4 7.2C19.5 16.4 12 21 12 21z"
                fill="#dc2626"
              />
              <path
                d="M4 12h3l1.5-3L11 15l1.5-5 1.5 2H20"
                stroke="#fff"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">BP Recorder</h1>
          <p className="mt-1 text-sm text-gray-500">
            A simple place to keep track of your blood pressure.
          </p>
        </div>

        <div className="mb-6 space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          {features.map((f) => (
            <div key={f.title} className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
              <div>
                <p className="text-sm font-medium text-gray-800">{f.title}</p>
                <p className="text-xs text-gray-500">{f.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={signInWithGoogle}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.8 32.4 29.3 35 24 35c-6.1 0-11.3-3.9-13.2-9.4H2.5v6.3C6.4 39.6 14.6 44 24 44c10.9 0 20.3-7.9 21.8-18.3h.2z"
            />
            <path
              fill="#FF3D00"
              d="M2.5 15.5l6.5 4.8C10.9 16.6 16.9 13 24 13c3.6 0 6.8 1.3 9.4 3.4l6.2-6.2C35.9 6.5 30.3 4 24 4 15.3 4 7.9 9.1 4.3 16.4z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 9.9-1.8 13.5-5l-6.2-5.3c-2.2 1.5-4.9 2.3-7.3 2.3-5.3 0-9.8-2.6-11.7-7l-6.4 4.9C9.6 39 16.2 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.1 5.5l6.2 5.3c3.6-3.3 6.6-8.4 6.6-15.8 0-1.2-.2-2.4-.4-3.5z"
            />
          </svg>
          Sign in with Google
        </button>

        <p className="mt-4 text-center text-xs text-gray-400">
          Only you can see your readings.
        </p>
      </div>
    </div>
  );
}
