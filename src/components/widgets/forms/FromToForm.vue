<template>
  <div class="space-y-6">
    <!-- From Destination -->
    <div>
      <label class="block text-sm font-medium mb-2">From (City)</label>
      <input 
        v-model="formData.fromCity" 
        type="text" 
        placeholder="Enter Origin City" 
        class="w-full p-3 border outline-emerald-600 rounded" 
        required
      />
    </div>

    <!-- To Destination -->
    <div>
      <label class="block text-sm font-medium mb-2">To (City)</label>
      <input 
        v-model="formData.toCity" 
        type="text" 
        placeholder="Enter Destination City" 
        class="w-full p-3 border outline-emerald-600 rounded" 
        required
      />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({
  fromCity: '',
  toCity: ''
})
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>