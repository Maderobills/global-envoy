<template>
    <div class="space-y-6">
      <div>
        <label class="block text-sm font-medium mb-2">Insurance Required?</label>
        <div class="space-x-4">
          <input type="radio" v-model="formData.insurance" value="yes" id="yes" />
          <label for="yes">Yes</label>
          <input type="radio" v-model="formData.insurance" value="no" id="no" />
          <label for="no">No</label>
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium mb-2">Special Instructions</label>
        <textarea v-model="formData.instructions" class="w-full p-3 border rounded h-24"></textarea>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  
  const formData = reactive({
    insurance: '',
    instructions: ''
  })
  </script>