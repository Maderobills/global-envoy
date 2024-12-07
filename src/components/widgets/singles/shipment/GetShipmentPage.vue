<template>
<div class="p-6 bg-white rounded flex flex-col w-full md:w-4/5 justify-self-center">
    <div class="firstpart space-y-10 flex justify-between items-center">
      <div>
        <h1 class="text-5xl font-bold mb-4 text-slate-900">
         Get Free Shipment Qoute
        </h1>
        <p class="mb-4">
          Packages and pallets, big and small, we can offer you an instant quote for your shipping needs both
          <br /> domestically and internationally. Fill out your shipment details below to discover your quotes. If you
          <br /> are satisfied, simply continue to book.
        </p>
      </div>
      <div class="transition skew-y-3 shadow-xl">
        <img class="rounded-lg" src="https://img.freepik.com/free-vector/hanging-style-percentage-icon-background-design-calculating-commission_1017-45141.jpg?" alt="">
      </div>
    </div>

    <div class="container my-6">
      <h1 class="text-xl font-bold mb-4">I am shipping as a...</h1>
      <div class="flex space-x-4">
        <a 
          @click="setShippingType('business')" 
          :class="{'bg-emerald-600': shippingType === 'business', 'hover:bg-slate-600 bg-slate-600': shippingType !== 'business'}"
          class="py-2 px-4 text-white rounded cursor-pointer"
        >
          <span class="labelText">Business</span>
        </a>
        <a 
          @click="setShippingType('private')" 
          :class="{'bg-emerald-600 ': shippingType === 'private', 'hover:bg-slate-600 bg-slate-600': shippingType !== 'private'}"
          class="py-2 px-4 text-white rounded cursor-pointer"
        >
          <span class="labelText">Private Person</span>
        </a>
      </div>
    </div>

    <div class="my-5">
      <AddShipmentForm v-if="shippingType === 'private'" />
    <AddShipmentBussinessForm v-if="shippingType === 'business'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AddShipmentForm from '../../forms/AddShipmentForm.vue';
import AddShipmentBussinessForm from '../../forms/AddShipmentBussinessForm.vue';

const shippingType = ref('private'); // Default to 'private'

function setShippingType(type) {
  shippingType.value = type;
}
</script>

<style scoped>
/* Add any additional styles here */
</style>