<template>
    <div class="h-4/5 bg-slate-100 flex flex-col rounded-lg">
      <div class="flex justify-between items-center mx-6 my-4">
        <h1 class="text-3xl font-bold text-slate-900">Users</h1>
        <button
          @click="refreshUsers"
          :disabled="loading"
          class="inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-400 transition-colors duration-200"
        >
          <span v-if="loading" class="inline-block mr-2">
            <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          </span>
          {{ loading ? "Refreshing..." : "Refresh" }}
        </button>
      </div>
  
      <!-- Loading Skeleton -->
      <div v-if="loading" class="space-y-4 mx-6">
        <div v-for="n in 3" :key="n" class="animate-pulse">
          <div class="pl-10">
            <div class="h-8 bg-slate-300 rounded-lg w-60 border-x-4 border-slate-600"></div>
          </div>
        </div>
      </div>
  
      <!-- Error State -->
      <div 
        v-else-if="error" 
        class="mx-6 my-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700"
      >
        <p class="font-medium">Error loading users</p>
        <p class="text-sm">{{ error }}</p>
      </div>
  
      <!-- User List -->
      <div v-else class="space-y-2">
        <TransitionGroup
          name="list"
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform -translate-x-4 opacity-0"
          enter-to-class="transform translate-x-0 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform translate-x-0 opacity-100"
          leave-to-class="transform -translate-x-4 opacity-0"
        >
          <Username
            v-for="user in users"
            :key="user.id"
            :name="`${user.firstName} ${user.lastName}`"
          />
        </TransitionGroup>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import Username from '@/components/widgets/singles/Username.vue';
  import { useDataUsersStore } from '@/stores/usernameStore';
  import { storeToRefs } from 'pinia';
  
  // Access the Pinia store with storeToRefs for reactive state
  const dataUsersStore = useDataUsersStore();
  const { users, loading, error } = storeToRefs(dataUsersStore);
  const { fetchUsers } = dataUsersStore;
  
  // Debounce the refresh function
  let refreshTimeout: NodeJS.Timeout;
  const refreshUsers = () => {
    clearTimeout(refreshTimeout);
    refreshTimeout = setTimeout(() => {
      console.log('Refreshing user list...');
      fetchUsers();
    }, 300);
  };
  
  // Fetch users on component mount with error handling
  onMounted(async () => {
    console.log('UserList component mounted');
    try {
      await fetchUsers();
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  });
  
  // Clean up timeout on component unmount
  onUnmounted(() => {
    clearTimeout(refreshTimeout);
  });
  </script>