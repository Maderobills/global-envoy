<template>
    <main>
        <TrackingInput/>

        <section class="flex flex-col w-11/12 justify-self-center p-4 space-y-10">
            <div class="w-full space-y-2 text-white font-semibold bg-bgcolor rounded drop-shadow-2xl h-fit p-4">
                <div class="w-full flex justify-between">
                    <h4>Package ID: <span class="font-thin">24006</span></h4>
                    <h4>Tracking Number: <span class="font-thin">123456789</span></h4>
                </div>
                <div class="w-full flex justify-between">
                    <h4>Delivered from: <span class="font-thin">Chong Hong-Warehouse(B34) Shang-Street</span></h4>
                    <h4>Delivered To: <span class="font-thin">Austin Warehouse</span></h4>
                </div>
                <h4>Estimated Delivery: <span class="font-thin">December 10, 2024</span></h4>

            </div>
            <div class="h-80 w-full bg-slate-100 rounded p-5 space-y-6 overflow-hidden overflow-y-auto">
                <div class="h-10 border-l-4 border-emerald-500 bg-white flex items-center rounded space-x-2">
                    <i class="fi fi-ts-bullet flex items-center text-lg pl-4"></i>
                    <div class="bg-white flex items-center space-x-2 text-slate-600">
                        <h4>Order Recieved</h4>
                        <i class="fi fi-tr-horizontal-rule flex items-center"></i>
                        <h4>Chong Hong-Warehouse(B34) Shang-Street</h4>
                        <i class="fi fi-tr-horizontal-rule flex items-center"></i>
                        <h3>November 2, 2024</h3>


                    </div>
                </div>
                <div class="h-10 border-l-4 border-emerald-500 bg-white flex items-center rounded space-x-2">
                    <i class="fi fi-ts-bullet flex items-center text-lg pl-4"></i>
                    <div class="bg-white flex items-center space-x-2 text-slate-600">
                        <h4>Order Recieved</h4>
                        <i class="fi fi-tr-horizontal-rule flex items-center"></i>
                        <h4>Chong Hong-Warehouse(B34) Shang-Street</h4>
                        <i class="fi fi-tr-horizontal-rule flex items-center"></i>
                        <h3>November 2, 2024</h3>


                    </div>
                </div>
                <div class="h-10 border-l-4 border-emerald-500 bg-white flex items-center rounded space-x-2">
                    <i class="fi fi-ts-bullet flex items-center text-lg pl-4"></i>
                    <div class="bg-white flex items-center space-x-2 text-slate-600">
                        <h4>Order Recieved</h4>
                        <i class="fi fi-tr-horizontal-rule flex items-center"></i>
                        <h4>Chong Hong-Warehouse(B34) Shang-Street</h4>
                        <i class="fi fi-tr-horizontal-rule flex items-center"></i>
                        <h3>November 2, 2024</h3>


                    </div>
                </div>
                <div class="h-10 border-l-4 border-emerald-500 bg-white flex items-center rounded space-x-2">
                    <i class="fi fi-ts-bullet flex items-center text-lg pl-4"></i>
                    <div class="bg-white flex items-center space-x-2 text-slate-600">
                        <h4>Order Recieved</h4>
                        <i class="fi fi-tr-horizontal-rule flex items-center"></i>
                        <h4>Chong Hong-Warehouse(B34) Shang-Street</h4>
                        <i class="fi fi-tr-horizontal-rule flex items-center"></i>
                        <h3>November 2, 2024</h3>


                    </div>
                </div>
                <div class="h-10 border-l-4 border-emerald-500 bg-white flex items-center rounded space-x-2">
                    <i class="fi fi-ts-bullet flex items-center text-lg pl-4"></i>
                    <div class="bg-white flex items-center space-x-2 text-slate-600">
                        <h4>Order Recieved</h4>
                        <i class="fi fi-tr-horizontal-rule flex items-center"></i>
                        <h4>Chong Hong-Warehouse(B34) Shang-Street</h4>
                        <i class="fi fi-tr-horizontal-rule flex items-center"></i>
                        <h3>November 2, 2024</h3>


                    </div>
                </div>
                <div class="h-10 border-l-4 border-emerald-500 bg-white flex items-center rounded space-x-2">
                    <i class="fi fi-ts-bullet flex items-center text-lg pl-4"></i>
                    <div class="bg-white flex items-center space-x-2 text-slate-600">
                        <h4>Order Recieved</h4>
                        <i class="fi fi-tr-horizontal-rule flex items-center"></i>
                        <h4>Chong Hong-Warehouse(B34) Shang-Street</h4>
                        <i class="fi fi-tr-horizontal-rule flex items-center"></i>
                        <h3>November 2, 2024</h3>


                    </div>
                </div>
                <div class="h-10 border-l-4 border-yellow-500 bg-white flex items-center rounded shadow-2xl shadow-yellow-100 space-x-2">
                    <i class="fi fi-ts-bullet flex items-center text-lg pl-4"></i>
                    <div class="bg-white flex items-center space-x-2 text-slate-600">
                        <h4>Order Recieved</h4>
                        <i class="fi fi-tr-horizontal-rule flex items-center"></i>
                        <h4>Chong Hong-Warehouse(B34) Shang-Street</h4>
                        <i class="fi fi-tr-horizontal-rule flex items-center"></i>
                        <h3>November 2, 2024</h3>


                    </div>
                </div>

            </div>
        </section>
        <FooterView/>

    </main>
</template>
<script>
import FooterView from '@/components/widgets/singles/FooterView.vue';
import TrackingInput from '@/components/widgets/TrackingInput.vue';

export default {
    name: 'TrackPage',
    components:{
        TrackingInput,
        FooterView,
    }
}
</script>