module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    beautify: {
      tests: '<config:test.files>',
      files: ['package.json', 'grunt.js', 'tasks/**/*.js']
    },
    test: {
      files: ['test/**/*.js']
    },
    lint: {
      files: ['package.json', 'grunt.js', 'tasks/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    beautifier: {
      options: {
        indentSize: 2
      },
      tests: {
        options: {
          indentSize: 4
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      globals: {}
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-beautify');

  // Default task.
  grunt.registerTask('default', 'beautify lint test');

};
