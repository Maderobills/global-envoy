<template>
    <div class="max-w-md mx-auto p-4">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">
          Shipping Status Form
        </h2>
  
        <!-- Loading and Error States -->
        <div v-if="statusStore.isLoading" class="mb-4 text-blue-600">
          Processing...
        </div>
        <div v-if="statusStore.getError" class="mb-4 text-red-600">
          {{ statusStore.getError }}
        </div>
  
        <form @submit.prevent="handleSubmit" class="space-y-4 grid grid-cols-2 gap-5">
          <!-- Input Fields -->
          <div class="space-y-2">
            <label for="transit" class="block text-sm font-medium text-gray-700">
              Transit Type
            </label>
            <select
              id="transit"
              v-model="formData.transitType"
              required
              :disabled="statusStore.isLoading"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Select transit type</option>
              <option v-for="option in transitOptions" :key="option" :value="option">
                {{ option.charAt(0).toUpperCase() + option.slice(1) }}
              </option>
            </select>
          </div>
  
          <div class="space-y-2">
            <label for="location" class="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              id="location"
              type="text"
              v-model="formData.location"
              required
              :disabled="statusStore.isLoading"
              placeholder="Enter location"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <div class="space-y-2">
            <label for="note" class="block text-sm font-medium text-gray-700">
              Note
            </label>
            <textarea
              id="note"
              v-model="formData.note"
              placeholder="Enter notes"
              :disabled="statusStore.isLoading"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            ></textarea>
          </div>
  
          <div class="space-y-2">
            <label for="date" class="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              id="date"
              type="date"
              v-model="formData.date"
              required
              :disabled="statusStore.isLoading"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <div class="space-y-2">
            <label for="status" class="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              v-model="formData.status"
              required
              :disabled="statusStore.isLoading"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Select status</option>
              <option v-for="option in statusOptions" :key="option" :value="option">
                {{ option.charAt(0).toUpperCase() + option.slice(1) }}
              </option>
            </select>
          </div>
  
          <button
            type="submit"
            :disabled="statusStore.isLoading"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {{ isEditMode ? 'Update' : 'Submit' }}
          </button>
        </form>
  
        <!-- Latest Update Display -->
        <div v-if="latestUpdate" class="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 class="text-lg font-medium text-gray-900 mb-2">Latest Update</h3>
          <div class="text-sm text-gray-600">
            <p><span class="font-medium">Transit Type:</span> {{ latestUpdate.transitType }}</p>
            <p><span class="font-medium">Location:</span> {{ latestUpdate.location }}</p>
            <p><span class="font-medium">Status:</span> {{ latestUpdate.status }}</p>
            <p><span class="font-medium">Date:</span> {{ latestUpdate.date }}</p>
            <button
              @click="enableEditMode(latestUpdate)"
              class="mt-2 px-4 py-1 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700"
            >
              Edit Latest Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { useStatusUpdateStore } from '@/stores/crudStatusStore';
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps(['uid', 'trackingNum']);

const route = useRoute();
const statusStore = useStatusUpdateStore();

const transitOptions = ['transit1', 'transit2', 'delivered', 'packaging'];
const statusOptions = ['pending', 'success', 'failed'];

const formData = ref({
  transitType: '',
  location: '',
  note: '',
  date: '',
  status: ''
});

const userId = props.uid; // Replace with actual user ID source
const trackingNum = props.trackingNum || 'tracking123'; // Replace with actual tracking number source

const updates = computed(() => statusStore.getUpdates(trackingNum));
const latestUpdate = computed(() => statusStore.getLatestUpdate(trackingNum));

const editMode = ref(false);
const editingUpdateId = ref(null);

onMounted(async () => {
  try {
    await statusStore.fetchStatusUpdates(userId, trackingNum);
  } catch (error) {
    console.error('Failed to fetch updates:', error);
  }
});

const handleSubmit = async () => {
  try {
    if (editMode.value) {
      // Update existing update
      await statusStore.updateTrackingUpdate(
        userId,
        trackingNum,
        editingUpdateId.value,
        formData.value
      );
      editMode.value = false; // Exit edit mode
    } else {
      // Create new update
      await statusStore.createStatusUpdate(userId, trackingNum, formData.value);
    }

    // Reset form
    formData.value = {
      transitType: '',
      location: '',
      note: '',
      date: '',
      status: ''
    };
    editingUpdateId.value = null; // Clear current edit ID
  } catch (error) {
    console.error('Failed to submit update:', error);
  }
};

const editUpdate = (update) => {
  // Populate form with the selected update's data
  formData.value = {
    transitType: update.transitType,
    location: update.location,
    note: update.note,
    date: update.date,
    status: update.status
  };
  editMode.value = true;
  editingUpdateId.value = update.id;
};

  </script>
  