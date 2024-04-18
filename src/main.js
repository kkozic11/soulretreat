import { createApp } from 'vue';
import App from './App.vue';
import { app } from './firebase'; 
import router from './router';

createApp(App).use(router).mount('#app');
