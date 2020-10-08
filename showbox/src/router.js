import Vue from 'vue'
import Router from 'vue-router'
import Home from './Home.vue'
import Log from './Log.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },                 
      {
        path: '/logs',
        name: 'Log',
        component: Log, 
      }
    ]
  })