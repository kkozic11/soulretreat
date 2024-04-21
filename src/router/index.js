import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '../views/Login.vue';
import Registration from '../views/Registration.vue';
import BasePage from '../views/BasePage.vue';
import Slike from '../views/Slike.vue';
import Videi from '../views/Videi.vue';
import Citati from '../views/Citati.vue';
import Glazba from '../views/Glazba.vue';
import Profil from '../views/Profil.vue';
import Odjava from '../views/Odjava.vue';
import Biljeske from '../views/Biljeske.vue';
import MojiCitati from '../views/MojiCitati.vue';
import Dnevnik from '../views/Dnevnik.vue';
import Zahvalnosti from '../views/Zahvalnosti.vue';

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/zahvalnosti',
    name: 'Zahvalnosti',
    component: Zahvalnosti,
  },
  {
    path: '/biljeske',
    name: 'Biljeske',
    component: Biljeske,
  },
  {
    path: '/dnevnik',
    name: 'Dnevnik',
    component: Dnevnik,
  },
  {
    path: '/mojicitati',
    name: 'MojiCitati',
    component: MojiCitati,
  },
  {
    path: '/basepage',
    name: 'BasePage',
    component: BasePage,
  },
  {
    path: '/odjava',
    name: 'Odjava',
    component: Odjava,
  },
  {
    path: '/videi',
    name: 'Videi',
    component: Videi,
  },
  {
    path: '/citati',
    name: 'Citati',
    component: Citati,
  },
  {
    path: '/glazba',
    name: 'Glazba',
    component: Glazba,
  },
  {
    path: '/slike',
    name: 'Slike',
    component: Slike,
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil,
    meta: { requiresAuth: true } 
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = localStorage.getItem('userData');

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
