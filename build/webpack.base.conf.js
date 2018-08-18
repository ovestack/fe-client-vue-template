var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/main.js')
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        modules: [path.join(__dirname, '../src'), path.join(__dirname,
            '../node_modules')],
        extensions: ['.js', '.vue'],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'action': path.resolve(__dirname, '../src/action'),
            'store': path.resolve(__dirname, '../src/store'),
            'pages': path.resolve(__dirname, '../src/pages'),
            'components': path.resolve(__dirname, '../src/components'),
            'modules': path.resolve(__dirname, '../src/modules'),
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    resolveLoader: {
        modules: [path.join(__dirname, '../node_modules')]
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: [
                'cache-loader', {
                loader: 'vue-loader',
                options: {
                loaders: Object.assign(utils.cssLoaders(process.env.NODE_ENV ===
                    'production' ? {
                        sourceMap: config.build.productionSourceMap,
                        extract: true,
                        usePostcss: true
                    } : {}), {
                        i18n: '@kazupon/vue-i18n-loader'
                    })
                } 
            }]
        }, {
            test: /\.js$/,
            use: [
                'cache-loader',
                'babel-loader',
            {
                loader: path.join(__dirname, './router-loader')
            }],
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.(html|tpl)$/,
            loader: 'html-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 5000,
                name: utils.assetsPath(process.env.NODE_ENV ===
                    'production' ? 'img/[hash:7].[ext]' :
                    'img/[name].[hash:5].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 50,
                name: utils.assetsPath(process.env.NODE_ENV ===
                    'production' ?
                    'fonts/[name].[hash:7].[ext]' :
                    'fonts/[name].[ext]')
            }
        }]
    }
}
