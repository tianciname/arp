import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import axiosAPI from "./axioshtt/axiosApi";
const app = createApp(App).use(router).mount('#app');
app.$axios = axiosAPI;
