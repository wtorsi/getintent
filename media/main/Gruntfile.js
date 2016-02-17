module.exports = function (grunt) {

    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '',
        csscomb: {
            options: {
                config: 'less/.csscomb.json'
            },
            dist: {
                src: "css/main.dev.css",
                dest: 'css/main.dev.css'
            },
            dev: {
                src: "css/main.dev.css",
                dest: 'css/main.dev.css'
            }
        },
        cssmin: {
            options: {
                // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
                //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
                compatibility: 'ie8',
                keepSpecialComments: '*',
                //sourceMap: true,
                advanced: false
            },
            dist: {
                src: 'css/main.dev.css',
                dest: 'css/main.min.css'
            }

        },
        concat: {
            options: {
                separator: ''
            },
            dist: {
                options: {
                    separator: ' '
                },
                src: [
                    'css/main.css'
                ],
                dest: 'css/main.dev.css'
            },
            dev: {
                options: {
                    separator: ' '
                },
                src: [
                    'css/main.css'
                ],
                dest: 'css/main.dev.css'
            },
            "dist-js": {
                options: {
                    separator: ''
                },
                src: [
                    'js/main.js'
                ],
                dest: 'js/main.dev.js'
            }
        },
        uglify: {
            "dist-js": {
                src: "js/main.dev.js",
                dest: 'js/main.min.js'
            }
        },
        less: {
            options: {
                strictMath: false,
                compress: true,
                plugins: [],
                sourceMap: true,
                strictUnits: false,
                outputSourceFiles: true
            },
            dist: {
                src: 'less/main.less',
                dest: 'css/main.css'
            },
            dev: {
                src: 'less/main.less',
                dest: 'css/main.css'
            }

        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({browsers: ['last 2 versions']})
                ]
            },
            dist: {
                src: 'css/main.dev.css',
                dest: 'css/main.dev.css'
            },
            dev: {
                src: 'css/main.dev.css',
                dest: 'css/main.min.css'
            }
        },
        watch: {
            dist: {
                files: 'less/*.less',
                tasks: 'dist'
            },
            dev: {
                files: 'less/*.less',
                tasks: 'dev'
            },
            "dist-js": {
                files: 'js/main.js',
                tasks: 'dist-js'
            }
        }
    });

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
    require('time-grunt')(grunt);

    grunt.registerTask('dist', ['less:dist', 'concat:dist', 'csscomb:dist', 'postcss:dist', 'cssmin:dist']);
    grunt.registerTask('dev', ['less:dev', 'concat:dev', 'csscomb:dev', 'postcss:dev']);
    grunt.registerTask('dist-js', ['concat:dist-js', 'uglify:dist-js']);
};