import { supabase } from './supabase';
import { createUserProfile, getUserProfileById, updateUserProfile } from './user-profiles';

let userData = {
     id: null,
     email: null,
     bio: null,
     display_name: null,
     career: null,
}

let observers = [];


        supabase.auth.onAuthStateChange((event, session) => {
            if (session !== null) {
                userData = {
                    id: session.user.id,
                    email: session.user.email,
                };
                // en paralelo quedan cargando los datos del perfil

                getUserProfileById(userData.id).then(profile => {
                    // console.log('PERFIL RECUPERADO:', profile);

                    if(!profile) return;

                    userData = {
                        ...userData,
                        bio: profile.bio,
                        display_name: profile.display_name,
                        career: profile.career,
                    }
// notificamos a los observers
                    notifyAll();
                })
                
            } else {
                userData = {
                    id: null,
                    email: null,
                    bio: null,
                    display_name: null,
                    career: null,
                };
            }

            notifyAll();
        });

/**
 * 
 * @param {{email: string, password: string}} data
 * @returns {Promise<{id: string, email: string}>}
 */


export async function register({email, password}) {
    const {data, error} = await supabase.auth 
        .signUp({email, password});

        if (error){
            console.error("Error al crear una nueva cuenta: ", error);
                    throw new Error (error.message);
        }

        // se crea el perfil del usuario

        await createUserProfile({
            id: data.user.id,
            email,
        });


        console.log('Usuario creado', data);

        return{
            id: data.user.id,
            email: data.user.email,
        }
    
};

/**
 * 
 * @param {{email: string, password: string}} data
 * @returns {Promise<{id: string, email: string}>}
 */


export async function login({email, password}) {
    const {data, error} = await supabase.auth .signInWithPassword(
        {
            email,
            password
        }
    );

    if (error){
            console.error("Error al iniciar sesión: ", error);
                    throw new Error (error.message);
        }
        console.log('Usuario autenticado', data);

        return{
            id: data.user.id,
            email: data.user.email,
        }
    
}


export async function logout() {
    const {error} = await supabase.auth .signOut();

    if (error){
        console.error('Error al cerrar sesión: ', error);
                            throw new Error (error.message);

    }
    
}

// patron observar

/**
 * 
 * @param {()=>{}} callback
 */

export function subscribeToAuthStateChange(callback){
observers.push(callback);

notify(callback);

  return () => {
        observers = observers.filter(obs => obs !== callback);
    }
}


function notify(callback){

    callback({...userData});

}

function notifyAll(){
    observers.forEach(observer => notify(observer));
}

/**
 * @param {{bio?: string|null, display_name?: string|null, career?: string|null}} data 
 */

export async function updateAuthUserProfile(data) {
    try {
        await updateUserProfile(userData.id, data);

        userData = {
            ...userData,
            ...data,
        }
        notifyAll();
    } catch (error) {
        console.error("Error al editar el usuario autenticado: ", error);
        throw error;
    }
}