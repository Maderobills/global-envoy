<template>
  <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Get a Shipping Quote</h2>

    <main class="flex text-sm">
      <div class="w-1/2">
        <!-- Destination Information -->
        <h3 class="text-xl font-semibold mt-2">Origin Information</h3>
        <div>
          <h4>From: {{ destinationStore.formData.fromCity }}, {{ destinationStore.formData.fromCountry }}</h4>
          <h4>To: {{ destinationStore.formData.toCity }}, {{ destinationStore.formData.toCountry }}</h4>
        </div>

        <!-- Package Information -->
        <h3 class="text-xl font-semibold mt-2">Package Information</h3>
        <div>
          <h4>Package: {{ packageStore.formData.packageType }}</h4>
          <h4>Weight: {{ packageStore.formData.weight }}kg</h4>
          <div class="flex space-x-5">
            <h4>H: {{  packageStore.formData.height }}cm</h4>
            <h4>L: {{  packageStore.formData.length }}cm</h4>
            <h4>W: {{ packageStore.formData.width }}cm</h4>
          </div>
        </div>

        <!-- Additional Information -->
        <h3 class="text-xl font-semibold mt-2">Additional Information</h3>
        <span>{{ additionalStore.formData.insurance ? 'Insurance: Yes' : 'No insurance' }}</span>
      </div>

      <div class="w-1/2 ml-10 space-y-4">
        <h3 class="text-xl font-semibold mt-2">Estimated Information</h3>
        <div>
          <h4 class="text-emerald-600">Estimated Delivery Date</h4>
          <span class="font-bold text-2xl text-slate-900">{{ calcStore.quote.deliveryDate }}</span>
        </div>
        <div>
          <h4 class="text-emerald-600">Total:</h4>
          <span class="font-bold text-2xl text-slate-900">${{ calcStore.quote.totalPrice }}</span>
        </div>
      </div>
    </main>

  </div>
</template>

<script setup>
import { watch } from 'vue';
import { useCreditCardStore } from '@/stores/paymentStore';
import { useDestinationStore } from '@/stores/destinationStore';
import { usePackageStore } from '@/stores/packageStore';
import { useAdditionalStore } from '@/stores/additionalStore';
import { useCalcStore } from '@/stores/calcStore';

const creditCardStore = useCreditCardStore();
const destinationStore = useDestinationStore();
const packageStore = usePackageStore();
const additionalStore = useAdditionalStore();
const calcStore = useCalcStore(); 


  // Set form data from stores to calcStore state
  calcStore.originCountry = destinationStore.formData.fromCountry;
  calcStore.destinationCountry = destinationStore.formData.toCountry;
  calcStore.packageType = packageStore.formData.packageType;
  calcStore.length = packageStore.formData.length;
  calcStore.width = packageStore.formData.width;
  calcStore.height = packageStore.formData.height;
  calcStore.weight = packageStore.formData.weight;
  calcStore.tax = additionalStore.formData.tax;

  
</script>


