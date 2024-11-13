<template>
    <main class="flex grid-cols-3 gap-10 w-full justify-center items-center h-fit p-6">
        <CardComp
                v-for="details in cardDetails"
                :key="details.id"
                :icon="details.icon"
                :title="details.title"
                :desc="details.desc"
                @click="handleCardClick(details.id)"
            />
    </main>
</template>
<script setup>
import { ref } from 'vue';
import CardComp from './singles/CardComp.vue';

const cardDetails = ref([
{ 
        id: 1, 
        icon: "fi fi-rr-check-in-calendar", 
        title: "Add Shipment", 
        desc: 'Create new shipment record and track your delivery' 
    },
    { 
        id: 2, 
        icon: "fi fi-rr-calculator-money", 
        title: "Get a Quote", 
        desc: 'Generate an estimate for cost applied' 
    },
    { 
        id: 3, 
        icon: "fi fi-sr-handshake-deal-loan", 
        title: "Partner", 
        desc: 'Join us to secure and manage your frequent logistics' 
    },
    
])
const handleCardClick = (id) => {
    console.log(`Card ${id} clicked`);
};
</script>