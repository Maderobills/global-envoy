import CustomerServicePage from '@/views/CustomerServicePage.vue'
import HomePage from '@/views/HomePage.vue'
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
  ],
})

export default router
