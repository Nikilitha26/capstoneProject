<template>
  <div class="checkout">
    <h1 class="h1">Checkout</h1><br>
    <button type="button" class="btn9" @click="clearCheckout" v-if="products && products.length > 0">Clear Checkout</button><br><br>
    <div v-if="products && products.length > 0">
      <form>
        <table class="table table-striped table-bordered border-dark responsive-table">
          <thead>
            <tr>
              <th scope="col">Product Image</th>
              <th scope="col">Doctor's Name</th>
              <th scope="col">Category</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Total Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="product.prodID">
              <td><img :src="product.prodUrl" alt="Product Image" width="100" height="100"></td>
              <td>{{ product.prodName }}</td>
              <td>{{ product.Category }}</td>
              <td>
                <input type="number" v-model="product.quantity" min="1" :max="product.amount" class="form-control">
              </td>
              <td>R{{ product.amount }}</td>
              <td>R{{ (product.amount * product.quantity).toFixed(2) }}</td>
              <td>
                <button type="button" class="btn10" @click="deleteProduct(index)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div class="mb-3">
  <label for="checkin-date" class="form-label">Check In Date:</label>
  <input type="date" id="checkout-date" v-model="checkInDate" :min="today" class="form-control" required @blur="dateTouched = true">
  <small v-if="dateTouched && !checkInDate" class="text-danger">Please enter a date</small>
</div>
        <button type="button" class="btn7" @click="backToProducts">Back to Products</button>
        <button type="button" class="btn8" @click="continueBooking">Continue Booking</button>
      </form>
    </div>
    <div v-else-if="loading">Loading product...</div>
    <div v-else-if="!products || products.length === 0">
      <p class="check">Checkout is empty.</p>
    </div>
    <div v-else>Error loading product. Please try again.</div>
  </div>
</template>

<script>
import {useCookies} from 'vue3-cookies'
const {cookies} = useCookies()
export default {
  data() {
    return {
      checkInDate: '',
      today: new Date().toISOString().split('T')[0],
      loading: false,
      dateTouched: false,
    };
  },
  computed: {
    products() {
      console.log('Booked Products:', this.$store.state.bookedProducts);
      return this.$store.state.bookedProducts;
    },
    userId() {
      return this.$store.state.userId || cookies.get('userId');
    },
  },
  methods: {
    continueBooking() {
    if (!this.checkInDate) {
      this.dateTouched = true;
      return;
    }
      // Continuing with the booking process
      console.log('Continue Booking clicked')
      console.log('UserId:', this.userId)
      console.log('Product ID:', this.products[0].prodID)
      console.log('CheckIn Date:', this.checkInDate)
      cookies.set('checkInDate', this.checkInDate)
      this.$store.dispatch('insertOrderDb', {
        productId: this.products[0].prodID,
        checkInDate: this.checkInDate,
        userId: this.userId,
      })
      .then((response) => {
        console.log('Order inserted successfully:', response)
        console.log('Navigating to payment route...')
        this.$router.push({ name: 'payment', params: { prodID: this.products[0].prodID } })
      })
      .catch((error) => {
        console.error('Error inserting order:', error)
      })
      this.$router.afterEach((to, from) => {
        console.log(to.fullPath)
      })
    },
    deleteProduct(index) {
      console.log('Delete Product clicked');
      this.$store.commit('deleteBookedProduct', index);
    },
    backToProducts() {
      console.log('Back to Products clicked');
      this.$router.push({ name: 'products' });
    },
    clearCheckout() {
      console.log('Clear Checkout clicked');
      this.$store.commit('clearBookedProducts');
    }
  },
  mounted() {
  this.loading = true
  const prodID = this.$route.params.prodID
  if (!prodID) {
    console.error('Error: Product ID is undefined')
    return
  }
  this.$store.dispatch('getProduct', prodID).finally(() => {
    this.loading = false
  })
},
};
</script>
<style scoped>
.checkout {
  max-width: 800px;
  margin: 0 auto;
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
}
.responsive-table {
  width: 100%;
  border-collapse: collapse;
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
  border: 2px solid rgb(148, 118, 103) !important;
}
.btn7, .btn8, .btn9, .btn10{
  background-color: rgb(148, 118, 103);
  color: white;
  padding: 7px;
  border: none;
  border-radius: 5px;
  margin-bottom: 20px;
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 20px;
  font-style: normal;
}
.btn7{
  margin-right: 10px;
}
.btn9{
  position: relative;
  top: 30px;
  right: 330px
} 
.btn7:hover{
  background-color: white;
  color: rgb(148, 118, 103);
}
.btn8:hover{
  background-color: white;
  color: rgb(148, 118, 103);
}
.btn9:hover{
  background-color: white;
  color: rgb(148, 118, 103);
}
.btn10:hover{
  background-color: white;
  color: rgb(148, 118, 103);
}
.check{
  font-size: 22px;
}


/* For small screens (e.g., mobile devices) */
@media only screen and (max-width: 600px) {
  .checkout {
    text-align: center !important; 
    justify-content: center !important;
  }
  .h1{
    margin-top: 20px;
  }
  .responsive-table {
    font-size: 0.8em;
    border: none !important;
    background-color: none;
    margin: 0, auto;
  }
  .responsive-table th, .responsive-table td {
    padding: 5px;
    border: none !important;
  }
  .responsive-table th {
    text-align: left;
    visibility: hidden;
    border: none;
    border-top: none;
  }

  .responsive-table {
    display: flex;
    flex-wrap: wrap;
    margin: 0, auto;
  }
  .responsive-table tr {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
    border-bottom: none;
  }
  .responsive-table th, .responsive-table td {
    width: 100%;
    padding: 10px;
    border: none;
  }
  .responsive-table th {
    font-weight: bold;
    border: none;
  }
  .responsive-table td {
    padding-top: 0;
    border: none;
    border-top:none ;
  }
  .responsive-table thead tr {
    border-top: none; 
  }
  .responsive-table thead td {
    border-top: none; 
  }
  .responsive-table th:nth-child(5), .responsive-table td:nth-child(5) {
    display: none;
  }
  .btn9{
    position: relative;
    left: 10px;
  }
}

/* For medium screens (e.g., tablets) */
@media only screen and (min-width: 601px) and (max-width: 900px) {
  .responsive-table {
    font-size: 0.9em;
  }
  .responsive-table th, .responsive-table td {
    padding: 10px;
  }
    .btn9{
    position: relative;
    left: 10px;
  }
}

/* For large screens (e.g., desktops) */
@media only screen and (min-width: 901px) {
  .responsive-table {
    font-size: 1em;
  }
  .responsive-table th, .responsive-table td {
    padding: 15px;
  }
}
</style>
