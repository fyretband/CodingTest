import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import DashboardPage from '../views/DashboardPage.vue'
import { useCounterStore } from '../stores/counter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/',
      name: 'home',
      component: DashboardPage
    },
    {
      path: '/protected-route',
      component: LoginPage,
      beforeEnter: (to, from, next) => {
        const counterStore = useCounterStore();
        if (counterStore.isAuthenticated) {
          next();
        } else {
          next('/login'); 
        }
      },
    },
 
    
  
  ]
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token')

  if (to.name !== 'login' && !token) {
    next({ name: 'login' }); 
  } else {
    next(); 
  }
})
export default router
