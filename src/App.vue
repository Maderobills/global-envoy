<script setup>

</script>

<template>
  <header class="w-screen h-fit">
    <div class="bg-bgcolor text-white w-full h-14 flex justify-evenly items-center">
      <h1 className="text-2xl">
            Global<span className="font-extrabold text-slate-900">Envoy</span>
          </h1>
      <div class="flex space-x-4 text-sm">
        <div class="h-12 flex justify-center items-center space-x-2 hover:text-slate-900 cursor-pointer">
          <h5>Find a Location</h5>
          <i class="fi fi-rs-land-layer-location"></i>
        </div>
        <div class="h-12 flex justify-center items-center space-x-2 hover:text-slate-900 cursor-pointer">
          <h5>Search</h5>
          <i class="fi fi-rs-search"></i>
        </div>
        <div class="h-12 flex justify-center items-center space-x-2 hover:text-slate-900 cursor-pointer">
          <h5>Country</h5>
          <i class="fi fi-rs-earth-americas"></i>
        </div>
      </div>
    </div>
    <nav class="w-full h-14 bg-white flex justify-around items-center relative">
     <div class="flex space-x-10">
      <div class="relative group">
        <RouterLink to="/" class="flex items-baseline space-x-2"><i class="fi fi-ts-shipping-timed"></i><span>Track</span></RouterLink>
        <!-- Dropdown for Track -->
        <div class="absolute hidden group-hover:block bg-white shadow-lg mt-0 rounded">
            <RouterLink to="/track1" class="block px-4 py-2 hover:bg-gray-200">Track Shipment</RouterLink>
            <RouterLink to="/track2" class="block px-4 py-2 hover:bg-gray-200">Track History</RouterLink>
        </div>
    </div>

    <div class="relative group">
        <RouterLink to="/ship" class="flex items-baseline space-x-2"><i class="fi fi-tr-box-open"></i><span>Ship</span></RouterLink>
        <!-- Dropdown for Ship -->
        <div class="absolute hidden group-hover:block bg-white shadow-lg mt-0 rounded">
            <RouterLink to="/ship1" class="block px-4 py-2 hover:bg-gray-200">Create Shipment</RouterLink>
            <RouterLink to="/ship2" class="block px-4 py-2 hover:bg-gray-200">Shipping Rates</RouterLink>
        </div>
    </div>

    <div class="relative group">
        <RouterLink to="/cservice" class="flex items-baseline space-x-2"><i class="fi fi-rr-headset"></i><span>Customer Service</span></RouterLink>
        <!-- Dropdown for Customer Service -->
        <div class="absolute hidden group-hover:block bg-white shadow-lg mt-0 rounded">
            <RouterLink to="/service1" class="block px-4 py-2 hover:bg-gray-200">FAQs</RouterLink>
            <RouterLink to="/service2" class="block px-4 py-2 hover:bg-gray-200">Contact Support</RouterLink>
        </div>
    </div>
     </div>

    <RouterLink to="/logins">Customer Portal Logins</RouterLink>
</nav>
  </header>

  <main class="h-lvh overflow-y-scroll">
    <RouterView />
  </main>
</template>
<style>
@import '@flaticon/flaticon-uicons/css/all/all.css';
</style>