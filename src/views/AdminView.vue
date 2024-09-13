<template scoped>
  <div>
    <div class="container">
      <h1 class="admin">Admin View</h1><br>
      <h3 class="items">ITEMS TABLE</h3>
      <button class="btn17" @click="showAddProductModal">Add Product</button>
      <table class="table table-striped table-responsive product-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Product Category</th>
            <th>Product Description</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.prodID">
            <td>{{ product.prodID }}</td>
            <td><img :src="product.prodUrl" alt="Product Image" width="50" height="50"></td>
            <td>{{ product.prodName }}</td>
            <td>{{ product.Category }}</td>
            <td>{{ product.prodDescription }}</td>
            <td>{{ product.quantity}}</td>
            <td>{{ product.amount }}</td>
            <td>
              <button class="btn16" @click="editProduct(product)">Edit</button>
              <button class="btn16" @click="deleteProduct(product)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

<!-- Add Product Modal -->
<div class="modal" v-show="showAddModal" tabindex="-1" ref="modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add Product</h5>
        <button type="button" class="btn-close" @click="showAddModal = false"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="addProduct">
          <div class="mb-3">
  <label for="productName" class="form-label">Product Name:</label>
  <input type="text" id="productName" v-model="newProduct.productName" class="form-control">
  <span v-if="productNameError" class="error-message">{{ productNameError }}</span>
</div>
<div class="mb-3">
  <label for="productDescription" class="form-label">Product Description:</label>
  <textarea id="productDescription" v-model="newProduct.productDescription" class="form-control"></textarea>
  <span v-if="productDescriptionError" class="error-message">{{ productDescriptionError }}</span>
</div>
<div class="mb-3">
  <label for="productPrice" class="form-label">Product Price:</label>
  <input type="number" id="productPrice" v-model="newProduct.productPrice" class="form-control">
  <span v-if="productPriceError" class="error-message">{{ productPriceError }}</span>
</div>
<div class="mb-3">
  <label for="productImage" class="form-label">Product Image:</label>
  <input type="text" id="productImage" v-model="newProduct.productImage" class="form-control">
  <span v-if="productImageError" class="error-message">{{ productImageError }}</span>
</div>
<div class="mb-3">
  <label for="productQuantity" class="form-label">Product Quantity:</label>
  <input type="number" id="productQuantity" v-model="newProduct.productQuantity" class="form-control">
  <span v-if="productQuantityError" class="error-message">{{ productQuantityError }}</span>
</div>
<div class="mb-3">
  <label for="productCategory" class="form-label">Product Category:</label>
  <input type="text" id="productCategory" v-model="newProduct.productCategory" class="form-control">
  <span v-if="productCategoryError" class="error-message">{{ productCategoryError }}</span>
</div>
          <button type="submit" class="btn16">Add Product</button>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Edit Product Modal -->
<div class="modal" v-show="showEditModal" tabindex="-1" ref="editModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit Product</h5>
        <button type="button" class="btn-close" @click="showEditModal = false"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="updateProduct">
          <div class="mb-3">
            <label for="prodName" class="form-label">Product Name:</label>
            <input type="text" id="prodName" v-model="editedProduct.prodName" class="form-control">
          </div>
          <div class="mb-3">
            <label for="prodDescription" class="form-label">Product Description:</label>
            <textarea id="prodDescription" v-model="editedProduct.prodDescription" class="form-control"></textarea>
          </div>
          <div class="mb-3">
            <label for="amount" class="form-label">Product Price:</label>
            <input type="number" id="amount" v-model="editedProduct.amount" class="form-control">
          </div>
          <div class="mb-3">
            <label for="prodUrl" class="form-label">Product Image URL:</label>
            <input type="text" id="prodUrl" v-model="editedProduct.prodUrl" class="form-control">
          </div>
          <div class="mb-3">
            <label for="quantity" class="form-label">Product Quantity:</label>
            <input type="number" id="quantity" v-model="editedProduct.quantity" class="form-control">
          </div>
          <div class="mb-3">
            <label for="category" class="form-label">Product Category:</label>
            <input type="text" id="category" v-model="editedProduct.Category" class="form-control">
          </div>
          <button type="submit" class="btn16">Update Product</button>
        </form>
      </div>
    </div>
  </div>
