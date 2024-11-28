<template>
  <div class="bg-white">
    

    <!-- Progress Steps -->
    <div class="flex justify-between mb-8">
      <div v-for="(step, index) in steps" :key="index"
        class="flex flex-col items-center cursor-pointer w-1/4"
        :class="currentStep === index ? 'text-slate-900' : 'text-gray-500'"
        @click="currentStep = index">
        <component :is="step.icon" class="w-8 h-8 mb-2" />
        <span class="text-sm font-medium">{{ step.title }}</span>
        <div class="h-1 w-full mt-2" :class="currentStep === index ? 'bg-bgslate' : 'bg-gray-200'" />
      </div>
    </div>

    <!-- Form Sections -->
    <div class="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <component :is="currentComponent" />
      
      <!-- Navigation Buttons -->
      <div class="flex justify-between mt-8">
        <button @click="previousStep" :disabled="currentStep === 0"
          class="px-6 py-2 rounded-full text-white transition-colors"
          :class="currentStep === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-600'">
          Previous
        </button>
        
        <button @click="nextStep" :disabled="currentStep === steps.length - 1"
          class="px-6 py-2 rounded-full text-white transition-colors"
          :class="currentStep === steps.length - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-600'">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PackageForm from './PackageForm.vue';
import AdditionalDetails from './AdditionalDetails.vue';
import PaymentForm from './PaymentForm.vue';
const currentStep = ref(0)

const steps = [
  { title: 'Package Details', icon: 'Package' },
  { title: 'Additional Info', icon: 'Info' },
  { title: 'Payment', icon: 'CreditCard' }
]

const currentComponent = computed(() => {
  const components = [PackageForm, AdditionalDetails, PaymentForm]
  return components[currentStep.value]
})

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}
</script>