<template>
  <main>
    <CustomerView/>
    <FooterView/>
  </main>
</template>

<script>
import CustomerView from '@/components/widgets/singles/CustomerView.vue';
import FooterView from '@/components/widgets/singles/FooterView.vue';

export default {
  name: 'CustomerService',
  components: {
    CustomerView,
    FooterView,
  },
};
</script>
