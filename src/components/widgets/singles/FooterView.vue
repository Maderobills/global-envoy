<template>
    <section class="w-screen flex flex-col space-y-6 p-20 mb-4">
        <div class="w-full flex justify-evenly">
            <div class="space-y-4">
            <h5 class="text-slate-700 font-bold">Quick Links</h5>
            <ul class="space-y-2">
                <li><RouterLink to="/Customer">Customer Service</RouterLink></li>
                <li><RouterLink to="sign-in">Customer Portal Logins</RouterLink></li>
                <li>Digital Partners and Integrations</li>
                <li><RouterLink to="/get-shipment">Get a Quote</RouterLink></li>
            </ul>
        </div>
        <div class="space-y-4">
            <h5 class="text-slate-700 font-bold">Service Divisions</h5>
            <ul class="space-y-2">
                <li>Express Shipping</li>
                <li>Freight Services</li>
                <li>E-commerce Solutions</li>
                <li>Customs Clearance</li>
            </ul>
        </div>
        <div class="space-y-4">
            <h5 class="text-slate-700 font-bold">Company Information</h5>
            <ul class="space-y-2">
                <RouterLink to="about-us"><li>About Us</li></RouterLink>
                <li>Careers</li>
                <li>Privacy Policy</li>
                <li>Terms and Conditions</li>
            </ul>
        </div>
        <div class="space-y-4">
            <h5 class="text-slate-700 font-bold">Contact Us</h5>
            <div class="space-y-2">
                <div class="space-x-3"><i class="fi fi-tr-phone-rotary"></i><span>+44 845 566 9546</span></div>
                <div class="space-x-3"><i class="fi fi-tr-envelopes"></i><span>info@globalEnvoy.com</span></div>
                <div class="space-x-3"><i class="fi fi-tr-pending"></i><span> Monday to Friday 9:30am - 6:30pm</span></div>
            </div>
        </div>
        </div>
        <div class="w-full p-4 flex justify-evenly bg-gradient-to-r from-slate-500 to-slate-900 text-white">
            <div>
                <h1 className="text-4xl">
            Global<span className="font-extrabold text-slate-900">Envoy</span>
          </h1>
            </div>
            <div class="space-y-2">
                <h5 class="text-lg font-medium">Subscribe to our News</h5>
                <div class="space-x-2"><input type="email" class="text-slate-900 rounded py-1 px-2 w-64">
                    <button class="bg-slate-900 rounded  py-1 px-2">Subscribe</button></div>
                
            </div>
            <div class="space-y-2 flex flex-col text-center">
                <h5 class="text-lg font-medium">Follow us</h5>
                <div class="w-32 flex justify-evenly">
                    
                    <a href="https://web.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F&_rdc=1&_rdr#"><img :src="fb" alt=""></a>
                    <a href="https://www.youtube.com/"><img :src="yt" alt=""></a>
                    
                    <img :src="wa" alt="">
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
        return{
            fb,
            wa,
            yt,
        }
    }
    
}
</script>