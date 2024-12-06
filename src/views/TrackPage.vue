<template>
  <main class="min-h-screen flex flex-col">
    <!-- Hero Section -->
    <div class="relative h-60 sm:h-80">
      <!-- Hero background with responsive height -->
      <div 
        class="absolute inset-0 bg-cover bg-center"
        :style="backgroundImageStyle"
        aria-hidden="true"
      />
      <div class="relative h-full flex flex-col items-center justify-center space-y-4 sm:space-y-6 bg-black/40 px-4">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
          Track Your Shipment
        </h1>
        
        <!-- Responsive search form -->
        <form @submit.prevent="handleSubmit" class="w-full max-w-2xl px-2 sm:px-4">
          <div class="flex flex-col sm:flex-row w-full bg-white p-2 rounded shadow-lg gap-2 sm:gap-0">
            <input
              v-model="trackingInput"
              type="text"
              placeholder="Enter your tracking number"
              :disabled="isLoading"
              class="flex-1 h-10 sm:h-12 px-4 text-slate-900 text-sm sm:text-md outline-none rounded sm:rounded-s"
              :class="{ 'opacity-50': isLoading }"
            />
            <button
              type="submit"
              :disabled="isLoading || !trackingInput"
              class="transition bg-slate-900 py-2 sm:py-0 px-6 sm:px-10 font-semibold rounded sm:rounded-s-none text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800"
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <span class="inline-block animate-spin mr-2">⟳</span>
                <span class="whitespace-nowrap">Loading...</span>
              </span>
              <span v-else>Track</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Results section -->
    <section 
      class="w-full sm:w-11/12 md:w-4/5 max-w-7xl mx-auto px-4 pt-6 sm:pt-8 space-y-4 sm:space-y-6 my-3 sm:my-5" 
      aria-live="polite"
    >
      <!-- Error message -->
      <div 
        v-if="error" 
        id="error-message"
        role="alert"
        class="p-3 sm:p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm sm:text-base"
      >
        {{ error }}
      </div>

      <!-- Shipment details -->
      <Suspense>
        <template #default>
          <DashTrack
            v-if="!error && shipmentData"
            :package-id="shipmentData.customerId"
            :tracking-number="shipmentData.trackingNumber"
            :delivered-from="shipmentData.destinationAddress"
            :delivered-to="shipmentData.originAddress"
            :estimated-delivery="shipmentData.estimateDeliveryDate"
            class="w-full overflow-x-auto"
          />
        </template>
        <template #fallback>
          <div class="animate-pulse space-y-3 sm:space-y-4">
            <div class="h-3 sm:h-4 bg-slate-200 rounded w-3/4"></div>
            <div class="h-3 sm:h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        </template>
      </Suspense>
      
      <!-- No results message -->
      <div 
        v-if="showNoResultsMessage" 
        class="text-center text-gray-500 py-8 sm:py-12 text-sm sm:text-base"
      >
        No shipments found for this tracking number.
      </div>
    </section>

    <!-- Timeline section -->
    <section 
      aria-label="Tracking timeline" 
      class="w-full sm:w-11/12 md:w-4/5 max-w-7xl mx-auto px-4 sm:px-10 my-3 sm:my-5"
    >
      <TransitionGroup 
        name="list"
        tag="div"
        class="space-y-3 sm:space-y-4"
      >
        <StatusTrack
          v-for="status in sortedTrackingStages"
          :key="status.key"
          :location="status.location"
          :note="status.note"
          :status="status.status"
          :date="status.date"
        />
      </TransitionGroup>
    </section>
  </main>
</template>


<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue';
import { useShipmentStore } from '@/stores/shipmentStore';
import { useTrackStore } from '@/stores/statusStore';
import DashTrack from '@/components/widgets/track-comps/DashTrack.vue';
import StatusTrack from '@/components/widgets/track-comps/StatusTrack.vue';
import { useFirebaseStore } from '@/stores/firebaseStore';

const fromTrack = defineProps(['getTrack']);

// State management
const trackingInput = ref('');
const isLoading = ref(false);
const error = ref('');
const showingShipments = ref(false);

// Store initialization
const shipmentStore = useShipmentStore();
const trackStore = useTrackStore();
const firebaseStore = useFirebaseStore();

// Computed properties
const user = computed(() => firebaseStore.user);
const isLoggedIn = computed(() => user.value?.uid);

// Build document path only when we have both a user and tracking number
const docPath = computed(() => {
  const userId = user.value?.uid;
  const trackingNum = trackingInput.value.trim();
  
  if (!userId || !trackingNum) {
    return `/Tracking/${trackingNum}/Shipments/${trackingNum}/Tracking/${trackingNum}`;
  }
  
  return `/Users/${userId}/Shipments/${trackingNum}/Tracking/${trackingNum}`;
});

const TRACKING_NUMBER_REGEX = /^[A-Z0-9]{6,}$/i;

const backgroundImageStyle = computed(() => ({
  backgroundImage: 'url("https://img.freepik.com/free-photo/busy-shipping-port-with-containers-trade-action_91128-4581.jpg")',
  loading: 'lazy'
}));

const isValidTrackingNumber = computed(() =>
  TRACKING_NUMBER_REGEX.test(trackingInput.value.trim())
);

const shipmentData = computed(() => shipmentStore.shipmentData);

const showNoResultsMessage = computed(() =>
  showingShipments.value && !isLoading.value && !error.value && !shipmentData.value
);

const sortedTrackingStages = computed(() => {
  if (!trackStore.content) return [];
  
  const stageOrder = ['pendingPackage', 'packaging', 'transit1', 'transit2', 'delivered'];
  
  return stageOrder
    .map(key => ({
      key,
      ...(trackStore.content[key] || {}),
    }))
    .filter(stage => Object.keys(stage).length > 1);
});

// Event handlers
async function handleSubmit() {
  const trackingNum = trackingInput.value.trim();
  const userId = user.value.uid;
  if (!isValidTrackingNumber.value || isLoading.value) return;
  
  clearData();
  isLoading.value = true;
  showingShipments.value = true;
  
  try {
    if (!isLoggedIn.value) {
      await Promise.all([
        shipmentStore.fetchShipmentData(`User/${userId}/Shipments/${trackingNum}/`),
        trackStore.fetchTrackingData(docPath.value)
      ]);
    }

    if (!docPath.value) {
      throw new Error('Invalid tracking information');
    }

    await Promise.all([
      shipmentStore.fetchShipmentData(`Tracking/${trackingNum}/Shipments/${trackingNum}`),
      trackStore.fetchTrackingData(docPath.value)
    ]);
    
    if (!shipmentData.value) {
      error.value = 'No shipment found with this tracking number.';
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Unable to fetch shipment data. Please try again later.';
    console.error('Shipment fetch error:', e);
  } finally {
    isLoading.value = false;
  }
}

function clearData() {
  shipmentStore.$reset();
  trackStore.$reset();
  showingShipments.value = false;
  error.value = '';
}

// Cleanup and initialization
onMounted(() => {
  clearData();
  if (fromTrack?.getTrack) {
    trackingInput.value = fromTrack.getTrack;
  }
  // Automatically submit the form when the page loads
  if (trackingInput.value.trim()) {
    handleSubmit(); // Call handleSubmit to perform the search
  }
});


// Watch for store errors
watchEffect(() => {
  if (trackStore.error) {
    error.value = trackStore.error;
  }
});
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