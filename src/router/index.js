import CustomerServicePage from '@/views/CustomerServicePage.vue'
import HomePage from '@/views/HomePage.vue'
import TrackPage from '@/views/TrackPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'track',
      component: HomePage,
    },
    {
      path: '/Customer',
      name: 'CustomerService',
      component: CustomerServicePage,
    },
    {
      path: '/TrackPackage',
      name: 'TrackPage',
      component: TrackPage,
    },
  ],
})

export default router
