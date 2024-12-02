<template>
  <div class="space-y-6">
    <div>
      <label class="block text-sm font-medium mb-2">Package Type <span class="text-red-500">*</span></label>
      <select 
        v-model="store.formData.packageType" 
        :class="['w-full p-3 border rounded', store.errors.packageType ? 'border-red-500' : 'outline-emerald-600']"
        @blur="store.validateField('packageType')"
      >
        <option value="">Select Package Type</option>
        <option>Box</option>
        <option>Pallet</option>
        <option>Document</option>
      </select>
      <p v-if="store.errors.packageType" class="text-red-500 text-sm mt-1">{{ store.errors.packageType }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium mb-2">Contents Description <span class="text-red-500">*</span></label>
      <textarea 
        v-model="store.formData.description" 
        :class="['w-full p-3 border rounded h-24', store.errors.description ? 'border-red-500' : 'outline-emerald-600']"
        @blur="store.validateField('description')"
        placeholder="Please describe the contents of your package (minimum 10 characters)"
      ></textarea>
      <p v-if="store.errors.description" class="text-red-500 text-sm mt-1">{{ store.errors.description }}</p>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <div>
        <label class="block text-sm font-medium mb-2">Length (cm)</label>
        <input 
          v-model="store.formData.length" 
          type="number" 
          class="w-full p-3 border outline-emerald-600 rounded" 
        />
      </div>
      <div>
        <label class="block text-sm font-medium mb-2">Width (cm)</label>
        <input 
          v-model="store.formData.width" 
          type="number" 
          class="w-full p-3 border outline-emerald-600 rounded" 
        />
      </div>
      <div>
        <label class="block text-sm font-medium mb-2">Height (cm)</label>
        <input 
          v-model="store.formData.height" 
          type="number" 
          class="w-full p-3 border outline-emerald-600 rounded" 
        />
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium mb-2">Weight (kg)</label>
      <input 
        v-model="store.formData.weight" 
        type="number" 
        class="w-full p-3 border outline-emerald-600 rounded" 
      />
    </div>

    <div class="flex gap-4">
     

      <button 
        @click="store.resetForm"
        class="flex bg-gray-500 text-white py-3 px-6 rounded hover:bg-gray-600 transition-colors"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script setup>
import { usePackageStore } from '@/stores/packageStore'

const store = usePackageStore()

const handleSubmit = () => {
  if (store.submitForm()) {
    // Handle successful submission
    // e.g., navigate to next page or show success message
  }
}
</script>