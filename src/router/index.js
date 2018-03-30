import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

var buildMap = function(rules, routes, isSub) {
    for(var i in rules) {
        if (rules.hasOwnProperty(i)) {
            var rule = rules[i]
            var ret = {
                path: isSub ? i.replace('/', '') : i,
                name: rule.name,
                component: (function(rule){
                    return function(resolve) {
                        return import('../pages' + rule.file)
                    }
                })(rule)
            }
            if (rule.subRoutes) {
                ret.children = []
                buildMap(rule.subRoutes, ret.children, true)
            }
            routes.push(ret)
        }
    }
}

var routes = []

buildMap(__ROUTER_MAP__, routes)

var router = new VueRouter({
    mode: 'history',
    routes: routes
})

export default router