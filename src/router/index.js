import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue';
import BasePage from '../views/BasePage.vue';
import Slike from '../views/Slike.vue';
import Videi from '../views/Videi.vue';
import Citati from '../views/Citati.vue';
import Glazba from '../views/Glazba.vue';
import Profil from '../views/Profil.vue';
import Odjava from '../views/Odjava.vue';

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/basepage',
    name: 'BasePage',
    component: BasePage
  },
  {
    path: '/odjava',
    name: 'Odjava',
    component: Odjava
  },
  {
    path: '/videi',
    name: 'Videi',
    component: Videi
  },
  {
    path: '/citati',
    name: 'Citati',
    component: Citati
  },
  {
    path: '/glazba',
    name: 'Glazba',
    component: Glazba
  },
  {
    path: '/slike',
    name: 'Slike',
    component: Slike
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
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
