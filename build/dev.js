var connect = require('connect'),
    history = require('connect-history-api-fallback'),
    webpack = require('webpack'),
    webpackMiddleware = require('webpack-dev-middleware'),
    hotMiddleware = require('webpack-hot-middleware'),
    webpackConfig = require('../build/webpack.dev.conf'),
    config = require('../config'),
    serveStatic = require('serve-static')

var compiler = webpack(webpackConfig)

connect()
.use(hotMiddleware(compiler))
.use(history())
.use(serveStatic(config.dev.assetsRoot, {
    etag: false,
    lastModified: false
}))
.use(webpackMiddleware(compiler, {
    publicPath: config.dev.assetsRoot,
    stats: {
        colors: true,
        modules: false
    },
    fs: require('fs')
}))
.listen(config.dev.port)
