// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import CreateView from '@/views/CreateView.vue'
import ItineraryView from '@/views/ItineraryView.vue'
import MyPlansView from '@/views/MyPlansView.vue'
import LogIn from '@/views/LoginView.vue'
import TestingScript from '@/views/TestingScript.vue'
import { getCurrentUser } from 'vuefire';



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
      return await isUserLoged()? true : '/login'
    }
  },
  {
    path: '/error',
    name: 'NotFound',
    component: ErrorView,
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
      return await isUserLoged()? true: '/login'
    }
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
    beforeEnter: async () => {
      return await isUserLoged()? '/': true
    }
  },
  {
    path: '/test',
    name: 'TestingScript',
    component: TestingScript,
  },
]

const isUserLoged = async () => {
  const currentUser = await getCurrentUser()
  return currentUser
}

export function viewPlan (planId) {
  console.log(`Navegando al plan ${planId}`)
  router.push({ name: 'Itinerary', params: { id: planId.toString() } })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router


