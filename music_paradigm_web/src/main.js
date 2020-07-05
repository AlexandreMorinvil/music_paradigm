import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import svg from 'vue-svg-directive' // SVG file loader

// // bootstrap
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

// // setup fake backend
// import { configureFakeBackend } from '@/_helpers';
// configureFakeBackend();

// // bootstrap
// Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


Vue.use(svg, {
  sprites: '/assets/sprites.svg', // Path to your svg sprite
  class: 'icon' // This class will be applied to your <svg> elements (optional)
});