const config = require('../config')
const path = require('path')
// 引入 extract-text-webpack-plugin 插件，用来将 css 提取到单独的 css 文件中
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 暴露静态资源路径拼接方法
exports.assetsPath = function (_path) {
    let assetsSunDirectory = process.env.NODE_ENV === 'prod' ? config.prod.assetsSubDirectory : config.dev.assetsSubDirectory
    // path.posix可以屏蔽不同系统的文件路径差异
    return path.posix.join(assetsSunDirectory, _path)
}

// 暴露css加载器集合
exports.cssLoaders = function (options) {
    options = options || {}
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }
    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

        let sourceLoader = loaders.map(function(loader) {
            let extraParamChar
            if (/\?/.test(loader)) {
                loader = loader.replace(/\?/, '-loader?')
                extraParamChar = '&'
            } else {
                loader = loader + '-loader'
                extraParamChar = '?'
            }
            return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
        }).join('!')

        // 如果传入新loader 就加到数组里 比如less/sass等
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                // es6新语法 用于浅拷贝合并对象
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }
        // extract是个自定义属性
        if (options.extract) {
            // return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass'),
        scss: generateLoaders('scss'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

// 为独立于.vue文件之外用import语法导入的css文件生成css加载器
exports.styleLoaders = function (options) {
    const output = []
    const loaders = exports.cssLoaders(options)
    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
}
