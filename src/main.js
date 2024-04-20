import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { app } from './firebase';  

const vueApp = createApp(App);

vueApp.use(router);

vueApp.config.globalProperties.$firebase = app;

vueApp.mount('#app');
