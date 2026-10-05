-- Run this in the Supabase SQL editor (Project > SQL Editor > New query).

create table if not exists public.readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  recorded_at timestamptz not null default now(),
  systolic smallint not null check (systolic between 40 and 300),
  diastolic smallint not null check (diastolic between 20 and 200),
  pulse smallint check (pulse between 20 and 250),
  note text,
  created_at timestamptz not null default now()
);

create index if not exists readings_user_id_recorded_at_idx
  on public.readings (user_id, recorded_at desc);

alter table public.readings enable row level security;

create policy "Users can view their own readings"
  on public.readings for select
  using (auth.uid() = user_id);

create policy "Users can insert their own readings"
  on public.readings for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own readings"
  on public.readings for update
  using (auth.uid() = user_id);

create policy "Users can delete their own readings"
  on public.readings for delete
  using (auth.uid() = user_id);
