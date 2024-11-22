<template>
  <main class="min-h-screen flex flex-col">
    <div class="relative h-80">
      <!-- Hero section with optimized background loading -->
      <div 
        class="absolute inset-0 bg-cover bg-center"
        :style="backgroundImageStyle"
        aria-hidden="true"
      />
      <div class="relative h-full flex flex-col items-center justify-center space-y-6 bg-black/40 px-4">
        <h1 class="text-4xl font-bold text-white">Track Your Shipment</h1>
        
        <!-- Search form with improved accessibility -->
        <form @submit.prevent="handleSubmit" class="w-full max-w-2xl">
          <div class="flex w-full bg-white p-2 rounded shadow-lg">
            <input
              v-model="trackingInput"
              type="text"
              placeholder="Enter your tracking number"
              :disabled="isLoading"
              class="flex-1 h-12 px-4 text-slate-900 text-md outline-none rounded-s"
              :class="{ 'opacity-50': isLoading }"
            />
            <button
              type="submit"
              :disabled="isLoading || !trackingInput"
              class="transition bg-slate-900 px-10 font-semibold rounded text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800"
            >
              <span v-if="isLoading">
                <span class="inline-block animate-spin mr-2">⟳</span>
                Loading...
              </span>
              <span v-else>Track</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Results section with loading and error states -->
    <section class="flex-1 w-full max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded text-red-700">
        {{ error }}
      </div>

      <DashTrack
        v-if="!error && shipmentStore.shipmentData"
        :package-id="shipmentStore.shipmentData.customerId"
        :tracking-number="shipmentStore.shipmentData.trackingNumber"
        :delivered-from="shipmentStore.shipmentData.destinationAddress"
        :delivered-to="shipmentStore.shipmentData.destinationAddress"
        :estimated-delivery="formatDate(shipmentStore.shipmentData.estimatedDeliveryDate)"
      />
      
      <div 
        v-else-if="showingShipments && !isLoading && !error" 
        class="text-center text-gray-500 py-12"
      >
        No shipments found for this tracking number.
      </div>
    </section>

    <FooterView />
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DashTrack from '@/components/widgets/track-comps/DashTrack.vue'
import FooterView from '@/components/widgets/singles/FooterView.vue'
import { useShipmentStore } from '@/stores/shipmentStore'
import { storeToRefs } from 'pinia'

// State management
const trackingInput = ref('')
const showingShipments = ref(false)
const isLoading = ref(false)
const error = ref('')

// Store setup with proper typing
const shipmentStore = useShipmentStore()
const { shipmentData } = storeToRefs(shipmentStore)

// Computed properties
const backgroundImageStyle = computed(() => ({
  backgroundImage: `url('https://img.freepik.com/free-photo/busy-shipping-port-with-containers-trade-action_91128-4581.jpg')`,
}));

// Constants
const USER_ID = 'Id2ZY2f1xEepqCp9CcnFcQ79gFi2'

// Utility functions
const formatDate = (timestamp: { seconds: number; nanoseconds: number }): string => {
  try {
    const date = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    )
    return new Intl.DateTimeFormat('default', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date)
  } catch (e) {
    console.error('Error formatting date:', e)
    return 'Invalid date'
  }
}

// Clear all data
const clearData = () => {
  shipmentStore.$reset() // Reset the store to its initial state
  showingShipments.value = false
  error.value = ''
}

// Event handlers
const handleSubmit = async () => {
  if (!trackingInput.value.trim() || isLoading.value) return

  clearData() // Clear previous data before new search
  isLoading.value = true
  showingShipments.value = true

  try {
    await shipmentStore.fetchShipmentData(USER_ID, trackingInput.value.trim())
    
    if (!shipmentStore.shipmentData) {
      error.value = 'No shipment found with this tracking number.'
      shipmentStore.$reset() // Clear any partial data
    }
  } catch (e) {
    error.value = 'Error fetching shipment data. Please try again.'
    shipmentStore.$reset() // Clear any partial data
    console.error('Shipment fetch error:', e)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>