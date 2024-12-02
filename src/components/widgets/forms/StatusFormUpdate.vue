<template>
  <div class="max-w-md mx-auto p-4">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">
        Update Shipping Status Form
      </h2>

      <!-- Loading and Error States -->
      <div v-if="statusStore.loading" class="mb-4 text-blue-600">
        Processing...
      </div>
      <div v-if="statusStore.error" class="mb-4 text-red-600">
        {{ statusStore.error }}
      </div>

      <!-- Transit Type Selection -->
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
          <option v-for="option in Object.keys(latestUpdate || {})" :key="option" :value="option">
            {{ option.charAt(0) + option.slice(1) }}
          </option>
        </select>
      </div>

      <!-- Form Fields -->
      <form @submit.prevent="handleSubmit" class="space-y-4 grid grid-cols-2 gap-5 items-center">
        <div>
          <label for="location" class="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            id="location"
            type="text"
            v-model="formData.location"
            :disabled="statusStore.loading"
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
            :disabled="statusStore.loading"
            rows="1"
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
            :disabled="statusStore.loading"
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
            :disabled="statusStore.loading"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>Select a status</option>
            <option v-for="status in statusOptions" :key="status" :value="status">
              {{ status.charAt(0) + status.slice(1) }}
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
          {{ editMode ? "Update" : "Submit" }}
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
            <span class="font-medium">Transit Type:</span> {{ latestUpdate.transitType }}
          </p>
          <p>
            <span class="font-medium">Location:</span> {{ latestUpdate.location }}
          </p>
          <p>
            <span class="font-medium">Status:</span> {{ latestUpdate.status }}
          </p>
          <p>
            <span class="font-medium">Date:</span> {{ latestUpdate.date }}
          </p>
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
</template>

<script setup>
import { useTrackStore } from "@/stores/crudStatusStore";
import { ref, computed, onMounted } from "vue";

const props = defineProps(["uid", "trackingNum"]);

const statusStore = useTrackStore();

const statusOptions = ["pending","hold", "success", "failed"];
const formData = ref({ transitType: "", location: "", note: "", date: "", status: "" });
const editMode = ref(false);
const latestUpdate = computed(() => statusStore.content);

const userId = props.uid;
const trackingNum = props.trackingNum || "tracking123";

onMounted(async () => {
  try {
    await statusStore.fetchTrackingData(`/Users/${userId}/Shipments/${trackingNum}/Tracking/${trackingNum}`);
    await statusStore.fetchTrackingData(`/Tracking/${trackingNum}/Shipments/${trackingNum}/Tracking/${trackingNum}`);
  } catch (error) {
    console.error("Failed to fetch tracking data:", error);
  }
});

const setFormDataForTransitType = (transitType) => {
  if (!latestUpdate.value || !latestUpdate.value[transitType]) return;
  const selectedData = latestUpdate.value[transitType];
  formData.value = {
    transitType,
    location: selectedData.location || "",
    note: selectedData.note || "",
    date: selectedData.date || "",
    status: selectedData.status || "",
  };
};

const onTransitTypeChange = () => {
  if (formData.value.transitType) {
    setFormDataForTransitType(formData.value.transitType);
    editMode.value = true;
  } else {
    formData.value = { transitType: "", location: "", note: "", date: "", status: "" };
    editMode.value = false;
  }
};

const handleSubmit = async () => {
  try {
    if (!formData.value.transitType) return;

    const { transitType, ...nestedData } = formData.value;
    const filteredData = Object.fromEntries(
      Object.entries(nestedData).filter(([_, value]) => value && value.trim())
    );

    const updatedData = {
      ...latestUpdate.value,
      [transitType]: {
        ...(editMode.value ? latestUpdate.value[transitType] : {}),
        ...filteredData,
      },
    };

    if (editMode.value) {
      await statusStore.updateTrackingData(`/Users/${userId}/Shipments/${trackingNum}/Tracking/${trackingNum}`, updatedData);
      await statusStore.updateTrackingData(`/Tracking/${trackingNum}/Shipments/${trackingNum}/Tracking/${trackingNum}`, updatedData);
    } else {
      await statusStore.setTrackingData(`/Users/${userId}/Shipments/${trackingNum}/Tracking/${trackingNum}`, updatedData);
      await statusStore.setTrackingData(`/Tracking/${trackingNum}/Shipments/${trackingNum}/Tracking/${trackingNum}`, updatedData);
    }

    formData.value = { transitType: "", location: "", note: "", date: "", status: "" };
    editMode.value = false;
  } catch (error) {
    console.error("Failed to submit data:", error);
  }
};

const editUpdate = (transitType) => {
  setFormDataForTransitType(transitType);
  editMode.value = true;
};
</script>
