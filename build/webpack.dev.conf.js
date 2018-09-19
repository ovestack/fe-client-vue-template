var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var NyanProgressPlugin = require('nyan-progress-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var WriteFileWebpackPlugin = require('write-file-webpack-plugin')
var path = require('path')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client?noInfo=true'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders()
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: config.dev.assetsRoot,
        publicPath: config.dev.assetsPublicPath,
        filename: utils.assetsPath('js/[name].[hash:6].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:6].chunk.js')
    },
    plugins: [
        new CleanWebpackPlugin([
            'public/*.json',
            'public/*.hot-update.js'
        ], {
            root: path.resolve(__dirname, '../')
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            dllfile: config.dev.assetsPublicPath + 'static/js/lib/dll.js',
            template: path.resolve(__dirname, '../index.ejs'),
            inject: true
        }),
        new NyanProgressPlugin({
            nyanCatSays: function (p, m) {
                if (p === 1) {
                    return 'complete!'
                } else {
                    return 'building...'
                }
            }
        }),
        new webpack.DllReferencePlugin({
            context: __dirname, //context 需要跟dll中的保持一致，这个用来指导 Webpack 匹配 manifest 中库的路径；
            manifest: require('../public/static/js/lib/manifest.json')
        }),
        new WriteFileWebpackPlugin()
    ],
    mode: 'development'
})
