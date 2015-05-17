module.exports = function(grunt) {
  grunt.initConfig({

    less: {
      development: {
        options: {
          paths: ["assets/css"]
        },
        files: {
          "resources/assets/css/bootstrap.css": "resources/assets/less/bootstrap/bootstrap.less",
          "resources/assets/css/stylesheet.css": "resources/assets/less/stylesheet.less",
        }
      }
    },
    cssmin:{//minify and combine css
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'public/styles/style.min.css': ['resources/assets/css/**/*.css']
        }
      }
    },
    concat: {
  		options: {
  			// define a string to put between each file in the concatenated output
  			separator: ';\n'
  		},
  		dist: {
  			// the files to concatenate (modernizr, then jquery, then bootstrap, then everythign else)
  			src: ['resources/assets/js/jquery/**/*.js', 'resources/assets/js/bootstrap/**/*.js', 'resources/assets/js/**/*.js'],

  			// the location of the resulting JS file
  			dest: 'public/js/genetics.js'
  		}
	},
		uglify: {
		options: {
			// define a string to put between each file in the concatenated output
			banner: '/*! Population Genetics JavaScript Combined and minified on <%= grunt.template.today("dd-mm-yyyy") %> */\n'
		},
		dist: {
			// the files to concatenate
			files:{
				"public/js/genetics.min.js": ['public/js/genetics.js']
			} 
		}
	},
    watch: {
      styles: {
        files: ['resources/assets/less/**/*.less'], // which files to watch
        tasks: ['less', 'cssmin'],
        options: {
          nospawn: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['watch']);
};