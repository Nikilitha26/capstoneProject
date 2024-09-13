<template>
  <div class="products">
    <SpinnerComponent v-if="loading"/>
    <div class="row">
  <div class="col-md-12">
<div class="d-flex justify-content-between">
  <input type="text" v-model="searchQuery" placeholder="Search products..." class="form-control me-1" style="width: 280px; margin-top: 30px; position:relative; left: 20px; margin-bottom: 20px; margin-top: 50px;">
  <button class="btn2" @click="searchProducts">Search</button>
  <select v-model="sortOption" class="form-select form-select-sm">
    <option value="name">Sort by Name</option>
    <option value="category">Sort by Category</option>
    <option value="price">Sort by Price</option>
  </select>
</div>
  </div>
</div>
    <div  v-if="$store.state.products">
      <div class="row" v-if="sortedProducts.length > 0">
        <div class="col-md-3" v-for="product in sortedProducts" :key="product.prodID">
          <div class="card" style="width: auto;">
            <img :src="product.prodUrl" class="card-img-top img-fluid" style="max-width: auto; margin: 0 auto; justify-content: space-around;" alt="Product Image">
            <div class="card-body p-2">
              <h3 class="card-title">{{ product.prodName }}</h3>
              <h5 class="card-text">Category: {{ product.Category }}</h5>
              <p class="card-text">Amount: {{ product.amount }}</p>
            </div>
            <div class="card-footer">
              <button class="btn3" @click="viewMore(product.prodID)">View More</button>
              <button class="btn4" @click="bookNow(product.prodID)">Book Now</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No results found for "{{ searchQuery }}".</p>
      </div>
    </div>
    <div v-else>Loading products...</div>
  </div>
</template>
<script>
import SpinnerComponent from '../components/SpinnerComponent.vue';

export default {
  data() {
    return {
      searchQuery: '',
      sortOption: 'name',// default sort option
      loading: true,
    }
  },
  components: {SpinnerComponent},
  watch: {
    searchQuery(newVal, oldVal) {
      if (newVal) {
        this.filteredProducts = this.$store.state.products.filter(product => {
          return product.prodName.toLowerCase().includes(newVal.toLowerCase())
        });
      }
    }
  },
  computed: {
    filteredProducts() {
      return this.$store.state.products.filter(product => {
        return product.prodName.toLowerCase().includes(this.searchQuery.toLowerCase())
      })
    },
    sortedProducts() {
      switch (this.sortOption) {
        case 'name':
          return this.filteredProducts.sort((a, b) => a.prodName.localeCompare(b.prodName));
        case 'category':
          return this.filteredProducts.sort((a, b) => a.Category.localeCompare(b.Category));
        case 'price':
          return this.filteredProducts.sort((a, b) => a.amount - b.amount);
        default:
          return this.filteredProducts;
      }
    }
  },
  methods: {
    getProducts() {
      this.$store.dispatch('getProducts');
    },
    viewMore(productId) {
      this.$store.dispatch('getProduct', productId);
      this.$router.push({ name: 'product', params: { id: productId } });
    },
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
    searchProducts() {
      this.getProducts();
    }
  },
  mounted() {
    this.getProducts();
    this.loading = false
  }
}
</script>

