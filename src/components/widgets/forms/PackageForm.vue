<template>
  <div class="space-y-6">
    <div>
      <label class="block text-sm font-medium mb-2">Package Type</label>
      <select v-model="formData.packageType" class="w-full p-3 border outline-emerald-600 rounded">
        <option>Box</option>
        <option>Pallet</option>
        <option>Document</option>
      </select>
    </div>
    <div>
      <label class="block text-sm font-medium mb-2">Contents Description</label>
      <textarea v-model="formData.description" class="w-full p-3 border outline-emerald-600 rounded h-24"></textarea>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div>
        <label class="block text-sm font-medium mb-2">Length (cm)</label>
        <input v-model="formData.length" type="number" class="w-full p-3 border outline-emerald-600 rounded" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-2">Width (cm)</label>
        <input v-model="formData.width" type="number" class="w-full p-3 border outline-emerald-600 rounded" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-2">Height (cm)</label>
        <input v-model="formData.height" type="number" class="w-full p-3 border outline-emerald-600 rounded" />
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium mb-2">Weight (kg)</label>
      <input v-model="formData.weight" type="number" class="w-full p-3 border outline-emerald-600 rounded" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({
  packageType: '',
  description: '',
  length: '',
  width: '',
  height: '',
  weight: ''
})
</script>