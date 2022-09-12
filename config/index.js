// 业务代码之外的项目配置 要被require直接通过目录引用 则必须叫index.js
// 这里面的配置可以被和环境相关的配置文件引用 集中在一起方便修改
console.log('执行config.js')

let path = require("path")

module.exports = {
    prod: {
        env: {
            NODE_ENV: '"prod"'
        },
        // 静态网页入口
        index: path.resolve(__dirname, '../dist/index.html'),
        // 资源根目录
        assetsRoot: path.resolve(__dirname, '../dist'),
        // 静态资源静态文件子目录
        assetsSubDirectory: 'static',
        // index.html引用静态资源的路径 可以是相对路径 也可以是绝对路径 总之就是在资源前面加了个前缀
        assetsPublicPath: './',
        // 项目打包后代码都是加密的 为true可以在加密基础上快速定位到代码位置 但会增大打包后的体积
        productionSourceMap: true,
        // npm install --save-dev compression-webpack-plugin
        // 开启后可压缩代码 需要先执行上面一步
        productionGzip: false,
        // 设置哪些类型的代码要被压缩
        productionGzipExtensions: ['js', 'css'],
        // 编译完成后的报告，可以通过设置值为 true 和 false 来开启或关闭
        bundleAnalyzerReport: process.env.report
    },
    dev: {
        env: {
            NODE_ENV: '"dev"'
        },
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        port: 8080,

    }
}
