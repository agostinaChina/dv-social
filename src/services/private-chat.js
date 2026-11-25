import { supabase } from "./supabase";

let privateChatsCache = {};

/**
 * 
 * @param {string[]} ids 
 * @returns {string[]}
 */
function sortUserIdsForPrivateChat(ids) {
    return ids.sort();
}


/**
 * 
 * @param {{ sender_id: string, receiver_id: string }} data
 * @returns {Promise<{id: number, user_id1: string, user_id2: string, created_at: string}|null>}
 */
async function getPrivateChatFor({sender_id, receiver_id}) {
    // ordenar los id
    const [ userId1, userId2 ] = sortUserIdsForPrivateChat([ sender_id, receiver_id ]);

    const { data, error } = await supabase
        .from('private_chats')
        .select()
        .eq('user_id1', userId1)
        .eq('user_id2', userId2);

    if(error) {
        console.error("Error al buscar el chat privado. ", error);
        throw new Error(error.message);
    }

    return data?.[0];
}


/**
 * 
 * @param {{ sender_id: string, receiver_id: string }} data
 * @returns {Promise<{id: number, user_id1: string, user_id2: string, created_at: string}>}
 */
async function createPrivateChat({ sender_id, receiver_id }) {
    // // ordenamos los ids
    // const [ userId1, userId2 ] = [ sender_id, receiver_id ].sort();
    const [ userId1, userId2 ] = sortUserIdsForPrivateChat([ sender_id, receiver_id ]);


    // creamos el chat y obtenemos sus datos
    const { data, error } = await supabase
        .from('private_chats')
        .insert({
            user_id1: userId1,
            user_id2: userId2,
        })
        .select();

    if(error) {
        console.error("Error al crear el chat privado. ", error);
        throw new Error(error.message);
    }

    return data[0];
}

/**
 * 
 * @param {{sender_id: string, receiver_id: string}} data
 * @returns {Promise<{id: number, user_id1: string, user_id2: string, created_at: string}>}
 */
async function getOrCreatePrivateChatFor({ sender_id, receiver_id }) {

        console.group('pidiendo el chat privado');

    const cacheKey = sortUserIdsForPrivateChat([ sender_id, receiver_id ]).join('_');
        console.log('buscando el chat en la cache');


    if(privateChatsCache[cacheKey]) {

       console.log('conversacion encontrada en la cache, retornandola ');
        console.groupEnd();
      return privateChatsCache[cacheKey];

    }
            console.log('la conversacion no se encontro en la cache, buscandola en la red');

    
    let chat = await getPrivateChatFor({ sender_id, receiver_id });
    
    if(!chat) {
        chat = await createPrivateChat({ sender_id, receiver_id });
    } else {
    }

    privateChatsCache[cacheKey] = chat;

    return chat;
}


/**
 * 
 * @param {{sender_id: string, receiver_id: string, body: string}} data
 */
export async function sendPrivateChatMessage({ body, sender_id, receiver_id }) {

    // necesitamos el chat privado antes
    const chat = await getOrCreatePrivateChatFor({ sender_id, receiver_id });

    if (!chat) {
        chat = await createPrivateChat({sender_id, receiver_id});  
    }

    const {error} = await supabase
        .from('private_chats_messages')
        .insert({
            chat_id: chat.id,
            sender_id,
            body,
        });

    if(error) {
        console.error("Error al enviar el mensaje del chat privado. ", error);
        throw new Error(error.message);
    }
}

/**
 * 
 * @param {{ sender_id: string, receiver_id: string }} data
 * @returns {Promise<{id: number, chat_id: number, sender_id: string, body: string, created_at: string}[]>}
 */
export async function getLastPrivateChatMessages({ sender_id, receiver_id }) {
   const chat = await getOrCreatePrivateChatFor({ sender_id, receiver_id });

    const { data, error } = await supabase
        .from('private_chats_messages')
        .select()
        .eq('chat_id', chat.id);

    if(error) {
        console.error("Error al traer los mensajes del chat privado. ", error);
        throw new Error(error.message);
    }

    return data;
}

/**
 * 
 * @param {{sender_id: string, receiver_id: string, callback: (newMessage: {id: number, chat_id: number, user_id: string, body: string, created_at: string}) => void}} data
 * @returns {Promise<() => void>} Desuscripción
 */

export async function subscribeToNewPrivateChatMessages({ sender_id, receiver_id, callback }) {
    const chat = await getOrCreatePrivateChatFor({ sender_id, receiver_id });

    const channel = supabase.realtime.channel(`private-chat:${chat.id}:messages`);

    channel.on(
        'postgres_changes',
        {
            event: 'INSERT',
            schema: 'public',
            table: 'private_chats_messages',
            filter: 'chat_id=eq.' + chat.id,
        },
        payload => {
            callback(payload.new);
        }
    );

    channel.subscribe();

    return () => {
        channel.unsubscribe();
    }
}