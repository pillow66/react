/**
 * Created by lulu on 16/9/12.
 */

var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var Html = require("html-webpack-plugin");

var cssExtractor = new ExtractTextPlugin('stylesheets/[name].css');


var config = {
    entry: {
        index: [path.resolve(__dirname, './public/js/entry/index.js')],
        login: path.resolve(__dirname, './public/js/entry/login.js'),
        vendor: ['jquery', 'react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: "[name].bundle.[hash].js"
    },
    module: {
        loaders: [
            {test:/\.css?$/, loader:ExtractTextPlugin.extract('style','css')},
            {test: /\.js?$/, exclude: /node_modules/, loader: "babel", query: {presets: ['react']}}
        ]
    },
    plugins: [
        //new ExtractTextPlugin("style-[hash].css"),
        //提供全局变量,在模块中无需require引入
        new webpack.ProvidePlugin({
            $: 'jquery',
            React: 'react',
            ReactDOM: 'react-dom'
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.[hash].js'),
        new Html({
            filename:"index.html",
            template:path.join(__dirname, '/view/index.html')
        }),
        new Html({
            filename:"login.html",
            template:path.join(__dirname, '/view/login.html')
        })
    ]
};

module.exports = config;