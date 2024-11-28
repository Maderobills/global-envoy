

<template>
  <div class="shipping-quote-form">
    <h2>Get Shipping Quote</h2>
    
    <form @submit.prevent="handleSubmit" class="form">
      <!-- From Address Section -->
      <div class="form-section">
        <h3>From Address</h3>
        <div class="form-group">
          <label for="fromCountry">From Country:</label>
          <select 
            id="fromCountry"
            v-model="formData.fromCountry"
            required
          >
            <option value="">Select Country</option>
            <option 
              v-for="country in shipping.countries" 
              :key="country.code"
              :value="country.code"
            >
              {{ country.name }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="fromPostalCode">From Postal Code:</label>
          <input
            id="fromPostalCode"
            v-model="formData.fromPostalCode"
            type="text"
            required
          />
        </div>
      </div>

      <!-- To Address Section -->
      <div class="form-section">
        <h3>To Address</h3>
        <div class="form-group">
          <label for="toCountry">To Country:</label>
          <select 
            id="toCountry"
            v-model="formData.toCountry"
            required
          >
            <option value="">Select Country</option>
            <option 
              v-for="country in shipping.countries" 
              :key="country.code"
              :value="country.code"
            >
              {{ country.name }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="toPostalCode">To Postal Code:</label>
          <input
            id="toPostalCode"
            v-model="formData.toPostalCode"
            type="text"
            required
          />
        </div>
      </div>

      <!-- Package Details Section -->
      <div class="form-section">
        <h3>Package Details</h3>
        <div class="form-group">
          <label for="packageType">Package Type:</label>
          <select 
            id="packageType"
            v-model="formData.packageType"
            required
          >
            <option value="">Select Package Type</option>
            <option 
              v-for="type in shipping.packageTypes" 
              :key="type.id"
              :value="type.id"
            >
              {{ type.name }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="weight">Weight:</label>
          <div class="weight-input">
            <input
              id="weight"
              v-model.number="formData.weight"
              type="number"
              required
              min="0"
              step="0.1"
            />
            <select v-model="formData.weightUnit">
              <option value="OUNCE">Ounces</option>
              <option value="POUND">Pounds</option>
              <option value="KILOGRAM">Kilograms</option>
              <option value="GRAM">Grams</option>
            </select>
          </div>
        </div>
      </div>
      
      <button type="submit" :disabled="shipping.loading">
        {{ shipping.loading ? 'Getting Quote...' : 'Get Quote' }}
      </button>
    </form>
    
    <div v-if="shipping.error" class="error">
      {{ shipping.error }}
    </div>
    
    <div v-if="shipping.quote" class="quote-result">
      <h3>Shipping Quote Result</h3>
      <pre>{{ JSON.stringify(shipping.quote, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { useShippingStore } from '@/stores/getQuoteStore';
import { ref } from 'vue'

const shipping = useShippingStore()

const formData = ref({
  fromCountry: '',
  fromPostalCode: '',
  toCountry: '',
  toPostalCode: '',
  packageType: '',
  weight: null,
  weightUnit: 'OUNCE'
})

const convertWeight = (weight, unit) => {
  switch (unit) {
    case 'POUND':
      return weight * 16 // Convert to ounces
    case 'KILOGRAM':
      return weight * 35.274 // Convert to ounces
    case 'GRAM':
      return weight * 0.035274 // Convert to ounces
    default:
      return weight
  }
}

const handleSubmit = () => {
  const weightInOunces = convertWeight(formData.value.weight, formData.value.weightUnit)
  
  const shippingDetails = {
    rateRequest: {
      pickupAddress: {
        postalCode: formData.value.fromPostalCode,
        countryCode: formData.value.fromCountry
      },
      deliveryAddress: {
        postalCode: formData.value.toPostalCode,
        countryCode: formData.value.toCountry
      },
      packageSpecifics: [{
        packageType: formData.value.packageType,
        weightInOunces
      }]
    }
  }
  
  shipping.fetchShippingQuote(shippingDetails)
}
</script>

<style scoped>
.shipping-quote-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.form-section {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.form-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
}

input, select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.weight-input {
  display: flex;
  gap: 10px;
}

.weight-input input {
  flex: 1;
}

.weight-input select {
  width: 120px;
}

button {
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:disabled {
  background-color: #cccccc;
}

.error {
  color: red;
  margin-top: 10px;
  padding: 10px;
  background-color: #fff2f2;
  border-radius: 4px;
}

.quote-result {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.quote-result pre {
  white-space: pre-wrap;
  word-break: break-all;
}
</style>