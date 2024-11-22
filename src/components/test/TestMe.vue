<template>
  <div>
    <h1>Shipment Data</h1>

    <!-- Input field to enter the tracking number -->
    <div>
      <input v-model="trackingNumber" type="text" placeholder="Enter Tracking Number" />
      <button @click="loadShipmentByTrackingNumber">Search Shipment</button>
    </div>

    <!-- Display the shipment data -->
    <div v-if="filteredShipments.length > 0">
      <ul>
        <li v-for="shipment in filteredShipments" :key="shipment.id">
          <strong>Tracking Number:</strong> {{ shipment.id }}<br />
          <strong>Current Status:</strong> {{ shipment.currentStatus }}<br />
          <strong>Customer ID:</strong> {{ shipment.customerId }}
        </li>
      </ul>
    </div>

    <!-- If no shipment found -->
    <p v-else>No shipment found for the given tracking number.</p>
  </div>
</template>

<script>
import { useShipmentStore } from '@/stores/shipmentStore';
import { computed, ref } from 'vue';



export default {
  setup() {
    const shipmentStore = useShipmentStore();
    const trackingNumber = ref('');  // To bind the input field
    const filteredShipments = computed(() => {
      // Filter shipments based on the entered tracking number
      return shipmentStore.shipments.filter(shipment => 
        shipment.id.includes(trackingNumber.value)
      );
    });

    // Method to fetch all shipments from the store
    const loadShipments = async () => {
      await shipmentStore.fetchShipments();
    };

    // Method to filter shipments by tracking number
    const loadShipmentByTrackingNumber = async () => {
      // Ensure we fetch shipments when the user searches
      if (!shipmentStore.shipments.length) {
        await loadShipments(); // If no shipments are loaded, load them
      }
    };

    return {
      trackingNumber,
      loadShipmentByTrackingNumber,
      filteredShipments,
    };
  },
};
</script>

<style scoped>

</style>
