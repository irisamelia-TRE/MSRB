var path = require('path');
var webpack = require("webpack");
module.exports = {
    entry: '../src/main/js/app.js',
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
        path: __dirname,
        filename: '../src/main/resources/static/built/bundle.js'
    },
    watch: true,
    aggregateTimeout: 300,
    plugins: [
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        })
    ],
    module: {
        loaders: [
            {
                test: path.join(__dirname, '../'),
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
