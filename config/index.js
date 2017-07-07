// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var merge = require('webpack-merge')
var pkgConfig = require('../package.json')
var version = pkgConfig.version || ''

var assetsRoot = path.resolve(__dirname, '../public')

var argv = {};
process.argv.forEach(function(item){
    if(item.indexOf("=") !== -1){
        item = item.split("=");
        argv[item[0]] = item[1] || undefined;
    }
});

var base = {
    assetsRoot: assetsRoot,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/'
}

module.exports = {
    build: merge(base, {
        env: require('./prod.env'),
        productionSourceMap: false
    }),
    dev: merge(base, {
        env: require('./dev.env'),
        port: 8080
    })
}
