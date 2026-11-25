<script>
import BaseH1 from '../components/BaseH1.vue';
import { updateAuthUserPhoto } from '../services/auth.js';

export default {
    name: 'EditProfileAvatar',
    components: { BaseH1, },
    data() {
        return {
            photo: {
                file: null,
                preview: null,
            },
            loading: false,
        }
    },
    methods: {
 
        handlePhotoChange(ev) {
            if(this.photo.preview) URL.revokeObjectURL(this.photo.preview);


            this.photo.file = ev.target.files[0];

            this.photo.preview = URL.createObjectURL(this.photo.file);
        },

        async handleSubmit() {
            try {
                this.loading = true;

                await updateAuthUserPhoto(this.photo.file);
            } catch (error) {
                // pendiente
                throw error;
            } finally {
                this.loading = false;
            }
        },
    },
    unmounted() {
        if(this.photo.preview) URL.revokeObjectURL(this.photo.preview);
    }
}
</script>

<template>
    <BaseH1>Cambiar mi foto de perfil</BaseH1>

    <div class="flex gap-4">
        <form 
            class="w-1/2"
            action="#"
            @submit.prevent="handleSubmit"
        >
            <h2 class="sr-only">Cambiar foto</h2>
            <div class="mb-3">
                <label class="block mb-2" for="file">Nueva foto</label>
                <input
                    type="file"
                    id="file"
                    class="w-full p-2 border border-gray-600 rounded"
                    @change="handlePhotoChange"
                >
            </div>
            <button type="submit" class="transition px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-600">Guardar cambios</button>
        </form>
        <section class="w-1/2">
            <h2>Previsualización</h2>
            <img 
                v-if="photo.preview"
                :src="photo.preview" 
                alt=""
            >
            <p v-else>No hay una foto elegida</p>
        </section>
    </div>
</template>