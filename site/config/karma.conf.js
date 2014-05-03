module.exports = function(config) {
  config.set({
    basePath: '../',

    files: [
      'app/lib/angular/angular.js',
      'app/lib/angular/angular-*.js',
      'test/lib/angular/angular-mocks.js',
      'app/bower_components/jquery/jquery.js',
      'app/bower_components/momentjs/moment.js',
      'app/bower_components/angularjs-nvd3-directives/src/directives/*.js',
      'app/bower_components/angular-xeditable/dist/js/*.js',
      'app/bower_components/angular-ui-router/release/*.js',
      'app/bower_components/angular-ui-router/src/viewDirective.js', // added
      'app/bower_components/angular-ui-router/src/*.js',
      'app/js/app.js',
      'app/js/**/*.js',
      'test/unit/**/*Spec.js',
    ],

    exclude: [
      'app/lib/angular/angular-loader.js',
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
