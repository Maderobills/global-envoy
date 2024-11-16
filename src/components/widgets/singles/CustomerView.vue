<template>
    <div id="app">
      <div>
        <h1 class="text-red-600 m-9 text-4xl"><b>CUSTOMER SERVICE</b></h1>
      </div>
  
      <div class="flex space-x-4">
        <section class="flex-1 p-6 rounded-lg shadow-md bg-white mb-8">
          <h2 class="text-lg font-semibold mb-2">Have a tracking number? Find your contact</h2>
          <div class="flex gap-2 items-center flex-left">
            <input v-model="trackingNumber" type="text" placeholder="Enter your tracking number(s)" class="border border-gray-400 p-2 rounded w-full">
            <button @click="findLocation" class="bg-red-600 text-white px-4 py-2 rounded">Find Location</button>
          </div>
          <p class="text-gray-500 mt-2">Your tracking number lets us find the right division contact to answer your questions.</p>
          <a href="#" class="text-red-600 mt-4 inline-block">No tracking number?</a>
        </section>
  
        <div class="flex flex-col space-y-4 w-1/3">
          <section class="bg-white p-3 rounded-lg shadow-lg">
            <h2 class="text-xl font-bold">DHL for Business</h2>
            <p class="text-gray-600">Shipping regularly? Request a business account and profit from exclusive benefits.</p>
          </section>
  
          <section class="bg-white p-3 rounded-lg shadow-lg">
            <h2 class="text-xl font-bold">Do you suspect you received a fraudulent email?</h2>
            <p class="text-gray-600">Let us know.</p>
          </section>
        </div>
      </div>
  
      <div class="flex space-x-4 w-11/12 max-w-5xl">
        <div class="flex-1 bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold text-red-600 mb-4">DHL EXPRESS</h2>
          <p class="text-slate-200">Express courier delivered parcel and documents service for your shipping needs.</p>
          <span><br>
            <p class="p-0 font-bold">Shipment Tracking and Status:</p>
            <p class="text-gray-400">(Personal Business)</p>
          </span>
          <ol class="m-1 text-gray-800">
            <li>Contact Us</li>
            <li>FAQ, TIPS and Advice</li>
          </ol>
        </div>
  
        <div class="flex-1 bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold text-red-600 mb-4">DHL eCOMMENCE</h2>
          <p class="text-slate-200 line-clamp-2">Standard international document and package services. Are you expecting a shipment sent with DHL eCOMMENCE?</p>
          <span><br>
            <p class="p-0 font-bold">Shipment Tracking and Status:</p>
            <p class="text-gray-400">(Personal Business)</p>
          </span>
          <ol class="m-1 text-gray-800">
            <li>Contact Customer Service</li>
            <li>Frequently Asked Questions</li>
          </ol>
        </div>
      </div>
  
      <h2 class="mt-9 font-bold text-2xl mb-4">Pallets, Containers and Other Freight Services</h2>
      <div class="mt-2 bg-white pt-2 rounded-lg shadow-lg">
        <div>
          <h3 class="text-xl font-bold text-red-600">DHL GLOBAL FORWARDING</h3>
          <p class="text-gray-700 mb-6">The experts in global air, ocean and ground freight forwarding (containers, pallets, and other cargo).</p>
  
          <span class="font-bold text-slate-500">Business Only:</span>
          <ol class="items-center">
            <li class="text-slate-500">Find a Local Contact</li>
            <li class="text-slate-500">Send Email</li>
            <li class="text-slate-500">Shipper Help Center</li>
            <li class="text-slate-500">Chatbot</li>
          </ol>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CustomerView',
    data() {
      return {
        trackingNumber: ''
      };
    },
    methods: {
      findLocation() {
        if (this.trackingNumber) {
          alert(`Finding location for tracking number: ${this.trackingNumber}`);
          // Implement your tracking logic here
        } else {
          alert('Please enter a tracking number.');
        }
      }
    }
  };
  </script>
  
  <style>
  </style>