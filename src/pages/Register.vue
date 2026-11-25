<script>
import BaseH1 from '../components/BaseH1.vue';
import {register} from '../services/auth.js';

export default {
    name: 'Register',
    components: { BaseH1, },
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            loading: false,
        }
    },
    methods: {
        async handleSubmit() {
            try {
                this.loading = true;

                await register({
                    email: this.user.email,
                    password: this.user.password,
                });
                
                this.$router.push('/chat');
            } catch (error) {
                // pendiente...
            }
            this.loading = false;
        }
    }
}
</script>


<template>
    <div class="mx-auto w-full max-w-xl py-6 sm:py-10">
        <div class="mb-6">
            <BaseH1>Crear una nueva cuenta</BaseH1>
            <p class="mt-2 text-slate-500">
                Creá tu cuenta para formar parte de DV Social.
            </p>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <form
                action="#"
                @submit.prevent="handleSubmit"
            >
                <div class="mb-5">
                    <label class="mb-2 block text-sm font-medium text-slate-700" for="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        class="w-full rounded-lg border border-slate-300 px-3 py-3 text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                        v-model="user.email"
                    >
                </div>

                <div class="mb-6">
                    <label class="mb-2 block text-sm font-medium text-slate-700" for="password">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        class="w-full rounded-lg border border-slate-300 px-3 py-3 text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                        v-model="user.password"
                    >
                </div>

                <button
                    type="submit"
                    class="w-full rounded-lg bg-violet-700 px-5 py-3 font-semibold text-white transition hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-300 sm:w-auto"
                >
                    Crear cuenta
                </button>
            </form>
        </div>
    </div>
</template>
