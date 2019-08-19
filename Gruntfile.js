
module.exports = function(grunt){
	grunt.initConfig({
		ts: {

			default: {
				outDir: 'js',
				src: ['ts/**/*.ts'],
				baseDir: 'ts',
				options: {
					fast: 'watch'
				}
			},
			
			dev: {
				outDir: 'js',
				src: ['ts/**/*.ts'],
				baseDir: 'ts',
				options: {
					fast: 'watch'
				}
			},
			
			options: {
					allowJs: true,
					sourceMap: false,
					target: "es5",
					declaration: false,
					noLib: false,
					comments: false
				}
			
		},
		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['ts/**/*.ts'],
				tasks: ['process']
			}
		},
		concat: {
			dist:{
				src:['js/**/*.js'],
				dest:'dist/data/game.js'
			}
		},
		uglify:{
			dist:{
				files:{
					'dist/data/game.min.js':['dist/data/game.js']
				}
			}
		},
		express: {
			all: {
				options: {
					port:9339,
					hostname: 'localhost',
					bases: ['.'],
					livereload:true
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib');
	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-express');
	
	grunt.registerTask('process', ['ts:dev', 'concat']);
	grunt.registerTask('default', ['ts:default', 'concat', 'express']);
	
	grunt.registerTask('release', ['ts:default', 'concat', 'uglify']);
}