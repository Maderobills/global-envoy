<template>
  <div :style="backgroundImageStyle" class="bg-cover bg-center h-80 flex flex-col justify-between">
    <div class="h-full text-white text-center p-6 bg-black bg-opacity-20 hover:backdrop-blur-sm space-y-6">
      <h1 class="text-4xl font-bold">Track Your Shipment</h1>
      <div class="w-fit h-fit flex justify-self-center bg-white p-2 rounded">
        <input
          v-model="trackingInput"
          @keyup.enter="emitTrackingNumber"
          placeholder="Enter your tracking number"
          class="rounded-s h-12 w-96 p-5 text-slate-900 text-md outline-none"
        />
        <button 
          @click="emitTrackingNumber" 
          class="transition bg-slate-900 px-10 font-semibold hover:font-bold rounded shadow-slate-900 hover:shadow-md text-white">
          Track
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trackingInput: '',
    };
  },
  methods: {
    emitTrackingNumber() {
      if (this.trackingInput.trim()) {
        this.$emit('track-number', this.trackingInput.trim());
      }
    }
  },
  computed: {
    backgroundImageStyle() {
      return {
        backgroundImage: `url('https://img.freepik.com/free-photo/busy-shipping-port-with-containers-trade-action_91128-4581.jpg')`,
      };
    },
  },
};
</script>