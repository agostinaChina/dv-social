// creamos la aplicacion de vue
// 1. importar funcion createApp del core de vue
// 2. tener componente raiz
// 3. tener un elemento de html con un id donde montar la app

import { createApp } from "vue";

import App from "./App.vue";
import router from "./router/router.js";
import './style.css';

const app = createApp(App);

app.use(router);

app.mount('#app');