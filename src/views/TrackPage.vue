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

    <!-- Results section with improved error handling and loading states -->
    <section class="flex-1 w-full max-w-7xl mx-auto px-4 py-8 space-y-6" aria-live="polite">
      <div 
        v-if="error" 
        id="error-message"
        role="alert"
        class="p-4 bg-red-50 border border-red-200 rounded text-red-700"
      >
        {{ error }}
      </div>

      <Suspense>
        <template #default>
          <DashTrack
            v-if="!error && shipmentData"
            :package-id="shipmentData.customerId"
            :tracking-number="shipmentData.trackingNumber"
            :delivered-from="shipmentData.destinationAddress"
            :delivered-to="shipmentData.destinationAddress"
            :estimated-delivery="shipmentData.deliveryDate"
          />
        </template>
        <template #fallback>
          <div class="animate-pulse space-y-4">
            <div class="h-4 bg-slate-200 rounded w-3/4"></div>
            <div class="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        </template>
      </Suspense>
      
      <div 
        v-if="showNoResultsMessage" 
        class="text-center text-gray-500 py-12"
      >
        No shipments found for this tracking number.
      </div>
    </section>

    <section aria-label="Tracking timeline" class="w-4/5 max-w-7xl mx-auto px-4">
      <TransitionGroup 
        name="list"
        tag="div"
        class="space-y-4"
      >
        <StatusTrack
          v-for="status in sortedTrackingStages"
          :key="status.key"
          :location="status.location"
          :note="status.note"
          :status="status.status"
          :time="status.time"
        />
      </TransitionGroup>
    </section>

  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useShipmentStore } from '@/stores/shipmentStore'
import { useTrackStore } from '@/stores/statusStore'
import DashTrack from '@/components/widgets/track-comps/DashTrack.vue'
import StatusTrack from '@/components/widgets/track-comps/StatusTrack.vue'
import { useFirebaseStore } from '@/stores/firebaseStore'

// State management
const trackingInput = ref('')
const isLoading = ref(false)
const error = ref('')
const showingShipments = ref(false)

// Store initialization
const shipmentStore = useShipmentStore()
const trackStore = useTrackStore()
const firebaseStore = useFirebaseStore()

// Computed properties
const user = computed(() => firebaseStore.user)
const isLoggedIn = computed(() => user.value?.uid)

// Build document path only when we have both a user and tracking number
const docPath = computed(() => {
  const userId = user.value?.uid
  const trackingNum = trackingInput.value.trim()
  
  if (!userId || !trackingNum) {
    return null
  }
  
  return `/Users/${userId}/Shipments/${userId}/Tracking/${trackingNum}`
})

const TRACKING_NUMBER_REGEX = /^[A-Z0-9]{6,}$/i

const backgroundImageStyle = computed(() => ({
  backgroundImage: 'url("https://img.freepik.com/free-photo/busy-shipping-port-with-containers-trade-action_91128-4581.jpg")',
  loading: 'lazy'
}))

const isValidTrackingNumber = computed(() => 
  TRACKING_NUMBER_REGEX.test(trackingInput.value.trim())
)

const shipmentData = computed(() => shipmentStore.shipmentData)

const showNoResultsMessage = computed(() => 
  showingShipments.value && !isLoading.value && !error.value && !shipmentData.value
)

const sortedTrackingStages = computed(() => {
  if (!trackStore.content) return []
  
  const stageOrder = ['packaging', 'transit1', 'transit2', 'delivered']
  
  return stageOrder
    .map(key => ({
      key,
      ...(trackStore.content[key] || {}),
    }))
    .filter(stage => Object.keys(stage).length > 1)
})

// Event handlers
async function handleSubmit() {
  if (!isValidTrackingNumber.value || isLoading.value) return
  
  clearData()
  isLoading.value = true
  showingShipments.value = true
  
  try {
    if (!isLoggedIn.value) {
      throw new Error('Please log in to track shipments')
    }

    if (!docPath.value) {
      throw new Error('Invalid tracking information')
    }

    await Promise.all([
      shipmentStore.fetchShipmentData(user.value.uid, trackingInput.value.trim()),
      trackStore.fetchTrackingData(docPath.value)
    ])
    
    if (!shipmentData.value) {
      error.value = 'No shipment found with this tracking number.'
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Unable to fetch shipment data. Please try again later.'
    console.error('Shipment fetch error:', e)
  } finally {
    isLoading.value = false
  }
}

function clearData() {
  shipmentStore.$reset()
  trackStore.$reset()
  showingShipments.value = false
  error.value = ''
}

// Cleanup and initialization
onMounted(() => {
  clearData()
})

// Watch for store errors
watchEffect(() => {
  if (trackStore.error) {
    error.value = trackStore.error
  }
})
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>