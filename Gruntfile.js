module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('prod', ['less', 'concat:css', 'concat:js', 'postcss', 'uglify']);
    grunt.registerTask('dev', ['less', 'concat:css', 'concat:js']);


    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    "resources/assets/css/bootstrap.css": "resources/assets/less/vendors/bootstrap/bootstrap.less",
                    "resources/assets/css/stylesheet.css": "resources/assets/less/stylesheet.less",
                }
            }
        },
        postcss: {
            options: {
                map: {
                    inline: false, // save all sourcemaps as separate files...
                    annotation: 'resources/assets/css/maps' // ...to the specified directory
                },
                // safe: true,
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer-core')({
                        browsers: 'last 2 versions'
                    }), // add vendor prefixes
                    require('cssnano')(), // minify the result
                    require('cssnext')() // Plugins to use future CSS features now by adding backwards compatibility css processing
                ]
            },
            dist: {
                files: {
                    "public/styles/style.min.css": ['public/styles/style.css']
                }
            }
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';\n'
            },
            js: {
                // the files to concatenate (modernizr, then jquery, then bootstrap, then everythign else)
                src: ['resources/assets/js/jquery/**/*.js', 'resources/assets/js/bootstrap/**/*.js', 'resources/assets/js/index.js', 'resources/assets/js/popGen/config/**/*.js','resources/assets/js/**/*.js', '!resources/assets/js/popgen-config/**'],
                // the location of the resulting JS file
                dest: 'public/js/genetics.js'
            },
            css: {
                src: ['resources/assets/css/roboto.css', 'resources/assets/css/bootstrap.css', 'resources/assets/css/**/*.css'],
                dest: 'public/styles/style.css'
            }
        },
        uglify: {
            options: {
                // define a string to put between each file in the concatenated output
                banner: '/*! Population Genetics JavaScript Combined and minified on <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                // the files to concatenate
                files: {
                    "public/js/genetics.min.js": ['public/js/genetics.js']
                }
            }
        },
        watch: {
            styles: {
                files: ['resources/assets/less/**/*.less'], 
                tasks: ['less', 'concat:css'],
                options: {
                    nospawn: true
                }
            },
            scripts: {
                files: ['resources/assets/js/**/*.js'],
                tasks: ['concat:js'],
                options: {
                    nospawn: true
                }
            }
        }
    });

};