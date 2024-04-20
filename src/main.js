import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import firebaseApp from './firebase'; 

createApp(App).use(router).mount('#app');
