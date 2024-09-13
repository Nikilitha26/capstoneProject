<template>
  <div class="thank-you-page">
    <h1>Thank you for booking with us! 🎀💌</h1>
    <p>Your order has been successfully delivered.</p>
    <p>Order details:</p>
    <table v-if="product">
      <tr>
        <th>Product ID</th>
        <th>Product Image</th>
        <th>Product Name</th>
        <th>Product Price</th>
      </tr>
      <tr>
        <td>{{ product.prodID }}</td>
        <td><img :src="product.prodUrl" alt="Product Image" width="50" height="50"></td>
        <td>{{ product.prodName }}</td>
        <td>{{ product.amount }}</td>
      </tr>
      <tr>
        <th colspan="3">Total Purchase Price:</th>
        <td>{{ product.quantity * product.amount }}</td>
      </tr>
    </table>
    <p v-else>Loading...</p>
    <p>We appreciate your business and hope you will enjoy your session!</p>
    <button class="btn"><router-link to="/">Return to home page</router-link></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: null
    }
  },
  mounted() {
    const prodID = this.$route.params.prodID
    this.$store.dispatch('getProduct', prodID)
      .then((product) => {
        this.product = product
      })
      .catch((error) => {
        console.error('Error getting product:', error)
      })
  }
}
</script>

<style scoped>
.thank-you-page {
  text-align: center;
  margin-top: 50px;
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
}

table {
  width: auto;
  border-collapse: collapse;
  margin: 0 auto;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f0f0f0;
}

img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px;
}
.btn {
  background-color: rgb(148, 118, 103);
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 190px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
}

.btn:hover {
  background-color: rgba(148, 118, 103, 0.8); 
}
</style>