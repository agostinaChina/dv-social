CREATE OR REPLACE FUNCTION public.create_user_with_profile(
    email text,
    password text,
    bio text,
    display_name text,
    career text
) RETURNS uuid AS $$
  declare
  user_id uuid;
  encrypted_pw text;
BEGIN
  user_id := gen_random_uuid();
  encrypted_pw := crypt(password, gen_salt('bf', 12));
  
  INSERT INTO auth.users
    (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
  VALUES
    ('00000000-0000-0000-0000-000000000000', user_id, 'authenticated', 'authenticated', email, encrypted_pw, now() at time zone 'utc', now() at time zone 'utc', now() at time zone 'utc', '{"provider":"email","providers":["email"]}', '{}', now() at time zone 'utc', now() at time zone 'utc', '', '', '', '');
  
  INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  VALUES
    (gen_random_uuid(), user_id, user_id, format('{"sub":"%s","email":"%s"}', user_id::text, email)::jsonb, 'email', now() at time zone 'utc', now() at time zone 'utc', now() at time zone 'utc');

  INSERT INTO public.user_profiles (id, email, bio, display_name, career)
  VALUES 
    (user_id, email, bio, display_name, career);

  RETURN user_id;
END;
$$ LANGUAGE plpgsql;

/**/
DO $$
    DECLARE
    user_id1 uuid;
    user_id2 uuid;
    user_id3 uuid;


  BEGIN
    -- PERFORM public.create_user_with_profile('agostina@prueba.com', '123456', 'Hola, soy Agostina y estoy probando esto', 'Agostina1234', 'Diseño y programación web');
    -- PERFORM public.create_user_with_profile('pepe@pepito.com', '123456', 'Estudiante de Sistemas', 'Pepito pepin', 'Analista de sistemas');

    user_id1 := public.create_user_with_profile('agostina@prueba.com', '123456', 'Hola, soy Agostina y estoy probando esto', 'Agostina1234', 'Diseño y programación web');
    user_id2 := public.create_user_with_profile('pepe@pepito.com', '123456', 'Estudiante de Sistemas', 'Pepito pepin', 'Analista de sistemas');
    user_id3 := public.create_user_with_profile('carlitos@tevez.com','123456','Hola, soy Carlos','Carlitos Tevez', 'Fútbol'
);

    INSERT INTO public_chat_messages (sender_id, email, body, created_at)
    VALUES (user_id1, 'agostina@prueba.com', '¡Hola, estoy probando esto!', '2026-10-15 10:12:13+00:00'), 
    (user_id2, 'pepe@pepito.com', 'Cuando es el parcial de Programacion 2?', '2026-10-13 10:13:54+00:00'),
    (user_id3, 'carlitos@tevez.com', '¿Cómo estás, Pepe?', '2026-10-14 10:14:37+00:00');

  END;
$$;

