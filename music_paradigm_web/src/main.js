import 'bootstrap-icons/font/bootstrap-icons.css'

import App from './App.vue';
import Vue from 'vue';
import router from './router';
import store from './store';
import vuetify from '@/plugins/vuetify';
import i18n from './i18n'

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: (h) => h(App)
}).$mount('#app');
