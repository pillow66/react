/**
 * Created by lulu on 16/9/12.
 */

var path = require('path');
var glob = require('glob');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var paths = {
    dist: path.resolve("./dist/"),
    entry: './public/js/entry/',
    component: './public/js/entry/',
    css: './public/css/',
    template: "./public/template/"
};

var fileNames = {
    script: "script/[name].[hash].js",
    style: "style/[name].[hash].css",
    vendor: "script/vendor.[hash].js"
};

var config = {
    //入口
    entry: {
        //起始页
        index: [
            "webpack-dev-server/client?http://localhost:3000",
            "webpack/hot/only-dev-server",
            paths.entry + 'index.js'
        ],
        //login: paths.entry + 'login.js',
        //公共js,css
        vendor: ['jquery', 'react', 'react-dom', paths.css + 'common.scss']
    },
    //输出
    output: {
        //这里要写绝对路径
        path: paths.dist,
        filename: fileNames.script
        //加了会在生成HTML页面的js和css中加入/build/...
        //publicPath: paths.dist
    },
    //插件
    plugins: [
        //babel6.0+要求将该插件写入配置文件(.babelrc或package.json)的plugins节点,而不是module,loaders中
        new webpack.HotModuleReplacementPlugin(),
        //单独提出各页面的css文件打包
        new ExtractTextPlugin(fileNames.style),
        //全局变量,在模块中无需require引入
        new webpack.ProvidePlugin({
            $: 'jquery',
            React: 'react',
            ReactDOM: 'react-dom'
        }),
        //提取入口定义的vendor打包为公共模块vendor.[hash].js
        new webpack.optimize.CommonsChunkPlugin('vendor', fileNames.vendor)
        /*//依据模板生成html页
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: paths.template + 'index.html',
            //规定生成html页中注入入口vendor,index这2个chunks下打包的js,css文件
            chunks: ['vendor', 'index']
        }),
        new HtmlWebpackPlugin({
            filename: "login.html",
            template: paths.template + 'login.html',
            chunks: ['vendor', 'login']
        })*/
    ],
    module: {
        loaders: [
            //处理scss文件(注意:loader是从右向左执行,先sass解析在css解析)
            {test: /\.scss?$/, loader: ExtractTextPlugin.extract('style', 'css!sass')},
            //处理react的jsx文件(排除node_modules下文件),添加react-hot监听
            {test: /\.(js|jsx)?$/, loader: "babel", exclude: /node_modules/},
            //打包替换图片
            {test: /\.(png|jpg)?$/, loader: "url?limit=25000&name=/img/[hash].[ext]"}
        ]
    }
};

//获取js入口文件
var entries = getEntries(paths.entry);
addConfigEntries(entries);
addConfigPluginsEntries(entries);

//获取js入口文件
function getEntries(globPath) {
    var entries = [];
    globPath = path.join(globPath, "**/*.js");

    var files = glob.sync(globPath);
    var len = files.length;
    console.log(len);

    for (; len--;) {
        var ext = path.extname(files[len]);
        var fullName = path.basename(files[len]);
        var name = path.basename(files[len], ext);

        var entry = {name: name, fullName: fullName};
        entries.push(entry);
    }

    return entries
};

//添加配置js入口
function addConfigEntries(entries) {
    var len = entries.length;

    for (; len--;) {
        var name = entries[len].name;
        //不存在,添加
        if (!config.entry[name]) {
            config.entry[name] = paths.entry + entries[len].fullName
        }
    }
};

//添加配置Html入口
function addConfigPluginsEntries(entries) {
    var len = entries.length;

    for (; len--;) {
        var name = entries[len].name;
        var options = {
            filename: name + ".html",
            template: paths.template + name + '.html',
            //规定生成html页中注入入口vendor, 对应入口这2个chunks下打包的js,css文件
            chunks: ['vendor', name]
        };
        //生成入口js对应HTML页,加入插件队列
        config.plugins.push(new HtmlWebpackPlugin(options));
    }
};

module.exports = config;