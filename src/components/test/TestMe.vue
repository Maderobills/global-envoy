<template>
  <div>
    <h1>Tracking Information</h1>
    <button @click="fetchTrackingData">Fetch Tracking Data</button>

    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="content">
      <h2>Package ID: {{ content.PackageDetails?.packageId }}</h2>
      <p>Content: {{ content.PackageDetails?.content }}</p>

      <h3>Package Details</h3>
      <div>
        <StatusTrack
          v-for="(status, key) in trackingStages"
          :key="key"
          :location="status.location"
          :note="status.note"
          :status="status.status"
          :time="status.time"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTrackStore } from '@/stores/statusStore';
import StatusTrack from '../widgets/track-comps/StatusTrack.vue';
import { computed } from 'vue';

// Access the Pinia store
const trackStore = useTrackStore();
const { content, loading, error, fetchTrackingData } = trackStore;

// Define the document path
const docPath = '/Users/Id2ZY2f1xEepqCp9CcnFcQ79gFi2/Shipments/Id2ZY2f1xEepqCp9CcnFcQ79gFi2/Tracking/12345678/';

// Fetch tracking data
const fetchTrackingDataHandler = async () => {
  await fetchTrackingData(docPath);
  console.log('Fetched content:', content); // Log the fetched content
};

// Dynamically map the tracking stages
const trackingStages = computed(() => {
  if (!content) return [];
  return ['delivered', 'packaging', 'transit1', 'transit2'].map(key => ({
    key,
    ...(content[key] || {}) // Spread operator with fallback
  }));
});
</script>

<style scoped>
h1 {
  font-size: 2em;
  margin-bottom: 20px;
}
h2, h3 {
  margin-top: 15px;
}
button {
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>