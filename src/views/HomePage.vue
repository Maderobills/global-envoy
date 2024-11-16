<template>
  <main>
      <TrackingInput />
    <QuickService />
    <RolesComp />
    <FooterView/>
  </main>
</template>

<script>
import TrackingInput from '@/components/widgets/TrackingInput.vue';
import QuickService from '@/components/widgets/QuickService.vue';
import RolesComp from '@/components/widgets/RolesComp.vue';
import FooterView from '@/components/widgets/singles/FooterView.vue';

export default {
  name: 'HomePage',
  components: {
    TrackingInput,
    QuickService,
    RolesComp,
    FooterView,
  },
};
</script>
