<template>
  <main>
    <TrackingInput @track-number="onTrackShipment" />

    <section class="flex flex-col w-11/12 justify-self-center p-4 space-y-10">
      <template v-if="showingShipments && filteredShipments.length">
        <DashTrack
          v-for="shipment in filteredShipments"
          :key="shipment.id"
          :package-id="shipment.customerId"
          :tracking-number="shipment.trackingNumber"
          :delivered-from="shipment.shippedFrom"
          :delivered-to="shipment.destinationAddress"
          :estimated-delivery="shipment.estimatedDelivery"
        />
      </template>
      <template v-else-if="showingShipments">
        <div class="text-center text-gray-500">No shipments found.</div>
      </template>
      
      <StatusTrack
        v-if="statusData"
        :note="statusData.note"
        :location="statusData.location"
        :time="statusData.time"
        :status="statusData.status"
      />
    </section>
    <FooterView />
  </main>
</template>

<script>
import { ref, computed } from "vue";
import { useShipmentStore } from "@/stores/shipmentStore";
import { useStatusStore } from "@/stores/statusStore";
import DashTrack from "@/components/widgets/track-comps/DashTrack.vue";
import TrackingInput from "@/components/widgets/TrackingInput.vue";
import StatusTrack from "@/components/widgets/track-comps/StatusTrack.vue";
import FooterView from "@/components/widgets/singles/FooterView.vue";

export default {
  components: {
    TrackingInput,
    DashTrack,
    StatusTrack,
    FooterView,
  },
  setup() {
    const shipmentStore = useShipmentStore();
    const statusStore = useStatusStore();
    const trackingNumber = ref("");
    const showingShipments = ref(false);
    const filteredShipments = ref([]);
    const statusData = ref(null);
    
    const onTrackShipment = async (inputTrackingNumber) => {
  try {
    // Update tracking number
    trackingNumber.value = inputTrackingNumber;

    // Fetch shipments
    await shipmentStore.fetchShipments(inputTrackingNumber);

    // Filter shipments based on tracking number
    const filtered = shipmentStore.shipments.filter((shipment) =>
      shipment.trackingNumber
        .toLowerCase()
        .includes(inputTrackingNumber.toLowerCase())
    );

    // Update filtered shipments and show shipments
    filteredShipments.value = filtered;
    showingShipments.value = true;

    // Log fetched shipments
    console.log("Filtered Shipments:", filteredShipments.value);

    // Fetch status data
    await statusStore.fetchPackagingData(trackingNumber.value);
    statusData.value = statusStore.packagingData[0]; // Assuming the first item is relevant

    // Log status data
    console.log("Status Data:", statusData.value);
  } catch (error) {
    console.error("Failed to load shipments:", error);
    filteredShipments.value = [];
    showingShipments.value = false;
  }
};
    return {
      onTrackShipment,
      filteredShipments,
      showingShipments,
      statusData,
    };
  },
};
</script>