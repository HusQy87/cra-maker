import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView";
import ProfilView from "@/views/ProfilView";
import store from "@/store";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/profil',
    name: 'profil',
    component: ProfilView,
    beforeEnter: loggedGuard()
  },

]


function loggedGuard(){
  if (!store.state.isLoggedIn){
    return false
  }
}
const router = new VueRouter({
  routes
})

export default router
