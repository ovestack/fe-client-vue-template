// 添加路由
// 声明路由规则, filePath相对路径为 pages,用于动态加载路由文件
var testRouter = {
    path: '/test'
}

// 路由配置，新增的路由需要调用 addRouter加入到路由中
var routers = addRouter(
    testRouter
)

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

buildRouter(routers)

export default routers
