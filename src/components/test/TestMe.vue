<template>
  <div class="space-y-6">
    <!-- Card Number Section -->
    <div>
      <label class="block text-sm font-medium mb-2">Card Number</label>
      <div id="card-element" class="w-full p-3 border rounded">
        <!-- Stripe Card Element will be mounted here -->
      </div>
      <p v-if="paymentError" class="text-red-500 text-sm mt-1">
        {{ paymentError }}
      </p>
    </div>

    <div class="flex justify-between gap-4 flex-row-reverse">
      <button
        @click="handleSubmit"
        class="bg-emerald-500 text-white py-3 px-6 rounded hover:bg-emerald-600 transition-colors"
        :disabled="loading"
      >
        Submit
      </button>
      <button
        @click="handleReset"
        class="bg-gray-500 text-white py-3 px-6 rounded hover:bg-gray-600 transition-colors"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCreditCardStore } from "@/stores/paymentStore";
import { ref, onMounted } from "vue";

const creditCardStore = useCreditCardStore();
const paymentError = ref("");
const loading = ref(false);

// Mount Stripe Card Element
onMounted(() => {
  creditCardStore.initializeStripe("card-element"); // Mount Stripe Card Element
});

// Handle form submission
const handleSubmit = async () => {
  loading.value = true;
  paymentError.value = "";

  try {
    const token = await creditCardStore.createToken();
    if (token) {
      console.log("Token created:", token);
      alert("Payment successful!");
    } else {
      throw new Error("Card validation failed. Please check your card details.");
    }
  } catch (error) {
    paymentError.value = error.message;
  } finally {
    loading.value = false;
  }
};

// Reset the form
const handleReset = () => {
  paymentError.value = "";
  creditCardStore.resetForm();
};
</script>

<style scoped>
/* Add custom styling for your form */
#error {
  color: red;
  font-size: 14px;
}
</style>
