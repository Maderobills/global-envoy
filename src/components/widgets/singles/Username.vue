<template>
  <div
    class="mx-6 p-1 px-3 my-2 w-60 border-x-4 border-slate-600 rounded-lg cursor-pointer"
    @click="clickHandler"
  >
    <h3>
      {{ name }}
    </h3>
    <span class="text-xs text-slate-600">{{ useId }}</span>
  </div>
</template>

<script>
export default {
  name: "UserName",
  props: {
    name: {
      type: String,
      required: true,
    },
    useId: {
      type: String,
      required: true,
    },
    clickHandler: {
      type: Function,
      default: null, // Optional: Set a default if no handler is provided
    },
  },
};
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
