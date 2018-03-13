import {
    merge
} from 'modules/util'
import VueI18n from 'vue-i18n'
import Vue from 'vue'
Vue.use(VueI18n)

var resolvers = require.context('../lang', true)
var messages = {}

resolvers.keys().forEach(function(r) {
    if (r === './index.js') return
    var message = resolvers(r)
    if (resolvers(r).default) {
        message = resolvers(r).default
    }
    merge(messages, message)
})

const i18n = new VueI18n({
    locale: 'ja',
    messages
})

export default i18n