import 'es6-promise/auto'
import Vue from 'vue'
import router from 'router'
import store from 'store'

require('modules/mixins')
require('modules/directives')
require('modules/filters')
require('modules/components')

new Vue({
    router,
    store
}).$mount('#app')