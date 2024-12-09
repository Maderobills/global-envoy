<template>
  <div 
    class="min-h-10 border-l-4 flex items-start sm:items-center rounded p-2 sm:p-0"
    :class="{
      'border-emerald-500': status === 'success',
      'border-yellow-500': status === 'pending',
      'border-orange-500': status === 'hold',
      'border-red-500': status === 'failed'
    }"
  >
    <div class="px-4 bg-white flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-slate-600 text-sm sm:text-base">
      <div class="flex items-center gap-2">
        <h4 class="line-clamp-2 sm:line-clamp-1">{{ note }}</h4>
        <i class="fi fi-tr-horizontal-rule hidden sm:flex items-center"></i>
      </div>
      
      <div class="flex items-center gap-2">
        <h4 class="line-clamp-1">{{ location }}</h4>
        <i class="fi fi-tr-horizontal-rule hidden sm:flex items-center"></i>
      </div>
      
      <h3 class="text-xs sm:text-base text-slate-500">{{ date }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatusTrack',
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