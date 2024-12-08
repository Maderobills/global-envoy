<template>
    <div class="w-full my-6">
        <h1 class="text-3xl font-semibold text-slate-900 p-4">Why Choose Us?</h1>
        <div class="flex flex-col md:flex-row justify-evenly h-100">
            <img class="w-full md:w-1/2 rounded-md" src="https://img.freepik.com/free-photo/young-african-american-delivery-man-wearing-red-polo-shirt-cap-standing-with-stack-pizza-boxes-pointing-finger-himself-confident-looking-isolated-green_141793-9888.jpg?" alt="">
            <div class="grid gap-4"
            :class="{
            'grid-cols-1 justify-items-center': true, /* Default for smaller screens */
            'sm:grid-cols-2': true, /* Two columns for small screens and up */
        }">
                <CardComp
                v-for="details in cardDetails"
                :key="details.id"
                :icon="details.icon"
                :title="details.title"
                :desc="details.desc"
                @click="handleCardClick(details.id)"
            />
            </div>
            
            
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
        title: "Global Reach", 
        desc: 'Extensive network covering over 220 countries.' 
    },
    { 
        id: 2, 
        icon: "fi fi-rr-calculator-money", 
        title: "Reliable Delivery", 
        desc: 'Commitment to on-time delivery.' 
    },
    { 
        id: 3, 
        icon: "fi fi-sr-handshake-deal-loan", 
        title: "24/7 Support", 
        desc: 'Customer service available around the clock.' 
    },
    { 
        id: 4, 
        icon: "fi fi-sr-handshake-deal-loan", 
        title: "Technology Driven", 
        desc: 'Innovative tracking and management tools.' 
    },
    
])
const handleCardClick = (id) => {
    console.log(`Card ${id} clicked`);
};
</script>