<script>
import { supabase } from './services/supabase';
import { logout } from './services/auth.js';
import { subscribeToAuthStateChange } from './services/auth.js';

export default {
    name: 'App',

    data() {
        return {
            user: {
                id: null,
                email: null,
            }
        }
    },

    methods: {
       handleLogout() {
            try {
                logout();
                
                this.$router.push('/ingresar');
            } catch (error) {
                // pendiente.
            }
        }
    },

    mounted() {

        subscribeToAuthStateChange(userData => this.user = userData);
    }
}
</script>

<template>
<div class="flex min-h-screen flex-col">

<nav class="flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-4 text-slate-800 shadow-sm sm:px-6 md:flex-row md:items-center md:justify-between">
    <RouterLink class="text-xl font-bold tracking-tight text-violet-700" to="/">
        DV Social
    </RouterLink>

    <ul class="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium">
        <li>
            <RouterLink class="transition-colors hover:text-violet-700" to="/">
                Home
            </RouterLink>
        </li>

        <template v-if="user.id !== null">
            <li>
                <RouterLink class="transition-colors hover:text-violet-700" to="/chat">
                    Chat
                </RouterLink>
            </li>

            <li>
                <RouterLink class="transition-colors hover:text-violet-700" to="/mi-perfil">
                    Mi perfil
                </RouterLink>
            </li>

            <li class="w-full sm:w-auto">
                <form action="#" @submit.prevent="handleLogout">
                    <button
                        class="max-w-full break-all rounded-full bg-violet-100 px-4 py-2 text-left text-violet-800 transition-colors hover:bg-violet-200 sm:break-normal"
                        type="submit"
                    >
                        {{ user.email }} (Cerrar sesión)
                    </button>
                </form>
            </li>
        </template>

        <template v-else>
            <li>
                <RouterLink class="transition-colors hover:text-violet-700" to="/ingresar">
                    Ingresar
                </RouterLink>
            </li>

            <li>
                <RouterLink class="inline-block rounded-full bg-violet-700 px-4 py-2 text-white transition-colors hover:bg-violet-800" to="/crear-cuenta">
                    Crear cuenta
                </RouterLink>
            </li>
        </template>
    </ul>
</nav>

<main class="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">

    <RouterView></RouterView>
</main>

<footer class="flex justify-center items-center min-h-20 border-t border-slate-200 bg-white px-4 py-6 text-sm text-slate-500">

    <p>Da Vinci &copy; 2026</p>
</footer>

</div>
</template>
