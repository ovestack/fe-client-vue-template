require('shelljs/global')

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var conf = './webpack.prod.conf'

var webpackConfig = require(conf)
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)

var callback = function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
}

var spinner = ora('building...')

rm('-rf', config.build.assetsRoot)
mkdir('-p', assetsPath)
spinner.start()
webpack(webpackConfig, callback)

