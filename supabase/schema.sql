create extension if not exists "uuid-ossp";
create table if not exists social_accounts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  platform text not null check (platform in ('facebook','instagram','tiktok','linkedin')),
  username text not null,
  display_name text not null,
  page_id text,
  access_token text not null,
  token_expiry date,
  status text default 'active',
  followers text,
  avatar text,
  created_at timestamp with time zone default now()
);
create table if not exists scheduled_posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  account_ids uuid[] not null,
  message text not null,
  image_url text,
  scheduled_at timestamp with time zone not null,
  status text default 'queued',
  platform_response jsonb,
  created_at timestamp with time zone default now()
);
alter table social_accounts enable row level security;
alter table scheduled_posts enable row level security;
create policy "Users can manage own social accounts" on social_accounts for all using (auth.uid() = user_id);
create policy "Users can manage own posts" on scheduled_posts for all using (auth.uid() = user_id);
