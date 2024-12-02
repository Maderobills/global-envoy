<template>
  <!-- Form remains mostly the same, with a few key improvements -->
  <main class="h-screen flex flex-col justify-center items-center">
    <form @submit.prevent="submitForm" class="bg-white p-20 pt-10 max-w-3xl w-full rounded-md h-4/5 overflow-hidden overflow-y-scroll">
      <!-- ... existing form header ... -->
      <h1 class="text-2xl my-6">
        Sign up for Global<span class="font-extrabold text-slate-900">Envoy</span>
      </h1>
      <!-- Personal Information Section -->
      <section class="mb-6">
        <div class="flex flex-wrap gap-4 mb-4">
          <div class="flex flex-col">
            <label for="appellation" class="mb-2">*Appellation</label>
            <select 
              id="appellation" 
              v-model="formData.appellation" 
              required 
              class="border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded p-2 min-w-[150px]"
            >
              <option value="">Please select</option>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Mrs">Mrs</option>
              <option value="Dr">Dr</option>
            </select>
          </div>

          <div class="flex flex-col">
            <label for="surname" class="mb-2">*Surname</label>
            <input
              id="surname"
              v-model="formData.surname"
              type="text"
              required
              class="border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded p-2 min-w-[150px]"
            />
          </div>

          <div class="flex flex-col">
            <label for="name" class="mb-2">*Name</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              class="border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded p-2 min-w-[150px]"
            />
          </div>
        </div>

        <!-- Firm Input -->
        <div class="flex flex-col mb-4">
          <label for="firm" class="mb-2">*Firm</label>
          <input
            id="firm"
            v-model="formData.firm"
            type="text"
            required
            class="border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded p-2"
          />
        </div>

        <!-- Contact Information -->
        <div class="flex flex-wrap gap-6 mb-4">
          <div class="flex flex-col">
            <label for="countryCode" class="mb-2">*Code</label>
            <select 
              id="countryCode" 
              v-model="formData.countryCode" 
              required 
              class="border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded p-2 min-w-[100px]"
            >
              <option value="+44">+44</option>
              <option value="+233">+233</option>
              <option value="+1">+1</option>
            </select>
          </div>

          <div class="flex flex-col flex-1">
            <label for="contactNumber" class="mb-2">*Contact number</label>
            <input
              id="contactNumber"
              v-model="formData.contactNumber"
              type="tel"
              required
              pattern="[0-9]{10}"
              class="border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded p-2"
            />
          </div>
        </div>
      </section>

      <!-- Create User Section -->
      <div class="flex flex-col gap-4">
        <div class="flex flex-col mb-4">
          <label for="email" class="mb-2">*Email</label>
          <input 
            id="email"
            v-model="formData.email"
            type="email" 
            required
            class="border border-gray-200 rounded p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div class="flex flex-col mb-4">
          <label for="password" class="mb-2">*Password</label>
          <div class="relative">
            <input 
              id="password"
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              required
              minlength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              class="border border-gray-200 rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter your password"
            />
            <button 
              type="button"
              @click="togglePassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <p class="text-xs text-gray-600 mt-1">Password must be 8+ chars, include uppercase, lowercase, and number</p>
        </div>

        <div class="flex flex-col mb-4">
          <label for="confirmPassword" class="mb-2">*Confirm the new password</label>
          <input 
            id="confirmPassword"
            v-model="formData.confirmPassword"
            type="password"
            required
            class="border border-gray-200 rounded p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Confirm new password"
          />
        </div>

        <div class="flex items-center gap-6">
          <button type="submit" class="bg-emerald-500 text-white px-6 py-2 rounded hover:bg-emerald-600 transition-colors w-[30%]">
            Enroll
          </button>
          <RouterLink to="/sign-in" class="text-gray-600 hover:text-emerald-500 cursor-pointer">
            Already have an account? Go to log in
          </RouterLink>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useFirebaseStore } from "@/stores/firebaseStore";

const router = useRouter();
const firebaseStore = useFirebaseStore();

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

const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Function to validate email format
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const submitForm = async () => {
  // Trim inputs to remove whitespace
  Object.keys(formData.value).forEach(key => {
    if (typeof formData.value[key] === 'string') {
      formData.value[key] = formData.value[key].trim();
    }
  });

  // Advanced validation
  if (formData.value.password !== formData.value.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Enhanced email validation
  if (!isValidEmail(formData.value.email)) {
    alert("Invalid email format.");
    return;
  }

  // Password complexity validation
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!passwordRegex.test(formData.value.password)) {
    alert("Password must be 8+ characters, include uppercase, lowercase, and number.");
    return;
  }

  try {
    const userProfile = {
      firstName: formData.value.name,
      lastName: formData.value.surname,
      appellation: formData.value.appellation,
      firm: formData.value.firm,
      countryCode: formData.value.countryCode,
      contactNumber: formData.value.contactNumber,
      email: formData.value.email,
    };

    const user = await firebaseStore.signUpWithEmail(
      formData.value.email, 
      formData.value.password, 
      userProfile
    );

    console.log("User signed up successfully:", user);
    await router.push('/');
  } catch (error) {
    console.error("Error signing up:", error);
    alert("Sign-up failed. Please try again.");
  }
};
</script>