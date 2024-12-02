<template>
  <div class="container mx-auto p-6 bg-gray-50 h-3/5">
    <!-- Header Section -->
    <div class="flex items-center justify-center gap-3 mb-8">
      <h1 class="text-3xl font-bold text-slate-900 text-center">FAQs</h1>
    </div>

    <!-- FAQ Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="(faq, index) in faqs" 
        :key="index" 
        class="card hover:shadow-lg transition-shadow duration-300 border-l-4 border-emerald-600"
      >
        <!-- Question Header -->
        <div 
          class="card-header cursor-pointer hover:bg-gray-100 p-4"
          @click="toggleExpand(index)"
        >
          <div class="flex justify-between items-center text-lg">
            <span class="pr-6 text-slate-900">{{ faq.question }}</span>
            <i 
              :class="expandedId === index ? 'fi fi-rr-angle-small-up text-emerald-600' : 'fi fi-rr-angle-small-down text-emerald-600'" 
              class="h-5 w-5 flex-shrink-0"
            ></i>
          </div>
        </div>

        <!-- Answer Content -->
        <div 
          v-if="expandedId === index" 
          class="card-content p-4 text-gray-600"
        >
          <p class="whitespace-pre-line">{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ShippingFAQGrid",
  setup() {
    const faqs = ref([
      {
        question: "How do I track my shipment?",
        answer:
          "Enter your tracking number in our tracking portal or check your shipment status in your account dashboard. You'll receive real-time updates via email and SMS.",
      },
      {
        question: "What are your shipping rates?",
        answer:
          "Domestic Ground (2-5 days): $5.99-$14.99\nExpress (1-2 days): $19.99-$29.99\nInternational (5-10 days): Starting at $24.99\nRates vary based on weight and destination.",
      },
      {
        question: "Do you offer international shipping?",
        answer:
          "Yes, we ship to over 180 countries. International shipments typically take 5-10 business days and include customs tracking. Additional duties and taxes may apply.",
      },
      {
        question: "What's your insurance policy?",
        answer:
          "All shipments include basic insurance up to $100. Additional coverage available at $1 per $100 of declared value. Claims must be filed within 30 days of shipment.",
      },
      {
        question: "How do I schedule a pickup?",
        answer:
          "Schedule pickups through your account dashboard or call our 24/7 customer service. Same-day pickup available for orders placed before 2 PM local time.",
      },
      {
        question: "What items are restricted?",
        answer:
          "Prohibited items include hazardous materials, perishables, weapons, and illegal substances. Check our complete restricted items list before shipping.",
      },
    ]);

    const expandedId = ref(null);

    const toggleExpand = (index) => {
      expandedId.value = expandedId.value === index ? null : index;
    };

    return {
      faqs,
      expandedId,
      toggleExpand,
    };
  },
};
</script>

<style>
.card {
  @apply rounded-md shadow-sm bg-white overflow-hidden;
}
.card-header {
  @apply border-b;
}
.card-content {
  @apply text-sm;
}
</style>
