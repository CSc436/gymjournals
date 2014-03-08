module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          includePaths: ['app/bower_components/foundation/scss'],
          outputStyle: 'expanded',
          sourceComments: 'map',
          sourceMap: '../scss',
        },
        files: [{
          expand: true,
          cwd: 'app/scss',
          src: ['**/*.scss', '!**/_*.scss'],
          dest: 'app/css',
          ext: '.css',
        }],
      },
    },

    autoprefixer: {
      prefix: {
        expand: true,
        src: 'app/css/*.css',
      },
    },

    karma: {
      options: {
        configFile: 'config/karma.conf.js',
        autoWatch: false,
      },
      unit: {
        background: true,
      },
      continuous: {
        singleRun: true,
      },
    },

    watch: {
      options: {
        livereload: true,
      },
      grunt: {
        files: ['Gruntfile.js']
      },
      karma: {
        files: [
          'app/lib/angular/angular.js',
          'app/lib/angular/angular-*.js',
          'test/lib/angular/angular-mocks.js',
          'app/js/**/*.js',
          'test/unit/**/*Spec.js',
          '!app/lib/angular/angular-loader.js',
          '!app/lib/angular/*.min.js',
          '!app/lib/angular/angular-scenario.js'
        ],
        tasks: ['karma:unit:run'],
      },
      sass: {
        options: {
          livereload: false,
        },
        files: 'app/scss/**/*.scss',
        tasks: ['sass', 'autoprefixer'],
      },
      html: {
        files: '**/*.html',
      },
      css: {
        files: 'app/css/**/*.css',
      },
      js: {
        files: 'app/js/**/*.js',
      },
    },
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('test', ['karma:continuous']);
  grunt.registerTask(
    'default',
    ['build', 'karma:unit:start', 'watch']
  );
}
