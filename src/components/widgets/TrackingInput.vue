<template>
  <div 
    :style="backgroundImageStyle" 
    class="bg-cover bg-center h-64  flex flex-col justify-between"
  >
    <div class="h-full text-white text-center p-4 sm:p-6 bg-black bg-opacity-30 hover:backdrop-blur-sm space-y-4 sm:space-y-6">
      <h1 class="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Track Your Shipment</h1>
      <div class="w-fit flex flex-col sm:flex-row justify-center justify-self-center bg-white p-2 rounded">
        <input
          v-model="trackingInput"
          @keyup.enter="emitTrackingNumber"
          placeholder="Enter your tracking number"
          class="rounded-t sm:rounded-l h-10 sm:h-12 w-full sm:w-72 md:w-96 p-2 sm:p-4 text-slate-900 text-sm sm:text-md outline-none"
        />
        <button 
          @click="emitTrackingNumber" 
          class="transition bg-slate-900 px-4 sm:px-6 md:px-8 font-semibold hover:font-bold rounded sm:rounded-l-none sm:rounded-r shadow-slate-900 hover:shadow-md text-white mt-2 sm:mt-0">
          Track
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router';

export default {
  data() {
    return {
      trackingInput: '',
    };
  },
  computed: {
    backgroundImageStyle() {
      return {
        backgroundImage: `url('https://img.freepik.com/free-photo/busy-shipping-port-with-containers-trade-action_91128-4581.jpg')`,
      };
    },
  },
  methods: {
    emitTrackingNumber() {
      if (this.trackingInput.trim()) {
        this.$emit('tracking-number', this.trackingInput.trim());
        router.push('/TrackPackage')
      }
    },
  },
};
</script>
