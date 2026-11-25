import { supabase } from './supabase';

export async function uploadFile (filename, file, bucket = 'avatars') {
    const {error} = await supabase
    .storage
    .from(bucket)
    .upload(filename, file);

    if (error) {
        console.error("Error al subir el archivo. ", error);
        throw new error
    }

}