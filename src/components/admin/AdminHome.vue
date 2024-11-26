<template>
  <section class="flex h-screen">
    <aside class="flex flex-col space-y-4 w-56 h-full p-6 bg-gradient-to-t from-slate-800 to-slate-900 text-white">
      <a href="#/users">Users</a> 
      <a href="#/orders">Orders</a>

    </aside>
    <main class="w-full p-6">
      <component :is="currentView" />
    </main>
  </section>
</template>


<script setup>
import { ref, computed } from 'vue'
import Users from './admin-pages/Users.vue';
import Orders from './admin-pages/Orders.vue';

const routes = {
  '/users': Users,
  '/orders': Orders,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/users'] || NotFound
})
</script>
