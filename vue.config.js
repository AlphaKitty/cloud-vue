// bootstrap3和5不一样 3只有通过这个网址配置的才管用 不然什么都不显示
// @Reference https://www.cnblogs.com/pipim/p/11250241.html
const webpack = require('webpack')

module.exports = {
    chainWebpack: (config) => {
        config.plugin('provide').use(webpack.ProvidePlugin, [{
            $: 'jquery',
            jquery: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }])
    },
    css: {
        sourceMap: true
    },
    devServer: {
        port: 8040,
        // 配置跨域
        proxy: {
            '/api': {
                target: 'http://192.168.2.93:8080/',
                changeOrigin: true,  //允许跨域
                pathRewrite: {
                    /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
                      实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
                     */
                    '^/api': ''
                }
            },
        }
    },
    lintOnSave: false
}
