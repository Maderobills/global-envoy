<template>
  <div class="bg-white">
    <!-- Progress Steps -->
    <div class="flex justify-between mb-8">
      <div 
        v-for="(step, index) in steps" 
        :key="index" 
        class="flex flex-col items-center cursor-pointer w-1/4" 
        :class="[
          currentStep === index ? 'text-slate-900' : 'text-gray-500',
          { 'cursor-not-allowed': !canNavigateToStep(index) }
        ]" 
        @click="handleStepClick(index)"
      >
        <i class="w-10 h-8 text-2xl" :class="step.icon"></i>
        <span class="text-sm font-medium">{{ step.title }}</span>
        <div 
          class="h-1 w-full mt-2" 
          :class="[
            currentStep === index ? 'bg-bgslate' : 'bg-gray-200',
            { 'bg-green-500': completedSteps[index] }
          ]" 
        />
      </div>
    </div>

    <!-- Form Sections -->
    <div class="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <component 
        :is="currentComponent" 
        ref="formRef"
        @validate="handleValidation"
      />
      
      <!-- Navigation Buttons -->
      <div class="flex justify-between mt-8">
        <button 
          @click="previousStep" 
          :disabled="currentStep === 0"
          class="px-6 py-2 rounded-full text-white transition-colors"
          :class="currentStep === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-600'"
        >
          Previous
        </button>
        
        <button 
          @click="nextStep" 
          :disabled="currentStep === steps.length - 1 || isLoading"
          class="px-6 py-2 rounded-full text-white transition-colors"
          :class="[
            currentStep === steps.length - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-600',
            { 'opacity-75 cursor-wait': isLoading }
          ]"
        >
          <span v-if="isLoading">Validating...</span>
          <span v-else>Next</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FromToForm from './FromToForm.vue'
import PackageForm from './PackageForm.vue'
import AdditionalDetails from './AdditionalDetails.vue'
import QuoteForm from './QuoteForm.vue'
import PaymentForm from './PaymentForm.vue'
import { useCreditCardStore } from '@/stores/paymentStore'
import { useCalcStore } from '@/stores/calcStore'
import { useDestinationStore } from '@/stores/destinationStore'
import { usePackageStore } from '@/stores/packageStore'
import { useAdditionalStore } from '@/stores/additionalStore'

const currentStep = ref(0)
const formRef = ref(null)
const isLoading = ref(false)
const completedSteps = ref({})
const creditCardStore = useCreditCardStore()
const destinationStore = useDestinationStore()
const packageStore = usePackageStore()
const additionalStore = useAdditionalStore()
const calcStore = useCalcStore()

const steps = [
  { title: 'Origin and Destination', icon: 'fi fi-tr-location-arrow' },
  { title: 'Package Details', icon: 'fi fi-tr-box-open' },
  { title: 'Additional Info', icon: 'fi fi-tr-layer-plus' },
  { title: 'Quote', icon: 'fi fi-tr-calculator-money' },
  { title: 'Payment', icon: 'fi fi-tr-selling' }
]

const currentComponent = computed(() => {
  const components = [FromToForm, PackageForm, AdditionalDetails, QuoteForm, PaymentForm]
  return components[currentStep.value]
})

const canNavigateToStep = (stepIndex) => 
  stepIndex <= currentStep.value || completedSteps.value[stepIndex - 1]

const handleStepClick = (index) => {
  if (canNavigateToStep(index)) {
    currentStep.value = index
  }
}

const handleValidation = (isValid) => {
  isLoading.value = false
  if (isValid) {
    completedSteps.value[currentStep.value] = true
    if (currentStep.value < steps.length - 1) {
      currentStep.value++
    }
  }
}

const validateCurrentStep = async () => {
  isLoading.value = true
  updateCalcStore()

  if (currentStep.value === 4) {
    handleValidation(creditCardStore.validateForm())
  } else {
    if (formRef.value?.validate) {
      try {
        handleValidation(await formRef.value.validate())
      } catch (error) {
        console.error('Validation error:', error)
        isLoading.value = false
      }
    } else {
      handleValidation(true)
    }
  }
}

const updateCalcStore = () => {
  Object.assign(calcStore, {
    originCountry: destinationStore.formData.fromCountry,
    destinationCountry: destinationStore.formData.toCountry,
    packageType: packageStore.formData.packageType,
    length: packageStore.formData.length,
    width: packageStore.formData.width,
    height: packageStore.formData.height,
    weight: packageStore.formData.weight,
    tax: additionalStore.formData.tax,
  })
  calcStore.calculateQuote()
}

const nextStep = async () => {
  if (currentStep.value < steps.length - 1) {
    await validateCurrentStep()
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}
</script>