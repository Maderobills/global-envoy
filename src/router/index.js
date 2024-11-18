import AdminHome from '@/components/admin/AdminHome.vue'
import ForgotPassword from '@/components/widgets/singles/auth-pages/ForgotPassword.vue'
import SignIn from '@/components/widgets/singles/auth-pages/SignIn.vue'
import SignUp from '@/components/widgets/singles/auth-pages/SignUp.vue'
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
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn,
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },

    //ADMIN ROUTES HERE
    {
      path: '/admin',
      name: 'AdminHome',
      component: AdminHome,
    }
  ],
})

export default router
