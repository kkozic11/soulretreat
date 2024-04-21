import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { app } from './firebase'; 

createApp(App)
  .use(router)
  .mount('#app');
