/*
 * grunt-beautify.git
 * https://github.com/pix/grunt-beautify
 *
 * Copyright (c) 2012 Camille Moncelier
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md
  // ==========================================================================
  // TASKS
  // ==========================================================================a
  var default_options = {
    indentSize: 2
  };

  var merge = function () {
    var out = {};

    for (var i = 0; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        out[key] = arguments[i][key];
      }
    }
    return out;
  };

  grunt.registerMultiTask('beautify', 'Javascript beautifier', function () {
    var beautifier = require('node-beautify');

    var options = null;
    var tmp = grunt.config(['beautifier', this.target, 'options']);
    if (typeof tmp === 'object') {
      grunt.verbose.writeln('Using "' + this.target + '" beautifier options.');
      options = tmp;
    } else {
      tmp = grunt.config('beautifier.options');
      if (typeof tmp === 'object') {
        grunt.verbose.writeln('Using master beautifier options.');
        options = tmp;
      } else {
        grunt.verbose.writeln('Using beautifier default options.');
        options = default_options;
      }
    }
    var endOfLineCharacters = options.endOfLineCharacters || require('os').EOL;

    // Beautify specified files.
    grunt.file.expandFiles(this.file.src).forEach(function (filepath) {
      var result = beautifier.beautifyJs(grunt.file.read(filepath), options);
      if (options.endOfLineNormalization) {
        result = result.replace(/\r\n|\n\r|\r|\n/g, endOfLineCharacters);
      }
      grunt.file.write(filepath, result);
    });

  });

};