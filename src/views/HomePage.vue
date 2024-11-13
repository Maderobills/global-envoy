<template>
    <TrackingInput />
    <QuickMenus/>
</template>

<script>
import TrackingInput from '@/components/widgets/TrackingInput.vue';
import QuickMenus from '@/components/widgets/QuickMenus.vue';
export default {
  name: 'HomePage',
  components: {
    TrackingInput,
    QuickMenus,
  },
};
</script>
