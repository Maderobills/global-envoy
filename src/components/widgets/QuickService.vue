<template>
    <main 
        class="grid gap-6 w-full justify-center justify-self-center items-center h-1/2 p-6"
        :class="{
            'grid-cols-1': true, /* Default for smaller screens */
            'sm:grid-cols-2': true, /* Two columns for small screens and up */
            'lg:grid-cols-3': true /* Three columns for large screens and up */
        }"
    >
        <CardComp
            v-for="details in cardDetails"
            :key="details.id"
            :icon="details.icon"
            :title="details.title"
            :desc="details.desc"
            @click="handleCardClick(details.toPath)"
        />
    </main>
</template>

<script setup>
import { ref } from 'vue';
import CardComp from './singles/CardComp.vue';
import router from '@/router';

const cardDetails = ref([
{ 
        id: 1, 
        icon: "fi fi-rr-check-in-calendar", 
        title: "Add Shipment", 
        desc: 'Create new shipment record and track your delivery',
        toPath: "/create-shipment"
    },
    { 
        id: 2, 
        icon: "fi fi-rr-calculator-money", 
        title: "Get a Quote", 
        desc: 'Generate an estimate for cost applied',
        toPath: "/get-shipment" 
    },
    { 
        id: 3, 
        icon: "fi fi-sr-handshake-deal-loan", 
        title: "Partner", 
        desc: 'Join us to secure and manage your frequent logistics',
        toPath: "/partner-shipment" 
    },
    
])
const handleCardClick = (toPath) => {
    router.push(`${toPath}`)
    console.log(`Card ${toPath} clicked`);
};
</script>