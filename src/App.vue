<script setup>
import { computed } from "vue";
import { useFirebaseStore } from "@/stores/firebaseStore";
import FooterView from "@/components/widgets/singles/FooterView.vue";

const store = useFirebaseStore();
const user = computed(() => store.user);
const isLoggedIn = computed(() => store.user.firstName !== "Guest");

const handleSignOut = async () => {
  try {
    await store.signOut();
    store.updateUserState({
      uid: "",
      firstName: "Guest",
      lastName: "User",
    });
  } catch (error) {
    console.error("Error during sign-out:", error);
    alert("Sign-out failed. Please try again.");
  }
};
</script>


<template>
  <header class="w-screen h-fit">
    <div class="bg-bgcolor text-white w-full h-14 flex justify-evenly items-center">
      <RouterLink to="/">
        <h1 class="text-2xl">
          Global<span class="font-extrabold text-slate-900">Envoy</span>
        </h1>
      </RouterLink>
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
            <RouterLink to="/TrackPackage" class="block px-4 py-2 hover:bg-gray-200">Track History</RouterLink>
          </div>
        </div>

        <div class="relative group">
          <RouterLink to="/create-shipment" class="flex items-baseline space-x-2">
            <i class="fi fi-tr-box-open"></i><span>Ship</span>
          </RouterLink>
          <div class="absolute hidden group-hover:block bg-white shadow-lg mt-0 rounded">
            <RouterLink to="/create-shipment" class="block px-4 py-2 hover:bg-gray-200">Create Shipment</RouterLink>
            <RouterLink to="/get-shipment" class="block px-4 py-2 hover:bg-gray-200">Shipping Rates</RouterLink>
          </div>
        </div>

        <div class="relative group">
          <RouterLink to="/customer" class="flex items-baseline space-x-2">
            <i class="fi fi-rr-headset"></i><span>Customer Service</span>
          </RouterLink>
          <div class="absolute hidden group-hover:block bg-white shadow-lg mt-0 rounded">
            <RouterLink to="/faqs-page" class="block px-4 py-2 hover:bg-gray-200">FAQs</RouterLink>
            <RouterLink to="/contact-support" class="block px-4 py-2 hover:bg-gray-200">Contact Support</RouterLink>
            <RouterLink to="/about-us" class="block px-4 py-2 hover:bg-gray-200">About Us</RouterLink>
          </div>
        </div>
        <RouterLink to="/admin" class="flex items-baseline space-x-2">
          <i class="fi fi-rr-admin-alt"></i><span>Admin</span>
          </RouterLink>
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
          <RouterLink to="/" class="block px-4 py-2 hover:bg-gray-200 text-red-600" @click.prevent="handleSignOut">
            Logout
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>

  <main class="h-dvh overflow-y-scroll">
    <Transition name="fade">
      <RouterView />

    </Transition>
    <FooterView />
  </main>
</template>

<style>
@import '@flaticon/flaticon-uicons/css/all/all.css';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>