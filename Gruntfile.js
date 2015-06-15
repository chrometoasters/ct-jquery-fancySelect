  /* -------------------------------------------------------------------------------------

  GRUNT BOILERPLATE

  Please keep docs up to date @ https://github.com/chrometoasters/ct-grunt

  -------------------------------------------------------------------------------------*/

// JSHINT:
/*globals module:true, require:true */

module.exports = function(grunt) {

  "use strict"; // JSHINT - Use ECMAScript 5 Strict Mode

  // JIT(Just In Time) plugin loader for Grunt.
  require('jit-grunt')(grunt);

  // Display the elapsed execution time of grunt tasks
  require('time-grunt')(grunt);

  /* -------------------------------------------------------------------------------------

  IMPORT CONFIGURATION FILES

  -------------------------------------------------------------------------------------*/

  var path = require("path"); // http://stackoverflow.com/q/18904729/2172532

  // grunt TASKNAME --target=TARGET
  //var target = grunt.option('target') || 'dev';

  // Project configuration.
  grunt.config.init({

    // this exposes things like <%= pkg.name %>
    // TODO use new fields in generated banners
    pkg: grunt.file.readJSON("package.json"),

  /* -------------------------------------------------------------------------------------

  CONFIGURE PLUGINS
  Please validate additional plugin configurations @ http://jsonlint.com/

  -------------------------------------------------------------------------------------*/

    connect: {
      qunit: {
        options: {
          port: 3000,
          base: '../../'
        }
      }
    },

    jsdoc: {
      dist : {
        options: {
          destination: 'documentation/jsdoc',
          configure: 'conf.json',
          jsdoc: './node_modules/jsdoc/jsdoc.js'
        }
      }
    },

    qunit: {
      dist: {
        options: {
          force: true, // don't halt Grunt if there are errors
          urls: [
            'http://localhost:3000/test/index.html'
          ]
        }
      }
    },

    sass: {
      options: {
        sourceMap: false
      },
      dist: {
        files: [
          {
            'dist/ct-jquery-fancySelect.css': 'dev/ct-jquery-fancySelect.scss'
          }
        ]
      }
    }

  });

  /* -------------------------------------------------------------------------------------

  SET UP TASKS TO CALL LOADED PLUGINS USING THE SPECIFIED CONFIG
  Tasks are prefixed with "tasks_" for legibilty.

  If updating this section, please also update "Grunt Tasks" in README.md

  Pattern:
  http://mstrutt.co.uk/blog/2015/03/cleaning-up-your-gruntfile-with-hidden-subtasks/

  To view all available tasks: grunt --help

  To prepare files for release, pass the --target=dist flag
  -------------------------------------------------------------------------------------*/

  grunt.registerTask("default", [
    "sass:dist",
    "connect:qunit",
    //"qunit:dist", // "PhantomJS timed out, possibly due to a missing QUnit start() call.""
    "jsdoc:dist"
  ]);
};
