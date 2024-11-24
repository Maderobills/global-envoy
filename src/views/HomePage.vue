<template>
  <main>
      <TrackingInput />
    <QuickService />
    <RolesComp />
  </main>
</template>

<script>
import TrackingInput from '@/components/widgets/TrackingInput.vue';
import QuickService from '@/components/widgets/QuickService.vue';
import RolesComp from '@/components/widgets/RolesComp.vue';

export default {
  name: 'HomePage',
  components: {
    TrackingInput,
    QuickService,
    RolesComp,
  },
};
</script>
