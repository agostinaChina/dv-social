CREATE TABLE private_chats_messages (
    id bigint primary key generated always as identity,
    chat_id bigint not null references public.private_chats (id),
    sender_id uuid not null references auth.users (id),
    body text not null,
    created_at timestamptz default now()
);

ALTER PUBLICATION supabase_realtime ADD TABLE private_chats_messages;

REVOKE all ON private_chats_messages FROM anon, authenticated;
GRANT select, insert ON private_chats_messages TO authenticated;

ALTER TABLE private_chats_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can see the messages of private chats they belongs to"
ON private_chats_messages
FOR select
TO authenticated
USING(
EXISTS (
    SELECT 1 FROM private_chats
    WHERE private_chats.id = private_chats_messages.chat_id
    AND 
    (
        (select auth.uid()) = private_chats.user_id1
        OR
        (select auth.uid()) = private_chats.user_id2
)
)
AND
(select auth.uid()) = sender_id
);