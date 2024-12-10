<template>
    <div class="w-full space-y-2 text-white font-semibold bg-bgcolor rounded drop-shadow-2xl h-fit p-4">
      <div class="w-full flex justify-between">
        <h4>Package ID: <span class="font-thin">{{ packageId }}</span></h4>
        <h4>Tracking Number: <span class="font-thin">{{ trackingNumber }}</span></h4>
      </div>
      <div class="w-full flex justify-between">
        <h4>Delivering from: <span class="font-thin">{{ deliveredFrom }}</span></h4>
        <h4>Delivering To: <span class="font-thin">{{ deliveredTo }}</span></h4>
      </div>
      <h4>Estimated Delivery: <span class="font-thin">{{ estimatedDelivery }}</span></h4>
    </div>
  </template>
  
  <script setup>
  defineProps({
    packageId: String,
    trackingNumber: String,
    deliveredFrom: String,
    deliveredTo: String,
    estimatedDelivery: String,
  });
  </script>
  
  <script>
  export default {
    name: 'PackageInfo',
  };
  </script>