import Vue from 'vue'
import App from './App.vue'
import dotenv from 'dotenv'
import router from './router'
import store from '@/store.js'

import Vuex from 'vuex'
import Header from '@/components/Header.vue'
import Loading from '@/components/Loading.vue'

// ----- Global Compoonents ----- //
Vue.component('app-header', Header)
//Vue.component('app-footer', footer)
Vue.component('loading', Loading)

// ----- Dependency Config ----- //
dotenv.config()

// ----- Event Bus ----- //
Vue.prototype.$eventBus = new Vue()

// ----- Vue Config ----- //
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

Vue.use(Vuex)
