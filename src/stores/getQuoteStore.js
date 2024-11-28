// src/stores/shippingStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useShippingStore = defineStore('shipping', {
  state: () => ({
    loading: false,
    error: null,
    quote: null,
    token: null,
    countries: [
      { code: 'US', name: 'United States' },
      { code: 'CA', name: 'Canada' },
      { code: 'GB', name: 'United Kingdom' },
      { code: 'AU', name: 'Australia' },
      // Add more countries as needed
    ],
    packageTypes: [
      { id: 'PACKAGE', name: 'Package' },
      { id: 'LETTER', name: 'Letter' },
      { id: 'LARGE_ENVELOPE', name: 'Large Envelope' },
      { id: 'LARGE_PACKAGE', name: 'Large Package' }
    ]
  }),
  
  actions: {
    async fetchShippingQuote(shippingDetails) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.post(
            '/api/shipping_quote', // Local proxy route
            shippingDetails,
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json',
              },
            }
          );          
        this.quote = response.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch shipping quote'
      } finally {
        this.loading = false
      }
    }
  }
})