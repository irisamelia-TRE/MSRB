// Karma configuration
// Generated on Mon Dec 04 2017 11:54:07 GMT-0500 (Eastern Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './public/vendor/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
      './public/vendor/angular/angular.js',                             // angular
      './public/vendor/angular-route/angular-route.js',
      './public/vendor/angular-ui-router/release/angular-ui-router.js', // ui-router
      './public/vendor/angular-mocks/angular-mocks.js',
      './public/app.js',
      './public/controllers/*.js',
      './public/services/calculator.client.services.js'                //Model tests
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        './public/services/calculator.client.services.js' : ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    plugins: [
        require('karma-jasmine'),
        require('karma-phantomjs-launcher'),
        require('karma-coverage')
    ],

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    coverageReporter: {
      type: 'text-summary'
    }

  })
};
