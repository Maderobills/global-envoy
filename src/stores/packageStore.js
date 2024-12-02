// stores/packageStore.js
import { defineStore } from 'pinia'

export const usePackageStore = defineStore('package', {
  state: () => ({
    formData: {
      packageType: '',
      description: '',
      length: '',
      width: '',
      height: '',
      weight: ''
    },
    errors: {
      packageType: '',
      description: ''
    }
  }),

  actions: {
    validateField(field) {
      this.errors[field] = ''
      
      switch (field) {
        case 'packageType':
          if (!this.formData.packageType) {
            this.errors.packageType = 'Please select a package type'
          }
          break
        case 'description':
          if (!this.formData.description.trim()) {
            this.errors.description = 'Please provide a description of the contents'
          } else if (this.formData.description.trim().length < 10) {
            this.errors.description = 'Description must be at least 10 characters long'
          }
          break
      }
    },

    validateForm() {
      const fields = ['packageType', 'description']
      fields.forEach(field => this.validateField(field))
      return !Object.values(this.errors).some(error => error !== '')
    },

    submitForm() {
      if (this.validateForm()) {
        console.log('Form is valid', this.formData)
        return true
      }
      console.log('Form has errors', this.errors)
      return false
    },

    resetForm() {
      this.formData = {
        packageType: '',
        description: '',
        length: '',
        width: '',
        height: '',
        weight: ''
      }
      this.errors = {
        packageType: '',
        description: ''
      }
    }
  }
})