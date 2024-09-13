import { createStore } from 'vuex'
import axios from 'axios'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useCookies } from 'vue3-cookies'
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
        console.log('Attempting to add product...');
        const response = await axios.post('https://capstoneproject-1-9k8p.onrender.com/products', newProduct);
        console.log('Response from server:', response);
        commit('setProducts', [...this.state.products, response.data]);
        location.reload();
        toast("Product added successfully!", {
          "theme": "auto",
          "type": "default",
          "position": "top-center",
          "dangerouslyHTMLString": true
        });
      } catch (error) {
        console.error('Error adding product:', error);
        toast("Error adding product. Please try again.", {
          "theme": "auto",
          "type": "error",
          "position": "top-center",
          "dangerouslyHTMLString": true
        });
      }
    },

    async updateProduct({ commit, state }, product) {
      try {
        const response = await axios.patch(`https://capstoneproject-1-9k8p.onrender.com/products/${product.prodID}`, product);
        commit('updateProductInArray', product);
        location.reload();
        // Update bookedProducts array if the product is already booked
        const bookedProductIndex = state.bookedProducts.findIndex(bp => bp.prodID === product.prodID);
        if (bookedProductIndex !== -1) {
          state.bookedProducts[bookedProductIndex] = product;
        }
    
        return response.data;
      } catch (error) {
        console.error('Error updating product:', error);
        throw error; 
      }
    },

    async deleteProduct({ commit, state }, prodID) {
      try {
        const response = await axios.delete(`https://capstoneproject-1-9k8p.onrender.com/products/${prodID}`);
        if (response.data.message) {
          location.reload();
          toast("Product deleted successfully!", {
            "theme": "auto",
            "type": "default",
            "position": "top-center",
            "dangerouslyHTMLString": true
          });
          commit('deleteProduct', prodID);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        toast("Error deleting product. Please try again.", {
          "theme": "auto",
          "type": "error",
          "position": "top-center",
          "dangerouslyHTMLString": true
        });
      }
    },

    async updateUser({ commit, state: { token } }, { updatedUser }) {
      const userId = this.$route.params.id;
      if (!userId) {
        console.error('Error: userId is undefined');
        return;
      }
      try {
        const response = await axios.patch(`https://capstoneproject-1-9k8p.onrender.com/users/${userId}`, updatedUser, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          commit('updateUser', updatedUser);
          location.reload();
          toast("User updated successfully!", {
            "theme": "auto",
            "type": "default",
            "position": "top-center",
            "dangerouslyHTMLString": true
          });
        } else {
          console.error('Error updating user:', response.data);
          toast("Error updating user. Please try again.", {
            "theme": "auto",
            "type": "error",
            "position": "top-center",
            "dangerouslyHTMLString": true
          });
        }
      } catch (error) {
        console.error('Error updating user:', error);
        toast("Error updating user. Please try again.", {
          "theme": "auto",
          "type": "error",
          "position": "top-center",
          "dangerouslyHTMLString": true
        });
      }
    },
      
    // Users

    async loginUser({ commit }, info) {
      console.log(info)
      try {
        const response = await axios.post('https://capstoneproject-1-9k8p.onrender.com/users/login', info);
        console.log(response)
        const token = response.data.token;
        const refreshToken = response.data.refreshToken
        const userId = response.data.user.userID;
        const userRole = response.data.user.userRole; 
        commit('setToken', token);
        commit('setRefreshToken', refreshToken);
        commit('setUserId', userId);
        commit('setUserRole', userRole); 
        commit('setLoggedIn', false)
        cookies.set('token', token);
        cookies.set('refreshToken', refreshToken);
        cookies.set('userId', userId);
        if (userRole === 'Admin') {
          cookies.set('role', 'Admin');
        }
        console.log('Token:', token);
        console.log('Refresh Token:', refreshToken);
        console.log('UserId:', userId);
        console.log('UserRole:', userRole);
        
        if (response.data.message) {
          toast("Logged In Successfully!!", {
            "theme": "auto",
            "type": "default",
            "position": "top-center",
            "dangerouslyHTMLString": true
          });
        }
        await router.push('/');
        location.reload();
        return userId; 
      } catch (error) {
        console.error(error);
        toast("Login Failed. Please try again.", {
          "theme": "auto",
          "type": "error",
          "position": "top-center",
          "dangerouslyHTMLString": true
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
        const response = await axios.patch(`https://capstoneproject-1-9k8p.onrender.com/users/${userId}`, updatedUser, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        commit('updateUser', updatedUser);
        location.reload();
        toast("User updated successfully!", {
          "theme": "auto",
          "type": "default",
          "position": "top-center",
          "dangerouslyHTMLString": true,
          "timeout": 3000 
        });
      } catch (error) {
        console.error('Error updating user:', error);
        toast("Error updating user. Please try again.", {
          "theme": "auto",
          "type": "error",
          "position": "top-center",
          "dangerouslyHTMLString": true,
          "timeout": 3000 
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

    async insertUser({ commit },newUser) {
      try {
        const response = await axios.post('https://capstoneproject-1-9k8p.onrender.com/users', newUser);
        commit('setUser', response.data);
        location.reload();
        toast("User added successfully!", {
          "theme": "auto",
          "type": "default",
          "position": "top-center",
          "dangerouslyHTMLString": true,
          "timeout": 3000 
        });
      } catch (error) {
        console.error('Error adding user:', error);
        toast("Error adding user. Please try again.", {
          "theme": "auto",
          "type": "error",
          "position": "top-center",
          "dangerouslyHTMLString": true,
          "timeout": 3000 
        });
      }
    },
    
    async deleteUser({ commit, state }, userId) {
      try {
        if (!userId) {
          throw new Error('User ID is required');
        }
        const apiUrl = `https://capstoneproject-1-9k8p.onrender.com/users/${userId}`;
        const response = await axios.delete(apiUrl, {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        });
        if (response.data.message) {
          location.reload();
          commit('setUser', null); 
          toast("User deleted successfully!", {
            "theme": "auto",
            "type": "default",
            "position": "top-center",
            "dangerouslyHTMLString": true,
            "timeout": 3000 
          });
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        toast("Error deleting user. Please try again.", {
          "theme": "auto",
          "type": "error",
          "position": "top-center",
          "dangerouslyHTMLString": true,
          "timeout": 3000 
        });
      }
    },

    // Orders

    async insertOrderDb({ commit, state }, payload) {
      const { productId, checkInDate, userId } = payload;
      console.log('insertOrderDb checkInDate:', checkInDate);
      try {
        const token = state.token;
        const userId = state.userId || cookies.get('userId');
        console.log('Inserting order with:', { productId, userId, checkInDate });
        const response = await axios.post(`https://capstoneproject-1-9k8p.onrender.com/users/${userId}/order`, {
          prodID: productId,
          date: checkInDate,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.message) {
          location.reload();
          toast("Order saved successfully!", {
            "theme": "auto",
            "type": "default",
            "position": "top-center",
            "dangerouslyHTMLString": true
          });
        }
      } catch (error) {
        console.error(error);
        toast("Error saving order. Please try again.", {
          "theme": "auto",
          "type": "error",
          "position": "top-center",
          "dangerouslyHTMLString": true
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
        const apiUrl = `https://capstoneproject-1-9k8p.onrender.com/users/${userId}/order/${orderId}`;
        const response = await axios.patch(apiUrl, updatedOrder, {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        });
        commit('updateOrder', updatedOrder);
        location.reload();
        toast("Order updated successfully!", {
          "theme": "auto",
          "type": "default",
          "position": "top-center",
          "dangerouslyHTMLString": true
        });
        router.push({ path: router.currentRoute.path }); 
      } catch (error) {
        console.error('Error updating order:', error);
        toast("Error updating order. Please try again.", {
          "theme": "auto",
          "type": "error",
          "position": "top-center",
          "dangerouslyHTMLString": true
        });
      }
    },
    },
  modules: {
  }
})