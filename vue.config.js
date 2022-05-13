// 很多下面的参数在webpack中都有对应相同的参数 除非特殊说明 都只应该改下面的参数 因为下面的参数是所有环境公用的 而webpack里面的则不然
module.exports = {
    // Default: '/' 部署应用包时的基本 URL。用法和 webpack 本身的 output.publicPath 一致，但是 Vue CLI 在一些其他地方也需要用到这个值，所以请始终使用 publicPath 而不要直接修改 webpack 的 output.publicPath 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/
    publicPath: process.env.NODE_ENV === 'prod' ? '/' : '/',
    // Default: 'dist' build构建的输出目录 目标目录的内容在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)
    outputDir: 'dist',
    // Default: '' 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。从生成的资源覆写 filename 或 chunkFilename 时，assetsDir 会被忽略。
    assetsDir: 'assets',
    // Default: 'index.html' 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    indexPath: 'index.html',
    // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
    filenameHashing: true,
    // 在 multi-page 模式下构建应用
    // pages: {
    //     index: {
    //         // page 的入口
    //         entry: 'src/index/main.js',
    //         // 模板来源
    //         template: 'public/index.html',
    //         // 在 dist/index.html 的输出
    //         filename: 'index.html',
    //         // 当使用 title 选项时，
    //         // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //         title: 'Index Page',
    //         // 在这个页面中包含的块，默认情况下会包含
    //         // 提取出来的通用 chunk 和 vendor chunk。
    //         chunks: ['chunk-vendors', 'chunk-common', 'index']
    //     },
    //     // 当使用只有入口的字符串格式时，
    //     // 模板会被推导为 `public/subpage.html`
    //     // 并且如果找不到的话，就回退到 `public/index.html`。
    //     // 输出文件名会被推导为 `subpage.html`。
    //     subpage: 'src/subpage/main.js'
    // },
    // Default: false 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。比如多标签v-for循环 比在外层再套一层div的好处是template标签展示时不会实际生成
    runtimeCompiler: true,
    // Default: false 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。你可以启用本选项，以避免构建后的代码中出现未转译的第三方依赖。不过，对所有的依赖都进行转译可能会降低构建速度。如果对构建性能有所顾虑，你可以只转译部分特定的依赖：给本选项传一个数组，列出需要转译的第三方包包名或正则表达式即可。
    transpileDependencies: false,
    // Default: true 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。source map就是比如打印语句能够定位到代码具体位置的东西 还是挺有用的
    productionSourceMap: true,
    // Default: undefined 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
    // anonymous ：如果使用这个值的话就会在请求中的 header 中的带上 Origin 属性，但请求不会带上 cookie 和其他的一些认证信息。
    // use-credentials ：这个就同时会在跨域请求中带上 cookie 和其他的一些认证信息。 在使用这两个值时都需要server端在response的header中带上 Access-Control-Allow-Credentials 属性。
    crossorigin: 'use-credentials',
    // Default: false 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。另外，当启用 SRI 时，preload resource hints 会被禁用，因为 Chrome 的一个 bug 会导致文件被下载两次。
    integrity: false,
    // 该对象将会被 webpack-merge 合并入最终的 webpack 配置。这里面的修改最常用的是针对性条件修改
    // configureWebpack: config => {
    //     if (process.env.NODE_ENV === 'production') {
    //         // 为生产环境修改配置...
    //     } else {
    //         // 为开发环境修改配置...
    //     }
    // },
    // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。当打算链式访问特定的 loader 时，vue inspect 会非常有帮助。
    // chainWebpack: config => {
    //     config.module
    //         .rule('vue')
    //         .use('vue-loader')
    //         .tap(options => {
    //             // 修改它的选项...
    //             return options
    //         })
    // },
    css: {
        // 已弃用
        // modules
        // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
        // requireModuleExtension: true,
        // Default: 生产环境下是 true，开发环境下是 false 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
        // extract: false,
        // Default: false 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
        // 向 CSS 相关的 loader 传递选项。相比于使用 chainWebpack 手动指定 loader 更推荐上面这样做，因为这些选项需要应用在使用了相应 loader 的多个地方。
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
            },
            postcss: {
                // 这里的选项会传递给 postcss-loader
            },
            sass: {},
            less: {},
            stylus: {},
            scss: {
                // scss的语法好像不太一样
            }
        },
        sourceMap: true
    },
    // 所有 webpack-dev-server 的选项都支持 有些值像 host、port 和 https 可能会被命令行参数覆写。有些值像 publicPath 和 historyApiFallback 不应该被修改，因为它们需要和开发服务器的 publicPath 同步以保障正常的工作。
    devServer: {
        port: 8040,
        // 如果直接这么写 表示告诉开发服务器将任何未知请求 (没有匹配到静态文件的请求) 代理到http://localhost:4000
        // proxy: 'http://localhost:4000',
        // 更常用和更有针对性的写法如下
        proxy: {
            '/api': {
                target: 'http://192.168.2.24:8080/',
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
    // PWA化主要解决了两大问题： 1）使web app有沉浸式体验，也就是更靠近原生体验。 2）提供独立于浏览器的缓存，并且可以接收服务器的推送。
    // pwa:,
    // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    parallel: require('os').cpus().length > 1,
    // 这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项
    pluginOptions: {
        foo: {
            // 插件可以作为 `options.pluginOptions.foo` 访问这些选项。
        }
    },
    // Babel 可以通过新建 babel.config.js 进行配置 待更多了解
    // ESLint 可以通过 .eslintrc 或 package.json 中的 eslintConfig 字段来配置。
    // TypeScript 可以通过 tsconfig.json 来配置。
    // Default: 'default' 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。可以是条件语句
    lintOnSave: false
}
