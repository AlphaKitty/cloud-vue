const path = require('path')
const config = require('../config')
// TODO: 2022/9/11 zylTodo 后边注释了看看能有什么不同
const vueLoaderConfig = require('../config/vue-loader.conf')
const utils = require('../build/utils')

// module.exports = exports 先导出才能被别的js用require引用
module.exports = {
    context: path.resolve(__dirname, '../'),
    // 入口chunk 各种解析分包等操作都从这里开始
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.prod.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'prod' ? config.prod.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        // 如果有同名 按下面后缀的顺序匹配
        extensions: ['.js', '.vue', '.json', '.css', '.less', '.scss'],
        alias: {
            'vue@': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    module: {
        rules: [
            // 解析vue
            {
                test: /\.vue$/,
                loader: 'vue-loader'
                // TODO: 2022/9/11 zylTodo 后边注释了看看能有什么不同
                // options: vueLoaderConfig
            },
            // 解析js
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, '../')
            },
            // 解析css
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                include: path.resolve(__dirname, '../')
            },
            // 解析图片
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            // 解析视频
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            // 解析字体
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}
