
import { supabase } from './supabase';

/**
 * @param {{sender_id: string, email: string, body: string}} data
 */
export async function sendPublicChatMessages({ sender_id, email, body }) {
    const { error } = await supabase
        .from('public_chat_messages')
        .insert({
            sender_id,
            email,
            body,
        });

    if (error) {
        console.error('Error al enviar el nuevo mensaje en el chat.', error);
        throw new Error(error.message);
    }
}

/**
 * @returns {Promise<{id: number, email: string, body: string, create_At: string}[]>} 
 */

export async function getLastPublicChatMessages() {
    const { data, error } = await supabase
        .from('public_chat_messages')
        .select();

    if (error) {
        console.error('Error al traer los mensajes del chat.', error);
        throw new Error(error.message);
    }

    return data;
}

/**
 * @param {({id: number, email: string, body: string, create_At: string})=>void} callback
 */

export function subscribeToNewPublicChatMessages(callback) {
    console.log('Creando canal de chat');

    const chatChannel = supabase.channel('public_chat');

    chatChannel.on(
        'postgres_changes',
        {
            event: 'INSERT',
            schema: 'public',
            table: 'public_chat_messages'
        },
        payload => {
            callback(payload.new);
        }
    );

    chatChannel.subscribe();

    return () => {
        chatChannel.unsubscribe();
    };
}


