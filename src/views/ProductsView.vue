<template>
  <div class="products">
    <SpinnerComponent v-if="loading" />

    <div v-else>
      <!-- Search and Sorting -->
      <div class="search-sort-bar">
        <div class="search-group">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search products..."
            class="form-control custom-search-input"
          />
          <button class="btn2 search-btn" @click="searchProducts">Search</button>
        </div>

        <select v-model="sortOption" class="form-select form-select-sm">
          <option value="name">Sort by Name</option>
          <option value="category">Sort by Category</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      <!-- Product Cards -->
      <div v-if="$store.state.products">
        <div class="card-container" v-if="sortedProducts.length > 0">
          <div
            class="card-item"
            v-for="product in sortedProducts"
            :key="product.prodID"
          >
            <div class="card">
              <img
                :src="product.prodUrl"
                class="card-img-top img-fluid"
                alt="Product Image"
              />
              <div class="card-body p-2">
                <h3 class="card-title">{{ product.prodName }}</h3>
                <h5 class="card-text">Category: {{ product.Category }}</h5>
                <p class="card-text">Amount: {{ product.amount }}</p>
              </div>
              <div class="card-footer">
                <button class="btn3" @click="viewMore(product.prodID)">
                  View More
                </button>
                <button class="btn4" @click="bookNow(product.prodID)">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p>No results found for "{{ searchQuery }}".</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpinnerComponent from "../components/SpinnerComponent.vue";

export default {
  components: {
    SpinnerComponent,
  },
  data() {
    return {
      searchQuery: "",
      sortOption: "name",
      loading: true,
    };
  },
  computed: {
    filteredProducts() {
      return this.$store.state.products.filter((product) =>
        product.prodName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    sortedProducts() {
      switch (this.sortOption) {
        case "name":
          return this.filteredProducts.sort((a, b) =>
            a.prodName.localeCompare(b.prodName)
          );
        case "category":
          return this.filteredProducts.sort((a, b) =>
            a.Category.localeCompare(b.Category)
          );
        case "price":
          return this.filteredProducts.sort((a, b) => a.amount - b.amount);
        default:
          return this.filteredProducts;
      }
    },
  },
  methods: {
    async getProducts() {
      this.loading = true;
      await this.$store.dispatch("getProducts");
      this.loading = false;
    },
    viewMore(productId) {
      this.$store.dispatch("getProduct", productId);
      this.$router.push({ name: "product", params: { id: productId } });
    },
    bookNow(productId) {
      const existingProduct = this.$store.state.bookedProducts.find(
        (product) => product.prodID === productId
      );
      if (existingProduct) {
        this.$store.commit("updateBookedProductQuantity", {
          prodID: productId,
          quantity: existingProduct.quantity + 1,
        });
      } else {
        this.$store.dispatch("getProduct", productId).then((product) => {
          this.$store.commit("setBookedProduct", product);
        });
      }

      if (this.$cookies.get("token")) {
        this.$router.push({ name: "checkout", params: { prodID: productId } });
      } else {
        this.$router.push({ name: "login" });
      }
    },
    searchProducts() {
      this.getProducts();
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style scoped>
/* Layout for search/sort */
.search-sort-bar {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 50px;
  padding: 0 20px;
  gap: 10px;
}

/* Flex-based card layout */
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  padding: 40px 0;
}

.card-item {
  flex: 1 1 calc(25% - 40px);
  max-width: 300px;
  box-sizing: border-box;
  margin: 10px;
}

@media (max-width: 320px) {
.search-sort-bar{
  position: relative;
  right: 30px;
}
.card{
  margin-bottom: 0px;
}
}

@media (max-width: 1024px) {
  .card-item {
    flex: 1 1 calc(33.333% - 40px);
  }
}

@media (max-width: 768px) {
  .card-item {
    flex: 1 1 calc(50% - 40px);
  }
  .form-select {
    position: relative;
    bottom: 20px;
    width: 100%;
    max-width: 300px;
    align-self: center;
  }

}

@media (max-width: 390) {
  .search-sort-bar{
    position: relative;
    left: 25px;
  }
}

@media (max-width: 480px) {
  .card-item {
    flex: 1 1 100%;
    position: relative;
    bottom: 50px;
    margin: 0px 0;
  }
  /* .search-group {
    width: 100%;
    flex-direction: column;
    gap: 10px;
  } */


  .custom-search-input {
    width: 200px !important; 
    margin-bottom: 10px;
    align-self: center;
    position: relative;
    left: 45px;
    align-items: center;
  }

  .search-btn {
    /* width: 100%; */
    /* max-width: 200px;   */
    position: relative;
    bottom: 48px !important;
    align-self: center;
    align-items: center;
  }

  .form-select {
    width: 255px !important; 
    align-self: center;
    position: relative;
    left: 45px;
    align-items: center;
  }
  .card-container {
    gap: 0px; 
    padding: 0px 0px; 
  }
  .card {
    margin-top: 10px; 
  }
}

/* Card Styling */
.card {
  margin: auto;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid rgb(148, 118, 103);
  height: 520px;
  transition: all 0.3s ease-in-out;
  margin-top: 70px;
}
.card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.card-footer {
  border-top: none;
  background-color: transparent;
}

.btn3, .btn4 {
  color: white;
  background-color: rgb(148, 118, 103);
  padding: 7px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  transition: transform 0.3s ease-in-out;
  font-family: "Cormorant", serif;
}
.btn3:hover, .btn4:hover {
  transform: scale(1.05);
}
.btn3:active, .btn4:active {
  transform: scale(1.1);
  color: rgb(148, 118, 103);
  background-color: white;
}

.card-title, .card-text {
  font-family: "Cormorant", serif;
  font-style: normal;
}

.form-control {
  width: 280px;
  font-family: "Cormorant", serif;
  font-style: italic;
  font-weight: 800;
}

.form-select {
  width: 400px;
  height: 40px;
  border: 2px solid rgb(148, 118, 103);
  font-family: "Cormorant", serif;
  font-weight: 800;
}

.btn2 {
  position: relative;
  left: 165px;
  bottom: 38px;
  height: 38px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: rgb(148, 118, 103);
  font-family: "Cormorant", serif;
}

.btn2:hover{
  color:  rgb(148, 118, 103);
  background-color: white;
}
</style>
