<template>
  <div 
    class="h-10 border-l-4 flex items-center rounded space-x-2"
    :class="{
      'border-emerald-500': status === 'success',
      'border-yellow-500': status === 'pending',
      'border-orange-500': status === 'hold',
      'border-red-500': status === 'failed'
    }"
  >
    <i class="fi fi-ts-bullet flex items-center text-lg pl-4"></i>
    <div class="bg-white flex items-center space-x-2 text-slate-600">
      <h4>{{ note }}</h4>
      <i class="fi fi-tr-horizontal-rule flex items-center"></i>
      <h4>{{ location }}</h4>
      <i class="fi fi-tr-horizontal-rule flex items-center"></i>
      <h3>{{ date }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "pending"
    }
  }
}
</script>