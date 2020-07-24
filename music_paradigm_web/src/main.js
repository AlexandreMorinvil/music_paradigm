import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// // setup fake backend
// import { configureFakeBackend } from '@/_helpers';
// configureFakeBackend();



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')