create table user_profiles (
    id uuid primary key references auth.users (id),
    email text not null,
    bio text,
    display_name text,
    career text,
    created_at timestamptz default now()
);

REVOKE all ON public.user_profiles from anon, authenticated;
GRANT select, insert, update ON public.user_profiles TO authenticated;

ALTER TABLE public.user_profiles enable row level security;

CREATE POLICY "Auth users can view profiles" --tienen q ser comillas dobles
ON public.user_profiles
FOR select
TO authenticated
USING();

CREATE POLICY "Auth users can create their profiles" --tienen q ser comillas dobles
ON public.user_profiles
FOR INSERT
TO authenticated
with CHECK (
 (select auth.uid()) = id
);

CREATE POLICY "Auth users can update their profile"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (
    (select auth.uid()) = id
)
WITH CHECK (
    (select auth.uid()) = id
);