</div>


<h3 class="users">USERS TABLE</h3>
<button class="btn17" @click="toggleAddUserModal">Add User</button>
    <table class="table table-striped table-responsive user-table">
      <thead>
        <tr>
          <th>User ID</th>
          <th>User Profile</th>
          <th>User Name</th>
          <th>User Surname</th>
          <th>User Email Adress</th>
          <th>User Age</th>
          <th>User Gender</th>
          <th>User Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.userID">
          <td>{{ user.userID }}</td>
          <td><img :src="user.userProfile" alt="User Profile Image" width="80" height="70"></td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.emailAdd }}</td>
          <td>{{ user.userAge }}</td>
          <td>{{ user.Gender }}</td>
          <td>{{ user.userRole }}</td>
          <td>
            <button class="btn16" @click="editUser(user)">Edit</button>
            <button class="btn16" @click="deleteUser(user.userID)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add User Modal -->
<div class="modal" v-show="showAddUserModalFlag" tabindex="-1" ref="modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add User</h5>
        <button type="button" class="btn-close" @click="showAddUserModalFlag = false"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="addUser">
          <div class="mb-3">
  <label for="firstName" class="form-label">First Name:</label>
  <input type="text" id="firstName" v-model="newUser.firstName" class="form-control">
  <span v-if="firstNameError" class="error-message">{{ firstNameError }}</span>
</div>
<div class="mb-3">
  <label for="lastName" class="form-label">Last Name:</label>
  <input type="text" id="lastName" v-model="newUser.lastName" class="form-control">
  <span v-if="lastNameError" class="error-message">{{ lastNameError }}</span>
</div>
<div class="mb-3">
  <label for="userAge" class="form-label">Age:</label>
  <input type="number" id="userAge" v-model="newUser.userAge" class="form-control">
  <span v-if="userAgeError" class="error-message">{{ userAgeError }}</span>
</div>
<div class="mb-3">
  <label for="Gender" class="form-label">Gender:</label>
  <select id="Gender" v-model="newUser.Gender" class="form-control">
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
  <span v-if="genderError" class="error-message">{{ genderError }}</span>
</div>
<div class="mb-3">
  <label for="userRole" class="form-label">Role:</label>
  <select id="userRole" v-model="newUser.userRole" class="form-control">
    <option value="admin">Admin</option>
    <option value="user">User</option>
  </select>
  <span v-if="userRoleError" class="error-message">{{ userRoleError }}</span>
</div>
<div class="mb-3">
  <label for="emailAdd" class="form-label">Email Address:</label>
  <input type="email" id="emailAdd" v-model="newUser.emailAdd" class="form-control">
  <span v-if="emailError" class="error-message">{{ emailError }}</span>
</div>
<div class="mb-3">
  <label for="userProfile" class="form-label">Profile Image URL:</label>
  <input type="text" id="userProfile" v-model="newUser.userProfile" class="form-control">
  <span v-if="userProfileError" class="error-message">{{ userProfileError }}</span>
</div>
<div class="mb-3">
  <label for="password" class="form-label">Password:</label>
  <input type="password" id="userPass" v-model="newUser.userPass" class="form-control">
  <span v-if="userPassError" class="error-message">{{ userPassError }}</span>
</div>
          <button type="submit" class="btn16">Add User</button>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Edit User Modal -->
