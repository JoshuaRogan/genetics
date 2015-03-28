module.exports = function(grunt) {
  grunt.initConfig({

    less: {
      development: {
        options: {
          paths: ["assets/css"]
        },
        files: {
          "public/styles/bootstrap.css": "public/styles/bootstrap/bootstrap.less",
          "public/styles/stylesheet.css": "public/styles/stylesheet.less",
        }
      }
    },
    watch: {
      styles: {
        files: ['public/styles/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
};