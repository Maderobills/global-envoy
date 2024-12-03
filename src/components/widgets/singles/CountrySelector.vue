<template>
  <div class="relative bg-transparent">
    <select
      @change="handleCountryChange"
      class="bg-transparent rounded p-2 outline-none w-32"
    >
      <option disabled selected>Select a country</option>
      <option v-for="country in countries" :key="country" :value="country" class="text-slate-900">
              {{ country }}
            </option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { countries } from '@/stores/countries';
const emit = defineEmits(['update:modelValue']);

const handleCountryChange = (event) => {
  const selectedCountry = event.target.value;
  emit('update:modelValue', selectedCountry);
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
