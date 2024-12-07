<template>
    <section class="w-full flex flex-col space-y-6 p-4 md:p-8 lg:p-20 mb-6">
      <!-- Main Links Grid -->
      <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Quick Links -->
        <div class="space-y-4">
          <h5 class="text-slate-700 font-bold">Quick Links</h5>
          <ul class="space-y-2">
            <li><router-link to="/Customer">Customer Service</router-link></li>
            <li><router-link to="sign-in">Customer Portal Logins</router-link></li>
            <li>Digital Partners and Integrations</li>
            <li><router-link to="/get-shipment">Get a Quote</router-link></li>
          </ul>
        </div>
  
        <!-- Service Divisions -->
        <div class="space-y-4">
          <h5 class="text-slate-700 font-bold">Service Divisions</h5>
          <ul class="space-y-2">
            <li>Express Shipping</li>
            <li>Freight Services</li>
            <li>E-commerce Solutions</li>
            <li>Customs Clearance</li>
          </ul>
        </div>
  
        <!-- Company Information -->
        <div class="space-y-4">
          <h5 class="text-slate-700 font-bold">Company Information</h5>
          <ul class="space-y-2">
            <li><router-link to="about-us">About Us</router-link></li>
            <li><router-link to="terms-and-conditions-page">Privacy Policy</router-link></li>
            <li><router-link to="terms-and-conditions-page">Terms and Conditions</router-link></li>
          </ul>
        </div>
  
        <!-- Contact Us -->
        <div class="space-y-4">
          <h5 class="text-slate-700 font-bold">Contact Us</h5>
          <div class="space-y-2">
            <div class="flex items-center space-x-3">
              <i class="fi fi-tr-phone-rotary"></i>
              <span>+44 845 566 9546</span>
            </div>
            <div class="flex items-center space-x-3">
              <i class="fi fi-tr-envelopes"></i>
              <span>info@globalEnvoy.com</span>
            </div>
            <div class="flex items-center space-x-3">
              <i class="fi fi-tr-pending"></i>
              <span>Monday to Friday 9:30am - 6:30pm</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Bottom Section -->
      <div class="w-full p-4 flex flex-col lg:flex-row gap-6 lg:justify-evenly items-center bg-gradient-to-r from-slate-500 to-slate-900 text-white">
        <!-- Logo -->
        <div>
          <h1 class="text-3xl lg:text-4xl">
            Global<span class="font-extrabold text-slate-900">Envoy</span>
          </h1>
        </div>
  
        <!-- Newsletter -->
        <div class="space-y-2">
          <h5 class="text-lg font-medium text-center lg:text-left">Subscribe to our News</h5>
          <div class="flex flex-col sm:flex-row gap-2">
            <input 
              v-model="email"
              type="email" 
              class="text-slate-900 rounded py-1 px-2 w-full sm:w-64"
            />
            <button 
              @click="handleSubscribe"
              class="bg-slate-900 rounded py-1 px-2 whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
        </div>
  
        <!-- Social Media -->
        <div class="space-y-2 flex flex-col items-center">
          <h5 class="text-lg font-medium">Follow us</h5>
          <div class="w-32 flex justify-evenly">
            <a href="https://web.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F&_rdc=1&_rdr#">
              <img :src="fb" alt="Facebook" class="w-6 h-6" />
            </a>
            <a href="https://www.youtube.com/">
              <img :src="yt" alt="YouTube" class="w-6 h-6" />
            </a>
            <img :src="wa" alt="WhatsApp" class="w-6 h-6" />
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import fb from '@/assets/facebook.png';
  import wa from '@/assets/wlogo.png';
  import yt from '@/assets/youtube.png';
  
  export default {
    name: 'Footer',
    data() {
      return {
        fb,
        wa,
        yt,
        email: ''
      }
    },
    methods: {
      handleSubscribe() {
        // Handle newsletter subscription
        if (this.email) {
          console.log('Subscribing email:', this.email);
          // Add your subscription logic here
          this.email = ''; // Reset the input after submission
        }
      }
    }
  }
  </script>