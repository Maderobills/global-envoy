<template>
  <main>
    <CustomerView/>
  </main>
</template>

<script>
import CustomerView from '@/components/widgets/singles/CustomerView.vue';

export default {
  name: 'CustomerService',
  components: {
    CustomerView,
  },
};
</script>
