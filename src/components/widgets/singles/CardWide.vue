<template>
    <div class="w-full my-6">
        <h1 class="text-3xl font-semibold text-slate-900 p-4">Our Services</h1>
        <div class="flex justify-evenly h-100  bg-slate-100 py-6 rounded">
            <div class="grid grid-cols-2 gap-4">
                <CardComp
                v-for="details in cardDetails"
                :key="details.id"
                :icon="details.icon"
                :title="details.title"
                :desc="details.desc"
                @click="handleCardClick(details.id)"
            />
            </div>
            <img class="w-1/2 rounded-md" src="https://img.freepik.com/free-photo/close-up-delivery-person-offering-parcel-client_23-2149095936.jpg?" alt="">
            
        </div>


    </div>
</template>
<script setup>
import { ref } from 'vue';
import CardComp from './CardComp.vue';
const cardDetails = ref([
{ 
        id: 1, 
        icon: "fi fi-rr-check-in-calendar", 
        title: "Express Shipping", 
        desc: 'Fast delivery options for urgent shipments.' 
    },
    { 
        id: 2, 
        icon: "fi fi-rr-calculator-money", 
        title: "Freight Services", 
        desc: 'Comprehensive logistics solutions for large cargo.' 
    },
    { 
        id: 3, 
        icon: "fi fi-sr-handshake-deal-loan", 
        title: "E-commerce Solutions", 
        desc: 'Tailored services for online businesses.' 
    },
    { 
        id: 4, 
        icon: "fi fi-sr-handshake-deal-loan", 
        title: "Customs Clearance", 
        desc: 'Expertise in navigating global customs regulations.' 
    },
    
])
const handleCardClick = (id) => {
    console.log(`Card ${id} clicked`);
};
</script>