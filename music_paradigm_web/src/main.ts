import 'bootstrap-icons/font/bootstrap-icons.css'

import App from './App.vue';
import Vue from 'vue';
import router from './router';
import store from './store';

// FIXME: Remoe this completely
// import vuetify from '@/plugins/vuetify';

import i18n from './i18n'

Vue.config.productionTip = false;

new Vue({
    router,
    store,

    // FIXME: Remove this completely
    // vuetify,
    
    i18n,
    render: (h) => h(App)
}).$mount('#app');
