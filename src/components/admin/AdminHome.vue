<template>
  <section class="flex h-screen">
    <aside class="flex flex-col space-y-4 w-56 h-full p-6 bg-gradient-to-t from-slate-800 to-slate-900 text-white">
      <a href="#/users">Users</a> 
      <a href="#/orders-add">Add Orders Status</a>
      <a href="#/orders-update">Update Orders Status</a>

    </aside>
    <main class="w-full p-6">
      <component :is="currentView" />
    </main>
  </section>
</template>


<script setup>
import { ref, computed } from 'vue'
import Users from './admin-pages/Users.vue';
import OrdersSet from './admin-pages/OrdersSet.vue';
import OrdersUpdate from './admin-pages/OrdersUpdate.vue';
const routes = {
  '/users': Users,
  '/orders-add': OrdersSet,
  '/orders-update': OrdersUpdate,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/users'] || NotFound
})
</script>
