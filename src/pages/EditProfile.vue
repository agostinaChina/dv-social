<script>
    import BaseH1 from '../components/BaseH1.vue';
    import { subscribeToAuthStateChange, updateAuthUserProfile } from '../services/auth.js';

    export default{
    name: 'EditProfile',
    components: { BaseH1, },
    data() {
        return{
            profile: {
                bio: '',
                display_name: '',
                career: '',
            },
            loading: false,
        }
    },
    methods: {
            async handleSubmit() {
                try {
                    this.loading = true;
                    await updateAuthUserProfile(this.profile);
                    this.loading = false;
                } catch(error) {
                    // pendiente
                }
            },
        },

        mounted() {
            subscribeToAuthStateChange(userData => {
                // console.log('DATOS RECIBIDOS EN EDIT PROFILE:', userData);

                this.profile = {
                    bio: userData.bio,
                    display_name: userData.display_name,
                    career: userData.career,
                }
            });
        }
    }
</script>

    <template>
    <BaseH1>Actualizar mi información de perfil</BaseH1>

    <form
    action="#"
    @submit.prevent="handleSubmit"
>
    <div class="mb-4">
        <label class="block mb-2 text-sm font-medium text-gray-700" for="bio">
            Biografía
        </label>
        <textarea
            id="bio"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-500"
            v-model="profile.bio"
        ></textarea>
    </div>

    <div class="mb-4">
        <label class="block mb-2 text-sm font-medium text-gray-700" for="display_name">
            Nombre de usuario
        </label>
        <input
            type="text"
            id="display_name"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-500"
            v-model="profile.display_name"
        >
    </div>

    <div class="mb-4">
        <label class="block mb-2 text-sm font-medium text-gray-700" for="career">
            Carrera
        </label>
        <input
            type="text"
            id="career"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-500"
            v-model="profile.career"
        >
    </div>

    <button
        type="submit"
        class="rounded-lg bg-violet-700 px-5 py-2.5 font-medium text-white transition hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-300"
    >
        Guardar cambios
    </button>
</form>

</template>