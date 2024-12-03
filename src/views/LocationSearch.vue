<template>
    <div class="max-w-4xl mx-auto p-6 space-y-8">
      <!-- Page Title -->
      <h1 class="text-3xl font-bold text-center">Find a Shipping Location</h1>
  
      <!-- Search Input -->
      <div class="relative">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by location name or address..."
          class="w-full p-4 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none"
        />
       
        <i class="fi fi-br-search text-xl text-emerald-600 absolute left-4 top-1/2 transform -translate-y-1/2"></i>
      </div>
  
      <!-- Locations List -->
      <div>
        <!-- Render Locations -->
        <div 
          v-for="location in filteredLocations" 
          :key="location.id" 
          class="border rounded-lg p-6 hover:shadow-lg transition-shadow space-y-4"
        >
          <div class="flex justify-between items-start">
            <!-- Location Details -->
            <div class="space-y-2">
              <h2 class="text-xl font-semibold">{{ location.name }}</h2>
              <div class="space-y-1 text-gray-600">
                <div class="flex items-center">
                  <i class="fi fi-tr-map-pin text-xl text-emerald-600 mr-2"></i>
                  <span>{{ location.address }}</span>
                </div>
                <div class="flex items-center">
                  <i class="fi fi-tr-pending text-xl text-emerald-600 mr-2"></i>
                  <span>{{ location.hours }}</span>
                </div>
                <div class="flex items-center">
                  <i class="fi fi-tr-phone-rotary text-xl text-emerald-600 mr-2"></i>
                  <span>{{ location.phone }}</span>
                </div>
              </div>
            </div>
            <!-- Distance Badge -->
            <div>
              <span class="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm">
                {{ location.distance }} miles away
              </span>
            </div>
          </div>
        </div>
  
        <!-- No Results Message -->
        <div 
          v-if="filteredLocations.length === 0" 
          class="text-center py-8 text-gray-500"
        >
          No locations found matching your search.
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from "vue";
  
  export default {

    setup() {
      const searchQuery = ref("");
      const locations = ref([
        {
          id: 1,
          name: "Downtown Shipping Center",
          address: "123 Main Street, Downtown",
          hours: "Mon-Fri: 9AM-6PM",
          phone: "(555) 123-4567",
          distance: "0.8",
        },
        {
          id: 2,
          name: "Westside Delivery Hub",
          address: "456 West Avenue, Westside",
          hours: "Mon-Sat: 8AM-8PM",
          phone: "(555) 234-5678",
          distance: "1.2",
        },
        {
          id: 3,
          name: "East End Shipping Point",
          address: "789 East Boulevard, Eastside",
          hours: "Mon-Sun: 24/7",
          phone: "(555) 345-6789",
          distance: "2.5",
        },
      ]);
  
      const filteredLocations = computed(() =>
        locations.value.filter(
          (location) =>
            location.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            location.address.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      );
  
      return { searchQuery, filteredLocations };
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional custom styles if needed */
  </style>
  