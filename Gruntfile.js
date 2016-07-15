module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

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
    }
  };

  grunt.initConfig({
    manifest: grunt.file.readJSON('./extension/manifest.json'),
    browserify: browserifyTasks,
    clean: {
      build: ['extension/build']
    },
    watch: {
      content: {
        files: ['src/content/**/*.js'],
        tasks: ['browserify:content']
      },
      background: {
        files: ['src/background/**/*.js'],
        tasks: ['browserify:background']
      }
    }
  });

  grunt.registerTask('default', [
      'clean',
      'browserify:content',
      'browserify:background'
  ]);
}
