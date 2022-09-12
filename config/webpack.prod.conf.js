const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 不带大括号名字可变 导入的是默认的导出 带大括号名字不可变 导入的是指定名字的导出
const {VueLoaderPlugin} = require('vue-loader')

const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')
const utils = require('../build/utils')

const env = process.env.NODE_ENV === 'test' ? require('./env/test.env') : require('./env/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
    module: {
        // 这里用rules不用loaders是因为loaders在将来会被废弃
        rules: utils.styleLoaders({
            sourceMap: config.prod.productionSourceMap,
            // 这俩自定义属性会在utils.js对应位置生效
            extract: true,
            usePostCSS: true
        })
    },
    output: {
        // 打包目录
        path: config.prod.assetsRoot,
        // js打包放在js目录下
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        // 懒加载js
        chunkFilename: utils.assetsPath('js/[name].[chunkhash].min.js'),
    },
    // webpack4新加的用于模块分离的子项 配合SplitChunksPlugin替换webpack.optimize.CommonsChunkPlugin 在父子关系引用和加载上做了一些优化
    optimization: {
        splitChunks: {
            // 一共有三种模式: async/initial/all 用来对动态模块(import/require.ensure)和非动态模块(require)配置分包规则
            // 默认情况下为async async模式下 动态模块打包进该vendor 非动态模块不进行分块打包
            // initial模式下 非动态模块打包进该vendor 动态模块分块打包 和async模式有点相反
            // all模式下 动态和非动态模块都会进行分包
            chunks: 'async',
            // 大于等于30K的chunk会被拆分
            minSize: 30000,
            // 最大拆分大小限制 默认为0即不做限制
            maxSize: 0,
            // 拆分引入计数 如果为2 那么一个资源最少被引用两次才可以被拆分出来
            minChunks: 2,
            // 按需加载的最大并行请求数
            maxAsyncRequests: 5,
            // 入口文件可以并行加载的最大文件数量
            maxInitialRequests: 3,
            // 文件名的连接符
            automaticNameDelimiter: '-',
            // 是否以cacheGroups中的filename作为文件名
            // name: false,
            // 根据优先级过滤匹配的分包集合 每个组都可以继承和覆盖上面的分包配置
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        // 环境插件
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // js压缩插件 比如各种变量方法名都变成abcd这种 语法也做了简化
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    // 禁用压缩警告
                    warnings: false
                }
            },
            // 是否开启sourceMap用于调试
            sourceMap: config.prod.productionSourceMap,
            // 当CPU内核多余一个时生效 加快构建速度
            parallel: true
        }),
        // css提取插件 可以把css整合到单独的css文件
        // new ExtractTextPlugin({
        //     filename: utils.assetsPath('css/[name].[contenthash].css'),
        //     allChunks: true
        // }),
        // css压缩插件
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.prod.productionSourceMap ? {safe: true, map: {inline: false}} : {safe: true}
        }),
        new HtmlWebpackPlugin({
            filename: process.env.NODE_ENV === 'test' ? 'index.html' : config.prod.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'auto'
        }),
        // 模块名称id变为hash 高效利用编译缓存
        new webpack.ids.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 复制自定义的静态资源到生产环境
        // new CopyWebpackPlugin({
        //     patterns: [{
        //         // 可以额外配置忽略
        //         from: path.resolve(__dirname, '../static'),
        //         to: config.prod.assetsSubDirectory
        //     }]
        // })
        new VueLoaderPlugin()
    ]
})

if (config.prod.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')
    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' + config.prod.productionGzipExtensions.join('|') + ')$'
            ),
            // 10K以上大小的文件会被压缩
            threshold: 10240,
            // 压缩比小于0.8才值得被压缩
            minRatio: 0.8
        })
    )
}

// 打包文件分析工具
if (config.prod.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
