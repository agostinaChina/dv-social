CREATE TABLE private_chats (
    id bigint primary key generated always as identity,
    user_id1 uuid not null references auth.users (id),
    user_id2 uuid not null references auth.users (id),
    created_at timestamptz default now()
);

REVOKE all ON private_chats FROM anon, authenticated;
GRANT select, insert ON private_chats TO authenticated;

ALTER TABLE private_chats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can see their private chats"
ON private_chats
FOR select
TO authenticated
USING (
    (select auth.uid()) = user_id1
    OR
    (select auth.uid()) = user_id2
);

CREATE POLICY "Authenticated users can create their private chats"
ON private_chats
FOR insert
TO authenticated
WITH CHECK (
    (select auth.uid()) = user_id1
    OR
    (select auth.uid()) = user_id2
);

CREATE INDEX "private_chats_user_id1_idx" ON private_chats (user_id1);
CREATE INDEX "private_chats_user_id2_idx" ON private_chats (user_id2);