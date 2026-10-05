# BP Recorder

I built this because I was tired of jotting blood pressure readings on random pieces of paper (and then losing them). It's a small, no-frills app: log your systolic/diastolic/pulse, see the trend on a chart, and check it from your phone, laptop, wherever — as long as you're signed in with Google.

No ads, no accounts to manage, no data going anywhere but your own database.

## What it does

- Log a reading in a few taps — the date/time is stamped automatically
- See your history as a table, with each reading flagged Normal/Elevated/Stage 1/Stage 2/Crisis (ACC/AHA guideline)
- A trend chart over the last 7, 15, or 30 days — or pick any custom date range
- Sign in with your Google account, nothing else to remember

## Getting it running

It's a Next.js app backed by Supabase (free tier is plenty for personal use). You'll need to set up your own Supabase project since this isn't a shared service — your readings stay in your own database.

### 1. Spin up a Supabase project

1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run [`supabase/schema.sql`](supabase/schema.sql) — this creates the `readings` table and locks it down so only you can read/write your own rows.
3. Under **Authentication > Sign In / Providers**, turn on **Google**.
   - You'll need an OAuth Client ID/Secret from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) — create a "Web application" credential and set its authorized redirect URI to the callback URL Supabase gives you (something like `https://<project-ref>.supabase.co/auth/v1/callback`).
4. Under **Authentication > URL Configuration**, add your app's URL to **Site URL** and **Redirect URLs** (e.g. `http://localhost:3000` while developing, plus `.../auth/callback`).
5. Grab your **Project URL** and **anon public key** from **Project Settings > API**.

### 2. Set your environment variables

```bash
cp .env.local.example .env.local
```

Paste in your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### 3. Run it

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and sign in.

## Taking it with you

Push this to a GitHub repo and import it into [Vercel](https://vercel.com) (free tier works fine). Add the same two environment variables there, then add your Vercel URL to Supabase's Site URL / Redirect URLs so sign-in works in production too. After that it's just a URL you can open from anywhere.
