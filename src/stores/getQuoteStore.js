// src/stores/shippingStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

// Load environment variables
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const devId = import.meta.env.VITE_DEV_ID;
const apiToken = import.meta.env.VITE_API_TOKEN;

export const useShippingStore = defineStore('shipping', {
  state: () => ({
    loading: false,
    error: null,
    quote: null,
    token: apiToken, // Use the token from environment variables
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
    ],
  }),

  actions: {
    async fetchShippingQuote(shippingDetails) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.post(
          'https://cors-anywhere.herokuapp.com/https://api.ebay.com/sell/logistics/v1_beta/shipping_quote',
          shippingDetails,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        this.quote = response.data;
      } catch (err) {
        console.error('Error response:', err.response); // Log server response
        this.error = err.response?.data?.message || 'Failed to fetch shipping quote';
      } finally {
        this.loading = false;
      }
    },
  },
});
