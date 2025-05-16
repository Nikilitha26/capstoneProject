import { createStore } from 'vuex'
import axios from 'axios'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useCookies } from 'vue3-cookies'
import Swal from 'sweetalert2';
const {cookies} = useCookies()
import router from '@/router';


axios.defaults.withCredentials = true
axios.defaults.headers = cookies.get('token')
const apiURL = 'https://capstoneproject-1-9k8p.onrender.com/'
export default createStore({
  state: {
    products: null,
    product: null,
    bookedProduct: null,
    bookedProducts: [],
    token: null,
    userId: null,
    user: [],
    users: [],
    userRole: null,
    orders: [],
    isLoggedIn: false
  },
  getters: {
    getProducts: (state) => state.products,
    getProductById: (state) => (id) => state.products.find((product) => product.prodID === id),
    getUser: (state) => state.user, 
    getUsers: (state) => state.users,
    bookedProduct: state => state.bookedProduct,
    isLoggedIn: state => state.isLoggedIn
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },

    setProduct(state, payload) {
      state.product = payload
    },

    setBookedProduct(state, product) {
      state.bookedProducts.push(product);
    },

    setBookedProducts(state, bookedProducts) {
      state.bookedProducts = bookedProducts;
    },

    setLoggedIn(state,isLoggedIn){
      state.isLoggedIn = isLoggedIn
    },

    updateProduct(state, product) {
      const index = state.products.findIndex(p => p.prodID === product.prodID);
      if (index !== -1) {
        state.products.splice(index, 1, product);
      }
    },

    updateBookedProductQuantity(state, { prodID, quantity }) {
      const index = state.bookedProducts.findIndex(product => product.prodID === prodID);
      if (index !== -1) {
        state.bookedProducts[index].quantity = quantity;
      }
    },

    updateProductInArray(state, updatedProduct) {
      const index = state.products.findIndex(product => product.prodID === updatedProduct.prodID);
      if (index !== -1) {
        state.products.splice(index, 1, updatedProduct);
      }
    },

    addBookedProduct(state, product) {
      const existingProductIndex = state.bookedProducts.findIndex(p => p.prodID === product.prodID);
      if (existingProductIndex === -1) {
        state.bookedProducts.push(product);
      }
    },

    deleteProduct(state, prodID) {
      const index = state.products.findIndex(product => product.prodID === prodID);
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },

    deleteBookedProduct(state, index) {
      state.bookedProducts.splice(index, 1);
    },

    clearBookedProducts(state) {
      state.bookedProducts = [];
    },

    setToken(state, token) {
      state.token = token;
    },
    setRefreshToken(state, refreshToken){
      state.refreshToken = refreshToken;
    },
    setUserId(state, userId) {
      console.log('Setting userId:', userId);
      state.userId = userId;
    },

    setUser(state, user) { 
      state.user = user;
    },

    setUsers(state, users) {
      state.users = users;
    },

    updateUser(state, updatedUser) {
      state.user[0] = updatedUser;
    },

    updateUserInArray(state, user) {
      const index = state.users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        state.users.splice(index, 1, user);
        }
    },

    setOrders(state, orders) {
      state.orders = orders;
    },

    setUserRole (state, userRole) {
      state.userRole = userRole;
  },
},
  actions: {

    // Products

    addBookedProduct({ commit }, product) {
      commit('addBookedProduct', product)
    },

    async getProducts({ commit }) {
      let { data } = await axios.get('https://capstoneproject-1-9k8p.onrender.com/products')
      commit('setProducts', data)
      
    },

    async getProduct({ commit, state }, productId) {
      console.log('Getting product with ID:', productId); 
      if (!productId) {
        console.error('Error: productId is undefined');
        return;
      }
      try {
        const response = await axios.get(`https://capstoneproject-1-9k8p.onrender.com/products/${productId}`);
        console.log('API response:', response.data);
        const product = response.data;
        commit('setProduct', product); 
        return product; 
      } catch (error) {
        console.error('Error loading product:', error);
        if (error.response) {
          toast(`Error loading product: ${error.response.data.message}`, {
            "theme": "auto",
            "type": "error",
            "position": "top-center",
            "dangerouslyHTMLString": true
          });
        } else {
          toast("Error loading product. Please try again.", {
            "theme": "auto",
            "type": "error",
            "position": "top-center",
            "dangerouslyHTMLString": true
          });
        }
      }
    },

    async insertProduct({ commit }, newProduct) {
      try {
        const style = document.createElement('style');
        style.innerHTML = `
          .swal2-popup {
            background-color: white;
            color: rgb(148, 118, 103);
            font-family: 'Arial', sans-serif;
          }
          .swal2-title {
            font-size: 1.5rem;
            font-weight: bold;
          }
          .swal2-text {
            font-size: 1rem;
          }
          .swal2-confirm {
            background-color: rgb(148, 118, 103);
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 1rem;
          }
          .swal2-confirm:hover {
            background-color:rgb(148, 118, 103);
          }
          .swal2-cancel {
            display: none;
          }
          .swal2-loading {
            background-image: url('/path/to/your/loader.gif');
            background-size: 50px;
            background-repeat: no-repeat;
            background-position: center;
            width: 100px;
            height: 100px;
          }
        `;
        document.head.appendChild(style);
    
        console.log('Attempting to add product...');
        const response = await axios.post('https://capstoneproject-1-9k8p.onrender.com/products', newProduct);
        console.log('Response from server:', response);
        commit('setProducts', [...this.state.products, response.data]);
    
        // Close the loading SweetAlert and show success message
        Swal.fire({
          icon: 'success',
          title: 'Product Added!',
          text: 'The product was added successfully.',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(() => {
          location.reload(); 
        });
    
      } catch (error) {
        console.error('Error adding product:', error);
    
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'There was an error adding the product. Please try again.',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      }
    },    

    async updateProduct({ commit, state }, product) {
      try {
        // Show loading SweetAlert
        // await Swal.fire({
        //   title: 'Updating Product...',
        //   text: 'Please wait while the product is being updated.',
        //   allowOutsideClick: false,
        //   allowEscapeKey: false,
        //   showConfirmButton: false,
        //   didOpen: () => {
        //     Swal.showLoading();
        //   },
        //   background: 'white',
        //   color: 'rgb(148, 118, 103)'
        // });
    
        // Send PATCH request
        const response = await axios.patch(`https://capstoneproject-1-9k8p.onrender.com/products/${product.prodID}`, product);
        
        // Commit updated product
        commit('updateProductInArray', product);
    
        // Update bookedProducts if necessary
        const bookedProductIndex = state.bookedProducts.findIndex(bp => bp.prodID === product.prodID);
        if (bookedProductIndex !== -1) {
          state.bookedProducts[bookedProductIndex] = product;
        }
    
        // Show success SweetAlert
        await Swal.fire({
          icon: 'success',
          title: 'Product Updated!',
          text: 'The product was successfully updated.',
          confirmButtonText: 'OK',
          background: 'white',
          color: 'rgb(148, 118, 103)',
          allowOutsideClick: false,
          allowEscapeKey: false,
          didRender: () => {
            const btn = Swal.getConfirmButton();
            Object.assign(btn.style, {
              backgroundColor: 'rgb(148, 118, 103)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              fontSize: '1rem',
              borderRadius: '0.5rem'
            });
            btn.onmouseover = () => btn.style.backgroundColor = 'rgb(148, 118, 103)';
            btn.onmouseout = () => btn.style.backgroundColor = 'rgb(148, 118, 103)';
          }
        });
    
        // Reload only after confirmation
        location.reload();
    
        return response.data;
      } catch (error) {
        console.error('Error updating product:', error);
    
        // Show error SweetAlert
        await Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'There was an error updating the product.',
          confirmButtonText: 'OK',
          background: 'white',
          color: 'rgb(148, 118, 103)',
          allowOutsideClick: false,
          allowEscapeKey: false,
          didRender: () => {
            const btn = Swal.getConfirmButton();
            Object.assign(btn.style, {
              backgroundColor: 'rgb(148, 118, 103)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              fontSize: '1rem',
              borderRadius: '0.5rem'
            });
            btn.onmouseover = () => btn.style.backgroundColor = 'rgb(148, 118, 103)';
            btn.onmouseout = () => btn.style.backgroundColor = 'rgb(148, 118, 103)';
          }
        });
    
        throw error;
      }
    },    

    async deleteProduct({ commit, state }, prodID) {
      try {

    
        // Perform deletion
        const response = await axios.delete(`https://capstoneproject-1-9k8p.onrender.com/products/${prodID}`);
    
        if (response.data.message) {
          commit('deleteProduct', prodID);
    
          // Show success alert
          await Swal.fire({
            icon: 'success',
            title: 'Product Deleted!',
            text: 'The product has been deleted successfully.',
            confirmButtonText: 'OK',
            allowOutsideClick: true,
            allowEscapeKey: false,
            background: 'white',
            color: 'rgb(148, 118, 103)',
            didRender: () => {
              const btn = Swal.getConfirmButton();
              Object.assign(btn.style, {
                backgroundColor: 'rgb(148, 118, 103)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                fontSize: '1rem',
                borderRadius: '0.5rem'
              });
              btn.onmouseover = () => btn.style.backgroundColor = 'rgb(148, 118, 103)';
              btn.onmouseout = () => btn.style.backgroundColor = 'rgb(148, 118, 103)';
            }
          });
    
          // Reload after confirmation
          location.reload();
        }
    
      } catch (error) {
        console.error('Error deleting product:', error);
    
        // Show error alert
        await Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: 'There was an error deleting the product. Please try again.',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          background: 'white',
          color: 'rgb(148, 118, 103)',
          didRender: () => {
            const btn = Swal.getConfirmButton();
            Object.assign(btn.style, {
              backgroundColor: 'rgb(148, 118, 103)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              fontSize: '1rem',
              borderRadius: '0.5rem'
            });
            btn.onmouseover = () => btn.style.backgroundColor = 'rgb(148, 118, 103)';
            btn.onmouseout = () => btn.style.backgroundColor = 'rgb(148, 118, 103)';
          }
        });
      }
    },    
      
    // Users

    async loginUser({ commit }, info) {
      console.log('[loginUser] Payload:', info);
      try {
        const response = await axios.post('https://capstoneproject-1-9k8p.onrender.com/users/login', info);
        console.log('[loginUser] Response:', response);
    
        const token = response.data.token;
        const refreshToken = response.data.refreshToken;
        const userId = response.data.user.userId; // FIXED from userID
        const userRole = response.data.user.role; // FIXED from userRole
    
        // Commit to Vuex store
        commit('setToken', token);
        commit('setRefreshToken', refreshToken);
        commit('setUserId', userId);
        commit('setUserRole', userRole);
        commit('setLoggedIn', true); // FIXED from false
    
        // Store in cookies
        cookies.set('token', token);
        cookies.set('refreshToken', refreshToken);
        cookies.set('userId', userId);
        cookies.set('role', userRole); // Always store the role
    
        console.log('[loginUser] Token:', token);
        console.log('[loginUser] Refresh Token:', refreshToken);
        console.log('[loginUser] UserId:', userId);
        console.log('[loginUser] UserRole:', userRole);
    
        // Success feedback
        await Swal.fire({
          title: "Login Successful",
          text: "You have successfully logged in.",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            router.push('/');
          }
        });
    
        return userId;
    
      } catch (error) {
        console.error('[loginUser] Error:', error.response?.data || error.message);
    
        await Swal.fire({
          title: "Login Failed",
          text: error.response?.data?.error || "Please check your credentials and try again.",
          icon: "error",
          confirmButtonColor: "#944e37"
        });
      }
    },
    
    async signupUser({ commit }, info) {
      try {
        const response = await axios.post('https://capstoneproject-1-9k8p.onrender.com/users', info);
        const token = response.data.token;
        const userId = response.data.userId;
        const userRole = response.data.userRole; 
        commit('setToken', token);
        commit('setUserId', userId);
        commit('setUserRole', userRole); 
        cookies.set('token', token);
        if (userRole === 'admin') {
          cookies.set('role', 'admin');
        }
        console.log(token);
        
        if (response.data.message) {
          toast("Signed Up Successfully!!", {
            "theme": "auto",
            "type": "default",
            "position": "top-center",
            "dangerouslyHTMLString": true
          });
        }
        await router.push('/');
        location.reload();
      } catch (error) {
        console.error(error);
        console.error(error.response.data);
        toast("Signup Failed. Please try again.", {
          "theme": "auto",
          "type": "error",
          "position": "top-center",
          "dangerouslyHTMLString": true
        });
      }
    },

    async updateUser({ commit, state: { token } }, { userId, updatedUser }) {
      try {
    
        // Send PATCH request
        const response = await axios.patch(`https://capstoneproject-1-9k8p.onrender.com/users/${userId}`, updatedUser, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
    
        // Commit updated user
        commit('updateUser', updatedUser);
    
        // Show success SweetAlert
        await Swal.fire({
          icon: 'success',
          title: 'User Updated!',
          text: 'The user was successfully updated.',
          confirmButtonText: 'OK',
          background: 'white',
          color: 'rgb(148, 118, 103)',
          allowOutsideClick: false,
          allowEscapeKey: false,
          didRender: () => {
            const btn = Swal.getConfirmButton();
            Object.assign(btn.style, {
              backgroundColor: 'rgb(148, 118, 103)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              fontSize: '1rem',
              borderRadius: '0.5rem'
            });
            btn.onmouseover = () => btn.style.backgroundColor = 'rgb(148, 118, 103)';
            btn.onmouseout = () => btn.style.backgroundColor = 'rgb(148, 118, 103)';
          }
        });
    
        // Reload only after confirmation
        location.reload();
      } catch (error) {
        console.error('Error updating user:', error);
    
        // Show error SweetAlert
        await Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'There was an error updating the user. Please try again.',
          confirmButtonText: 'OK',
          background: 'white',
          color: 'rgb(148, 118, 103)',
          allowOutsideClick: false,
          allowEscapeKey: false,
          didRender: () => {
            const btn = Swal.getConfirmButton();
            Object.assign(btn.style, {
              backgroundColor: 'rgb(148, 118, 103)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              fontSize: '1rem',
              borderRadius: '0.5rem'
            });
            btn.onmouseover = () => btn.style.backgroundColor = 'rgb(148, 118, 103)';
            btn.onmouseout = () => btn.style.backgroundColor = 'rgb(148, 118, 103)';
          }
        });
      }
    },    
      
    async getUserById({ commit }, userId) {
      try {
        const response = await axios.get(`https://capstoneproject-1-9k8p.onrender.com/users/${userId}`);
        const user = response.data;
        if (!user) {
          throw new Error(`User with ID ${userId} not found`);
        }
        commit('setUser', user);
      } catch (error) {
        console.error('Error getting user:', error);
        commit('setUser', null); 
      }
    },

      async getUsers({ commit }) {
        try {
          const response = await axios.get('https://capstoneproject-1-9k8p.onrender.com/users');
          commit('setUsers', response.data);
        } catch (error) {
          console.error(error);
        }
    },

