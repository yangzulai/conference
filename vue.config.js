// const webpack = require("webpack");
module.exports = {
    publicPath: './',
    // configureWebpack: {
    //     plugins: [
    //         new webpack.ProvidePlugin({
    //             jQuery: 'jquery',
    //             $: 'jquery'
    //         })
    //     ]
    // },
    devServer: {
        disableHostCheck: true, // 禁用webpack热重载检查 解决热更新失效问题
    }
}