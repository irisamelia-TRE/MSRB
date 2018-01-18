const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const dirs = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src/js')
};

// Webpack configuration
module.exports = {
    entry: path.join(dirs.JS, 'app.js'),
    stats: {
        assets: false,
        modules: false,
        hash: false,
        errorDetails: true
    },
    output: {
        path: dirs.DIST,
        filename: 'app.bundle.js'
    },
    plugins: [
        // HTML plugin handles adding JS to our pages
        new HtmlPlugin({
            template: path.join(dirs.SRC, 'index.html')
        }),
        // Extract styles to this file
        new ExtractTextPlugin('style.bundle.css')
    ],
    // Run Babel on js and jsx files.
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    // Babel ES2015
                    'babel-loader',
                    // ESLint for sanity
                    'eslint-loader'
                ]
            },
            // Sass
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract({
                    use: ['css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader', 'sass-loader'],
                  fallback: 'style-loader'
                })
            },
            {
                test: /\.(svg|woff|ttf|eot|png)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    },
    // Allows us to import files without including the extension.
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
