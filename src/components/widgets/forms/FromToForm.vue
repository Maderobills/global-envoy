<template>
  <div class="space-y-6">
    <!-- From Destination -->
    <div class="space-y-2">
      <h1 class="text-lg text-emerald-600 font-semibold">From Destination</h1>

      <div class="flex justify-between gap-4">
        <div class="flex-1">
          <label class="block text-sm font-medium mb-2">From (City)</label>
          <input 
            v-model="store.formData.fromCity" 
            type="text" 
            placeholder="Enter Origin City" 
            :class="['w-full p-3 border rounded', store.errors.fromCity ? 'border-red-500' : 'outline-emerald-600']"
            @blur="store.validateField('fromCity')"
            required
          />
          <p v-if="store.errors.fromCity" class="text-red-500 text-sm mt-1">{{ store.errors.fromCity }}</p>
        </div>

        <div class="flex-1">
          <label class="block text-sm font-medium mb-2">Country</label>
          <input 
            v-model="store.formData.fromCountry" 
            type="text" 
            placeholder="Enter Origin Country" 
            :class="['w-full p-3 border rounded', store.errors.fromCountry ? 'border-red-500' : 'outline-emerald-600']"
            @blur="store.validateField('fromCountry')"
            required
          />
          <p v-if="store.errors.fromCountry" class="text-red-500 text-sm mt-1">{{ store.errors.fromCountry }}</p>
        </div>

        <div class="flex-1">
          <label class="block text-sm font-medium mb-2">Zip Code</label>
          <input 
            v-model="store.formData.fromZipCode" 
            type="text" 
            placeholder="Enter Origin Zip Code" 
            class="w-full p-3 border outline-emerald-600 rounded"
          />
        </div>
      </div>
    </div>

    <!-- To Destination -->
    <div class="space-y-2">
      <h1 class="text-lg text-emerald-600 font-semibold">To Destination</h1>

      <div class="flex justify-between gap-4">
        <div class="flex-1">
          <label class="block text-sm font-medium mb-2">To (City)</label>
          <input 
            v-model="store.formData.toCity" 
            type="text" 
            placeholder="Enter Destination City" 
            :class="['w-full p-3 border rounded', store.errors.toCity ? 'border-red-500' : 'outline-emerald-600']"
            @blur="store.validateField('toCity')"
            required
          />
          <p v-if="store.errors.toCity" class="text-red-500 text-sm mt-1">{{ store.errors.toCity }}</p>
        </div>

        <div class="flex-1">
          <label class="block text-sm font-medium mb-2">Country</label>
          <input 
            v-model="store.formData.toCountry" 
            type="text" 
            placeholder="Enter Destination Country" 
            :class="['w-full p-3 border rounded', store.errors.toCountry ? 'border-red-500' : 'outline-emerald-600']"
            @blur="store.validateField('toCountry')"
            required
          />
          <p v-if="store.errors.toCountry" class="text-red-500 text-sm mt-1">{{ store.errors.toCountry }}</p>
        </div>

        <div class="flex-1">
          <label class="block text-sm font-medium mb-2">Zip Code</label>
          <input 
            v-model="store.formData.toZipCode" 
            type="text" 
            placeholder="Enter Destination Zip Code" 
            class="w-full p-3 border outline-emerald-600 rounded"
          />
        </div>
      </div>
    </div>

    <div class="flex gap-4">
      
      <button 
        @click="store.resetForm"
        class=" bg-gray-500 text-white py-3 px-6 rounded hover:bg-gray-600 transition-colors"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script setup>
import { useDestinationStore } from '@/stores/destinationStore';


const store = useDestinationStore()

const handleSubmit = () => {
  if (store.submitForm()) {
    // Handle successful submission
    // e.g., navigate to next page or show success message
  }
}
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>