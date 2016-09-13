/**
 * Created by lulu on 16/9/13.
 */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var devConfig = require('./webpack.dev.config');

new WebpackDevServer(webpack(devConfig),
    {
        publicPath: devConfig.output.publicPath,
        hot: true,
        historyApiFallback: true
    }
).listen(3000, 'localhost', function (err, result) {
        console.log(err || result);
    });