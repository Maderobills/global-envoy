<template>
  <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Get a Shipping Quote</h2>

    <main class="flex">
      <div class="w-1/2">
        <!-- Destination Information -->
        <h3 class="text-xl font-semibold mt-6">Origin Information</h3>
        <div>
          <h4>From: {{ destinationStore.formData.fromCity }}, {{ destinationStore.formData.fromCountry }}</h4>
          <h4>To: {{ destinationStore.formData.fromCity }}, {{ destinationStore.formData.toCountry }}</h4>
        </div>

        <!-- Package Information -->
        <h3 class="text-xl font-semibold mt-6">Package Information</h3>
        <div>
          <h4>Package: {{ packageStore.formData.packageType }}</h4>
          <div class="flex space-x-5">
            <h4>Weight: {{ packageStore.formData.weight }}kg</h4>
            <h4>Height: {{  packageStore.formData.height }}cm</h4>
            <h4>Length: {{  packageStore.formData.length }}cm</h4>
            <h4>Width: {{ packageStore.formData.width }}cm</h4>
          </div>
        </div>

        <!-- Additional Information -->
        <h3 class="text-xl font-semibold mt-6">Additional Information</h3>
        <span>{{ additionalStore.formData.insurance ? 'Insurance: Yes' : 'No insurance' }}</span>
      </div>

      <div class="w-1/2 ml-10">
        <h3 class="text-xl font-semibold mt-6">Estimated Information</h3>
        <div>
          <h4>Estimated Delivery Date <span>{{ additionalStore.estimatedDeliveryDate }}</span></h4>
        </div>
        <div>
          <h4>Estimated Delivery Price</h4>
          <h4>Package: <span>${{ additionalStore.packagePrice }}</span></h4>
          <h4>Shipping: <span>${{ additionalStore.shippingPrice }}</span></h4>
          <h4>Insurance: <span>${{ additionalStore.insurancePrice }}</span></h4>
          <h4>TAX: <span>${{ additionalStore.tax }}</span></h4>

          <h4>Total: <span>${{ additionalStore.totalPrice }}</span></h4>
        </div>
      </div>
    </main>

    <div>
      <button 
        @click="generateQuote"
        class="bg-emerald-500 text-white py-3 px-6 rounded hover:bg-emerald-600 transition-colors"
      >
        Get Quote
      </button>
    </div>
  </div>
</template>
<script setup>
import { useCreditCardStore } from '@/stores/paymentStore';
import { useDestinationStore } from '@/stores/destinationStore';
import { usePackageStore } from '@/stores/packageStore';
import { useAdditionalStore } from '@/stores/additionalStore';
import { ref } from 'vue';

const creditCardStore = useCreditCardStore();
const destinationStore = useDestinationStore();
const packageStore = usePackageStore();
const additionalStore = useAdditionalStore();

// You can also define a method for generating the quote if needed
const generateQuote = () => {
  console.log(destinationStore.formData.fromCountry)
};
</script>
