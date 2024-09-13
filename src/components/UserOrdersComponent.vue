<template>
  <div>
    <h2 class="orders">Orders</h2>
    <table class="table table-striped responsive-table" v-if="orders.length > 0">
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Product Image</th>
          <th>Quantity</th>
          <th>Amount</th>
          <th>Total Price</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="orderProduct in orderProducts" :key="orderProduct.orderID">
  <td>{{ orderProduct.prodID }}</td>
  <td>{{ orderProduct.prodName }}</td>
  <td><img :src="orderProduct.prodUrl" alt="Product Image" width="50" height="50"></td>
  <td>{{ orderProduct.quantity }}</td>
  <td>{{ orderProduct.amount }}</td>
  <td>{{ orderProduct.quantity * orderProduct.amount }}</td>
  <td>{{ orderProduct.date }}</td>
  <td>
    <button @click="confirmDeleteOrder(orderProduct.orderID)" class="btn13">Delete</button>
    <button @click="openUpdateModal(orderProduct)" class="btn13">Update</button>
  </td>
</tr>
      </tbody>
    </table>
    <p v-else>No orders have been made yet.</p>

    <!-- Update Order Modal -->
<div class="modal fade" id="updateOrderModal" tabindex="-1" aria-labelledby="updateOrderModalLabel" aria-hidden="true" ref="updateOrderModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="updateOrderModalLabel">Update Order</h5>
        <button type="button" class="btn-close" @click="closeUpdateModal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="prodID" class="form-label">Product ID:</label>
            <input type="text" class="form-control" id="prodID" v-model="selectedOrder.prodID" required>
            <small v-if="!selectedOrder.prodID && proceedToUpdateTriggered" class="text-danger">Please enter the product ID</small>
          </div>
          <div class="mb-3">
            <label for="date" class="form-label">Date:</label>
            <input type="date" class="form-control" id="date" v-model="selectedOrder.date" required>
            <small v-if="!selectedOrder.date && proceedToUpdateTriggered" class="text-danger">Please enter the date</small>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn13" @click="closeUpdateModal">Close</button>
        <button type="button" class="btn13" @click="updateOrder">Save Changes</button>
      </div>
    </div>
  </div>
</div>

    <!-- Delete Order Modal -->
    <div class="modal fade" id="deleteOrderModal" tabindex="-1" aria-labelledby="deleteOrderModalLabel" aria-hidden="true" ref="deleteOrderModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteOrderModalLabel">Delete Order</h5>
            <button type="button" class="btn-close" @click="closeDeleteModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete order #{{ orderToDelete.orderID }} for product {{ orderToDelete.prodID }} on {{ orderToDelete.date }}?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn13" @click="closeDeleteModal">Cancel</button>
            <button type="button" class="btn13" @click="deleteOrder(orderToDelete.orderID)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Modal } from 'bootstrap'

