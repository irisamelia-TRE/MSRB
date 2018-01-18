const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = (config) => {
    const dirs = {
        DIST: path.resolve(__dirname, 'dist'),
        SRC: path.resolve(__dirname, 'src'),
        JS: path.resolve(__dirname, 'src/js')
    };
    const tests = path.resolve(dirs.JS, "tests/*.js"); // 'src/js/tests/*.js'

    config.set({
        frameworks: ['mocha'],

        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            {
                pattern: tests
            },
        ],

        // Preprocess through webpack
        preprocessors: {
            [tests]: ['webpack']
        },

        singleRun: true,

        webpack: {
            plugins: [
                // Extract styles to this file
                new ExtractTextPlugin('style.bundle.css')
            ],
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
                        ]
                    }
                ]
            },
            // Allows us to import files without including the extension.
            resolve: {
                extensions: ['.js', '.jsx']
            }
        },

        webpackMiddleware: {
            stats: 'errors-only'
        },

        reporters: ['coverage', 'junit', 'spec'],
        junitReporter: {
            outputDir: 'junit',
            suite: 'tests'
        },
        coverageReporter: {
            dir: 'coverage',
            reporters: [
                { type: 'text' },
                { type: 'html' }
            ]
        },
        browsers: ['PhantomJS']
    });
};
