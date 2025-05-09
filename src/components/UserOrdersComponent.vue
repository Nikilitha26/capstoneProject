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
  <td data-label="Product ID">{{ orderProduct.prodID }}</td>
  <td data-label="Product Name">{{ orderProduct.prodName }}</td>
  <td data-label="Product Image"><img :src="orderProduct.prodUrl" alt="Product Image" width="50" height="50" /></td>
  <td data-label="Quantity">{{ orderProduct.quantity }}</td>
  <td data-label="Amount">{{ orderProduct.amount }}</td>
  <td data-label="Total Price">{{ orderProduct.quantity * orderProduct.amount }}</td>
  <td data-label="Date">{{ orderProduct.date.slice(0, 10) }}</td>
  <td data-label="Actions">
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
            <p>
  Are you sure you want to delete order #{{ orderToDelete.orderID }}
  for product {{ orderToDelete.prodID }} on {{ orderToDelete.date?.split('T')[0] }}?
</p>

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
import Swal from 'sweetalert2';

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
  mounted() {
  this.$nextTick(() => {
    this.updateOrderModal = new Modal(this.$refs.updateOrderModal);
    this.deleteOrderModal = new Modal(this.$refs.deleteOrderModal);
  });
},
  computed: {
    ...mapState(['orders', 'products']),
  orderProducts() {
    if (!this.products) return []; 
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
    if (!this.products) return null; 
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
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Please fill in all fields.',
        confirmButtonText: 'Close',
        confirmButtonColor: 'rgb(148, 118, 103)'
      });
      return;
    }
    
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
        Swal.fire({
          icon: 'success',
          title: 'Order Updated!',
          text: 'Your order has been successfully updated.',
          confirmButtonText: 'Close',
          confirmButtonColor: 'rgb(148, 118, 103)'
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Error updating order. Please try again.',
          confirmButtonText: 'Close',
          confirmButtonColor: 'rgb(148, 118, 103)'
        });
        console.error('Error updating order:', error);
      });
      this.closeUpdateModal();
    }
  },

     // Open delete confirmation modal using SweetAlert
  confirmDeleteOrder(orderID) {
    const order = this.orders.find(order => order.orderID === orderID);
    this.orderToDelete = order;
    
    // SweetAlert to confirm delete
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete order #${this.orderToDelete.orderID}? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: 'rgb(148, 118, 103)',
      cancelButtonColor: 'rgb(148, 118, 103)'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteOrder(orderID);
      }
    });
  },

  // Close the modal without deleting (this will be handled by SweetAlert confirmation)
  closeDeleteModal() {
    this.deleteOrderModal.hide();
  },

  // Delete the order after confirmation
  deleteOrder(orderID) {
    this.$store.dispatch('deleteOrder', orderID)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Your order has been deleted successfully.',
          confirmButtonText: 'Close',
          confirmButtonColor: 'rgb(148, 118, 103)',
          allowOutsideClick: false,  
          allowEscapeKey: false,   
          timer: 3000,    
          timerProgressBar: true,   
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'There was an issue deleting the order. Please try again.',
          confirmButtonText: 'Close',
          confirmButtonColor: 'rgb(148, 118, 103)',
          timer: 3000,    
          timerProgressBar: true,   
        });
        console.error('Error deleting order:', error);
      });
  }
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

@media only screen and (max-width: 768px) {
  .responsive-table {
    border: 0;
    width: 100%;
  }

  .responsive-table thead {
    display: none;
  }

  .responsive-table tr {
    display: block;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
  }

  .responsive-table td {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: none;
    border-bottom: 1px solid #eee;
    font-size: 0.9em;
  }

  .responsive-table td:last-child {
    border-bottom: 0;
  }

  .responsive-table td::before {
    content: attr(data-label);
    font-weight: bold;
    flex-basis: 50%;
    text-align: left;
  }
}

</style>

