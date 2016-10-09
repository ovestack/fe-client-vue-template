import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

var router = new VueRouter({
	hashbang: false
})

var buildMap = function(rules) {
    var ret = {}
    for(var i in rules) {
        if (rules.hasOwnProperty(i)) {
            var rule = rules[i]
            ret[i] = {
                name: rule.name,
                component: (function(rule){
                    return function(resolve) {
                        require(['./pages' + rule.file],resolve)
                    }
                })(rule)
            }
            if (rule.subRoutes) {
                ret[i].subRoutes = buildMap(rule.subRoutes)
            }
        }
    }
    return ret
}

var routerMap = buildMap(__ROUTER_MAP__)

router.map(routerMap)

router.redirect({
	'*': '/',
})

routerMap = null

export default router