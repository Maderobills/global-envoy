<template>
    <div
    :class="isHovered? 'shadow-xl' : 'shadow-2xl'"
        class="h-64 w-64  md:h-44 md:w-44 rounded-md transition  shadow-slate-300 flex flex-col justify-center items-center text-slate-900 hover:cursor-pointer space-y-1"
        
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <i :class="[icon, 'text-4xl md:text-3xl']"></i>
        <h3 :class="isHovered ? 'text-emerald-600' : 'text-slate-900'" class="transition font-semibold md:text-md">
            {{ title }}
        </h3>
        <span class="text-xs w-3/4 text-center">{{ desc }}</span>
    </div>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            isHovered: false,
        };
    },
};


</script>

<style scoped>
</style>