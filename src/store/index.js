import Vuex from 'vuex'
import Vue from 'vue'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
    modules: getModules(),
    strict: true
})

function getModules() {
    var resolvers = require.context('../store', true, /\/index\.js$/)
    var modules = {}
    resolvers.keys().forEach(function(r) {
        if (r === './index.js') return
        var mod = resolvers(r)
        if (resolvers(r).default) {
            mod = resolvers(r).default
        }
        var modPath = Camelize(r)
        modules[modPath] = mod
    })
    return modules
}

function Camelize(prop){
    prop = prop.replace('./', '').replace('/index.js', '')
	return prop.replace(/\/([a-z])/ig,function(all,letter){
        return letter.toUpperCase()
    })
}