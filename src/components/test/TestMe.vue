<template>
  <div>
    <h1>Shipment Data</h1>
    <button @click="loadShipment">Load Shipment</button>
    <div v-if="shipmentStore.loading">Loading...</div>
    <div v-if="shipmentStore.error">{{ shipmentStore.error }}</div>

    <!-- Displaying Shipment Data -->
    <div v-if="shipmentStore.shipmentData">
      <p>
        <strong>Destination Address:</strong>
        {{ shipmentStore.shipmentData.destinationAddress }}
      </p>
      <p>
        <strong>Current Status:</strong>
        {{ shipmentStore.shipmentData.currentStatus }}
      </p>
      <p>
        <strong>Shipment Date:</strong>
        {{ formatDate(shipmentStore.shipmentData.shipmentDate) }}
      </p>
      <p>
        <strong>Estimated Delivery Date:</strong>
        {{ formatDate(shipmentStore.shipmentData.estimatedDeliveryDate) }}
      </p>
      <p>
        <strong>Tracking Number:</strong>
        {{ shipmentStore.shipmentData.trackingNumber }}
      </p>
    </div>

    <DashTrack
      v-if="shipmentStore.shipmentData"
      :package-id="shipmentStore.shipmentData.customerId"
      :tracking-number="shipmentStore.shipmentData.trackingNumber"
      :delivered-from="shipmentStore.shipmentData.destinationAddress"
      :delivered-to="shipmentStore.shipmentData.destinationAddress"
      :estimated-delivery="formatDate(shipmentStore.shipmentData.estimatedDeliveryDate)"
    />
  </div>
</template>

<script>
import { useShipmentStore } from "@/stores/shipmentStore";
import { ref } from "vue";
import DashTrack from "../widgets/track-comps/DashTrack.vue";  // Ensure path is correct

export default {
  components: {
    DashTrack, // Register the DashTrack component
  },
  setup() {
    const shipmentStore = useShipmentStore();
    const userId = "Id2ZY2f1xEepqCp9CcnFcQ79gFi2"; // Replace with actual user ID
    const shipmentId = "Id2ZY2f1xEepqCp9CcnFcQ79gFi2"; // Replace with actual shipment ID

    // Fetch shipment data
    const loadShipment = () => {
      shipmentStore.fetchShipmentData(userId, shipmentId);
    };

    // Helper function to format the date from seconds and nanoseconds
    const formatDate = (timestamp) => {
      const date = new Date(
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
      );
      return date.toLocaleString(); // Returns a human-readable date string
    };

    return {
      shipmentStore,
      loadShipment,
      formatDate,
    };
  },
};
</script>
