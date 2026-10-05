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

