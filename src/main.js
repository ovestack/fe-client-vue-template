import 'es6-promise/auto'
import Vue from 'vue'
import router from 'router'
import store from 'store'
import i18n from 'lang'

require('modules/mixins')
require('modules/directives')
require('modules/filters')
require('modules/components')

new Vue({
    i18n,
    router,
    store
}).$mount('#app')