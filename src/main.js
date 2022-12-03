import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax'
import router from './router'
import 'vuesax/dist/vuesax.css'
import axios from "@/plugins/axios";
Vue.config.productionTip = false


Vue.use(Vuesax)
Vue.use(axios, {baseUrl: 'http://localhost:80'})
new Vue({
 router,

 // router,
 render: h => h(App)
}).$mount('#app')
