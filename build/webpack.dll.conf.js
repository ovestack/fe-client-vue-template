const path = require('path');
const config = require('../config')
const merge = require('webpack-merge')
const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf')
const webpack = require('webpack');

const dlls = [
    'vue',
    'vue-router',
    'vuex'
];

module.exports = {
    entry: {
        dll: dlls
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        filename: utils.assetsPath('js/lib/[name].js'),
        library: '[name]'
    },
    resolve: {
        modules: [path.join(__dirname, '../src'), path.join(__dirname, '../node_modules')],
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new webpack.DllPlugin({
            /**
             * path 定义 manifest 文件生成的位置
             */
            path: path.resolve(__dirname, config.build.assetsRoot,
                utils.assetsPath('js/lib/manifest.json')),
            name: '[name]',
            /**
             * name 是dll暴露的对象名，要跟 output.library 保持一致；
             * dll bundle 输出到那个全局变量上
             */
            context: __dirname //是解析包路径的上下文，这个要跟接下来配置的 webpack.config.js 一致。
        })
    ]
}
