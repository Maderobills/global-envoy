<template>
  <div class="space-y-6">
    <div>
      <label class="block text-sm font-medium mb-2">Card Number</label>
      <input 
        :value="store.formData.cardNumber"
        @input="store.updateField('cardNumber', $event.target.value)"
        type="text"
        maxlength="19"
        class="w-full p-3 border rounded"
        :class="{ 'border-red-500': store.errors.cardNumber }"
        placeholder="**** **** **** ****"
      />
      <p v-if="store.errors.cardNumber" class="text-red-500 text-sm mt-1">
        {{ store.errors.cardNumber }}
      </p>
    </div>
    
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium mb-2">Expiry Date</label>
        <input 
          :value="store.formData.expiryDate"
          @input="store.updateField('expiryDate', $event.target.value)"
          type="text"
          maxlength="5"
          class="w-full p-3 border rounded"
          :class="{ 'border-red-500': store.errors.expiryDate }"
          placeholder="MM/YY"
        />
        <p v-if="store.errors.expiryDate" class="text-red-500 text-sm mt-1">
          {{ store.errors.expiryDate }}
        </p>
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">CVV</label>
        <input 
          :value="store.formData.cvv"
          @input="store.updateField('cvv', $event.target.value)"
          type="text"
          maxlength="4"
          class="w-full p-3 border rounded"
          :class="{ 'border-red-500': store.errors.cvv }"
          placeholder="***"
        />
        <p v-if="store.errors.cvv" class="text-red-500 text-sm mt-1">
          {{ store.errors.cvv }}
        </p>
      </div>
    </div>

    <div class="flex space-x-4">
      <div class="w-full flex justify-between gap-4">
        <button 
          @click="store.resetForm"
          class="bg-gray-500 text-white py-3 px-6 rounded hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
        <button 
          @click="handleSubmit"
          class="bg-emerald-500 text-white py-3 px-6 rounded hover:bg-emerald-600 transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCreditCardStore } from '@/stores/paymentStore';
import { useDestinationStore } from '@/stores/destinationStore';
import { usePackageStore } from '@/stores/packageStore';
import { useAdditionalStore } from '@/stores/additionalStore';

const store = useCreditCardStore();
const destinationStore = useDestinationStore();
const packageStore = usePackageStore();
const additionalStore = useAdditionalStore();

const handleSubmit = () => {
  // Validate all form data from all stores
  const isCreditCardValid = store.validateForm();
  const isDestinationValid = destinationStore.validateForm();  // Assuming this method exists
  const isPackageValid = packageStore.validateForm();          // Assuming this method exists
  const isAdditionalValid = additionalStore.validateForm();    // Assuming this method exists

  if (isCreditCardValid && isDestinationValid && isPackageValid && isAdditionalValid) {
    // Print all form data to console
    const allFormData = {
      creditCard: store.formData,
      destination: destinationStore.formData,
      package: packageStore.formData,
      additional: additionalStore.formData
    };
    
    console.log('Form submitted:', allFormData);
  } else {
    console.log('Validation errors found. Please correct them before submitting.');
  }
}
</script>