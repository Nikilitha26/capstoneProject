<template>
    <div>
      <h1>{{ product.prodName }}</h1>
      <p>Quantity: {{ product.quantity }}</p>
      <p>Amount: {{ product.amount }}</p>
      <p>Category: {{ product.Category }}</p>
      <!-- display other product details -->
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['getProductById']),
      product() {
        return this.getProductById(this.$route.params.prodID);
      },
    },
  };
  </script>