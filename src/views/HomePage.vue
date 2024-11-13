<template>
    <TrackingInput />
    <QuickService/>
</template>

<script>
import TrackingInput from '@/components/widgets/TrackingInput.vue';
import QuickService from '@/components/widgets/QuickService.vue';

export default {
  name: 'HomePage',
  components: {
    TrackingInput,
    QuickService,
  },
};
</script>
