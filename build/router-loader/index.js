const path = require('path'),
    fs = require('fs'),
    DIR = path.resolve(__dirname,'../../src/pages')

var routeMap = {
    _pwd: '',
    _parent: ''
}

function removeCircular(obj) {
    for(var i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (i[0] === '_') {
                obj[i] = null
                delete obj[i]
            }
            if (typeof obj[i] === 'object') {
                removeCircular(obj[i])
            }
        }
    }
}

function resolvePath(dir) {
    return dir.split(path.sep).join('/')
}

function getCloseSub(map) {
    var el = map
    while(el) {
        if (el._isSub) {
            return el
        }
        el = el._parent
    }
}

function getReleativeSubPath(realPath) {
    var index = realPath.lastIndexOf('@sub')
    if (index !== -1) {
        return resolvePath(realPath.slice(index + 4))
    }
}

function getComponentName(realPath) {
    return Camelize(resolvePath(path.dirname(realPath).replace(DIR,'').replace(/\/@sub/g,'')))
}

function getComponentFile(realPath) {
    return resolvePath(realPath.replace(DIR,''))
}

function Camelize(prop){
    if (prop.indexOf('/') === 0) {
        prop = prop.slice(1)
    }
	return prop.replace(/\/([a-z])/ig,function(all,letter){
        return letter.toUpperCase()
    })
}

function genRouterMap(dir,map,parent){
    var fss = fs.readdirSync(dir)
    map._parent = parent
    map._pwd = dir.replace(DIR, '')
    fss.forEach(function(f){
        var basename = path.basename(f),
            realPath = path.resolve(dir,f)
        if(basename[0] === '_') return
        var stat = fs.statSync(realPath)
        if(stat.isDirectory()){
            if (basename === '@sub') {
                map.subRoutes = {}
                map.subRoutes._isSub = true
                genRouterMap(realPath,map.subRoutes,map)
            } else {
                var el = getCloseSub(map)
                if (el) {
                    basename = getReleativeSubPath(realPath)
                    el[basename] = {}
                    genRouterMap(realPath,el[basename],el)
                } else {
                    basename = resolvePath(map._pwd + '/' + basename)
                    routeMap[basename] = {}
                    genRouterMap(realPath,routeMap[basename],routeMap)
                }
            }
        } else {
            var extname = path.extname(realPath)
            if (extname !== '.vue') return
            var basename = path.basename(realPath).replace(extname,''),
                dirname = path.dirname(realPath).split(path.sep).pop()
            if (basename === dirname.split(path.sep).pop()) {
                map.file = getComponentFile(realPath)
                map.name = getComponentName(realPath)
            }
        }
    })
    return map
}

routeMap['/'] = {}
genRouterMap(DIR,routeMap['/'],routeMap)
removeCircular(routeMap)
if (routeMap.hasOwnProperty('/index')) {
    routeMap['/'] = routeMap['/index']
    routeMap['/index'] = null
    delete routeMap['/index']
}

module.exports = function(content) {
    this.cacheable()
    content = content.replace('__ROUTER_MAP__',JSON.stringify(routeMap))
    return content
}