async insertUser({ commit }, newUser) {
  try {
    // Show loading SweetAlert
    Swal.fire({
      title: 'Adding User...',
      text: 'Please wait while the user is being added.',
      didOpen: () => {
        Swal.showLoading();
      },
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      background: 'white',
      color: 'rgb(148, 118, 103)'
    });

    // Post request
    const response = await axios.post('https://capstoneproject-1-9k8p.onrender.com/users', newUser);
    commit('setUser', response.data);

    // Show success SweetAlert
    await Swal.fire({
      icon: 'success',
      title: 'User Added!',
      text: 'The user was added successfully.',
      confirmButtonText: 'OK',
      allowOutsideClick: false,
      allowEscapeKey: false,
      background: 'white',
      color: 'rgb(148, 118, 103)',
      customClass: {
        confirmButton: 'custom-swal-btn'
      },
      didRender: () => {
        const btn = Swal.getConfirmButton();
        btn.style.backgroundColor = 'rgb(148, 118, 103)';
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.padding = '10px 20px';
        btn.style.fontSize = '1rem';
        btn.style.borderRadius = '0.5rem';
        btn.onmouseover = () => btn.style.backgroundColor = 'rgb(148, 118, 103)';
        btn.onmouseout = () => btn.style.backgroundColor = 'rgb(148, 118, 103)';
      }
    });

    location.reload();
  } catch (error) {
    console.error('Error adding user:', error);

    // Error SweetAlert
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'There was an error adding the user. Please try again.',
      confirmButtonText: 'OK',
      allowOutsideClick: false,
      allowEscapeKey: false,
      background: 'white',
      color: 'rgb(148, 118, 103)',
      customClass: {
        confirmButton: 'custom-swal-btn'
      },
      didRender: () => {
        const btn = Swal.getConfirmButton();
        btn.style.backgroundColor = '#FFD700';
        btn.style.color = '#111';
        btn.style.border = 'none';
        btn.style.padding = '10px 20px';
        btn.style.fontSize = '1rem';
        btn.style.borderRadius = '0.5rem';
        btn.onmouseover = () => btn.style.backgroundColor = '#ffcc00';
        btn.onmouseout = () => btn.style.backgroundColor = '#FFD700';
      }
    });
  }
},
    
