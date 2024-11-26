<template>
  <div class="max-w-md mx-auto p-4">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">
        Shipping Status Form
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
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
      >
        <option value="" disabled>Select a transit type</option>
        <option v-for="option in Object.keys(latestUpdate.value || {})" :key="option" :value="option">
          {{ option.charAt(0).toUpperCase() + option.slice(1) }}
        </option>
      </select>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4 grid grid-cols-2 gap-10">
      <!-- Input Fields -->
      <div>
        <label for="location" class="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          id="location"
          type="text"
          v-model="formData.location"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label for="note" class="block text-sm font-medium text-gray-700">
          Note
        </label>
        <textarea
          id="note"
          v-model="formData.note"
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>

      <div>
        <label for="date" class="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          id="date"
          type="date"
          v-model="formData.date"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label for="status" class="block text-sm font-medium text-gray-700">
          Status
        </label>
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
          :disabled="
            statusStore.loading ||
            !formData.transitType ||
            Object.values(formData).every((value) => !value.trim())
          "
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {{ editMode.value ? "Update" : "Submit" }}
        </button>
      </form>

      <!-- Latest Update Display -->
      <div
        v-if="latestUpdate && Object.keys(latestUpdate).length > 0"
        class="mt-6 p-4 bg-gray-50 rounded-md"
      >
        <h3 class="text-lg font-medium text-gray-900 mb-2">Latest Update</h3>
        <div class="text-sm text-gray-600">
          <p>
            <span class="font-medium">Transit Type:</span>
            {{ latestUpdate.transitType }}
          </p>
          <p>
            <span class="font-medium">Location:</span>
            {{ latestUpdate.location }}
          </p>
          <p>
            <span class="font-medium">Status:</span> {{ latestUpdate.status }}
          </p>
          <p><span class="font-medium">Date:</span> {{ latestUpdate.date }}</p>
          <button
            @click="editUpdate(latestUpdate.transitType)"
            class="mt-2 px-4 py-1 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700"
          >
            Edit Latest Update
          </button>
          
        </div>
      </div>
      <div v-else class="mt-6 text-gray-600">No updates available.</div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { useTrackStore } from "@/stores/crudStatusStore";
import { ref, computed, onMounted } from "vue";

const props = defineProps(["uid", "trackingNum"]);

const statusStore = useTrackStore();

const transitOptions = ["transit1", "transit2", "delivered", "packaging"];
const statusOptions = ["pending", "success", "failed"];

const formData = ref({
  transitType: "",
  location: "",
  note: "",
  date: "",
  status: "",
});

const editMode = ref(false);
const editingTransitType = ref(null);

const userId = props.uid;
const trackingNum = props.trackingNum || "tracking123";

const latestUpdate = computed(() => statusStore.content);

// Helper function to populate formData from nested data
const setFormDataForTransitType = (transitType) => {
  if (!latestUpdate.value || !latestUpdate.value[transitType]) {
    console.error(`No data found for transitType: ${transitType}`);
    return;
  }

  const selectedData = latestUpdate.value[transitType];
  formData.value = {
    transitType,
    location: selectedData.location || '',
    note: selectedData.note || '',
    date: selectedData.date || '',
    status: selectedData.status || ''
  };
};

onMounted(async () => {
  try {
    await statusStore.fetchTrackingData(
      `/Users/${userId}/Shipments/${trackingNum}/Tracking/${trackingNum}`
    );
    if (latestUpdate.value) {
      const firstTransitType = Object.keys(latestUpdate.value)[0];
      if (firstTransitType) {
        setFormDataFromNested(latestUpdate.value, firstTransitType);
      }
    }
  } catch (error) {
    console.error("Failed to fetch tracking data:", error);
  }
});

const onTransitTypeChange = () => {
  if (formData.value.transitType) {
    setFormDataForTransitType(formData.value.transitType);
    editMode.value = true; // Enable edit mode
  } else {
    // Reset form if no transit type is selected
    formData.value = {
      transitType: '',
      location: '',
      note: '',
      date: '',
      status: ''
    };
    editMode.value = false;
  }
};

const handleSubmit = async () => {
  try {
    if (!formData.value.transitType) {
      console.error("Transit Type is required");
      return;
    }

    // Filter out empty fields
    const { transitType, ...nestedData } = formData.value;
    const filteredData = Object.entries(nestedData).reduce(
      (acc, [key, value]) => {
        if (value && value.trim() !== "") {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    if (Object.keys(filteredData).length === 0) {
      console.error("Form fields cannot all be empty.");
      return; // Prevent empty submissions
    }

    if (editMode.value) {
      // Merge with existing data for the selected transitType
      const currentData = latestUpdate.value[transitType] || {};
      const updatedData = {
        ...latestUpdate.value,
        [transitType]: {
          ...currentData,
          ...filteredData,
        },
      };

      await statusStore.updateTrackingData(
        `/Users/${userId}/Shipments/${trackingNum}/Tracking/${trackingNum}`,
        updatedData
      );
      editMode.value = false;
    } else {
      // Add or update new data
      const newData = {
        ...latestUpdate.value,
        [transitType]: filteredData,
      };

      await statusStore.setTrackingData(
        `/Users/${userId}/Shipments/${trackingNum}/Tracking/${trackingNum}`,
        newData
      );
    }

    // Reset form
    formData.value = {
      transitType: "",
      location: "",
      note: "",
      date: "",
      status: "",
    };
    editingTransitType.value = null;
  } catch (error) {
    console.error("Failed to submit data:", error);
  }
};

const editUpdate = (transitType) => {
  if (!transitType || !latestUpdate.value[transitType]) {
    console.error(`Invalid or missing data for transitType: ${transitType}`);
    return;
  }

  setFormDataFromNested(latestUpdate.value, transitType);
  editMode.value = true;
  editingTransitType.value = transitType;
};
</script>



fix all