<template>
    <div class="pl-10">
      <h3 class="p-1 px-3 my-2 w-60 border-x-4 border-slate-600 rounded-lg">
        {{ name }}
      </h3>
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
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here if needed */
  </style>
  