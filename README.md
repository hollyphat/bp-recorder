# BP Recorder

Simple blood pressure tracker. Google login, log systolic/diastolic/pulse readings, view history and trend charts over 7/15/30 days or a custom range.

## Setup

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free project.
2. In **SQL Editor**, run the contents of [`supabase/schema.sql`](supabase/schema.sql) to create the `readings` table and its row-level security policies.
3. In **Authentication > Sign In / Providers**, enable **Google**.
   - You'll need a Google OAuth Client ID/Secret from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) (OAuth consent screen + "Web application" credentials).
   - Set the authorized redirect URI to the callback URL Supabase shows you (looks like `https://<project-ref>.supabase.co/auth/v1/callback`).
4. In **Authentication > URL Configuration**, add your app's URL (e.g. `http://localhost:3000` for dev, and your deployed URL later) to **Site URL** and **Redirect URLs** (`.../auth/callback`).
5. Copy your **Project URL** and **anon public key** from **Project Settings > API**.

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying (so it's usable from anywhere)

Push this repo to GitHub and import it into [Vercel](https://vercel.com) (free tier). Add the same two environment variables in the Vercel project settings, then add your production URL to Supabase's Site URL / Redirect URLs.
