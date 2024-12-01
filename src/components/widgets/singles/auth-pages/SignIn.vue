<template>
  <main class="h-screen flex flex-col justify-center items-center">
    <form 
      @submit.prevent="handleLogin" 
      class="bg-white p-20 pt-10 max-w-3xl w-full rounded-md h-4/5 overflow-hidden overflow-y-scroll"
    >
      <h1 class="text-2xl my-6">
        Sign in for Global<span class="font-extrabold text-slate-900">Envoy</span>
      </h1>

      <!-- Login Fields -->
      <div class="space-y-6">
        <!-- Email Field -->
        <div class="flex flex-col">
          <label class="mb-2 text-gray-700">Email</label>
          <input 
            v-model="email"
            type="email" 
            required
            class="border border-gray-200 rounded p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <!-- Password Field -->
        <div class="flex flex-col">
          <div class="flex justify-between mb-2">
            <label class="text-gray-700">Password</label>
            <RouterLink to="forgot-password">
              <span class="text-emerald-500 hover:text-emerald-600 text-sm">Forgot password?</span>
            </RouterLink>
          </div>
          <div class="relative">
            <input 
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
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
        </div>

        <!-- Remember Me Checkbox -->
        <div class="flex items-center gap-2">
          <input 
            v-model="rememberMe"
            type="checkbox" 
            id="remember"
            class="w-4 h-4 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500 accent-emerald-500 bg-white"
          />
          <label for="remember" class="text-gray-600">Remember me</label>
        </div>

        <!-- Login Button -->
        <button 
          type="submit"
          class="w-full bg-emerald-500 text-white py-3 rounded hover:bg-emerald-600 transition-colors font-medium"
        >
          Log in
        </button>

        <!-- Sign Up Link -->
        <div class="text-center">
          <RouterLink to="/sign-up">
            <span class="text-gray-600">
              Don't have an account? 
              <a href="#" @click="goToSignup" class="text-emerald-500 hover:text-emerald-600 ml-1">
                Sign up now
              </a>
            </span>
          </RouterLink>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mt-4 p-3 bg-red-100 text-red-700 rounded text-center">
        {{ error }}
      </div>
    </form>
  </main>
</template>

<script setup>
import router from '@/router';
import { useFirebaseStore } from '@/stores/firebaseStore';
import { ref } from 'vue';

// Form state
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);
const error = ref('');

// Firebase store
const firebaseStore = useFirebaseStore();

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Handle form submission
const handleLogin = async () => {
  try {
    error.value = ''; // Clear any previous errors

    // Basic validation
    if (!email.value || !password.value) {
      error.value = 'Please fill in all fields';
      return;
    }

    // Use Firebase Auth from the store
    await firebaseStore.loginWithEmail(email.value, password.value);

    // Handle successful login
    console.log('Login successful');
    router.push('/')
    // Redirect or perform post-login actions
  } catch (err) {
    error.value = err.message || 'An error occurred during login';
  }
};

// Navigation function (implement based on your routing setup)
const goToSignup = () => {
  console.log('Navigate to signup');
};
</script>
