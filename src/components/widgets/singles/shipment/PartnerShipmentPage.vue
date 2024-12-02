<template>
  <div class="p-6 bg-white rounded flex flex-col w-4/5 justify-self-center">
    <div class="firstpart space-y-10 flex justify-between items-center flex-row-reverse">
      <div class="ml-10 ">
        <h1 class="text-5xl font-bold mb-4 text-slate-900">
          Partner With Us
        </h1>
        <p class="mb-4">
          Packages and pallets, big and small, we can offer you an instant quote for your shipping needs both
          <br /> domestically and internationally. Fill out your shipment details below to discover your quotes. If you
          <br /> are satisfied, simply continue to book.
        </p>
      </div>
      <div class="transition skew-y-3 shadow-xl">
        <img class="rounded-lg" src="https://img.freepik.com/free-photo/handshake-businessmen_1098-742.jpg?" alt="">
      </div>
    </div>

    <div class="container my-6">
      <h1 class="text-xl font-bold mb-4">I am shipping ...</h1>
      <div class="flex space-x-4">
        <a 
          @click="setShippingType('parcels')" 
          :class="{'bg-emerald-600': shippingType === 'parcels', 'hover:bg-slate-600 bg-slate-600': shippingType !== 'parcels'}"
          class="py-2 px-4 text-white rounded cursor-pointer"
        >
          <span class="labelText">Document and Parcels</span>
        </a>
        <a 
          @click="setShippingType('cargo')" 
          :class="{'bg-emerald-600 ': shippingType === 'cargo', 'hover:bg-slate-600 bg-slate-600': shippingType !== 'cargo'}"
          class="py-2 px-4 text-white rounded cursor-pointer"
        >
          <span class="labelText">Cargo and Freight</span>
        </a>
      </div>
    </div>

    <div class="my-5">
      <AddShipmentForm v-if="shippingType === 'parcels'" />
    <AddShipmentBussinessForm v-if="shippingType === 'cargo'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AddShipmentForm from '../../forms/AddShipmentForm.vue';
import AddShipmentBussinessForm from '../../forms/AddShipmentBussinessForm.vue';

const shippingType = ref('parcels'); // Default to 'private'

function setShippingType(type) {
  shippingType.value = type;
}
</script>

<style scoped>
/* Add any additional styles here */
</style>