module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['dist'],
    concat: {
      options: {
        separator: ';',
        banner: '/* Septima Widget - VERSION <%= pkg.version %> - build <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        src: ['src/test*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    'gh-pages': {
      options: {
        base: 'dist',
      },
      'gh-pages': {
        options: {
          tag: '<%= pkg.version %>',
          message: 'Auto-generated commit. Version <%= pkg.version %>'
        },
        src: ['**']
      },
      'test': {
        options: {
          branch: 'test',
          message: 'Test Version <%= pkg.version %>'
        },
        src: ['**']
      }
    }
  });

  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('default', ['concat','gh-pages:test']);

  grunt.registerTask('test', ['bump-only']);

  grunt.registerTask('publish', ['bump:build:bump-only','concat','gh-pages:gh-pages']);
  
};