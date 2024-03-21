import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue';
import BasePage from '../views/BasePage.vue';

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login/* webpackChunkName: "about" */
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration  
  },
  {
    path: '/basepage',
    name: 'BasePage',
    component: BasePage
  }
    
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
