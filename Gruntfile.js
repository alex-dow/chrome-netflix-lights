module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');

  var browserifyOptions = {
    browserifyOptions: {
      debug: true
    }
  };

  var browserifyTasks = {
    options: browserifyOptions,
    content: {
      src: './src/content/index.js',
      dest: './extension/build/content.js'
    },
    background: {
      src: './src/background/index.js',
      dest: './extension/build/background.js'
    },
    app: {
      src: './src/app/index.js',
      dest: './extension/build/app.js'
    },
    options_script: {
      src: './src/options/index.js',
      dest: './extension/build/options.js'
    }
  };

  var sassTasks = {
    options: {
      sourceMap: true
    },
    app: {
      files: {
        './extension/build/app.css': './sass/app/main.scss'
      }
    },
    options_style: {
      files: {
        './extension/build/options.css': './sass/options/main.scss'
      }
    }
  };

  var watchTasks = {
    content: {
      files: ['src/content/**/*.js'],
      tasks: ['browserify:content']
    },
    background: {
      files: ['src/background/**/*.js'],
      tasks: ['browserify:background']
    },
    app: {
      files: ['src/app/**/*.js'],
      tasks: ['browserify:app']
    },
    options_script: {
      files: ['src/options/**/*.js'],
      tasks: ['browserify:options_script']
    },
    common: {
      files: ['src/common/**/*.js'],
      tasks: ['browserify:content','browserify:background','browserify:app','browserify:options_script']
    },
    app_sass: {
      files: ['sass/app/**/*.scss'],
      tasks: ['sass:app']
    },
    options_sass: {
      files: ['sass/options/**/*.scss'],
      tasks: ['sass:options_style']
    }
  };

  grunt.initConfig({
    manifest: grunt.file.readJSON('./extension/manifest.json'),
    browserify: browserifyTasks,
    clean: {
      build: ['extension/build']
    },
    sass: sassTasks,
    watch: watchTasks
  });

  grunt.registerTask('default', [
      'clean',
      'sass:app',
      'sass:options_style',
      'browserify:content',
      'browserify:background',
      'browserify:app',
      'browserify:options_script'
  ]);
}
