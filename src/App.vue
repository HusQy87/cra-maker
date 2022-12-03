<template>
  <div id="app">
    <vs-navbar
        v-model="route"
        color="dark"
        text-color="rgba(255,255,255,.6)"
        active-text-color="rgba(255,255,255,1)"
        class="myNavbar">
      <div slot="title">
        <vs-navbar-title >
          CRA Gen
        </vs-navbar-title>
      </div>

      <vs-navbar-item index="0" >
        <router-link to="/">CRA</router-link>
      </vs-navbar-item>
      <vs-navbar-item index="1" v-if="!$store.state.isLoggedIn">
        <router-link to="/login">Login</router-link>
      </vs-navbar-item>
      <vs-navbar-item index="1" v-else>
        <router-link to="/profil">Profil</router-link>
      </vs-navbar-item>
      <vs-spacer></vs-spacer>
      <vs-button color="danger" v-if="$store.state.isLoggedIn" @click="$store.commit('logout')">Déconnexion</vs-button>
      <vs-button color-text="rgb(255, 255, 255)" color="rgba(255, 255, 255, 0.3)" type="flat" icon="more_horiz"></vs-button>
    </vs-navbar>
    <router-view/>
  </div>
</template>
<script>
export default {
  data(){
    return {
      route: 0
    }
  },
  mounted() {
    let token = window.localStorage.getItem('token')
    if (token){
      this.$store.commit('login', token)

    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
