<template>
  <div class="bg-white">
    <!-- Progress Steps -->
    <div class="flex justify-between mb-8">
      <div v-for="(step, index) in steps" :key="index"
        class="flex flex-col items-center cursor-pointer w-1/4"
        :class="currentStep === index ? 'text-slate-900' : 'text-gray-500'"
        @click="currentStep = index">
        <i class="w-10 h-8 text-2xl" :class="step.icon"></i>
        <span class="text-sm font-medium">{{ step.title }}</span>
        <div class="h-1 w-full mt-2" :class="currentStep === index ? 'bg-bgslate' : 'bg-gray-200'" />
      </div>
    </div>

    <!-- Form Sections -->
    <div class="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <component :is="currentComponent" :formData="formData" />

      <!-- Navigation Buttons -->
      <div class="flex justify-between mt-8">
        <button @click="previousStep" :disabled="currentStep === 0"
          class="px-6 py-2 rounded-full text-white transition-colors"
          :class="currentStep === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-600'">
          Previous
        </button>

        <button @click="currentStep === steps.length - 1 ? handleSubmit() : nextStep()"
          :disabled="currentStep === steps.length - 1"
          class="px-6 py-2 rounded-full text-white transition-colors"
          :class="currentStep === steps.length - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-600'">
          {{ currentStep === steps.length - 1 ? 'Submit' : 'Next' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import FromToForm from './FromToForm.vue';
import PackageForm from './PackageForm.vue';
import AdditionalDetails from './AdditionalDetails.vue';
import PaymentForm from './PaymentForm.vue';

// Reactive form data object to retain data across steps
const formData = ref({
  fromCity: '',
  fromCountry: '',
  fromZipCode: '',
  toCity: '',
  toCountry: '',
  toZipCode: '',
  packageType: '',
  description: '',
  additionalInfo: '',
  paymentDetails: {}
});

const currentStep = ref(0);

const steps = [
  { title: 'Origin and Destination', icon: 'fi fi-tr-location-arrow' },
  { title: 'Package Details', icon: 'fi fi-tr-box-open' },
  { title: 'Additional Info', icon: 'fi fi-tr-layer-plus' },
  { title: 'Payment', icon: 'fi fi-tr-selling' }
];

const currentComponent = computed(() => {
  const components = [FromToForm, PackageForm, AdditionalDetails, PaymentForm];
  return components[currentStep.value];
});

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

// Handle form submission
const handleSubmit = () => {
  // Here you can access the complete formData
  console.log('Submitting form data:', formData.value);
  alert('Form submitted successfully!');
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>