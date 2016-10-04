import Vue from 'vue'
import router from './router'
import store from 'store'

document.addEventListener('DOMContentLoaded', function() {
    new Vue({
        store,
        router
    }).$mount('#app')
})