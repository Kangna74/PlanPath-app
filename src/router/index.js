import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import CreateView from '@/views/CreateView.vue'
import ItineraryView from '@/views/ItineraryView.vue'
import MyPlansView from '@/views/MyPlansView.vue'
import LogIn from '@/views/LoginView.vue'
import ErrorView from '@/views/ErrorView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { getCurrentUser } from 'vuefire'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { breadcrumb: 'Inicio' },
  },
  {
    path: '/create',
    name: 'Create',
    component: CreateView,
    meta: { breadcrumb: 'Crear' },
    beforeEnter: async () => {
      return (await isUserLoged()) ? true : '/login'
    },
  },
  {
    path: '/itinerary/:id',
    name: 'Itinerary',
    component: ItineraryView,
    meta: { breadcrumb: 'Itinerary' },
  },
  {
    path: '/myplans',
    name: 'MyPlans',
    component: MyPlansView,
    meta: { breadcrumb: 'Mis Planes' },
    beforeEnter: async () => {
      return (await isUserLoged()) ? true : '/login'
    },
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
    meta: { breadcrumb: 'Iniciar Sesión' },
    beforeEnter: async () => {
      return (await isUserLoged()) ? '/' : true
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { breadcrumb: 'Registrarse' },
    beforeEnter: async () => {
      return (await isUserLoged()) ? '/' : true
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error404',
    component: ErrorView,
  },
]

const isUserLoged = async () => {
  const currentUser = await getCurrentUser()
  return currentUser
}

export function viewPlan(planId) {
  router.push({ name: 'Itinerary', params: { id: planId.toString() } })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
