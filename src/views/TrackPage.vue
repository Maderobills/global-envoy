<template>
  <main>
    <div :style="backgroundImageStyle" class="bg-cover bg-center h-80 flex flex-col justify-between">
      <div class="h-full text-white text-center p-6 bg-black bg-opacity-20 hover:backdrop-blur-sm space-y-6">
        <h1 class="text-4xl font-bold">Track Your Shipment</h1>
        <div class="w-fit h-fit flex justify-self-center bg-white p-2 rounded">
          <input v-model="trackingInput" @keyup.enter="onTrackShipment(trackingInput)"
            placeholder="Enter your tracking number"
            class="rounded-s h-12 w-96 p-5 text-slate-900 text-md outline-none" />
          <button @click="onTrackShipment(trackingInput)"
            class="transition bg-slate-900 px-10 font-semibold hover:font-bold rounded shadow-slate-900 hover:shadow-md text-white">
            Track
          </button>
        </div>
      </div>
    </div>

    <section class="flex flex-col w-11/12 justify-self-center p-4 space-y-10">
      <template v-if="showingShipments && filteredShipments.length">
        <DashTrack
      v-if="shipmentStore.shipmentData"
      :package-id="shipmentStore.shipmentData.customerId"
      :tracking-number="shipmentStore.shipmentData.trackingNumber"
      :delivered-from="shipmentStore.shipmentData.destinationAddress"
      :delivered-to="shipmentStore.shipmentData.destinationAddress"
      :estimated-delivery="formatDate(shipmentStore.shipmentData.estimatedDeliveryDate)"
    />
      </template>
      <template v-else-if="showingShipments">
        <div class="text-center text-gray-500">No shipments found.</div>
      </template>
    </section>
    <FooterView />
  </main>
</template>

<script>
import { ref, computed } from "vue";
import { useShipmentStore } from "@/stores/shipmentStore";
import { useStatusStore } from "@/stores/statusStore";
import DashTrack from "@/components/widgets/track-comps/DashTrack.vue";
import FooterView from "@/components/widgets/singles/FooterView.vue";

export default {
  components: {
    DashTrack,
    FooterView,
  },
  setup() {
    const shipmentStore = useShipmentStore();
    const statusStore = useStatusStore();
    const trackingInput = ref(""); // Bind input value to track shipments
    const showingShipments = ref(false); // Flag to show shipments
    const filteredShipments = ref([]); // Filtered shipments list

    const backgroundImageStyle = computed(() => ({
      backgroundImage: `url('https://img.freepik.com/free-photo/busy-shipping-port-with-containers-trade-action_91128-4581.jpg')`,
    }));

    const onTrackShipment = async (inputTrackingNumber) => {
      try {
        // Clear previous results
        filteredShipments.value = [];
        showingShipments.value = false;

        // Ensure that the tracking number is not empty
        if (!inputTrackingNumber) {
          alert("Please enter a valid tracking number.");
          return;
        }

        // Fetch shipment data using the tracking number
        await shipmentStore.fetchShipmentData(inputTrackingNumber);

        // Log the shipments to check what is returned
        console.log("Shipments after fetch:", shipmentStore.shipments);

        // Ensure shipments is defined and is an array
        if (Array.isArray(shipmentStore.shipments)) {
          // Filter shipments based on tracking number
          const filtered = shipmentStore.shipments.filter((shipment) =>
            shipment.trackingNumber
              .toLowerCase()
              .includes(inputTrackingNumber.toLowerCase())
          );

          // Update filtered shipments and show them
          filteredShipments.value = filtered;
          showingShipments.value = true;
        } else {
          throw new Error("Shipments data is not available.");
        }

        // Fetch status data based on the tracking number
        await statusStore.fetchPackagingData(inputTrackingNumber);
      } catch (error) {
        console.error("Failed to load shipments:", error.message);
        filteredShipments.value = [];
        showingShipments.value = false;
      }
    };

    return {
      trackingInput,
      showingShipments,
      filteredShipments,
      backgroundImageStyle,
      onTrackShipment,
    };
  },
};
</script>
