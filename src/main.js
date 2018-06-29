import Vue from 'vue'
import App from './App.vue'
import 'chart.js'
import 'hchs-vue-charts'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import {routes} from './routes.js'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(window.VueCharts)
Vue.use(VueCharts);

const router = new VueRouter({routes})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
