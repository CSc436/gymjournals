module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          includePaths: ['bower_components/foundation/scss'],
          outputStyle: 'expanded',
          sourceComments: 'map',
          sourceMap: '../scss',
        },
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['**/*.scss', '!**/_*.scss'],
          dest: 'css',
          ext: '.css',
        }],
      },
    },
    autoprefixer: {
      prefix: {
        expand: true,
        src: 'css/*.css',
      },
    },

    watch: {
      options: {
        livereload: true,
      },
      grunt: {
        files: ['Gruntfile.js']
      },
      sass: {
        options: {
          livereload: false,
        },
        files: 'scss/**/*.scss',
        tasks: ['sass', 'autoprefixer'],
      },
      html: {
        files: '**/*.html',
      },
      css: {
        files: 'css/**/*.css',
      },
      js: {
        files: 'js/**/*.js',
      },
    },
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build','watch']);
}
