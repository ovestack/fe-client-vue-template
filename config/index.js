// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var merge = require('webpack-merge')
var pkgConfig = require('../package.json')
var version = pkgConfig.version || ''

var assetsRoot = path.resolve(__dirname, '../../public', version)

var base = {
    assetsRoot: assetsRoot,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/' + (version ? version + '/' : '')
}

module.exports = {
  build: merge(base, {
    env: require('./prod.env'),
    productionSourceMap: true
  }),
  dev: merge(base, {
    env: require('./dev.env'),
    port: 8080,
    mockPort: 12345,
    proxyTable: {}
  })
}