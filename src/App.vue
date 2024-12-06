<script setup>
import { ref, computed } from "vue";
import { useFirebaseStore } from "@/stores/firebaseStore";
import FooterView from "@/components/widgets/singles/FooterView.vue";
import CountrySelector from "@/components/widgets/singles/CountrySelector.vue";
import DrawerMenu from "@/components/widgets/singles/DrawerMenu.vue";

// Store and state management
const store = useFirebaseStore();
const user = computed(() => store.user);
const isLoggedIn = computed(() => store.user.firstName !== "Guest");
const isDrawerOpen = ref(false);

// Methods
const handleSignOut = async () => {
  try {
    await store.signOut();
    store.updateUserState({
      uid: "",
      firstName: "Guest",
      lastName: "User",
    });
    console.log("User signed out successfully.");
  } catch (error) {
    console.error("Error during sign-out:", error);
    alert("Sign-out failed. Please try again.");
  }
};

const handleCountryChange = (selectedCountry) => {
  console.log("Selected country:", selectedCountry);
  // Logic for handling country changes
};

const toggleDrawer = () => {
  console.log("Toggling drawer:", isDrawerOpen.value);
  isDrawerOpen.value = !isDrawerOpen.value;
};
</script>
<template>
  <!-- Mobile Header -->
  <header class="md:hidden bg-bgcolor text-white w-full h-14 flex justify-between items-center px-4 z-40">
    <RouterLink to="/" class="text-2xl font-bold">
      Global<span class="font-extrabold text-slate-900">Envoy</span>
    </RouterLink>
    <button
      @click="toggleDrawer"
      class="text-2xl"
      aria-label="Open navigation menu"
    >
      ☰
    </button>
    <!-- Drawer Menu -->
    <DrawerMenu :is-open="isDrawerOpen" @update:isOpen="isDrawerOpen = $event" />
  </header>

  <!-- Desktop Header -->
  <header class="hidden md:block w-screen ">
    <div class="bg-bgcolor text-white w-full h-14 flex justify-evenly items-center px-10">
      <RouterLink to="/" class="text-2xl font-bold">
        Global<span class="font-extrabold text-slate-900">Envoy</span>
      </RouterLink>
      <div class="flex space-x-6 items-center">
        <RouterLink to="/location-search" class="flex items-center space-x-2 hover:text-slate-900">
          <span>Find a Location</span>
          <i class="fi fi-rs-land-layer-location"></i>
        </RouterLink>
        <CountrySelector @update:modelValue="handleCountryChange" />
      </div>
    </div>

    <!-- Desktop Navigation -->
    <nav class="w-full h-14 bg-white shadow-sm flex justify-around items-center">
      <div class="flex space-x-10">
        <!-- Track Section -->
        <div class="relative group">
          <RouterLink to="/" class="flex items-baseline space-x-2">
            <i class="fi fi-ts-shipping-timed"></i><span>Track</span>
          </RouterLink>
          <div class="absolute hidden group-hover:block bg-white shadow-lg rounded p-2">
            <RouterLink to="/TrackPackage" class="block px-2 hover:bg-gray-200">Track Shipment</RouterLink>
            <RouterLink to="/TrackHistory" class="block px-2 hover:bg-gray-200">Track History</RouterLink>
          </div>
        </div>

        <!-- Ship Section -->
        <div class="relative group">
          <RouterLink to="/create-shipment" class="flex items-baseline space-x-2">
            <i class="fi fi-tr-box-open"></i><span>Ship</span>
          </RouterLink>
          <div class="absolute hidden group-hover:block bg-white shadow-lg rounded  p-2">
            <RouterLink to="/create-shipment" class="block px-2 hover:bg-gray-200">Create Shipment</RouterLink>
            <RouterLink to="/get-shipment" class="block px-2 hover:bg-gray-200">Shipping Rates</RouterLink>
          </div>
        </div>

        <!-- Customer Service -->
        <div class="relative group">
          <RouterLink to="/customer" class="flex items-baseline space-x-2">
            <i class="fi fi-rr-headset"></i><span>Customer Service</span>
          </RouterLink>
          <div class="absolute hidden group-hover:block bg-white shadow-lg rounded  p-2">
            <RouterLink to="/faqs-page" class="block px-2 hover:bg-gray-200">FAQs</RouterLink>
            <RouterLink to="/contact-support" class="block px-2 hover:bg-gray-200">Contact Support</RouterLink>
            <RouterLink to="/about-us" class="block px-2 hover:bg-gray-200">About Us</RouterLink>
          </div>
        </div>
        <RouterLink to="/admin" class="flex items-baseline space-x-2">
          <i class="fi fi-rr-admin-alt"></i><span>Admin Dashboard</span>
          </RouterLink>
      </div>

      <!-- User Section -->
      <div>
        <div v-if="!isLoggedIn">
          <RouterLink to="/sign-in" class="hover:underline">Customer Portal Login</RouterLink>
        </div>
        <div v-else class="relative group">
          <div class="flex items-center space-x-3 cursor-pointer">
            <img src="" alt="User profile" class="w-8 h-8 rounded-full bg-gray-300" />
            <span class="font-medium">{{ user.firstName }} {{ user.lastName }}</span>
          </div>
          <div class="absolute hidden group-hover:block bg-white shadow-lg rounded right-0 p-2">
            <RouterLink to="/profile" class="block px-4 py-2 hover:bg-gray-200">Profile</RouterLink>
            <button @click="handleSignOut" class="block w-full text-left px-4 py-2 hover:bg-gray-200 text-red-600">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <!-- Main Content -->
  <main class="h-dvh overflow-y-scroll">
    <Transition name="fade">
      <RouterView />
    </Transition>
    <FooterView />
  </main>
</template>
<style scoped>
@import "@flaticon/flaticon-uicons/css/all/all.css";

/* Transition Effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Drawer Menu */
.drawer {
  @apply fixed top-0 left-[-250px] w-[250px] h-full bg-white transition-all duration-300 ease-in-out;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
.drawer.open {
  @apply left-0;
}
</style>
