<template>
  <div>
      <h1>Shipment Data</h1>
      <button @click="loadShipment">Load Shipment</button>
      <div v-if="shipmentStore.loading">Loading...</div>
      <div v-if="shipmentStore.error">{{ shipmentStore.error }}</div>
      <pre v-if="shipmentStore.shipmentData">{{ shipmentStore.shipmentData }}</pre>
  </div>
</template>

<script>
import { useShipmentStore } from '@/stores/shipmentStore';
import { ref } from 'vue';

export default {
  setup() {
      const shipmentStore = useShipmentStore();
      const userId = 'Id2ZY2f1xEepqCp9CcnFcQ79gFi2'; // Replace with actual user ID
      const shipmentId = 'Id2ZY2f1xEepqCp9CcnFcQ79gFi2'; // Replace with actual shipment ID

      const loadShipment = () => {
          shipmentStore.fetchShipments(userId, shipmentId);
      };

      return {
          shipmentStore,
          loadShipment,
      };
  },
};
</script>