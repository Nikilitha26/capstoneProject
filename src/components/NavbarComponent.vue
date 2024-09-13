<template>
    <nav class="navbar navbar-expand-lg ">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img src="https://nikilitha26.github.io/capstoneImages/Screenshot_2024-09-08_190103-removebg-preview.png" alt="Logo" width="180" height="100">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="right">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
  <li class="nav-item" :class="{ active: $route.path === '/' }">
    <router-link class="nav-link" to="/">Home</router-link>
  </li>
  <li class="nav-item" :class="{ active: $route.path === '/about' }">
    <router-link class="nav-link" to="/about">About</router-link>
  </li>
  <li class="nav-item" :class="{ active: $route.path === '/products' }">
    <router-link class="nav-link" to="/products">Products</router-link>
  </li>
  <li class="nav-item" :class="{ active: $route.path === '/checkout' }">
    <router-link class="nav-link" to="/checkout">Checkout</router-link>
  </li>
  <li class="nav-item" v-if="isAdmin" :class="{ active: $route.path === '/admin' }">
    <router-link class="nav-link" to="/admin">Admin</router-link>
  </li>
  <li class="nav-item" :class="{ active: $route.path === '/contact' }">
    <router-link class="nav-link" to="/contact">Contact</router-link>
  </li>
</ul>
        </div>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item" v-if="!this.$cookies.get('token')">
              <router-link to="/login">
                <img src="https://nikilitha26.github.io/capstoneImages/download%20(2).png" alt="Login" width="60" height="50" class="rounded-circle mx-3" style="cursor: pointer;">
              </router-link>
            </li>
            <li class="nav-item" v-else>
              <img src="https://nikilitha26.github.io/capstoneImages/download%20(2).png" alt="User Profile" width="50" height="50" class="rounded-circle mx-3" @click="showOffcanvas" style="cursor: pointer;" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
            </li>
          </ul>
        </div>
      </div>
    </nav>
  
    <!-- Offcanvas -->
    <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div class="offcanvas-header">
        <h3 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">My Account</h3>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="left-align">
          <div class="d-flex flex-column align-items-start">
            <img id="profile" :src="userProfile" alt="User Profile" width="80" height="70" class="rounded-circle mb-3" style="background-color: transparent;">
            <h4 class="mb-0">{{ userName }} {{ userSurname }}</h4>
          </div>
        </div>
        <ul class="list-unstyled">
  <li id="list-unstyled"><router-link to="/details">👤 My Details</router-link></li>
  <hr style="border: 1px solid black; margin: 10px 0;"> 
  <li id="list-unstyled"><router-link to="/orders">📆 My Bookings</router-link></li>
  <hr style="border: 1px solid rgb(96, 56, 38); margin: 10px 0;"> 
  <li id="list-unstyled"><router-link to="/settings">🔧 Settings</router-link></li>
  <hr style="border: 1px solid rgb(96, 56, 38); margin: 10px 0;">
  <li v-if="!this.$cookies.get('token')"><router-link to="/login">Log In</router-link></li>
  <li v-else><button class="btn15" @click="logOut()">Log Out</button></li>
</ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isAdmin: false,
        userProfile: '',
        userName: '',
        userSurname: ''
      }
    },
    mounted() {
      if (this.$cookies.get('token') && this.$cookies.get('role') === 'Admin') {
        this.isAdmin = true
      }
      this.getUserDetails();
    },
    methods: {
      async getUserDetails() {
        const userId = this.$cookies.get('userId');
        console.log('User ID:', userId);
        await this.$store.dispatch('getUserById', userId);
        const user = this.$store.state.user;
        console.log('User data:', user); 
        if (user && user.length > 0) {
          this.userName = user[0].firstName;
          this.userSurname = user[0].lastName;
          this.userProfile = user[0].userProfile;
        }
      },
      logOut() {
        this.$cookies.remove('token');
        this.$cookies.remove('role');
        this.isAdmin = false
        this.$router.push('/login'); 
      },
      showOffcanvas() {
        const offcanvas = document.getElementById('offcanvasWithBothOptions');
        const bsOffcanvas = new bootstrap.Offcanvas(offcanvas);
        bsOffcanvas.show();
      }
    }
  }
  </script>
  <style>

  .nav-item.active {
  background-color: white;
  color: rgb(151, 126, 114) !important;
}
.nav-item.active .nav-link {
  color: rgb(151, 126, 114) !important;
}
nav {
  position: absolute;
  background-color:rgb(151, 126, 114);
  padding: 1rem; 
}

.right{
    position: relative;
    left: 650px;
}

/* .nav-link {
  color: #ffffff !important; 
  margin-right: 20px; 
} */

.nav-link:hover {
  background: #ffffff ;
  color: rgb(151, 126, 114) ;
}
  
  .offcanvas {
    margin-right: 0rem;
  }
  
  #profile {
    position: relative;
    bottom: 15px
  }
  
 /*  offcanvas */
 #list-unstyled{
  text-align: start;
  color: black;
 }
 .list-unstyled a {
    text-decoration: none;
    color: #337ab7;
  }

  .offcanvas-body .list-unstyled a {
  color: rgb(96, 56, 38) !important;
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
  font-size: 18px;
  /* position: relative;
  left: 130px; */
}
  
  .btn-close {
    background-color: transparent;
    border: none;
    padding: 0.5rem 0.5rem;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .btn-close:hover {
    background-color: #f0f0f0;
    color: (148, 118, 103)

  }
  
.btn15{
  background-color: rgb(148, 118, 103);
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 50px;
  padding: 7px;
}
.mb-0{
  position: relative;
  bottom: 20px;
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
  font-size: 26px;
  /* left: 100px; */
}

.offcanvas-title{
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
  font-size: 30px;
}

#profile{
  position: relative;
  right: 10px;
}

  .router-link-active {
    color: #337ab7;
  }
  
  .router-link-exact-active {
    color: #23527c;
  }

  @media only screen and (max-width: 990px) {
  nav {
    flex-direction: column; 
  }
  .navbar-nav {
    flex-direction: column;
  }
  .nav-link {
    font-size: 0.8rem; 
    margin-right: 0; 
    border-radius: 0.25rem; 
    padding: 0.5rem 0.5rem; 
  }
  .right {
    position: static;
    left: 0;
  }
  .offcanvas {
    margin-right: 0rem;
  }
}

@media only screen and (max-width: 1250px) {
  nav {
    flex-direction: column;
  }
  .navbar-nav {
    flex-direction: column;
  }
  .nav-link {
    font-size: 0.8rem;
    margin-right: 0;
    border-radius: 0.25rem;
    padding: 0.5rem 0.5rem;
    text-align: center;
  }
  .right {
    position: static;
    left: 0;
  }
  .offcanvas {
    margin-right: 0rem;
  }
}
  </style>