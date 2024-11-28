<template>
    <div class="space-y-6">
      <div>
        <label class="block text-sm font-medium mb-2">Card Number</label>
        <input v-model="formData.cardNumber" type="text" class="w-full p-3 border rounded" placeholder="**** **** **** ****" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Expiry Date</label>
          <input v-model="formData.expiryDate" type="text" class="w-full p-3 border rounded" placeholder="MM/YY" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">CVV</label>
          <input v-model="formData.cvv" type="text" class="w-full p-3 border rounded" placeholder="***" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  
  const formData = reactive({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })
  </script>