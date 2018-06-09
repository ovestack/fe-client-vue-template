import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

var buildMap = function(rules, routes) {
    for(var i in rules) {
        if (rules.hasOwnProperty(i)) {
            var rule = rules[i]
            var ret = {
                path: i,
                name: rule.name,
                component: rule.file && (function(rule){
                    return function(resolve) {
                        return import('../pages' + rule.file)
                    }
                })(rule)
            }
            if (i === '/index') {
                ret.alias = '/'
            }
            if (rule.subRoutes) {
                ret.children = []
                buildMap(rule.subRoutes, ret.children)
            }
            routeHook(ret, rules, i)
            routes.push(ret)
        }
    }
}

function routeHook(routeConf, rules, ruleKey) {
    // your logic here
}

var routes = []

buildMap(__ROUTER_MAP__, routes)

var router = new VueRouter({
    mode: 'history',
    routes: routes
})

export default router