// 通过cross-env工具构建的第一个js文件 cross-env是npm的一个 用于解决 windows 和其他 unix 系统在设置环境变量的写法上不一致的问题
// 大量参考https://blog.csdn.net/qq_46371399/article/details/125136362

console.log('执行build.js')

const config = require('../config')
// 编译过程中转圈标识
const ora = require('ora')
// 可以模拟linux的rm命令 用来清空旧文件
const rm = require('rimraf')
// 路径插件
const path = require('path')
// 用来在控制台显示彩色文字
const chalk = require('chalk')
// 打包工具
const webpack = require('webpack')
// build就是为了部署的 所以要引入prod的配置
const webpackConfig = require('../config/webpack.prod.conf')

// process是一个整个Node.js进程都可以访问的全局变量 不需要require
process.env.NODE_ENV = 'prod'

const spinner = ora("building...")
spinner.start()
// 清空静态文件
rm(path.join(config.prod.assetsRoot, config.prod.assetsSubDirectory), err => {
    if (err) throw err
    // 开始打包
    webpack(webpackConfig, (err, stats) => {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            // 开启颜色
            color: true,
            // 不增加内置模块信息
            modules: false,
            // 不增加子级信息
            children: false,
            // 简化输出
            chunks: false,
            // 不将内置模块的信息加到包信息
            chunkModules: false
        }) + '/n/n')
        if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'))
            console.error(stats.compilation.errors[0])
            process.exit(1)
        }
        // 编译成功的消息
        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
    })
})
