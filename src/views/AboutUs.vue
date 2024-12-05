<script setup>
const Image1 =
  "https://img.freepik.com/free-photo/vehicles-laptop-supply-chain-representation_23-2149853161.jpg?";
</script>
<template>
  <main class="h-screen w-4/5 justify-self-center overflow-hidden overflow-y-auto scrollbar-hide">
    <div class="pt-10">
      <h1 class="text-emerald-600 text-4xl font-bold text-center">COMPANY OVERVIEW</h1>
    </div>

    <section class="max-w-7xl mx-auto  rounded-lg mt-8">
      <div class="flex flex-col md:flex-row items-start">
        <div class="md:w-2/3">
          <p class="text-gray-600 text-justify">
            Global Envoy is a leading shipping and tracking company dedicated to
            providing seamless logistics solutions across the globe. With a
            commitment to excellence and innovation, we strive to connect
            businesses and individuals with reliable shipping services that meet
            their diverse needs. Founded on the principles of integrity,
            efficiency, and customer satisfaction, Global Envoy has established
            itself as a trusted partner in the shipping industry. Our extensive
            network and advanced tracking technology ensure that your shipments
            are secure, timely, and easily monitored from origin to destination.
          </p>
        </div>

        <div class="md:w-2/5 h-80 w-full mt-6 md:mt-0 md:ml-8 flex justify-center">
          <img :src="Image1" alt="Shipping and Logistics" class=" shadow-2xl rounded-lg w-full h-auto max-w-xs" />
        </div>
      </div>
    </section>

    <section class="m-6 rounded-lg relative bg-gradient-to-r from-slate-500 to-slate-900 text-white py-10 mt-10">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <h2 class="pb-4 text-xl font-bold">Vision</h2>
          <img :src="Image1" alt="Vision Icon" class="rounded-full w-36 h-36 mx-auto mb-2" />
          <p class="pt-2 text-sm">
            Become a leading one-stop integrated logistics service provider in
            emerging markets.
          </p>
        </div>

        <div>
          <h2 class="pb-4 text-xl font-bold">Mission</h2>
          <img :src="Image1" alt="Mission Icon" class="rounded-full w-36 h-36 mx-auto mb-2" />
          <p class="pt-2 text-sm">
            Optimize the end-to-end logistics chain between China and emerging
            markets for stable and efficient logistics solutions.
          </p>
        </div>

        <div>
          <h2 class="pb-4 text-xl font-bold">Values</h2>
          <img :src="Image1" alt="Core Values Icon" class="rounded-full w-36 h-36 mx-auto mb-2" />
          <p class="pt-2 text-sm">
            Integrate advantageous resources to build a reliable logistics
            network.
          </p>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto py-10 mt-10">
      <h2 class="text-center text-2xl font-bold mb-8">Corporate Values</h2>
      <div class="grid grid-cols-2 gap-6 md:grid-cols-5">
        <div class="text-center">
          <img :src="Image1" alt="Customer First" class="w-16 h-16 mx-auto mb-2" />
          <p class="text-sm font-medium">Customer First</p>
        </div>

        <div class="text-center">
          <img :src="Image1" alt="Humanity and Pragmatism" class="w-16 h-16 mx-auto mb-2" />
          <p class="text-sm font-medium">Humanity and Pragmatism</p>
        </div>

        <div class="text-center">
          <img :src="Image1" alt="Respect and Assurance" class="w-16 h-16 mx-auto mb-2" />
          <p class="text-sm font-medium">Respect and Assurance</p>
        </div>

        <div class="text-center">
          <img :src="Image1" alt="Perseverance" class="w-16 h-16 mx-auto mb-2" />
          <p class="text-sm font-medium">Perseverance</p>
        </div>

        <div class="text-center">
          <img :src="Image1" alt="Efficient Execution" class="w-16 h-16 mx-auto mb-2" />
          <p class="text-sm font-medium">Efficient Execution</p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
@media (max-width: 640px) {
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.5rem;
  }
}

@media (min-width: 640px) and (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 1.75rem;
  }
}
</style>