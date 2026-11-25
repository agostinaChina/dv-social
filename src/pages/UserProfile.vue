
<script>
import BaseH1 from '../components/BaseH1.vue';
import { getUserProfileById } from '../services/user-profiles.js';

export default {
    name: 'UserProfile',
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
            loading: false,
        };
    },

    async mounted() {
        try {
            this.loading = true;
             this.user = await getUserProfileById(this.$route.params.id);

        } catch (error) {
            // ...
        }
        finally{
        this.loading = false;
        }
    }
};
</script>


<template>
    <div class="mx-auto max-w-3xl">
        <div class="mb-8 border-b border-violet-100 pb-5">
            <BaseH1>Perfil de {{ user.email }}</BaseH1>
            <p class="mt-2 text-sm text-slate-500">
                Información del usuario
            </p>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

            <p class="mb-8 rounded-xl bg-violet-50 p-4 text-slate-700">
                {{ user.bio || 'Sin especificar...' }}
            </p>

            <div class="space-y-6">

                <div>
                    <h2 class="mb-1 text-sm font-semibold text-violet-700">
                        Email
                    </h2>
                    <p class="text-slate-700">{{ user.email }}</p>
                </div>

                <div>
                    <h2 class="mb-1 text-sm font-semibold text-violet-700">
                        Nombre de usuario
                    </h2>
                    <p class="text-slate-700">
                        {{ user.display_name || 'Sin especificar...' }}
                    </p>
                </div>

                <div>
                    <h2 class="mb-1 text-sm font-semibold text-violet-700">
                        Carrera
                    </h2>
                    <p class="text-slate-700">
                        {{ user.career || 'Sin especificar...' }}
                    </p>
                </div>

            </div>
        </div>
    </div>
    <hr>
        <RouterLink 
        :to="`/usuario/${user.id}/chat`"
        class="text-violet-700 underline" 
    >Ir a la conversación privada con {{ user.email }}</RouterLink>
</template>