<div class="modal" v-show="showEditUserModal" tabindex="-1" ref="editUserModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit User</h5>
        <button type="button" class="btn-close" @click="showEditUserModal = false"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="updateUser">
          <div class="mb-3">
            <label for="firstName" class="form-label">First Name:</label>
            <input type="text" id="firstName" v-model="editedUser.firstName" class="form-control">
            <span v-if="firstNameError" class="error-message">{{ firstNameError }}</span>
          </div>
          <div class="mb-3">
            <label for="lastName" class="form-label">Last Name:</label>
            <input type="text" id="lastName" v-model="editedUser.lastName" class="form-control">
            <span v-if="lastNameError" class="error-message">{{ lastNameError }}</span>
          </div>
          <div class="mb-3">
            <label for="userAge" class="form-label">Age:</label>
            <input type="number" id="userAge" v-model="editedUser.userAge" class="form-control">
            <span v-if="userAgeError" class="error-message">{{ userAgeError }}</span>
          </div>
          <div class="mb-3">
            <label for="Gender" class="form-label">Gender:</label>
            <select id="Gender" v-model="editedUser.Gender" class="form-control">
              <option value="Male">Male</option>
              <option value="Memale">Female</option>
            </select>
            <span v-if="genderError" class="error-message">{{ genderError }}</span>
          </div>
          <div class="mb-3">
            <label for="userRole" class="form-label">Role:</label>
            <select id="userRole" v-model="editedUser.userRole" class="form-control">
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
            <span v-if="userRoleError" class="error-message">{{ userRoleError }}</span>
          </div>
          <div class="mb-3">
            <label for="emailAdd" class="form-label">Email Address:</label>
            <input type="email" id="emailAdd" v-model="editedUser.emailAdd" class="form-control">
            <span v-if="emailError" class="error-message">{{ emailError }}</span>
          </div>
          <div class="mb-3">
            <label for="userProfile" class="form-label">Profile Image URL:</label>
            <input type="text" id="userProfile" v-model="editedUser.userProfile" class="form-control">
            <span v-if="userProfileError" class="error-message">{{ userProfileError }}</span>
          </div>
          <button type="submit" class="btn16">Update User</button>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Confirmation Modal -->
<div class="modal" v-show="showConfirmModal" tabindex="-1" ref="confirmModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Confirm Delete</h5>
        <button type="button" class="btn-close" @click="showConfirmModal = false"></button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to delete {{ confirmModalText }}?</p>
      </div>
      <div class="modal-footer">
        <button class="btn16" @click="showConfirmModal = false">Cancel</button>
        <button class="btn16" @click="confirmDelete">Delete</button>
      </div>
    </div>
  </div>
</div>

