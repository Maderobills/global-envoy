import { createRouter, createWebHistory } from 'vue-router'
import Users from '@/components/admin/admin-pages/Users.vue'
import AdminHome from '@/components/admin/AdminHome.vue'
import TestMe from '@/components/test/TestMe.vue'
import ForgotPassword from '@/components/widgets/singles/auth-pages/ForgotPassword.vue'
import SignIn from '@/components/widgets/singles/auth-pages/SignIn.vue'
import SignUp from '@/components/widgets/singles/auth-pages/SignUp.vue'
import AboutUs from '@/views/AboutUs.vue'
import CreateShipment from '@/views/CreateShipment.vue'
import CustomerServicePage from '@/views/CustomerServicePage.vue'
import HomePage from '@/views/HomePage.vue'
import TrackPage from '@/views/TrackPage.vue'
import GetShipmentPage from '@/components/widgets/singles/shipment/GetShipmentPage.vue'
import QuoteShipment from '@/views/QuoteShipment.vue'
import PartnerShipment from '@/views/PartnerShipment.vue'

// Define routes that should preserve form data
const PRESERVE_STATE_ROUTES = ['CreateShipment', 'SignUp', 'SignIn'];

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
      path: '/create-shipment',
      name: 'CreateShipment',
      component: CreateShipment,
      beforeEnter: (to, from, next) => {
        // Load saved state if it exists
        const savedState = localStorage.getItem(`form_state_${to.name}`);
        if (savedState) {
          to.params.savedState = JSON.parse(savedState);
        }
        next();
      }
    },
    {
      path: '/get-shipment',
      name: 'QuoteShipment',
      component: QuoteShipment,
      beforeEnter: (to, from, next) => {
        // Load saved state if it exists
        const savedState = localStorage.getItem(`form_state_${to.name}`);
        if (savedState) {
          to.params.savedState = JSON.parse(savedState);
        }
        next();
      }
    },
    {
      path: '/partner-shipment',
      name: 'PartnerShipment',
      component: PartnerShipment,
      beforeEnter: (to, from, next) => {
        // Load saved state if it exists
        const savedState = localStorage.getItem(`form_state_${to.name}`);
        if (savedState) {
          to.params.savedState = JSON.parse(savedState);
        }
        next();
      }
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp,
      beforeEnter: (to, from, next) => {
        const savedState = localStorage.getItem(`form_state_${to.name}`);
        if (savedState) {
          to.params.savedState = JSON.parse(savedState);
        }
        next();
      }
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn,
      beforeEnter: (to, from, next) => {
        const savedState = localStorage.getItem(`form_state_${to.name}`);
        if (savedState) {
          to.params.savedState = JSON.parse(savedState);
        }
        next();
      }
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
    {
      path: '/about-us',
      name: 'AboutUs',
      component: AboutUs,
    },
    {
      path: '/testme',
      name: 'TestMe',
      component: TestMe,
    },
    {
      path: '/admin',
      name: 'AdminHome',
      component: AdminHome,
    }
  ],
})

// Save form state before leaving routes
router.beforeEach((to, from, next) => {
  if (PRESERVE_STATE_ROUTES.includes(from.name)) {
    // Get the form state from your Vuex store or component data
    const formState = window.__VUE_APP_FORM_STATE__;
    if (formState) {
      localStorage.setItem(`form_state_${from.name}`, JSON.stringify(formState));
    }
  }
  next();
});

// Clear saved state when form is submitted successfully
export const clearSavedFormState = (routeName) => {
  localStorage.removeItem(`form_state_${routeName}`);
}

export default router