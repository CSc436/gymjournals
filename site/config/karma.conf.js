module.exports = function(config) {
  config.set({
    basePath: '../',

    files: [
      'app/lib/angular/angular.js',
      'app/lib/angular/angular-*.js',
      'test/lib/angular/angular-mocks.js',
      'app/js/app.js',
      'app/js/**/*.js',
      'test/unit/**/*Spec.js',
      'app/bower_components/jquery/jquery.js',
    ],

    exclude: [
      'app/lib/angular/angular-loader.js',
      //'app/lib/angular/*.min.js',
      'app/lib/angular/angular-scenario.js',
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    plugins: [
      'karma-junit-reporter',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit',
    },

    reporters: ['dots'],
  }
)}
