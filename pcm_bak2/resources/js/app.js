window._ = require('lodash');
window.axios = require('axios');
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// let token = document.head.querySelector('meta[name="csrf-token"]');

// if (token) {
//     window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
// } else {
//     console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
// }
import './bootstrap';
// document.querySelector('meta[name=csrf-token]').getAttribute('content');
// console.log(token)
// require('./bootstrap');

window.Vue = require('vue');
// window.Vue.http.options.credentials = true;
import VueI18n from 'vue-i18n'

import ElementUI from 'element-ui';

// import enLocale from 'element-ui/lib/locale/lang/en'
// import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)


import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'big', zIndex: 3000 });

import {messages} from './messages.js';

const i18n = new VueI18n({
    locale: 'zhLocale', // 语言标识
    messages
})
// console.log(ElementUI.Menu.computed.hoverBackground)

import router from './routes.js';
import store from './store.js';
const bus = new Vue();
Vue.prototype.bus = bus;

import './permission.js';
import env from './prod.env';
window.env = env;
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    // el: '#app',
    router,
    i18n,
  	store
}).$mount('#app');
