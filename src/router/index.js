// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import CreateView from '@/views/CreateView.vue'
import ItineraryView from '@/views/ItineraryView.vue'
import MyPlansView from '@/views/MyPlansView.vue'
import LogIn from '@/views/LoginView.vue'
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
      return await isUserLoged()
    }
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
      return await isUserLoged()
    }
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
    beforeEnter: async () => {
      return !(await isUserLoged())
    }
  },

]

const isUserLoged = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return '/login'
  }
  else {
    return true
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
