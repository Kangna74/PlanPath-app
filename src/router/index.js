// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateView from '../views/CreateView.vue'
import ItineraryView from '../views/ItineraryView.vue'
import MyPlansView from '../views/MyPlansView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'Create',
    component: CreateView
  },
  {
    path: '/itinerary/:id',
    name: 'Itinerary',
    component: ItineraryView
  },
  {
    path: '/my-plans',
    name: 'MyPlans',
    component: MyPlansView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
