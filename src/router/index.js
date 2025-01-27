// router/index.js
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
  },
  {
    path: '/create',
    name: 'Create',
    component: CreateView,
    beforeEnter: async () => {
      return (await isUserLoged()) ? true : '/login'
    },
  },
  {
    path: '/itinerary/:id',
    name: 'Itinerary',
    component: ItineraryView,
  },
  {
    path: '/my-plans',
    name: 'MyPlans',
    component: MyPlansView,
    beforeEnter: async () => {
      return (await isUserLoged()) ? true : '/login'
    },
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
    beforeEnter: async () => {
      return (await isUserLoged()) ? '/' : true
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
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
