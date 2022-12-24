import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    loaded: false

  },
  getters: {
  },
  mutations: {
    login(state, token){
      window.localStorage.setItem('token', token)
      state.isLoggedIn = true
    },
    logout(state){
      state.isLoggedIn = false
      window.localStorage.clear()
    }
  },
  actions: {
  },
  modules: {
  }
})
