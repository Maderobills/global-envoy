<script setup>
import { useFirebaseStore } from '@/stores/firebaseStore';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const store = useFirebaseStore();
const user = computed(() => store.user);
const isLoggedIn = computed(() => store.user.firstName !== 'Guest');
</script>

<template>
  <header class="w-screen h-fit">
    <div class="bg-bgcolor text-white w-full h-14 flex justify-evenly items-center">
      <h1 class="text-2xl">
        Global<span class="font-extrabold text-slate-900">Envoy</span>
      </h1>
      <div class="flex space-x-4 text-sm">
        <div class="h-12 flex justify-center items-center space-x-2 hover:text-slate-900 cursor-pointer">
          <h5>Find a Location</h5>
          <i class="fi fi-rs-land-layer-location"></i>
        </div>
        <div class="h-12 flex justify-center items-center space-x-2 hover:text-slate-900 cursor-pointer">
          <h5>Search</h5>
          <i class="fi fi-rs-search"></i>
        </div>
        <div class="h-12 flex justify-center items-center space-x-2 hover:text-slate-900 cursor-pointer">
          <h5>Country</h5>
          <i class="fi fi-rs-earth-americas"></i>
        </div>
      </div>
    </div>
    <nav class="w-full h-14 bg-white drop-shadow-sm flex justify-around items-center relative z-50">
      <div class="flex space-x-10">
        <div class="relative group">
          <RouterLink to="/" class="flex items-baseline space-x-2">
            <i class="fi fi-ts-shipping-timed"></i><span>Track</span>
          </RouterLink>
          <div class="absolute hidden group-hover:block bg-white shadow-lg mt-0 rounded">
            <RouterLink to="/TrackPackage" class="block px-4 py-2 hover:bg-gray-200">Track Shipment</RouterLink>
            <RouterLink to="/track2" class="block px-4 py-2 hover:bg-gray-200">Track History</RouterLink>
          </div>
        </div>

        <div class="relative group">
          <RouterLink to="/ship" class="flex items-baseline space-x-2">
            <i class="fi fi-tr-box-open"></i><span>Ship</span>
          </RouterLink>
          <div class="absolute hidden group-hover:block bg-white shadow-lg mt-0 rounded">
            <RouterLink to="/ship1" class="block px-4 py-2 hover:bg-gray-200">Create Shipment</RouterLink>
            <RouterLink to="/ship2" class="block px-4 py-2 hover:bg-gray-200">Shipping Rates</RouterLink>
          </div>
        </div>

        <div class="relative group">
          <RouterLink to="/customer" class="flex items-baseline space-x-2">
            <i class="fi fi-rr-headset"></i><span>Customer Service</span>
          </RouterLink>
          <div class="absolute hidden group-hover:block bg-white shadow-lg mt-0 rounded">
            <RouterLink to="/service1" class="block px-4 py-2 hover:bg-gray-200">FAQs</RouterLink>
            <RouterLink to="/service2" class="block px-4 py-2 hover:bg-gray-200">Contact Support</RouterLink>
          </div>
        </div>
      </div>

      <!-- Conditional Rendering for User Login -->
      <div v-if="!isLoggedIn">
        <RouterLink to="/sign-in">Customer Portal Logins</RouterLink>
      </div>
      <div v-else class="relative group">
        <div class="flex space-x-3 items-center cursor-pointer">
          <img src="" alt="User profile" class="w-8 h-8 rounded-full" />
          <h3 class="font-medium text-slate-600">{{ user.firstName }} {{ user.lastName }}</h3>
        </div>
        <div class="absolute hidden group-hover:block bg-white shadow-lg mt-0 rounded">
            <RouterLink to="/" class="block px-4 py-2 hover:bg-gray-200">Profile</RouterLink>
            <RouterLink to="/" class="block px-4 py-2 hover:bg-gray-200 text-red-600">Logout</RouterLink>
          </div>
      </div>
    </nav>
  </header>

  <main class="h-dvh overflow-y-scroll">
    <RouterView />
  </main>
</template>

<style>
@import '@flaticon/flaticon-uicons/css/all/all.css';
</style>