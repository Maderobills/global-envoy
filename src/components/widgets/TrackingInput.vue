<template>
  <div class="flex items-center">
    <input
      type="text"
      v-model="inputValue"
      placeholder="Enter tracking number"
      class="border rounded px-2 py-1 mr-2"
    />
    <button @click="track" class="bg-blue-500 text-white rounded px-4 py-1 flex items-center">
      <i class="fi fi-ts-shipping-timed mr-1"></i> Track
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    track() {
      // Your tracking logic here
      console.log('Tracking:', this.inputValue);
    },
  },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>