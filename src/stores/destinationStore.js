// stores/destinationStore.js
import { defineStore } from 'pinia'

export const useDestinationStore = defineStore('destination', {
  state: () => ({
    formData: {
      fromCity: '',
      fromCountry: '',
      fromZipCode: '',
      toCity: '',
      toCountry: '',
      toZipCode: ''
    },
    errors: {
      fromCity: '',
      fromCountry: '',
      toCity: '',
      toCountry: ''
    }
  }),

  actions: {
    validateField(field) {
      this.errors[field] = ''
      
      switch (field) {
        case 'fromCity':
          if (!this.formData.fromCity.trim()) {
            this.errors.fromCity = 'Origin city is required'
          }
          break
        case 'fromCountry':
          if (!this.formData.fromCountry.trim()) {
            this.errors.fromCountry = 'Origin country is required'
          }
          break
        case 'toCity':
          if (!this.formData.toCity.trim()) {
            this.errors.toCity = 'Destination city is required'
          }
          break
        case 'toCountry':
          if (!this.formData.toCountry.trim()) {
            this.errors.toCountry = 'Destination country is required'
          }
          break
      }
    },

    validateForm() {
      const fields = ['fromCity', 'fromCountry', 'toCity', 'toCountry']
      fields.forEach(field => this.validateField(field))
      return !Object.values(this.errors).some(error => error !== '')
    },

    submitForm() {
      if (this.validateForm()) {
        console.log('Form is valid', this.formData)
        // Proceed with form submission
        return true
      }
      console.log('Form has errors', this.errors)
      return false
    },

    resetForm() {
      this.formData = {
        fromCity: '',
        fromCountry: '',
        fromZipCode: '',
        toCity: '',
        toCountry: '',
        toZipCode: ''
      }
      this.errors = {
        fromCity: '',
        fromCountry: '',
        toCity: '',
        toCountry: ''
      }
    }
  }
})