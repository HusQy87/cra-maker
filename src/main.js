import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax'
import router from './router'
import 'vuesax/dist/vuesax.css'
import axios from "@/plugins/axios";
import store from './store'
Vue.config.productionTip = false


Vue.use(Vuesax)

Vue.use(axios, {baseUrl: process.env.VUE_APP_API_BASE_URL, token: window.localStorage.getItem('token')})
new Vue({
 router,
 store,

 // router,
 render: h => h(App)
}).$mount('#app')
