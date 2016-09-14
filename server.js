/**
 * Created by lulu on 16/9/13.
 */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var devConfig = require('./webpack.dev.config.js');

//启动webpack-dev-server服务(主要用于方便开发,前台可以单独跑起来)
new WebpackDevServer(webpack(devConfig),
    {
        publicPath: devConfig.output.publicPath,
        hot: true,
        historyApiFallback: true
    }
).listen(3000, 'localhost', function (err) {
        if(!err) {
            console.log("监听成功~(｡・`ω´･)~        ");
        }
    });