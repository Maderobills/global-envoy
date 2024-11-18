<template>
  <main class="h-screen flex flex-col justify-center items-center">
    <form class="bg-white p-20 pt-10 max-w-3xl w-full rounded-md h-4/5 overflow-hidden overflow-y-scroll">
      <h1 class="text-2xl my-6">
        Sign up for Global<span class="font-extrabold text-slate-900">Envoy</span>
      </h1>

      <!-- Your Information Section -->
      <div class="flex items-center mb-4">
        <span class="w-1 h-5 bg-emerald-500 mr-2"></span>
        <h4 class="font-medium">Your Information</h4>
      </div>

      <!-- Personal Information Section -->
      <section class="mb-6">
        <div class="flex flex-wrap gap-4 mb-4">
          <div class="flex flex-col">
            <span class="mb-2">*Appellation</span>
            <select class="border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded p-2 min-w-[150px]">
              <option>Please select</option>
            </select>
          </div>

          <div class="flex flex-col">
            <span class="mb-2">*Surname</span>
            <input
              type="text"
              class="border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded p-2 min-w-[150px]"
            />
          </div>

          <div class="flex flex-col">
            <span class="mb-2">*Name</span>
            <input
              type="text"
              class="border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded p-2 min-w-[150px]"
            />
          </div>
        </div>

        <!-- Firm Input -->
        <div class="flex flex-col mb-4">
          <span class="mb-2">*Firm</span>
          <input
            type="text"
            class="border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded p-2"
          />
        </div>

        <!-- Contact Information -->
        <div class="flex flex-wrap gap-6 mb-4">
          <div class="flex flex-col">
            <span class="mb-2">*Code</span>
            <select class="border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded p-2 min-w-[100px]">
              <option>+44</option>
              <option>+233</option>
              <option>+1</option>
              <option>+44</option>
            </select>
          </div>

          <div class="flex flex-col flex-1">
            <span class="mb-2">*Contact number</span>
            <input
              type="text"
              class="border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded p-2"
            />
          </div>
        </div>
      </section>

      <!-- Create User Section -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center mb-4">
          <span class="w-1 h-5 bg-emerald-500 mr-2"></span>
          <h3 class="font-medium">Create a user</h3>
        </div>

        <div class="flex flex-col mb-4">
          <span class="mb-2">*Email</span>
          <input
            type="email"
            class="border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded p-2"
          />
        </div>

        <div class="flex flex-col mb-4">
          <span class="mb-2">*Password</span>
          <input
            type="password"
            class="border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded p-2"
          />
        </div>

        <div class="flex flex-col mb-4">
          <span class="mb-2">*Confirm the new password</span>
          <input
            type="password"
            class="border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded p-2"
          />
        </div>

        <div class="flex items-center gap-6">
          <button class="bg-emerald-500 text-white px-6 py-2 rounded hover:bg-emerald-600 transition-colors w-[30%]">
            Enroll
          </button>
          <RouterLink to="/sign-in">
            <span class="text-gray-600 hover:text-emerald-500 cursor-pointer">
              Already have an account? Go to log in
            </span>
          </RouterLink>
          <a href="https://google.com">Goto Google</a>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { ref } from "vue";


const formData = ref({
  appellation: "",
  surname: "",
  name: "",
  firm: "",
  countryCode: "+44",
  contactNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
});


const submitForm = () => {
  console.log(formData.value);
};
</script>
