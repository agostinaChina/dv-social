<script>
import BaseH1 from '../components/BaseH1.vue';
import { subscribeToAuthStateChange } from '../services/auth.js';
import { getLastPrivateChatMessages, sendPrivateChatMessage, subscribeToNewPrivateChatMessages  } from '../services/private-chat.js';
import { getUserProfileById } from '../services/user-profiles.js';


let unsubscribeFromChat = () => {}

export default {
    name: 'PrivateChat',
    components: { BaseH1, },
     data() {
        return {
            user: {
                id: null,
                email: null,
                bio: null,
                display_name: null,
                career: null,
            },

            // datos del interlocutor
            otherUser: {
                id: null,
                email: null,
                bio: null,
                display_name: null,
                career: null,
            },
            loadingOtherUser: false,

            messages: [],
            loadingMessages: false,

            newMessage: {
                body: '',
            },
        }
    },
    methods: {
        async handleMessageSend() {
            try {
                sendPrivateChatMessage({
                    sender_id: this.user.id,
                    receiver_id: this.otherUser.id,
                    body: this.newMessage.body,
                });
                this.newMessage.body = "";
            } catch (error) {
                throw error;
                // pendiente
            }
        }
    },
    async mounted() {
        try {
            subscribeToAuthStateChange(userData => this.user = userData);

            this.loadingOtherUser = true;
            this.otherUser = await getUserProfileById(this.$route.params.id);
            this.loadingOtherUser = false;

            // carga y suscripción de los msjs
            this.loadingMessages = true;
            this.messages = await getLastPrivateChatMessages({
                sender_id: this.user.id,
                receiver_id: this.otherUser.id,
            });
            this.loadingMessages = false;

            unsubscribeFromChat = await subscribeToNewPrivateChatMessages({
            sender_id: this.user.id,
            receiver_id: this.otherUser.id,
            callback: newMessage => this.messages.push(newMessage),
            });
        } catch (error) {
            throw error;
            // pendietne
        }
    },
    unmounted() {
        unsubscribeFromChat();
    }
}




</script>

<template>
    <div class="mx-auto max-w-4xl">
        <div class="mb-6 border-b border-violet-100 pb-5">
            <BaseH1>
                Conversación privada con {{ otherUser.display_name ?? otherUser.email }}
            </BaseH1>
            <p class="mt-2 text-sm text-slate-500">
                Tus mensajes y los de este usuario
            </p>
        </div>

        <section class="min-h-100 mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            <h2 class="sr-only">Lista de mensajes</h2>

            <ol class="flex flex-col items-start gap-3">
                <li
                    v-for="message in messages"
                    :key="message.id"
                    class="max-w-[85%] rounded-2xl p-4 shadow-sm"
                    :class="{
                        'bg-slate-100 text-slate-700': message.sender_id !== user.id,
                        'self-end bg-violet-100 text-violet-900': message.sender_id === user.id,
                    }"
                >
                    <div class="mb-2 wrap-break-word">
                        {{ message.body }}
                    </div>

                    <div class="text-xs text-slate-500">
                        {{ message.created_at }}
                    </div>
                </li>
            </ol>
        </section>

        <section>
            <h2 class="sr-only">Enviar un mensaje</h2>

            <form
                action="#"
                class="flex flex-col gap-3 sm:flex-row"
                @submit.prevent="handleMessageSend"
            >
                <label class="sr-only" for="body">Mensaje</label>

                <textarea
                    id="body"
                    class="w-full resize-none rounded-xl border border-slate-300 bg-white p-3 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    v-model="newMessage.body"
                    placeholder="Escribí tu mensaje..."
                    rows="3"
                ></textarea>

                <button
                    type="submit"
                    class="rounded-xl bg-violet-700 px-6 py-3 font-medium text-white transition hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 sm:self-end"
                >
                    Enviar
                </button>
            </form>
        </section>
    </div>
</template>
