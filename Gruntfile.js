'use strict';

module.exports = function(grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bowerrc: grunt.file.readJSON('.bowerrc'),

    // configurable paths
    cfg: {
      app: 'app',
      tmp: '.tmp',
      dist: 'dist',
      vendor: '<%= bowerrc.directory %>',
      node: 'node_modules'
    },

    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      browserify: {
        files: ['<%= cfg.app %>/js/**/*.js','<%= cfg.app %>/js/**/*.json'],
        tasks: [
          'copy:app',
          'browserify:dev'
        ]
      },
      jade: {
        files: ['<%= cfg.app %>/templates/**/*.jade'],
        tasks: [
          'jade:templates',
          'browserify:dev'
        ]
      },
      static: {
        files: ['<%= cfg.app %>/static/**/*'],
        tasks: [
          'clean:dev',
          'concurrent:prepare',
          'concurrent:dev'
        ]
      },
      less: {
        files: ['<%= cfg.app %>/styles/**/*'],
        tasks: [
          'less:app'
        ]
      },
      locales: {
        files: ['<%= cfg.app %>/locales/**/*'],
        tasks: [
          'copy:locales'
        ]
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: ['{<%= cfg.tmp %>,<%= cfg.app %>}/js/**/*.js']
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: '0.0.0.0',
        middleware: function(connect, options, middlewares) {
          // inject a custom middleware
          middlewares.unshift(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', '*');
            return next();
          });
          return middlewares;
        }
      },
      livereload: {
        options: {
          open: true,
          base: ['<%= cfg.tmp %>']
        }
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: ['<%= cfg.dist %>']
        }]
      },
      dev: {
        files: [{
          dot: true,
          src: ['<%= cfg.tmp %>']
        }]
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= cfg.app %>/js/**/*.js'
      ]
    },

    less: {
      app: {
        files: {
          '<%= cfg.tmp %>/style.css': '<%= cfg.app %>/styles/app.less'
        }
      }
    },

    browserify: {
      dist: {
        src: ['<%= cfg.tmp %>/js/app.js'],
        dest: '<%= cfg.tmp %>/app.js',
        options: {
          transform: ['hbsfy'],
          external: [
            'pileple',
            'moment',
            'hbsfy',
            'jquery.cookie'
          ],
          alias: ['./<%= cfg.tmp %>/js/app.js:<%= grunt.util._.camelize(pkg.name) %>']
        }
      },
      dev: {
        src: ['<%= cfg.tmp %>/js/app.js'],
        dest: '<%= cfg.tmp %>/app.js',
        options: {
          debug: true,
          transform: ['hbsfy'],
          external: [
            'pileple',
            'moment',
            'hbsfy',
            'jquery.cookie'
          ],
          alias: ['./<%= cfg.tmp %>/js/app.js:<%= grunt.util._.camelize(pkg.name) %>'],
          browserifyOptions: {
            debug:true
          }
        }
      },
      vendors: {
        src: [],
        dest: '<%= cfg.tmp %>/vendors.js',
        options: {
          require: [
            'pileple',
            'moment',
            'hbsfy',
            'jquery.cookie'
          ]
        }
      }
    },

    copy: {
      static: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= cfg.app %>/static',
          dest: '<%= cfg.tmp %>',
          src: ['**/*']
        }]
      },
      app: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= cfg.app %>/js/',
          dest: '<%= cfg.tmp %>/js/',
          src: ['**/*']
        }]
      },
      locales: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= cfg.app %>/locales/',
          dest: '<%= cfg.tmp %>/locales/',
          src: ['**/*']
        }]
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= cfg.dist %>/app.js': ['<%= cfg.tmp %>/app.js'],
          '<%= cfg.dist %>/vendors.js': ['<%= cfg.tmp %>/vendors.js']
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          '<%= cfg.dist %>/style.css': ['<%= cfg.tmp %>/style.css']
        }
      }
    },

    jsonmin: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= cfg.tmp %>/locales/',
          dest: '<%= cfg.dist %>/locales/',
          src: ['**/*.json']
        }]
      }
    },

    jade: {
      templates: {
        options: {
          client: false,
          pretty: true
        },
        files: [{
          expand: true,
          cwd: '<%= cfg.app %>/templates/',
          src: '**/*.jade',
          dest: '<%= cfg.tmp %>/templates',
          ext: '.hbs'
        }]
      }
    },

    concurrent: {
      prepare: [
        'copy:app',
        'jade:templates',
        'copy:locales',
        'less:app'
      ],
      dev: [
        'browserify:dev',
        'browserify:vendors',
        'copy:static'
      ],
      dist: [
        'browserify:dist',
        'browserify:vendors',
        'cssmin:dist',
        'jsonmin:dist'
      ]
    }
  });

  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build']);
    }

    grunt.task.run([
      'clean:dev',
      'concurrent:prepare',
      'concurrent:dev',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function() {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    'jshint'
  ]);

  grunt.registerTask('build', [
    'clean',
    'concurrent:prepare',
    'concurrent:dist',
    'uglify:dist'
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);
};
