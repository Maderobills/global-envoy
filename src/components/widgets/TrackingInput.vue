<template>
  <div :style="backgroundImageStyle" class="bg-cover bg-center h-80 flex flex-col justify-between">
    <div class="h-full text-white text-center p-6 bg-black bg-opacity-20 hover:backdrop-blur-sm space-y-6">
      <h1 class="text-4xl font-bold">Track Your Shipment</h1>
      <div class="w-full h-12 flex justify-center">
      <input type="text" class="rounded-s h-12 w-80 p-5 text-slate-900 text-md placeholder:Enter your tracking number">
      <button class="bg-slate-900 px-10 font-semibold hover:font-bold rounded-e">Track</button>
    </div>
    
  </div>

  </div>
</template>

<script>
export default {
  computed: {
    backgroundImageStyle() {
      return {
        backgroundImage: `url('https://img.freepik.com/free-photo/busy-shipping-port-with-containers-trade-action_91128-4581.jpg')`,
      };
    },
  },
};
</script>
