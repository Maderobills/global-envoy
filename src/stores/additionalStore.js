// stores/formStore.js
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAdditionalStore = defineStore('form', () => {
  // State
  const formData = ref({
    insurance: '',
    instructions: ''
  })

  const errors = ref({
    insurance: '',
    instructions: ''
  })

  // Getters
  const isValid = computed(() => {
    return !errors.value.insurance && !errors.value.instructions
  })

  // Actions
  function validateForm() {
    // Reset errors
    errors.value = {
      insurance: '',
      instructions: ''
    }

    // Validate insurance selection
    if (!formData.value.insurance) {
      errors.value.insurance = 'Please select whether insurance is required'
    }

    // Validate instructions
    if (formData.value.instructions) {
      if (formData.value.instructions.length < 10) {
        errors.value.instructions = 'Instructions must be at least 10 characters long'
      }
      if (formData.value.instructions.length > 500) {
        errors.value.instructions = 'Instructions cannot exceed 500 characters'
      }
    }

    return isValid.value
  }

  function updateFormData(field, value) {
    formData.value[field] = value
    // Clear error when field is updated
    errors.value[field] = ''
  }

  function resetForm() {
    formData.value = {
      insurance: '',
      instructions: ''
    }
    errors.value = {
      insurance: '',
      instructions: ''
    }
  }

  return {
    formData,
    errors,
    isValid,
    validateForm,
    updateFormData,
    resetForm
  }
})