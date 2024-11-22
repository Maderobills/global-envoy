<template>
  <div>
    <h1>Tracking Data</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="packageDetails.length">
      <h2>Package Details</h2>
      <ul>
        <li v-for="(detail, index) in packageDetails" :key="index">
          Content: {{ detail.packageDetails.content }}
        </li>
      </ul>
    </div>
    <div v-else>No package details available.</div>

    <button @click="loadData">Fetch Tracking Data</button>
  </div>
</template>

<script>
import { useTrackStore } from '@/stores/statusStore';

export default {
  setup() {
    const trackStore = useTrackStore();
    const docPath = '/Users/Id2ZY2f1xEepqCp9CcnFcQ79gFi2/Shipments/Id2ZY2f1xEepqCp9CcnFcQ79gFi2/Tracking/12345678';

    const loadData = () => {
      console.log('Fetching data...');
      trackStore.fetchTrackingData(docPath);
      console.log('Store state:', trackStore.packageDetails);
    };

    return {
      ...trackStore,
      loadData,
    };
  },
};
</script>

<style>
.error {
  color: red;
}
</style>
