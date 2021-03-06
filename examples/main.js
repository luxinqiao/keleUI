import Vue from 'vue'
Vue.config.productionTip = false

import qs from 'qs'
Vue.prototype.$qs = qs

import {axios} from './axios/index.js'
Vue.prototype.$axios = axios
Vue.prototype.$domain = 'http://106.15.63.76:3000/'

import keleUI from '../packages/index'
Vue.use(keleUI)

import router from './router'
import App from './App.vue'
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
