import Vue from 'vue'
import App from './App.vue'
import dotenv from 'dotenv'
import router from './router'
import Header from '@/components/Header.vue'

// ----- Global Compoonents ----- //
Vue.component('app-header', Header)
//Vue.component('app-footer', footer)


// ----- Dependency Config ----- //
dotenv.config()

// ----- Vue Config ----- //
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
