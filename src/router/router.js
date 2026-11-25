// definimos nuestro router, vue router es un router basado en configuracion por lo que vamos a necesitar 
// definir las rutas desde codigo

import { createRouter, createWebHistory } from "vue-router";
import { subscribeToAuthStateChange } from "../services/auth.js";


import Home from "../pages/Home.vue";
import PublicChat from "../pages/PublicChat.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import MyProfile from "../pages/MyProfile.vue";
import EditProfile from "../pages/EditProfile.vue";
import UserProfile from "../pages/UserProfile.vue";
import PrivateChat from "../pages/PrivateChat.vue";
import EditProfileAvatar from "../pages/EditProfileAvatar.vue";






// Definimos la lista de rutas. Esto es un array de objetos, donde cada objeto representa una ruta y sus caracteristicas.
// Por lo menos una ruta va a tener una URL (q se toma a partir de la raiz del sitio) y 
// un componente a renderizar cuando se acceda a esa URL.

const routes = [
{path: '/', component: Home,

},
{path: '/chat', component: PublicChat, meta: {requiresAuth: true, }

},
{path: '/ingresar', component: Login,

},

{path: '/crear-cuenta', component: Register,

},
{path: '/mi-perfil', component: MyProfile, meta: {requiresAuth: true, }

},
{path: '/mi-perfil/editar', component: EditProfile, meta: {requiresAuth: true, }

},
//:param nos permite definir un segmento dinamico de X valor que luego podemos capturar y usar
{path: '/usuario/:id', component: UserProfile, meta: {requiresAuth: true, }

},
{path: '/usuario/:id/chat', component: PrivateChat, meta: {requiresAuth: true, }

},
{path: '/mi-perfil/editar/foto', component: EditProfileAvatar, meta: {requiresAuth: true, }

},
]

// El sig paso va a ser crear el router con createRouter()
// Esta funcion recibe un parametro que es un objeto de configuracion
// Ese objeto va a recibir al menos 2 datos: 
// routes => la lista de rutas
// history => indica como vue router debe manejar el historial de la aplicacion
// este valor siempre va a ser uno de createWebHistory o createWebHashHistory

const router = createRouter(
    {routes, history: createWebHistory(),}
);

let user = {
id: null, 
email: null,
};

subscribeToAuthStateChange(userData => user = userData);

router.beforeEach((to, from) => {
// console.group('Nevegacion iniciada');
// console.log('Ruta destino: ', to);
// console.log('Ruta origen: ', from);
// console.groupEnd();

if (to.meta.requiresAuth && user.id === null){

    //si el user no esta loggeado no puede ver esta ruta y se lo redirecciona a vista 'ingresar'
    return '/ingresar';
}

});

export default router;