<script>
    import BaseH1 from '../components/BaseH1.vue';
    import { subscribeToAuthStateChange } from '../services/auth.js';

export default{
    name: 'Home',
    components: { BaseH1, },
    data(){
        return {
            user: {
                id: null, 
                email: null,
                bio: null,
                display_name: null,
                career: null,
            }
        }
    },

   mounted() {

        subscribeToAuthStateChange(userData => this.user = userData);
    },
}

</script>


<template>
    <div class="mb-6">
        <BaseH1>Mi perfil</BaseH1>
        <RouterLink to="/mi-perfil/editar" class=" text-violet-700 underline" >Editar</RouterLink>
        <RouterLink to="/mi-perfil/editar/foto" class=" text-violet-700 underline" >Editar foto</RouterLink>

        <p class="mt-2 text-slate-500">
            Consultá tu información dentro de la comunidad DV Social.
        </p>
    </div>

    <div class="mb-6 rounded-2xl border border-violet-100 bg-violet-50 p-6">
        <p class="mb-2 text-sm font-semibold text-violet-700">Sobre mí</p>
        <p class="leading-relaxed text-slate-700">
            {{ user.bio ?? 'Sin especificar..' }}
        </p>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 class="mb-5 text-xl font-bold text-slate-800">
            Mis datos
        </h2>

        <dl class="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div class="rounded-xl bg-slate-50 p-4">
                <dt class="mb-1 text-sm font-medium text-slate-500">Email</dt>
                <dd class="break-all font-medium text-slate-800">{{ user.email }}</dd>
            </div>

            <div class="rounded-xl bg-slate-50 p-4">
                <dt class="mb-1 text-sm font-medium text-slate-500">Nombre de usuario</dt>
                <dd class="font-medium text-slate-800">{{ user.display_name ?? 'Sin especificar..' }}</dd>
            </div>

            <div class="rounded-xl bg-slate-50 p-4 sm:col-span-2">
                <dt class="mb-1 text-sm font-medium text-slate-500">Carrera</dt>
                <dd class="font-medium text-slate-800">{{ user.career ?? 'Sin especificar..' }}</dd>
            </div>
        </dl>
    </div>
</template>