<style scoped>
.card {
  max-width: 300px;
  margin: 20px auto;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid rgb(148, 118, 103);
  height: 520px;
  transition: all 0.3s ease-in-out; 
  /* background-color: rgb(148, 118, 103); */
  margin-top: 70px;
}
.card:hover {
  transform: scale(1.05); 
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
.col-md-3 {
  text-align: center;
  padding: 0;
}
.card-footer {
  border-top: none; 
  background-color: transparent;
}
.btn3 {
  color: white;
  background-color: rgb(148, 118, 103);
  padding: 7px;
  border: none;
  border-radius: 5px;
  justify-content: space-around;
  margin-right: 10px;
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 20px;
  font-style: normal;
}
.btn4{
  color: white;
  background-color: rgb(148, 118, 103);
  padding: 7px;
  border: none;
  border-radius: 5px;
  justify-content: space-around;
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 20px;
  font-style: normal;
}
.btn3, .btn4 {
  color: white;
  background-color: rgb(148, 118, 103);
  padding: 7px;
  border: none;
  border-radius: 5px;
  justify-content: space-around;
  margin-right: 10px;
  transition: transform 0.3s ease-in-out; 
}

.btn3:hover, .btn4:hover {
  transform: scale(1.05); 
}

.btn3:active, .btn4:active {
  transform: scale(1.1); 
  color: rgb(148, 118, 103);
  background-color: white;
}
.card-title{
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 20px;
  font-style: normal;
}
.card-text{
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}
.form-select {
  width: 400px;
  height: 40px;
  margin-top: 50px;
  border: 2px solid rgb(148, 118, 103);
  position: relative;
  right: 20px;
  padding: 0;
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
}
.form-select option{
    padding-left: 20px;
    font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
  }
  .form-control{
    font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: italic;
  }
.btn2{
  height: 41px;
  margin-top: 51px;
  margin-bottom: 20px;
  position: relative;
  right: 378px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: rgb(148, 118, 103);
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 20px;
  font-style: normal;
}
.row {
  margin: 0; 
}

.col-md-12 {
  padding: 0; 
}

.d-flex {
  margin: 0; 
}
@media only screen and (max-width: 600px) {
    .d-flex {
      flex-direction: column;
      align-items: center;
    }

    .card{
      position: relative;
      bottom: 100px !important;
    }
    .form-control {
      width: 180px !important;
      margin-bottom: 10px;
      margin-right: 110px !important;
    }

    .btn2 {
      width: 70px;
      margin-bottom: 0px;
      margin-left: 925px;
      position: relative;
      bottom: 107px;
      height: 35px;
    }

    .form-select {
      width: 250px;
      margin-top: 10px;
      position: relative;
      bottom: 100px;
      left: 0px;
    }
  }
  @media only screen and (min-width: 601px) and (max-width: 767px) {
    .col-md-3 {
      flex: 0 0 50%;
      max-width: 50%;
    }
    .card {
      margin: 20px 10px;
    }
    .form-control {
    width: 200px !important;
    margin-right: 10px;
    position: relative;
    bottom: 20px;
  }
  .form-select {
    width: 180px;
    margin-top: 30px;
    margin-right: 10px;
  }
  .btn2 {
    width: 70px;
    right: 100px;
    position: relative;
    top: -20px;
    height: 35px;
  }
  .d-flex {
    flex-wrap: wrap;
  }
  .d-flex > * {
    margin-right: 10px;
  }
  }

  @media only screen and (min-width: 700px) and (max-width: 767px) {
    .btn2 {
    width: 70px;
    right: 140px;
    position: relative;
    top: -20px;
    height: 37px;
  }
  .row {
    display: flex;
    justify-content: center;
  }
  }

  @media only screen and (min-width: 768px) and (max-width: 872px) {
    .col-md-3 {
      margin: 30px;
    }
    .card {
      margin: 30px 10px;
    }
    .btn3{
      position: relative;
      bottom: 10px !important;
    }
    /* .btn4{
      position: relative;
     top: 10px;
    } */
    .form-control {
    width: 230px !important;
    margin-right: 10px;
    position: relative;
    bottom: 20px;
  }
  .form-select {
    width: 210px;
    margin-top: 30px;
    margin-right: 10px;
  }
  .btn2 {
    width: 70px;
    right: 160px;
    position: relative;
    top: -20px;
    height: 40px;
  }
  
  }

  @media only screen and (min-width: 873px) and (max-width: 1005px) {
    .col-md-3 {
      margin: 30px;
    }
    .card {
      margin: 30px 10px;
    }
    .btn3{
      position: relative;
      bottom: 10px !important;
    }
    /* .btn4{
      position: relative;
     top: 10px;
    } */
    .form-control {
    width: 230px !important;
    margin-right: 10px;
    position: relative;
    bottom: 20px;
  }
  .form-select {
    width: 210px;
    margin-top: 30px;
    margin-right: 10px;
  }
  .btn2 {
    width: 70px;
    right: 228px;
    position: relative;
    top: -20px;
    height: 40px;
  }
  .col-md-3:nth-child(7) {
    margin-left: 80px !important;
  }
  .col-md-3:nth-child(8) {
    margin-left: 30px;
  }
}
@media only screen and (min-width: 1006px) and (max-width: 1142px) {
  .col-md-3 {
      margin: 30px;
    }
    .card {
      margin: 30px 10px;
    }
    .btn3{
      position: relative;
      bottom: 10px !important;
    }
    /* .btn4{
      position: relative;
     top: 10px;
    } */
    .form-control {
    width: 230px !important;
    margin-right: 10px;
    position: relative;
    bottom: 20px;
  }
  .form-select {
    width: 210px;
    margin-top: 30px;
    margin-right: 10px;
  }
  .btn2 {
    width: 70px;
    right: 296px;
    position: relative;
    top: -20px;
    height: 40px;
  }
}
@media only screen and (min-width: 1143px) and (max-width: 1200px) {
  .col-md-3 {
      margin: 30px;
    }
    .card {
      margin: 30px 10px;
    }
    .btn3{
      position: relative;
      bottom: 10px !important;
    }
    /* .btn4{
      position: relative;
     top: 10px;
    } */
    .form-control {
    width: 230px !important;
    margin-right: 10px;
    position: relative;
    bottom: 20px;
  }
  .form-select {
    width: 210px;
    margin-top: 30px;
    margin-right: 10px;
  }
  .btn2 {
    width: 70px;
    right: 350px;
    position: relative;
    top: -20px;
    height: 40px;
  }
}

  @media only screen and (min-width: 1030px) and (max-width: 1200px) {
    .btn4{
      position: relative;
      bottom: 10px;
    }
  }

  @media only screen and (min-width: 1201px) and (max-width: 1300px) {
    .col-md-3 {
      margin: 30px;
    }
    .card {
      margin: 30px 10px;
    }
    .btn3{
      position: relative;
      bottom: 10px !important;
    }
    /* .btn4{
      position: relative;
     top: 10px;
    } */
    .form-control {
    width: 230px !important;
    margin-right: 10px;
    position: relative;
    bottom: 20px;
  }
  .form-select {
    width: 240px;
    margin-top: 30px;
    margin-right: 10px;
  }
  .btn2 {
    width: 70px;
    right: 350px;
    position: relative;
    top: -20px;
    height: 40px;
  }
  .btn4{
      position: relative;
      bottom: 10px;
    }
  }
</style>