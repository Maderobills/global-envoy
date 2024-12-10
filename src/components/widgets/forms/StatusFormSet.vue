<template>
  <div class="max-w-md mx-auto p-4">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">
        Set Shipping Status Form
      </h2>

      <!-- Loading and Error States -->
      <div v-if="statusStore.loading" class="mb-4 text-blue-600">
        Processing...
      </div>
      <div v-if="statusStore.error" class="mb-4 text-red-600">
        {{ statusStore.error }}
      </div>

      <div>
        <div class="mb-4">
          <label for="transitTypeSelect" class="block text-sm font-medium text-gray-700">
            Select Transit Type
          </label>
          <select
            id="transitTypeSelect"
            v-model="formData.transitType"
            @change="onTransitTypeChange"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>Select a transit type</option>
            <option v-for="transit in transitOptions" :key="transit" :value="transit">
              {{ transit.charAt(0).toUpperCase() + transit.slice(1) }}
            </option>
          </select>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4 grid grid-cols-2 gap-5 items-center">
          <!-- Input Fields -->
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
            <input
              id="location"
              type="text"
              v-model="formData.location"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label for="note" class="block text-sm font-medium text-gray-700">Note</label>
            <textarea
              id="note"
              v-model="formData.note"
              rows="1"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div>
            <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
            <input
              id="date"
              type="date"
              v-model="formData.date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              v-model="formData.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Select a status</option>
              <option v-for="status in statusOptions" :key="status" :value="status">
                {{ status.charAt(0).toUpperCase() + status.slice(1) }}
              </option>
            </select>
          </div>

          <button
            type="submit"
            :disabled="statusStore.loading || !formData.transitType || Object.values(formData).every(value => !value.trim())"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {{ editMode ? "Add Status" : "Submit" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Swal from "sweetalert2";
import { useTrackStore } from "@/stores/crudStatusStore";

const props = defineProps(["uid", "trackingNum"]);
const statusStore = useTrackStore();

const transitOptions = ["PENDING", "PACKAGING", "TRANSIT1", "TRANSIT2", "TRANSIT3", "TRANSIT4", "ARRIVING", "DELIVERED"];
const statusOptions = ["PENDING","PICKED-UP", "IN-TRANSIT", "ON-HOLD", "DELIVERED"];

const formData = ref({
  transitType: "",
  location: "",
  note: "",
  date: "",
  status: "",
});

const editMode = ref(false);
const latestUpdate = computed(() => statusStore.content);

onMounted(async () => {
  try {
    await statusStore.fetchTrackingData(`/Users/${props.uid}/Shipments/${props.trackingNum}/Tracking/${props.trackingNum}`);
    await statusStore.fetchTrackingData(`/Tracking/${props.trackingNum}/Shipments/${props.trackingNum}/Tracking/${props.trackingNum}`);
    const firstTransitType = Object.keys(latestUpdate.value)[0];
    if (firstTransitType) {
      setFormDataForTransitType(firstTransitType);
    }
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Failed to fetch tracking data.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error("Failed to fetch tracking data:", error);
  }
});

const onTransitTypeChange = () => {
  if (formData.value.transitType) {
    setFormDataForTransitType(formData.value.transitType);
    editMode.value = true; // Enable edit mode
  } else {
    resetForm();
  }
};

const resetForm = () => {
  formData.value = {
    transitType: "",
    location: "",
    note: "",
    date: "",
    status: "",
  };
  editMode.value = false;
};

const setFormDataForTransitType = (transitType) => {
  const selectedData = latestUpdate.value[transitType];
  if (selectedData) {
    formData.value = {
      transitType,
      location: selectedData.location || '',
      note: selectedData.note || '',
      date: selectedData.date || '',
      status: selectedData.status || ''
    };
  } else {
    console.error(`No data found for transitType: ${transitType}`);
  }
};

const handleSubmit = async () => {
  try {
    if (!formData.value.transitType) {
      Swal.fire({
        title: "Error",
        text: "Transit Type is required.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const filteredData = Object.fromEntries(
      Object.entries(formData.value).filter(([_, value]) => value && value.trim() !== "")
    );

    if (Object.keys(filteredData).length === 0) {
      Swal.fire({
        title: "Error",
        text: "Form fields cannot all be empty.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return; // Prevent empty submissions
    }

    const currentData = latestUpdate.value[formData.value.transitType] || {};
    const updatedData = { ...latestUpdate.value, [formData.value.transitType]: { ...currentData, ...filteredData } };

    if (editMode.value) {
      await statusStore.updateTrackingData(`/Users/${props.uid}/Shipments/${props.trackingNum}/Tracking/${props.trackingNum}`, updatedData);
      await statusStore.updateTrackingData(`/Tracking/${props.trackingNum}/Shipments/${props.trackingNum}/Tracking/${props.trackingNum}`, updatedData);
      Swal.fire({
        title: "Success",
        text: "Tracking status updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      await statusStore.setTrackingData(`/Users/${props.uid}/Shipments/${props.trackingNum}/Tracking/${props.trackingNum}`, updatedData);
      await statusStore.setTrackingData(`/Tracking/${props.trackingNum}/Shipments/${props.trackingNum}/Tracking/${props.trackingNum}`, updatedData);
      Swal.fire({
        title: "Success",
        text: "Tracking status added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    }

    resetForm();
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Failed to submit data.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error("Failed to submit data:", error);
  }
};

const editUpdate = (transitType) => {
  if (latestUpdate.value[transitType]) {
    setFormDataForTransitType(transitType);
    editMode.value = true;
  } else {
    console.error(`Invalid or missing data for transitType: ${transitType}`);
  }
};
</script>
