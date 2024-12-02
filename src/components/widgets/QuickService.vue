<template>
    <main class="flex grid-cols-3 gap-10 w-full justify-center items-center h-1/2 p-6">
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
        toPath: "create-shipment"
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