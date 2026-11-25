
<script>
import BaseH1 from '../components/BaseH1.vue';
import { supabase } from '../services/supabase.js';
import {
    sendPublicChatMessages,
    getLastPublicChatMessages,
    subscribeToNewPublicChatMessages
} from '../services/public-chat.js';
import { subscribeToAuthStateChange } from '../services/auth.js';

export default {
    name: 'PublicChat',
    components: { BaseH1 },

    data() {
        return {
            user: {
                id: null,
                email: null,
                bio: null,
                display_name: null,
                career: null,
            },
            messages: [],
            newMessage: {
                body: ''
            },
            unsubscribeFromChat: null,
        };
    },

    methods: {
        async handleMessageSend() {
            try {
                await sendPublicChatMessages({
                    sender_id: this.user.id,
                    email: this.user.email,
                    body: this.newMessage.body,
                });

                this.newMessage.body = "";
            } catch (error) {
                //PENDIENTE
            }
        }
    },

    async mounted() {
        try {
            subscribeToAuthStateChange(userData => this.user = userData);

            this.messages = await getLastPublicChatMessages();

            this.unsubscribeFromChat = subscribeToNewPublicChatMessages(
                newMessageData => this.messages.push(newMessageData)
            );

        } catch (error) {
            console.error('Error al cargar el chat:', error);
        }
    },

    beforeUnmount() {
        if (this.unsubscribeFromChat) {
            this.unsubscribeFromChat();
        }
    }
};
</script>

<template>
    <div class="mb-6">
        <BaseH1>Chat</BaseH1>
        <p class="mt-2 text-slate-500">
            Compartí ideas, hacé preguntas y conversá con la comunidad.
        </p>
    </div>

    <div class="flex flex-col gap-6 md:flex-row md:gap-4">
        <section class="min-h-100 w-full rounded-2xl border border-slate-200 bg-white p-4 md:mb-0 md:w-3/4 md:p-6">
            <h2 class="sr-only">Lista de mensajes</h2>

            <ol class="flex flex-col items-start gap-3">
                <li
                    v-for="message in messages"
                    :key="message.id"
                    class="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-violet-200"
                >
                    <div class="mb-2">
                        <RouterLink
                        :to=" '/usuario/' + message.sender_id" class="font-semibold text-violet-700">
                        <span>{{ message.email }}</span>
                        </RouterLink>
                        <span class="text-slate-600"> dijo:</span>
                    </div>

                    <div class="mb-3 whitespace-pre-wrap wrap-break-word text-slate-700">{{ message.body }}</div>

                    <div class="text-xs text-slate-500">{{ message.created_at }}</div>
                </li>
            </ol>
        </section>

        <section class="w-full rounded-2xl border border-slate-200 bg-white p-5 md:w-1/4 md:p-6">
            <h2 class="mb-5 text-xl font-bold text-slate-800">Enviar mensaje</h2>

            <form
                action="#"
                @submit.prevent="handleMessageSend"
            >
                <!-- <div class="mb-4">
                    <label class="mb-2 block text-sm font-medium text-slate-700" for="email">Email</label>

                    <input
                        type="email"
                        id="email"
                        class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                        v-model="newMessage.email"
                    >
                </div> -->

                <div class="mb-5">
                    <label class="mb-2 block text-sm font-medium text-slate-700" for="body">Mensaje</label>

                    <textarea
                        id="body"
                        class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                        rows="5"
                        v-model="newMessage.body"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    class="rounded-lg bg-violet-700 px-5 py-2.5 font-medium text-white transition hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-300"
                >
                    Enviar
                </button>
            </form>
        </section>
    </div>
</template>
