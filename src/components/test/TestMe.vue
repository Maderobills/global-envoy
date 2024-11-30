<!-- App.vue -->
<script setup>
import { ref, computed } from 'vue'

const origin = ref('')
const destination = ref('')
const packageType = ref('')
const showResult = ref(false)
const showError = ref(false)
const estimatedPrice = ref(0)
const estimatedDays = ref('')
const estimatedDate = ref('')

const packageTypes = [
  { id: 'document', name: 'Documents', basePrice: 15 },
  { id: 'small', name: 'Small Package (up to 2kg)', basePrice: 25 },
  { id: 'medium', name: 'Medium Package (2-5kg)', basePrice: 40 },
  { id: 'large', name: 'Large Package (5-10kg)', basePrice: 60 },
  { id: 'extra', name: 'Extra Large Package (10kg+)', basePrice: 100 }
]

const countries = [
  { code: 'US', name: 'United States', zone: 1 },
  { code: 'UK', name: 'United Kingdom', zone: 2 },
  { code: 'CA', name: 'Canada', zone: 1 },
  { code: 'AU', name: 'Australia', zone: 3 },
  { code: 'DE', name: 'Germany', zone: 2 },
  { code: 'FR', name: 'France', zone: 2 },
  { code: 'JP', name: 'Japan', zone: 3 },
  { code: 'CN', name: 'China', zone: 3 }
]

// Delivery times based on zones (in days)
const zoneDeliveryTimes = {
  'same': { min: 1, max: 2 },
  'zone1-zone1': { min: 2, max: 4 },
  'zone1-zone2': { min: 3, max: 5 },
  'zone1-zone3': { min: 5, max: 7 },
  'zone2-zone2': { min: 2, max: 4 },
  'zone2-zone3': { min: 4, max: 6 },
  'zone3-zone3': { min: 3, max: 5 }
}

const calculateDeliveryDate = (minDays, maxDays) => {
  const today = new Date()
  const minDate = new Date(today)
  const maxDate = new Date(today)
  
  // Skip weekends when calculating delivery dates
  const addBusinessDays = (date, days) => {
    let currentDate = new Date(date)
    let addedDays = 0
    while (addedDays < days) {
      currentDate.setDate(currentDate.getDate() + 1)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        addedDays++
      }
    }
    return currentDate
  }

  const minDeliveryDate = addBusinessDays(minDate, minDays)
  const maxDeliveryDate = addBusinessDays(maxDate, maxDays)

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    })
  }

  return `${formatDate(minDeliveryDate)} - ${formatDate(maxDeliveryDate)}`
}

const calculateShippingCost = (originZone, destZone, basePrice) => {
  let multiplier = 1

  if (originZone === destZone) {
    multiplier = 1
  } else if (Math.abs(originZone - destZone) === 1) {
    multiplier = 1.5
  } else {
    multiplier = 2
  }

  return Math.round(basePrice * multiplier)
}

const getQuote = () => {
  if (!origin.value || !destination.value || !packageType.value) {
    alert('Please fill in all fields')
    return
  }

  if (origin.value === destination.value) {
    showError.value = true
    showResult.value = false
    return
  }

  showError.value = false

  const originCountry = countries.find(c => c.code === origin.value)
  const destCountry = countries.find(c => c.code === destination.value)
  const selectedPackage = packageTypes.find(p => p.id === packageType.value)

  // Calculate shipping cost
  estimatedPrice.value = calculateShippingCost(
    originCountry.zone,
    destCountry.zone,
    selectedPackage.basePrice
  )

  // Determine delivery time range
  let deliveryTime
  if (origin.value === destination.value) {
    deliveryTime = zoneDeliveryTimes.same
  } else {
    const zoneKey = `zone${originCountry.zone}-zone${destCountry.zone}`
    const reverseZoneKey = `zone${destCountry.zone}-zone${originCountry.zone}`
    deliveryTime = zoneDeliveryTimes[zoneKey] || zoneDeliveryTimes[reverseZoneKey]
  }

  estimatedDays.value = `${deliveryTime.min}-${deliveryTime.max}`
  estimatedDate.value = calculateDeliveryDate(deliveryTime.min, deliveryTime.max)
  showResult.value = true
}

const isFormValid = computed(() => {
  return origin.value && destination.value && packageType.value
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-2xl mx-auto px-4">
      <div class="bg-white rounded-lg shadow-md p-8">
        <h1 class="text-2xl font-bold text-center text-gray-800 mb-8">
          Shipping Quote Calculator
        </h1>

        <form @submit.prevent="getQuote" class="space-y-6">
          <!-- Package Type Selection -->
          <div class="space-y-2">
            <label for="packageType" class="block text-sm font-medium text-gray-700">
              Package Type:
            </label>
            <select
              id="packageType"
              v-model="packageType"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select package type</option>
              <option v-for="type in packageTypes" :key="type.id" :value="type.id">
                {{ type.name }} - Base price: ${{ type.basePrice }}
              </option>
            </select>
          </div>

          <!-- Origin Country -->
          <div class="space-y-2">
            <label for="origin" class="block text-sm font-medium text-gray-700">
              Origin Country:
            </label>
            <select
              id="origin"
              v-model="origin"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select origin country</option>
              <option v-for="country in countries" :key="country.code" :value="country.code">
                {{ country.name }}
              </option>
            </select>
          </div>

          <!-- Destination Country -->
          <div class="space-y-2">
            <label for="destination" class="block text-sm font-medium text-gray-700">
              Destination Country:
            </label>
            <select
              id="destination"
              v-model="destination"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select destination country</option>
              <option v-for="country in countries" :key="country.code" :value="country.code">
                {{ country.name }}
              </option>
            </select>
          </div>

          <div v-if="showError" class="text-red-600 text-sm">
            Origin and destination countries cannot be the same.
          </div>

          <button
            type="submit"
            :disabled="!isFormValid"
            :class="[
              'w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
              isFormValid 
                ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500' 
                : 'bg-gray-300 cursor-not-allowed text-gray-500'
            ]"
          >
            Get Quote
          </button>
        </form>

        <div v-if="showResult" class="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            Estimated Shipping Details:
          </h3>
          <p class="mb-2">
            <span class="font-medium">Price:</span>
            <span class="ml-2">${{ estimatedPrice }}</span>
          </p>
          <p class="mb-2">
            <span class="font-medium">Estimated Delivery Time:</span>
            <span class="ml-2">{{ estimatedDays }} business days</span>
          </p>
          <p>
            <span class="font-medium">Expected Delivery Date:</span>
            <span class="ml-2">{{ estimatedDate }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>