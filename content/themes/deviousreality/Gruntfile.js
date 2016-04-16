'use strict';

var buildDirectory = "./build",
    distDirectory = "./assets",

    configureGrunt = function (grunt) {
        var cfg = {
          // #### Common paths used by tasks
          paths: {
              build: buildDirectory,
              dist: distDirectory,
          },

          pkg: grunt.file.readJSON('package.json'),

          copy: {
            fonts : {
              cwd: '<%= paths.build %>/fonts',
              dest: '<%= paths.dist %>/fonts',
              expand: true,
              flatten: false,
              filter: 'isFile',
              src: '**'
            }
          },

          sass: {
            dist: {
              files: [{
                cwd: '<%= paths.build %>/scss',
                dest: '<%= paths.dist %>/css',
                expand: true,
                ext: '.min.css',
                src: 'styles.scss'
              }],
              options: {
                style: 'compressed'
              }
            }
          },

          scsslint: {
            allFiles: [
              '<%= paths.build %>/scss/{,*/}*.scss'
            ],
            options: {
              config: '<%= paths.build %>/.scss-lint.yml',
              reporterOutput: '<%= paths.build %>/scss-lint-reporter.xml',
              colorizeOutput: 'true'
            }
          },

          watch: {
            sass: {
              files: ['<%= paths.build %>/scss/{,*/}*.{scss, sass}'],
              tasks: ['sass:dist']
            },
            scsslint: {
              files: ['<%= paths.build %>/scss/{,*/}*.{scss, sass}'],
              tasks: ['scsslint']
            }
          }
        };
        // Load the configuration
        grunt.initConfig(cfg);

        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-scss-lint');
        grunt.loadNpmTasks('grunt-contrib-sass');
        grunt.loadNpmTasks('grunt-contrib-watch');

        grunt.registerTask('build', 'Minify Sass and Javascript', [
            'sass'
        ]);

        grunt.registerTask('check', 'Lints Sass and Javascript', [
            'scsslint'
        ]);

        grunt.registerTask('move', 'move things', [
            'copy:fonts'
        ]);

        grunt.registerTask('dev', 'Development Mode', [
          'check',
          'build',
          'move',
          'watch'
        ]);

        grunt.registerTask('default', 'Minify Sass and Javascript', [
          'check',
          'build',
          'move'
        ]);

    };

module.exports = configureGrunt;
