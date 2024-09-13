<template>
  <div class="product">
    <SpinnerComponent v-if="loading"/>
    <div class="row">
      <div class="col-md-6">
        <img :src="product?.prodUrl" alt="Product Image" class="img-fluid img-thumbnail">
      </div>
      <div class="col-md-6">
        <h1 class="hh">{{ product?.prodName }}</h1>
        <p class="name">Quantity: {{ product?.quantity }}</p>
        <p>Amount: {{ product?.amount }}</p>
        <p>Category: {{ product?.Category }}</p>
        <p class="pa">{{ product?.prodDescription }}</p>
        <button class="btn5" @click="$router.push({ name: 'products' })">Back to Products</button>
        <button class="btn6" @click="bookNow(product.prodID)">Book Now</button>
      </div>
    </div>
  </div>
</template>

<script>
import SpinnerComponent from '../components/SpinnerComponent.vue';

export default {
  components: {SpinnerComponent},
  data() {
    return {
      showLoader: true
    }
  },
  computed: {
    product() {
      console.log('Product computed property:', this.$store.state.product);
      return this.$store.state.product;
    },
  },
  methods: {
    bookNow(productId) {
      const existingProduct = this.$store.state.bookedProducts.find(product => product.prodID === productId);
      if (existingProduct) {
        // Increment the quantity of the existing product
        this.$store.commit('updateBookedProductQuantity', { prodID: productId, quantity: existingProduct.quantity + 1 });
      } else {
        // Add the new product to the checkout
        this.$store.dispatch('getProduct', productId).then(product => {
          console.log('Adding product to booked products:', product);
          this.$store.commit('setBookedProduct', product);
        });
      }

      // Check if the user is logged in
      if (this.$cookies.get('token')) {
        // Navigate to the checkout page with the productId as a parameter
        this.$router.push({ name: 'checkout', params: { prodID: productId } });
      } else {
        // Navigate to the login page
        this.$router.push({ name: 'login' });
      }
    },
  },
  created() {
    console.log('Created lifecycle hook:');
    console.log('Route params:', this.$route.params);
    const productId = this.$route.params.id;
    console.log('Product ID:', productId);
    this.$store.dispatch('getProduct', productId).then((product) => {
      console.log('Product data received:', product);
      this.$store.commit('setProduct', product);
    });
  },
};
</script>

<style scoped>
div.col-md-6{
  font-family: "Cormorant", serif;
  font-weight: bolder;
}
.hh{
  padding: 0;
}
.product img {
  max-width: 300px;
  height: auto;
  margin: 0 auto;
  margin-top: 20px;
}
.btn5{
  background-color: rgb(148, 118, 103);
  color: white;
  border-radius: 5px;
  border: none;
  justify-content: space-around;
  padding: 7px;
  position: relative;
  right: 10px;
  margin-bottom: 20px;
}
 .btn6{
  background-color: rgb(148, 118, 103);
  color: white;
  border-radius: 5px;
  border: none;
  justify-content: space-around;
  padding: 7px;
  margin-bottom: 20px;
  transition: transform 0.3s ease-in-out; 
}
.btn5:hover, .btn6:hover {
  transform: scale(1.05); 
}

.btn5:active, .btn6:active {
  transform: scale(1.1); 
  color: rgb(148, 118, 103);
  background-color: white;
}

@media only screen and (max-width: 300px) {
  .product img {
  max-width: 220px;
  height: auto;
  margin: 0 auto;
  padding: 0px;
  margin-top: 20px;
}
div.col-md-6{
  padding: 0 !important;
  width: auto;
  margin: 0 !important;
  font-family: "Cormorant", serif;
  font-weight: bolder;
  width: 100%;
}
.row{
  margin: 0 !important;
}
p.pa{
  margin: 0 !important;
}
}
</style>