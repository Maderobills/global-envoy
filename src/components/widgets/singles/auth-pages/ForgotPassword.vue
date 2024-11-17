<!-- ForgotPassword.vue -->
<template>
    <main class="h-screen flex flex-col justify-center items-center">
       
      <!-- Step 1: Email Submission -->
      <div v-if="currentStep === 'email'" class="space-y-6">
        <div class="mb-8">
          <h1 class="text-4xl font-sans mb-4">Forgot Password</h1>
          <p class="text-gray-600">Enter your email address to receive a verification code</p>
        </div>
  
        <form @submit.prevent="handleEmailSubmit" class="space-y-6">
          <div class="flex flex-col">
            <label class="mb-2 text-gray-700">Email Address</label>
            <input 
              v-model="email"
              type="email"
              required
              class="border border-gray-200 rounded p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
  
          <button 
            type="submit"
            :disabled="isLoading"
            class="w-full bg-emerald-500 text-white py-3 rounded hover:bg-emerald-600 transition-colors font-medium disabled:bg-emerald-300"
          >
            <span v-if="isLoading">Sending...</span>
            <span v-else>Send Verification Code</span>
          </button>
  
          <div class="text-center">
            <a 
              href="#" 
              @click="goToLogin" 
              class="text-emerald-500 hover:text-emerald-600"
            >
              Back to Login
            </a>
          </div>
        </form>
      </div>
  
      <!-- Step 2: OTP Verification -->
      <div v-if="currentStep === 'otp'" class="space-y-6">
        <div class="mb-8">
          <h1 class="text-4xl font-sans mb-4">Enter Verification Code</h1>
          <p class="text-gray-600">
            We've sent a verification code to <span class="font-medium">{{ email }}</span>
          </p>
        </div>
  
        <form @submit.prevent="handleOtpSubmit" class="space-y-6">
          <div class="flex flex-col">
            <label class="mb-2 text-gray-700">Verification Code</label>
            <div class="flex gap-2 justify-center">
              <input
                v-for="(digit, index) in 6"
                :key="index"
                v-model="otpDigits[index]"
                type="text"
                maxlength="1"
                @input="handleOtpInput($event, index)"
                @keydown="handleKeydown($event, index)"
                class="w-12 h-12 text-center border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-xl"
                :ref="el => otpRefs[index] = el"
              />
            </div>
          </div>
  
          <div class="text-center">
            <p class="text-gray-600 mb-2">Didn't receive the code?</p>
            <button 
              type="button"
              @click="resendCode"
              :disabled="resendTimer > 0"
              class="text-emerald-500 hover:text-emerald-600 disabled:text-gray-400"
            >
              {{ resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend code' }}
            </button>
          </div>
  
          <button 
            type="submit"
            :disabled="!isOtpComplete || isLoading"
            class="w-full bg-emerald-500 text-white py-3 rounded hover:bg-emerald-600 transition-colors font-medium disabled:bg-emerald-300"
          >
            <span v-if="isLoading">Verifying...</span>
            <span v-else>Verify Code</span>
          </button>
        </form>
      </div>
  
      <!-- Step 3: New Password -->
      <div v-if="currentStep === 'newPassword'" class="space-y-6">
        <div class="mb-8">
          <h1 class="text-4xl font-sans mb-4">Reset Password</h1>
          <p class="text-gray-600">Create a new password for your account</p>
        </div>
  
        <form @submit.prevent="handlePasswordReset" class="space-y-6">
          <div class="flex flex-col">
            <label class="mb-2 text-gray-700">New Password</label>
            <div class="relative">
              <input 
                v-model="newPassword"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full border border-gray-200 rounded p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter new password"
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
  
          <div class="flex flex-col">
            <label class="mb-2 text-gray-700">Confirm New Password</label>
            <input 
              v-model="confirmPassword"
              type="password"
              required
              class="border border-gray-200 rounded p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Confirm new password"
            />
          </div>
  
          <button 
            type="submit"
            :disabled="isLoading || !isPasswordValid"
            class="w-full bg-emerald-500 text-white py-3 rounded hover:bg-emerald-600 transition-colors font-medium disabled:bg-emerald-300"
          >
            <span v-if="isLoading">Updating...</span>
            <span v-else>Reset Password</span>
          </button>
        </form>
      </div>
  
      <!-- Error Message -->
      <div 
        v-if="error" 
        class="mt-4 p-3 bg-red-100 text-red-700 rounded text-center"
      >
        {{ error }}
      </div>
  
      <!-- Success Message -->
      <div 
        v-if="successMessage" 
        class="mt-4 p-3 bg-green-100 text-green-700 rounded text-center"
      >
        {{ successMessage }}
      </div>
    </main>
  </template>
  
  <script setup>
  import router from '@/router';
import { ref, computed, onMounted, onUnmounted } from 'vue'
  
  // State
  const currentStep = ref('email')
  const email = ref('')
  const otpDigits = ref(Array(6).fill(''))
  const otpRefs = ref([])
  const newPassword = ref('')
  const confirmPassword = ref('')
  const showPassword = ref(false)
  const isLoading = ref(false)
  const error = ref('')
  const successMessage = ref('')
  const resendTimer = ref(0)
  let resendInterval = null
  
  // Computed properties
  const isOtpComplete = computed(() => {
    return otpDigits.value.every(digit => digit !== '')
  })
  
  const isPasswordValid = computed(() => {
    return (
      newPassword.value.length >= 8 &&
      newPassword.value === confirmPassword.value
    )
  })
  
  // Methods
  const handleEmailSubmit = async () => {
    try {
      error.value = ''
      isLoading.value = true
  
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Start resend timer
      startResendTimer()
      
      // Move to OTP step
      currentStep.value = 'otp'
      successMessage.value = 'Verification code sent successfully'
      
    } catch (err) {
      error.value = 'Failed to send verification code. Please try again.'
    } finally {
      isLoading.value = false
    }
  }
  
  const handleOtpInput = (event, index) => {
    const value = event.target.value
    // Ensure only numbers
    if (!/^\d*$/.test(value)) {
      otpDigits.value[index] = ''
      return
    }
    
    // Move to next input
    if (value && index < 5) {
      otpRefs.value[index + 1]?.focus()
    }
  }
  
  const handleKeydown = (event, index) => {
    // Handle backspace
    if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
      otpRefs.value[index - 1]?.focus()
    }
  }
  
  const handleOtpSubmit = async () => {
    try {
      error.value = ''
      isLoading.value = true
  
      const otp = otpDigits.value.join('')
      
      // Simulate API call to verify OTP
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Move to new password step
      currentStep.value = 'newPassword'
      successMessage.value = 'Code verified successfully'
      
    } catch (err) {
      error.value = 'Invalid verification code. Please try again.'
    } finally {
      isLoading.value = false
    }
  }
  
  const handlePasswordReset = async () => {
    try {
      error.value = ''
      isLoading.value = true
  
      // Simulate API call to reset password
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      successMessage.value = 'Password reset successfully! Redirecting to login...'
      
      // Redirect to login after delay
      setTimeout(() => {
        goToLogin()
      }, 2000)
      
    } catch (err) {
      error.value = 'Failed to reset password. Please try again.'
    } finally {
      isLoading.value = false
    }
  }
  
  const resendCode = async () => {
    try {
      error.value = ''
      isLoading.value = true
  
      // Simulate API call to resend OTP
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      startResendTimer()
      successMessage.value = 'New verification code sent'
      
    } catch (err) {
      error.value = 'Failed to resend code. Please try again.'
    } finally {
      isLoading.value = false
    }
  }
  
  const startResendTimer = () => {
    resendTimer.value = 30
    clearInterval(resendInterval)
    resendInterval = setInterval(() => {
      if (resendTimer.value > 0) {
        resendTimer.value--
      } else {
        clearInterval(resendInterval)
      }
    }, 1000)
  }
  
  const togglePassword = () => {
    showPassword.value = !showPassword.value
  }
  
  const goToLogin = () => {
    router.push("/sign-in")
    console.log('Navigate to login')
  }
  
  // Cleanup
  onUnmounted(() => {
    clearInterval(resendInterval)
  })
  </script>