import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'

Vue.use(Vuetify)
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

new Vue({
  vuetify : new Vuetify(),
  router,
  render: h => h(App),
}).$mount('#app')