export default {
  data() {
    return {
      showUpdateModal: false,
      selectedOrder: {},
      updateOrderModal: null,
      orderToDelete: {},
      deleteOrderModal: null,
      proceedToUpdateTriggered: false,
    }
  },
  computed: {
    ...mapState(['orders', 'products']),
  orderProducts() {
    if (!this.products) return []; // or some default value
    return this.orders.map((order) => {
      const product = this.getProduct(order.prodID);
      return { ...order, ...product };
    });
  }
},
created() {
  this.$store.dispatch('getAllOrders');
},

  methods: {
    ...mapActions(['getAllOrders', 'deleteOrder', 'updateOrder', 'getOrders', 'getProducts']),
  getProduct(prodID) {
    if (!this.products) return null; // or some default value
    const product = this.products.find((product) => product.prodID === prodID);
    return product;
  },
  openUpdateModal(order) {
    this.selectedOrder = order;
    this.updateOrderModal.show();
  }, 
    closeUpdateModal() {
      this.updateOrderModal.hide();
    },
    updateOrder() {
      this.proceedToUpdateTriggered = true;
      if (!this.selectedOrder.prodID || !this.selectedOrder.date) {
        alert("Please fill in all fields.");
        return;
      }
    this.proceedToUpdateTriggered = true;
    if (this.selectedOrder.prodID && this.selectedOrder.date) {
      const updatedOrder = {
        date: this.selectedOrder.date,
        prodID: this.selectedOrder.prodID
      };
      this.$store.dispatch('updateOrder', {
        orderId: this.selectedOrder.orderID,
        updatedOrder
      })
      .then(() => {
        // Display a success message to the user
      })
      .catch(error => {
        if (error.response.status === 404) {
          console.error('Order not found');
          // Display an error message to the user
        } else {
          console.error('Error updating order:', error);
        }
      });
      this.closeUpdateModal();
    }
  },

    confirmDeleteOrder(orderID) {
      const order = this.orders.find(order => order.orderID === orderID);
      this.orderToDelete = order;
      this.deleteOrderModal.show();
    },
    closeDeleteModal() {
      this.deleteOrderModal.hide();
    },
    deleteOrder(orderID) {
      console.log('Deleting order:', orderID);
      this.$store.dispatch('deleteOrder', orderID);
    }
  },
  mounted() {
    try {
      console.log('Getting all orders...');
      this.getAllOrders();
      console.log('Orders:', this.orders);
      console.log('Vuex store:', this.$store.state);
      this.updateOrderModal = new Modal(this.$refs.updateOrderModal);
      this.deleteOrderModal = new Modal(this.$refs.deleteOrderModal);
    } catch (error) {
      console.error('Error getting all orders:', error);
      this.$toast("Error getting all orders. Please try again.", {
        "theme": "auto",
        "type": "error",
        "position": "top-center",
        "dangerouslyHTMLString": true
      });
    }
    // this.getOrders();
    this.getProducts();
    console.log('Products:', this.$store.state.products);
  }
}
</script>
<style>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-family: "Cormorant", serif;
    font-optical-sizing: auto;
    font-weight: 800;
    font-style: normal;
    font-size: 16px;
}

.table-striped {
  border: 1px solid #ddd;
}

.table-striped thead th {
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.table-striped tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.table-striped tbody tr:hover {
  background-color: #e9e9e9;
}

.table-striped th, .table-striped td {
  padding: 10px;
  border: 1px solid #ddd;
}

.table-striped th {
  font-weight: bold;
}

.table-striped td {
  vertical-align: middle;
}
.table{
  margin-bottom: 20px;
}
.orders{
  font-family: "Cormorant", serif;
    font-optical-sizing: auto;
    font-weight: 800;
    font-style: normal;
    font-size: 28px;
}
.btn13{
  color: white;
  background-color: rgb(148, 118, 103);
  padding: 7px;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
}
.btn13:hover{
  color: rgb(148, 118, 103);
  background-color: white;
}
.btn-close{
  color: white;
  background-color: rgb(148, 118, 103);
  padding: 7px;
  border: none;
  border-radius: 5px;
}
.btn-close:hover{
  color: rgb(148, 118, 103);
  background-color: white;
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
    position: relative;
    right: 50px;
    top: 40px;
    font-family: "Cormorant", serif;
    font-optical-sizing: auto;
    font-weight: 800;
    font-style: normal;
    font-size: 16px;
  }
  .orders{
    position: relative;
    top: 20px;
    bottom: 20px;
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
    position: relative;
    top: 10px;
   margin-bottom: 20px;
   justify-content: space-around;
  }
  .responsive-table th, .responsive-table td {
    padding: 10px;
  }
    .btn9{
    position: relative;
    left: 10px;
  }
  .orders{
    position: relative;
    top: 10px;
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

/* For medium screens (e.g., tablets) */
@media only screen and (min-width: 601px) and (max-width: 678px) {
  .responsive-table {
    font-size: 0.85em;
    position: relative;
    top: 10px;
    margin-bottom: 20px;
    justify-content: space-around;
  }
  .responsive-table th, .responsive-table td {
    padding: 8px;
  }
  .btn9{
    position: relative;
    left: 10px;
  }
  .orders{
    position: relative;
    top: 10px;
  }
}
</style>

