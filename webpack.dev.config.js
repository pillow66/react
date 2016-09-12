/**
 * Created by lulu on 16/9/12.
 */

var path = require('path');

var config = {
    entry: {
        page1: path.resolve(__dirname, './public/js/entry/index.js'),
        page2: path.resolve(__dirname, './public/js/entry/login.js')
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: "[name].bundle.js"
    }
};

module.exports = config;