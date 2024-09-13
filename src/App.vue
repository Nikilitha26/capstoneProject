<template scoped>
  <div>
  <!-- <div :style="{backgroundColor:$route.path=='#fffeb6'}"> -->
  
    <NavbarComponent v-if="!loading" />
    <router-view  />
    <FooterComponent v-if="!loading" />
  </div>
</template>

<script>
import NavbarComponent from '../src/components/NavbarComponent.vue'
import FooterComponent from '../src/components/FooterComponent.vue'



export default {
  components: {
    NavbarComponent,
    FooterComponent,
  },
  computed: {
    sessionExpired() {
      return this.$store.state.sessionExpired;
    }
  },
  methods: {
    sessionContinued() {
      this.$store.commit('setSessionExpired', false);
    }
  }
}

</script>
<style>
div{
  height: 100hv;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  /* color: #2c3e50; */
}

/* nav a.router-link-exact-active {
  color: #42b983;
} */
</style>