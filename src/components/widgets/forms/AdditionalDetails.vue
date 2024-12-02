<template>
  <div class="space-y-6">
    <div>
      <label class="block text-sm font-medium mb-2">Insurance Required?</label>
      <div class="space-x-4">
        <input 
          type="radio" 
          :value="'yes'" 
          id="yes"
          :checked="store.formData.insurance === 'yes'"
          @change="store.updateFormData('insurance', 'yes')"
        />
        <label for="yes">Yes</label>
        <input 
          type="radio" 
          :value="'no'" 
          id="no"
          :checked="store.formData.insurance === 'no'"
          @change="store.updateFormData('insurance', 'no')"
        />
        <label for="no">No</label>
      </div>
      <p v-if="store.errors.insurance" class="text-red-500 text-sm mt-1">
        {{ store.errors.insurance }}
      </p>
    </div>

    <div>
      <label class="block text-sm font-medium mb-2">Special Instructions</label>
      <textarea
        :value="store.formData.instructions"
        @input="store.updateFormData('instructions', $event.target.value)"
        class="w-full p-3 border rounded h-24"
        :class="{ 'border-red-500': store.errors.instructions }"
      ></textarea>
      <p v-if="store.errors.instructions" class="text-red-500 text-sm mt-1">
        {{ store.errors.instructions }}
      </p>
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
import { useAdditionalStore } from '@/stores/additionalStore';


const store = useAdditionalStore()

const handleSubmit = () => {
  if (store.validateForm()) {
    // Handle form submission
    console.log('Form submitted:', store.formData)
  }
}
</script>