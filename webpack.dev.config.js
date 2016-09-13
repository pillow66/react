/**
 * Created by lulu on 16/9/12.
 */

var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var Html = require("html-webpack-plugin");

var config = {
    //入口
    entry: {
        index: [
            "webpack-dev-server/client?http://0.0.0.0:3000",
            "webpack/hot/only-dev-server",
            path.resolve(__dirname, './public/js/entry/index.js')],
        login: path.resolve(__dirname, './public/js/entry/login.js'),
        //公共js和css
        vendor: ['jquery', 'react', 'react-dom', path.resolve(__dirname, './public/css/common.scss')]
    },
    //输出
    output: {
        path: path.resolve(__dirname, './build'),
        filename: "script/[name].[hash].js",
        publicPath: "http:localhost:8080/build"
    },
    //插件
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //单独提出各页面的css文件打包
        new ExtractTextPlugin("style/[name].[hash].css"),
        //提供全局变量,在模块中无需require引入
        new webpack.ProvidePlugin({
            $: 'jquery',
            React: 'react',
            ReactDOM: 'react-dom'
        }),
        //提取入口定义的vendor打包为公共模块vendor.[hash].js
        new webpack.optimize.CommonsChunkPlugin('vendor', 'script/vendor.[hash].js'),
        //依据模板生成html页
        new Html({
            filename: "index.html",
            template: path.join(__dirname, '/view/index.html'),
            //规定生成html页中注入入口vendor,index这2个chunks下打包的js,css文件
            chunks: ['vendor', 'index']
        }),
        new Html({
            filename: "login.html",
            template: path.join(__dirname, '/view/login.html'),
            chunks: ['vendor', 'login']
        })
    ],
    module: {
        loaders: [
            //处理scss文件(注意:loader是从右向左执行,先sass解析在css解析)
            {test: /\.scss?$/, loader: ExtractTextPlugin.extract('style', 'css!sass')},
            //处理react的jsx文件,添加react-hot监听
            {test: /\.js?$/, loader: "babel"}
        ]
    }
};

module.exports = config;