async deleteUser({ commit, state }, userId) {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }


    // Send delete request
    const apiUrl = `https://capstoneproject-1-9k8p.onrender.com/users/${userId}`;
    const response = await axios.delete(apiUrl, {
      headers: {
        Authorization: `Bearer ${state.token}`
      }
    });

    if (response.data.message) {
      commit('setUser', null); 

      // Show success alert
      await Swal.fire({
        icon: 'success',
        title: 'User Deleted',
        text: 'The user has been deleted successfully.',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        background: 'white',
        color: 'rgb(148, 118, 103)',
        customClass: {
          confirmButton: 'custom-swal-btn'
        },
        didRender: () => {
          const btn = Swal.getConfirmButton();
          Object.assign(btn.style, {
            backgroundColor: 'rgb(148, 118, 103)',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '1rem',
            borderRadius: '0.5rem'
          });
          btn.onmouseover = () => btn.style.backgroundColor = 'rgb(148, 118, 103)';
          btn.onmouseout = () => btn.style.backgroundColor = 'rgb(148, 118, 103)';
        }
      });

      location.reload();
    }
  } catch (error) {
    console.error('Error deleting user:', error);

    // Show error alert
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'There was an error deleting the user. Please try again.',
      confirmButtonText: 'OK',
      background: 'white',
      color: 'rgb(148, 118, 103)'
    });
  }
},

    // Orders

    async insertOrderDb({ commit, state }, payload) {
      const { productId, checkInDate } = payload;
      console.log('insertOrderDb checkInDate:', checkInDate);
  
      try {
        const token = state.token;
        const userId = state.userId || cookies.get('userId');
        console.log('Inserting order with:', { productId, userId, checkInDate });
  
        const response = await axios.post(
          `https://capstoneproject-1-9k8p.onrender.com/users/${userId}/order`,
          {
            prodID: productId,
            date: checkInDate,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.data.message) {
          // Show SweetAlert2 success popup for 2 seconds
          await Swal.fire({
            title: "Order Saved",
            text: "Your booking has been recorded.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true,
          });
        }
      } catch (error) {
        console.error(error);
        await Swal.fire({
          title: "Order Failed",
          text: "Error saving order. Please try again.",
          icon: "error",
          confirmButtonColor: "#944e37",
        });
      }
    },

    async getAllOrders({ commit, state }) {
      try {
        const userId = state.userId || cookies.get('userId');
        console.log('UserId from store or cookies:', userId);
        if (!userId) {
          throw new Error('User ID is not set');
        }
        if (isNaN(userId) || userId <= 0) {
          throw new Error('Invalid user ID');
        }
        const apiUrl = `https://capstoneproject-1-9k8p.onrender.com/users/${userId}/order`;
        console.log('API URL:', apiUrl);
        const response = await axios.get(apiUrl);
        console.log('API response:', response.data);
        commit('setOrders', response.data);
      } catch (error) {
        console.error(`Error getting all orders: ${error.message} (${error.status})`);
      }
    },

    async getOrders({ commit }) {
      try {
        const response = await axios.get('https://capstoneproject-1-9k8p.onrender.com/users/orders');
        if (response.status === 200) {
          const orders = response.data;
          commit('setOrders', orders);
          return orders;
        } else {
          console.error('Error getting orders:', response.data);
          return null;
        }
      } catch (error) {
        console.error('Error getting orders:', error);
        return null;
      }
    }, 
    
    async deleteOrder({ commit, state }, orderId) {
      try {
        if (!orderId) {
          throw new Error('Order ID is required');
        }
    
        const userId = state.userId || cookies.get('userId');
        const apiUrl = `https://capstoneproject-1-9k8p.onrender.com/users/${userId}/order/${orderId}`;
        const response = await axios.delete(apiUrl, {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        });
    
        if (response.data.message) {
          // SweetAlert success message
          Swal.fire({
            icon: 'success',
            title: 'Order Deleted!',
            text: 'Your order has been successfully deleted.',
            confirmButtonText: 'Close',
            confirmButtonColor: 'rgb(148, 118, 103)',
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
    
          // Commit the updated orders without reloading
          commit('setOrders', response.data);
        }
      } catch (error) {
        console.error('Error deleting order:', error);
    
        // SweetAlert error message
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error.response ? `Error deleting order: ${error.response.data.message}` : 'Error deleting order. Please try again.',
          confirmButtonText: 'Close',
          confirmButtonColor: 'rgb(148, 118, 103)',
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      }
    },    

    async deleteAdminOrder({ commit, state }, payload) {
      const { orderId, userId } = payload;
      console.log('deleteAdminOrder called with:', orderId, userId);
      try {
        const apiUrl = `https://capstoneproject-1-9k8p.onrender.com/users/${userId}/order/${orderId}`;
        const response = await axios.delete(apiUrl, {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        });
        if (response.data.message) {
          location.reload();
          toast("Order deleted successfully!", {
            "theme": "auto",
            "type": "default",
            "position": "top-center",
            "dangerouslyHTMLString": true
          });
        }
        commit('setOrders', response.data);
      } catch (error) {
        console.error('Error deleting order:', error);
        if (error.response) {
          toast(`Error deleting order: ${error.response.data.message}`, {
            "theme": "auto",
            "type": "error",
            "position": "top-center",
            "dangerouslyHTMLString": true
          });
        } else {
          toast("Error deleting order. Please try again.", {
            "theme": "auto",
            "type": "error",
            "position": "top-center",
            "dangerouslyHTMLString": true
          });
        }
      }
    },

    async updateOrder({ commit, state }, { orderId, updatedOrder }) {
      try {
        const userId = state.userId || cookies.get('userId');
        console.log('userId:', userId, 'orderId:', orderId, 'payload:', updatedOrder);
        
        const apiUrl = `https://capstoneproject-1-9k8p.onrender.com/users/${userId}/order/${orderId}`;
        const response = await axios.patch(apiUrl, updatedOrder, {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        });
    
        commit('updateOrder', { orderId, updatedOrder });
    
        // SweetAlert success message (with timer)
        Swal.fire({
          icon: 'success',
          title: 'Order Updated!',
          text: 'Your order has been successfully updated.',
          confirmButtonText: 'Close',
          confirmButtonColor: 'rgb(148, 118, 103)',
          allowOutsideClick: false, 
          allowEscapeKey: false,    
          timer: 5000,             
          timerProgressBar: true,   
          willClose: () => {
          }
        });
    
        // Avoid reload if not needed
        // location.reload();
      } catch (error) {
        console.error('Error updating order:', error);
    
        // SweetAlert error message (with timer)
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'There was an error updating the order. Please try again.',
          confirmButtonText: 'Close',
          confirmButtonColor: 'rgb(148, 118, 103)',
          timer: 5000,              
          timerProgressBar: true,   
        });
      }
    }
    
    },
  modules: {
  }
})