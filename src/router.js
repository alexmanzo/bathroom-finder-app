import Vue from 'vue'
import Router from 'vue-router'
import AddNew from '@/views/AddNew.vue'
import Home from '@/views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/add-new',
      name: 'addNew',
      component: AddNew,
    },
  ],
})