<h3 class="orders">ORDERS TABLE</h3>
    <table class="table table-striped order-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>User ID</th>
          <th>Product ID</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.orderID">
          <td>{{ order.orderID }}</td>
          <td>{{ order.userID }}</td>
          <td>{{ order.prodID }}</td>
          <td>{{ order.date }}</td>
          <td>
            <!-- <button class="btn btn-secondary" @click="editOrder(order)">Edit</button> -->
            <button class="btn16" @click="deleteAdminOrder(order.orderID, order.userID)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AdminView',
  data() {
    return {
      showConfirmModal: false,
      confirmModalText: '',
      confirmDeleteID: null,
      confirmDeleteUserID: null,
      showAddModal: false,
      showEditModal: false,
      firstNameError: "",
    lastNameError: "",
    userAgeError: "",
    genderError: "",
    userRoleError: "",
    emailError: "",
    userProfileError: "",
    userPassError: "",
      newProduct: {
        prodName: '',
        prodDescription: '',
        amount: 0,
        prodUrl: '',
        quantity: 0,
        Category: '',
      },
      editedProduct: {
        prodName: '',
        prodDescription: '',
        amount: 0,
        prodUrl: '',
        quantity: 0,
        Category: '',
      },
      showAddUserModal: false,
      showEditUserModal: false,
      showAddUserModalFlag: false,
      newUser: {
        firstName: '',
        lastName: '',
        userAge: 0,
        Gender: '',
        userRole: '',
        emailAdd: '',
        userProfile: '',
        userPass: '',
      },
      editedUser: {
        firstName: '',
        lastName: '',
        userAge: 0,
        Gender: '',
        userRole: '',
        emailAdd: '',
        userProfile: '',
        userPass: '',
      },
      orders: null,
    };
  },
  // beforeMount() {
  //   this.$store.dispatch('verifyToken');
  // },
  computed: {
    ...mapGetters(['getProducts', 'getUsers']),
    products() {
      return this.getProducts;
    },
    users() {
      return this.getUsers;
    },
    orders() {
      console.log('Orders:', this.$store.state.orders);
      return this.$store.state.orders;
    },
  },
  created() {
    this.$store.dispatch('getProducts');
    this.$store.dispatch('getUsers');
    this.$store.dispatch('getOrders')
      .then((orders) => {
        console.log('Orders received:', orders);
        this.orders = orders;
      })
      .catch((error) => {
        console.error('Error getting orders:', error);
      });
  },
  methods: {
    toggleModal() {
      console.log('Toggling modal...');
      this.showModal = !this.showModal;
      console.log('showModal:', this.showModal);
    },
    showAddProductModal() {
      this.showAddModal = true;
      this.$nextTick(() => {
        console.log('Modal should be visible now...');
        document.querySelector('.modal').focus();
      });
    },
    addProduct() {
      if (!this.newProduct.prodName || !this.newProduct.prodDescription || !this.newProduct.amount || !this.newProduct.prodUrl || !this.newProduct.quantity || !this.newProduct.Category) {
    alert("Please fill in all fields.");
    return;
  }
      console.log('Adding product...');
      this.$store.dispatch('insertProduct', this.newProduct)
        .then(() => {
          console.log('Product added successfully!');
          this.showAddModal = false;
          this.newProduct = {
            prodName: '',
            prodDescription: '',
            amount: 0,
            prodUrl: '',
            quantity: 0,
            Category: '',
          };
        })
        .catch((error) => {
          console.error('Error adding product:', error);
        });
    },
    editProduct(product) {
      this.editedProduct = { ...product };
      this.showEditModal = true;
    },
    updateProduct() {
      if (!this.editedProduct.prodName || !this.editedProduct.prodDescription || !this.editedProduct.amount || !this.editedProduct.prodUrl || !this.editedProduct.quantity || !this.editedProduct.Category) {
    alert("Please fill in all fields.");
    return;
  }
  this.$store.dispatch('updateProduct', this.editedProduct)
    .then(() => {
      console.log('Product updated successfully!');
      this.showEditModal = false;
    })
    .catch(error => {
      console.error('Error updating product:', error);
    });
},
    deleteProduct(product) {
      this.showConfirmModal = true;
      this.confirmModalText = `Product ${product.prodName}`;
      this.confirmDeleteID = product.prodID;
    },
    toggleAddUserModal() {
      this.showAddUserModalFlag = true;
    },
    addUser() {
  if (!this.newUser.firstName) {
    this.firstNameError = "First name is required";
  } else {
    this.firstNameError = "";
  }
  if (!this.newUser.lastName) {
    this.lastNameError = "Last name is required";
  } else {
    this.lastNameError = "";
  }
  if (!this.newUser.userAge) {
    this.userAgeError = "Age is required";
  } else {
    this.userAgeError = "";
  }
  if (!this.newUser.Gender) {
    this.genderError = "Gender is required";
  } else {
    this.genderError = "";
  }
  if (!this.newUser.userRole) {
    this.userRoleError = "Role is required";
  } else {
    this.userRoleError = "";
  }
  if (!this.newUser.emailAdd) {
    this.emailError = "Email is required";
  } else {
    const existingUser = this.users.find(user => user.emailAdd === this.newUser.emailAdd);
    if (existingUser) {
      this.emailError = "Email already exists";
    } else {
      this.emailError = "";
    }
  }
  if (!this.newUser.userProfile) {
    this.userProfileError = "Profile image URL is required";
  } else {
    this.userProfileError = "";
  }
  if (!this.newUser.userPass) {
    this.userPassError = "Password is required";
  } else {
    this.userPassError = "";
  }
  if (this.firstNameError || this.lastNameError || this.userAgeError || this.genderError || this.userRoleError || this.emailError || this.userProfileError || this.userPassError) {
    return;
  }
  const email = this.newUser.emailAdd;
  const existingUser = this.users.find(user => user.emailAdd === email);
  if (existingUser) {
    this.emailError = "Email already exists";
    return;
  }
  this.newUser.firstName = this.newUser.firstName.charAt(0).toUpperCase() + this.newUser.firstName.slice(1).toLowerCase();
  this.newUser.lastName = this.newUser.lastName.charAt(0).toUpperCase() + this.newUser.lastName.slice(1).toLowerCase();
  this.newUser.userRole = this.newUser.userRole.charAt(0).toUpperCase() + this.newUser.userRole.slice(1).toLowerCase();
  this.newUser.Gender = this.newUser.Gender.charAt(0).toUpperCase() + this.newUser.Gender.slice(1).toLowerCase();
  console.log('Adding user...');
  const result = this.$store.dispatch('insertUser', this.newUser);
  if (result && typeof result.then === 'function') {
    result.then(() => {
      console.log('User added successfully!');
      this.showAddUserModal = false;
      this.newUser = {
        firstName: '',
        lastName: '',
        userAge: 0,
        Gender: '',
        userRole: '',
        emailAdd: '',
        userProfile: '',
        userPass: '',
      };
    })
    .catch((error) => {
      console.error('Error adding user:', error);
    });
  } else {
    console.log('User added successfully!');
    this.showAddUserModal = false;
    this.newUser = {
      firstName: '',
      lastName: '',
      userAge: 0,
      Gender: '',
      userRole: '',
      emailAdd: '',
      userProfile: '',
    };
  }
},

editUser(user) {
  this.editedUser = { ...user };
  this.firstNameError = "";
  this.lastNameError = "";
  this.userAgeError = "";
  this.genderError = "";
  this.userRoleError = "";
  this.emailError = "";
  this.userProfileError = "";
  this.showEditUserModal = true;
},
updateUser() {
  if (!this.editedUser.firstName) {
    this.firstNameError = "First name is required";
  } else {
    this.firstNameError = "";
  }
  if (!this.editedUser.lastName) {
    this.lastNameError = "Last name is required";
  } else {
    this.lastNameError = "";
  }
  if (!this.editedUser.userAge) {
    this.userAgeError = "Age is required";
  } else {
    this.userAgeError = "";
  }
  if (!this.editedUser.Gender) {
    this.genderError = "Gender is required";
  } else {
    this.genderError = "";
  }
  if (!this.editedUser.userRole) {
    this.userRoleError = "Role is required";
  } else {
    this.userRoleError = "";
  }
  if (!this.editedUser.emailAdd) {
    this.emailError = "Email is required";
  } else {
    const existingUser = this.users.find(user => user.emailAdd === this.editedUser.emailAdd);
    if (existingUser && existingUser.userID !== this.editedUser.userID) {
      this.emailError = "Email already exists";
    } else {
      this.emailError = "";
    }
  }
  if (!this.editedUser.userProfile) {
    this.userProfileError = "Profile image URL is required";
  } else {
    this.userProfileError = "";
  }
  if (this.firstNameError || this.lastNameError || this.userAgeError || this.genderError || this.userRoleError || this.emailError || this.userProfileError) {
    return;
  }
  const userID = this.editedUser.userID;
  if (!userID) {
    console.error('Error: userID is undefined');
    return;
  }
  this.$store.dispatch('updateUser', { userId: this.editedUser.userID, updatedUser: this.editedUser })
    .then(() => {
      console.log('User updated successfully!');
      this.showEditUserModal = false;
      this.$store.commit('updateUserInArray', this.editedUser);
    })
    .catch((error) => {
      console.error('Error updating user:', error);
    });
},
deleteUser(userID) {
  this.showConfirmModal = true;
  this.confirmModalText = `User with ID ${userID}`;
  this.confirmDeleteID = userID;
},
confirmDelete() {
  if (this.confirmDeleteID) {
    if (this.confirmModalText.includes('Product')) {
      this.$store.dispatch('deleteProduct', this.confirmDeleteID);
    } else {
      this.$store.dispatch('deleteUser', this.confirmDeleteID);
    }
    this.showConfirmModal = false;
    this.confirmDeleteID = null;
  }
},
editOrder(order) {
  this.editedOrder = { ...order };
  this.showEditOrderModal = true;
},

updateOrder() {
  this.$store.dispatch('updateOrder', this.editedOrder)
    .then(() => {
      console.log('Order updated successfully!');
      this.showEditOrderModal = false;
    })
    .catch((error) => {
      console.error('Error updating order:', error);
    });
},

deleteAdminOrder(orderId, userId) {
  if (!userId) {
    console.error('Error: userId is undefined');
    return;
  }
  this.$store.dispatch('deleteAdminOrder', { orderId, userId });
},

confirmDelete() {
  if (this.confirmDeleteID) {
    if (this.confirmModalText.includes('Order')) {
      this.$store.dispatch('deleteAdminOrder', this.confirmDeleteID, this.confirmDeleteUserID);
    } else if (this.confirmModalText.includes('Product')) {
      this.$store.dispatch('deleteProduct', this.confirmDeleteID);
    } else {
      this.$store.dispatch('deleteUser', this.confirmDeleteID);
    }
    this.showConfirmModal = false;
    this.confirmDeleteID = null;
    this.confirmDeleteUserID = null;
  }
}
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
body {
  font-family: Open Sans;
  background-color: #f7f7f7;
}

header {
  background-color: rgb(148, 118, 103);
  color: #fff;
  padding: 20px;
  text-align: center;
}

header nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

header nav li {
  margin-right: 20px;
}

header nav a {
  color: #fff;
  text-decoration: none;
}

h1 {
  font-size: 36px;
  font-weight: bold;
  color: rgb(148, 118, 103);
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px #ccc;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-top: 30px;
}

h3 {
  font-size: 24px;
  font-weight: bold;
  color: rgb(148, 118, 103);
  margin-bottom: 40px;
  text-shadow: 1px 1px 2px #ccc;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
}
.users{
  position: relative;
  top: 20px;
}
.main-content {
  padding: 20px;
}

.section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.section h2 {
  font-size: 24px;
  margin-top: 0;
}

.table {
  border-collapse: collapse;
  width: 100%;
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.table th {
  background-color: rgb(173, 143, 123);
  color: #fff;
}

.button {
  background-color: rgb(148, 118, 103);
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.button:hover {
  background-color: rgb(223, 193, 163);
}

table {
  border-collapse: collapse;
  width: 100%;
  justify-content: space-around;
  margin-right: 10px;
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
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
  border-radius: 50%;
}

.modal {
  display: block; 
}

.btn16{
  background-color: rgb(148, 118, 103);
  color: white;
  padding: 7px;
  border: none;
  border-radius: 5px;
  margin-bottom: 5px;
}

.btn16:hover{
  color: rgb(148, 118, 103);
  background-color: white;
}
.btn17{
  background-color: rgb(148, 118, 103);
  color: white;
  padding: 7px;
  border: none;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-top: 10px;
  position: relative;
  justify-content: space-around;
  margin-right: 10px;
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
}

.btn17:hover{
  color: rgb(148, 118, 103);
  background-color: white;
}

.orders{
  margin-top: 30px;
}


@media only screen and (max-width: 450px) {
  table {
    font-size: 12px;
  }
  th, td {
    padding: 5px;
    display: block;
    width: 100%;
  }
  th {
    background-color: #f0f0f0;
  }
}

@media (max-width: 768px) {
    .product-table {
      width: 100%;
      border-collapse: collapse;
    }
    .product-table thead {
      display: none;
    }
    .product-table tr {
      display: block;
      margin-bottom: 10px;
      border: 1px solid #ddd;
    }
    .product-table td {
      display: block;
      text-align: right;
      font-size: 13px;
      border-bottom: 1px dotted #ccc;
      padding: 10px;
      position: relative;
    }
    .btn16{
      margin-left: 5px;
    }
    .product-table td:before {
      content: attr(data-label);
      float: left;
      text-transform: uppercase;
      font-weight: bold;
    }
    .product-table td:last-child {
      border-bottom: 0;
    }
    .product-table td:nth-child(1):before {
      content: "Product ID";
    }
    .product-table td:nth-child(2):before {
      content: "Product Name";
    }
    .product-table td:nth-child(3):before {
      content: "Quantity";
    }
    .product-table td:nth-child(4):before {
      content: "Amount";
    }
    .product-table td:nth-child(5):before {
      content: "Category";
    }
    .product-table td:nth-child(6):before {
      content: "Product URL";
    }
    .product-table td:nth-child(7):before {
      content: "Action";
    }

    .user-table {
      width: 100%;
      border-collapse: collapse;
    }
    .user-table thead {
      display: none;
    }
    .user-table tr {
      display: block;
      margin-bottom: 10px;
      border: 1px solid #ddd;
    }
    .user-table td {
      display: block;
      text-align: right;
      font-size: 13px;
      border-bottom: 1px dotted #ccc;
      padding: 10px;
      position: relative;
    }
    .user-table td:before {
      content: attr(data-label);
      float: left;
      text-transform: uppercase;
      font-weight: bold;
    }
    .user-table td:last-child {
      border-bottom: 0;
    }
    .user-table td:nth-child(1):before {
      content: "user ID";
    }
    .user-table td:nth-child(2):before {
      content: "user Name";
    }
    .user-table td:nth-child(3):before {
      content: "Quantity";
    }
    .user-table td:nth-child(4):before {
      content: "Amount";
    }
    .user-table td:nth-child(5):before {
      content: "Category";
    }
    .user-table td:nth-child(6):before {
      content: "user URL";
    }
    .user-table td:nth-child(7):before {
      content: "Action";
    }

    .order-table {
      width: 100%;
      border-collapse: collapse;
    }
    .order-table thead {
      display: none;
    }
    .order-table tr {
      display: block;
      margin-bottom: 10px;
      border: 1px solid #ddd;
    }
    .order-table td {
      display: block;
      text-align: right;
      font-size: 13px;
      border-bottom: 1px dotted #ccc;
      padding: 10px;
      position: relative;
    }
    .order-table td:before {
      content: attr(data-label);
      float: left;
      text-transform: uppercase;
      font-weight: bold;
    }
    .order-table td:last-child {
      border-bottom: 0;
    }
    .order-table td:nth-child(1):before {
      content: "order ID";
    }
    .order-table td:nth-child(2):before {
      content: "order Name";
    }
    .order-table td:nth-child(3):before {
      content: "Quantity";
    }
    .order-table td:nth-child(4):before {
      content: "Amount";
    }
    .order-table td:nth-child(5):before {
      content: "Category";
    }
    .order-table td:nth-child(6):before {
      content: "order URL";
    }
    .order-table td:nth-child(7):before {
      content: "Action";
    }
  }

  @media (max-width: 900px) {
  .product-table, .user-table, .order-table {
    width: 100%;
    border-collapse: collapse;
  }
  .product-table thead, .user-table thead, .order-table thead {
    display: none;
  }
  .product-table tr, .user-table tr, .order-table tr {
    display: block;
    margin-bottom: 10px;
    border: 1px solid #ddd;
  }
  .product-table td, .user-table td, .order-table td {
    display: block;
    text-align: right;
    font-size: 13px;
    border-bottom: 1px dotted #ccc;
    padding: 10px;
    position: relative;
  }
  .product-table td:before, .user-table td:before, .order-table td:before {
    content: attr(data-label);
    float: left;
    text-transform: uppercase;
    font-weight: bold;
  }
  .product-table td:last-child, .user-table td:last-child, .order-table td:last-child {
    border-bottom: 0;
  }
  .product-table td:nth-child(1):before {
    content: "Product ID";
  }
  .product-table td:nth-child(2):before {
    content: "Product Name";
  }
  .product-table td:nth-child(3):before {
    content: "Quantity";
  }
  .product-table td:nth-child(4):before {
    content: "Amount";
  }
  .product-table td:nth-child(5):before {
    content: "Category";
  }
  .product-table td:nth-child(6):before {
    content: "Product URL";
  }
  .product-table td:nth-child(7):before {
    content: "Action";
  }
  .user-table td:nth-child(1):before {
    content: "User ID";
  }
  .user-table td:nth-child(2):before {
    content: "User Name";
  }
  .user-table td:nth-child(3):before {
    content: "Email";
  }
  .user-table td:nth-child(4):before {
    content: "Age";
  }
  .user-table td:nth-child(5):before {
    content: "Gender";
  }
  .user-table td:nth-child(6):before {
    content: "Role";
  }
  .user-table td:nth-child(7):before {
    content: "Action";
  }
  .order-table td:nth-child(1):before {
    content: "Order ID";
  }
  .order-table td:nth-child(2):before {
    content: "User ID";
  }
  .order-table td:nth-child(3):before {
    content: "Product ID";
  }
  .order-table td:nth-child(4):before {
    content: "Date";
  }
  .order-table td:nth-child(5):before {
    content: "Action";
  }
}
</style>