import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Quizz from '../views/Quizz.vue'
import Results from '../views/Results.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/quizz',
    name: 'Quizz',
    component: Quizz
  },
  {
    path: '/results',
    name: 'Results',
    component: Results
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/login'  // Redirige vers la page de login par défaut
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router