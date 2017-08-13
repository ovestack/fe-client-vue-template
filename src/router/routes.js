function addRouter(...routes) {
    var route = []
    routes.forEach(function(r) {
        r = [].concat(r)
        route.push.apply(route, r)
    })
    return route
}

function Camelize(prop){
    if (prop.indexOf('/') === 0) {
        prop = prop.slice(1)
    }
	return prop.replace(/\/([a-z])/ig,function(all,letter){
        return letter.toUpperCase()
    })
}

// 生成路由规则
function buildRouter(routes) {
    routes.forEach(function(route) {
        route.name = Camelize(route.filePath || route.path)
        route.meta = route.meta || {}
        route.meta.matchPath = route.path
        route.filePath = route.filePath || route.path
        route.component = (function(route) {
            var path = route.filePath
            return function() {
                return import('../pages' + path + '/index.vue')
            }
        })(route)
        delete route.filePath
        if (route.children) {
            buildRouter(route.children)
        }
    })
}

var routers = []

// 获取所有页面路由配置
var resolvers = require.context('../pages', true, /\/route\.js$/)

resolvers.keys().forEach(function(r) {
    var route = resolvers(r)
    if (resolvers(r).default) {
        route = resolvers(r).default
    }
    routers = addRouter(route)
})

buildRouter(routers)

export default routers
