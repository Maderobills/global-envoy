<template>
    <GetShipmentPage v-if="isLoggedIn" />
  </template>
  
  <script setup>
  import GetShipmentPage from '@/components/widgets/singles/shipment/GetShipmentPage.vue';
  import { useRouter } from 'vue-router';
  import { computed, onMounted } from 'vue';
import { useFirebaseStore } from '@/stores/firebaseStore';
  
  const firebaseStore = useFirebaseStore()
  // Computed properties for user authentication state
  const user = computed(() => firebaseStore.user);
  const isLoggedIn = computed(() => !!user.value?.uid);
  
  // Router instance
  const router = useRouter();
  
  // Redirect logic
  onMounted(() => {
    if (!isLoggedIn.value) {
      router.push("/sign-in");
    }
  });
  </script>
  