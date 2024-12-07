<script setup>
import { RouterLink } from "vue-router";
import { useFirebaseStore } from "@/stores/firebaseStore";
import { computed } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:isOpen"]);

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
    closeDrawer();
  } catch (error) {
    console.error("Error during sign-out:", error);
    alert("Sign-out failed. Please try again.");
  }
};

const closeDrawer = () => {
  emit("update:isOpen", false);
};
</script>
<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 ">
    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-black bg-opacity-50"
      @click="closeDrawer"
    ></div>

    <!-- Drawer Content -->
    <div
      class="absolute top-0 left-0 w-[80%] max-w-[400px] h-full bg-bgslate shadow-lg transform transition-transform duration-300 ease-in-out"
    >
      <!-- Close Button -->
      <button
        @click="closeDrawer"
        class="absolute top-4 right-4 text-2xl text-gray-800 z-10"
        aria-label="Close menu"
      >
        ✕
      </button>

      <!-- Logo -->
      <div class="text-center pt-16 pb-8">
        <RouterLink
            to="/"
            class="block py-2 hover:bg-gray-100"
            @click="closeDrawer"
          >
        <h1 class="text-3xl font-semibold">
          Global<span class="font-extrabold text-slate-900">Envoy</span>
        </h1>
      </RouterLink>
      </div>

      <!-- Navigation Links -->
      <nav class="px-6 space-y-6 text-lg">
        <div class="border-b pb-4">
          <RouterLink
            to="/"
            class="block py-2 hover:bg-gray-100"
            @click="closeDrawer"
          >
            <i class="fi fi-ts-home"></i>Home
          </RouterLink>
        </div>

        <!-- Tracking Links -->
        <div class="border-b pb-4">
          <h3 class="font-semibold mb-2 text-slate-700">Track</h3>
          <RouterLink
            to="/TrackPackage"
            class="block py-2 hover:bg-gray-100"
            @click="closeDrawer"
          >
            <i class="fi fi-ts-shipping-timed"></i>Track Shipment
          </RouterLink>
          <RouterLink
            to="/TrackPackage"
            class="block py-2 hover:bg-gray-100"
            @click="closeDrawer"
          >
            <i class="fi fi-ts-shipping-timed"></i>Track History
          </RouterLink>
        </div>


        <!-- Shipping Links -->
        <div class="border-b pb-4">
          <h3 class="font-semibold mb-2 text-slate-700">Ship</h3>
          <RouterLink
            to="/create-shipment"
            class="block py-2 hover:bg-gray-100"
            @click="closeDrawer"
          >
            <i class="fi fi-tr-box-open"></i>Create Shipment
          </RouterLink>
          <RouterLink
            to="/get-shipment"
            class="block py-2 hover:bg-gray-100"
            @click="closeDrawer"
          >
            <i class="fi fi-tr-box-open"></i>Shipping Rates
          </RouterLink>
        </div>

        <!-- Customer Service Links -->
        <div class="border-b pb-4">
          <h3 class="font-semibold mb-2 text-slate-700">Customer Service</h3>
          <RouterLink
            to="/faqs-page"
            class="block py-2 hover:bg-gray-100"
            @click="closeDrawer"
          >
            <i class="fi fi-rr-headset"></i>FAQs
          </RouterLink>
          <RouterLink
            to="/contact-support"
            class="block py-2 hover:bg-gray-100"
            @click="closeDrawer"
          >
            <i class="fi fi-rr-headset"></i>Contact Support
          </RouterLink>
          <RouterLink
            to="/about-us"
            class="block py-2 hover:bg-gray-100"
            @click="closeDrawer"
          >
            <i class="fi fi-rr-info"></i>About Us
          </RouterLink>
        </div>

        <!-- Location -->
        <div class="border-b pb-4">
          <RouterLink
            to="/location-search"
            class="block py-2 hover:bg-gray-100"
            @click="closeDrawer"
          >
            <i class="fi fi-rs-land-layer-location"></i>Find a Location
          </RouterLink>
        </div>

        <!-- User Account Section -->
        <div>
          <template v-if="!isLoggedIn">
            <RouterLink
              to="/sign-in"
              class="block py-2 hover:bg-gray-100"
              @click="closeDrawer"
            >
              Customer Portal Login
            </RouterLink>
          </template>
          <template v-else>
            <div class="flex items-center space-x-3 mb-4">
              <img
                src=""
                alt="User profile"
                class="w-12 h-12 rounded-full bg-gray-300"
              />
              <div>
                <h3 class="font-medium text-slate-600">
                  {{ user.firstName }} {{ user.lastName }}
                </h3>
              </div>
            </div>
            <RouterLink
              to="/profile"
              class="block py-2 hover:bg-gray-100"
              @click="closeDrawer"
            >
              <i class="fi fi-rr-user"></i>Profile
            </RouterLink>
            <button
              @click="handleSignOut"
              class="block w-full text-left py-2 hover:bg-gray-100 text-red-600"
            >
              <i class="fi fi-rr-sign-out"></i>Logout
            </button>
          </template>
        </div>
      </nav>
    </div>
  </div>
</template>
<style scoped>
@import "@flaticon/flaticon-uicons/css/all/all.css";

/* General icon margin adjustment */
.fi {
  margin-right: 0.5rem;
}

/* Responsive drawer */
@media (max-width: 768px) {
  .w-[80%] {
    width: 90%;
  }
  .max-w-[400px] {
    max-width: 100%;
  }
}
</style>
