/* Grunt file prototype. Change to fit your app */

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
	
	//CDN url to prepend to whatever we need served that way
	var cdn = '//cdn.jetblue.com/';
	
	// Load all grunt tasks
	require('load-grunt-tasks')(grunt);	
	
	//Where all options and tasks are defined
	grunt.initConfig({
		//read the json file so we have access to that object
		pkg: grunt.file.readJSON('package.json'),
		
		//If your working files are somewhere other than the current directory
		base: { path: "./" },

		/*++++++++++++++++++++++++++++ Dealing with STYLESHEETS +++++++++++++++++++++++++++++++++++++++++++++++++++*/

		//SASS
		sass: {                                // Task
		    dist: {                            // Target
		      options: {                       // Target options
		        style: 'expanded'
		      },
		      files: {                         // Dictionary of files
		        '<%= base.path %>/build/app/assets/css/styles.css': '<%= base.path %>/app/assets/css/styles.scss'        // 'destination': 'source'
		      }
		    }
		},

		// !!! NOT USED !!! Takes all our .less files and compiles them into one CSS file
		less: {
			options: {
				paths: ['<%= base.path %>/app/assets/css/']
			},
			src: {
				expand: true,     // Enable dynamic expansion.
				cwd: '<%= base.path %>/app/assets/css/',      // Src matches are relative to this path.
				src: ["style.less"], // Files to match. If other less files are imported in style.less, you don't need to list those here. i.e. sprites.less
				dest: '<%= base.path %>/app/assets/css/',   // Destination path prefix.
				ext: '.css',   // Dest filepaths will have this extension.
			}
		},
		//Add the necessary prefixes for things like moz- or webkit- 
		autoprefixer: {
			no_dest: {
				src: '<%= less.src.dest %>/*.css' // globbing is also possible here
			}
		},
		/*+++++++++++++++++++++++++++++++ End STYLESHEET Section +++++++++++++++++++++++++++++++++++++++++++++++*/
		
		/*++++++++++++++++++++++++++++++ Dealing with JavaScript +++++++++++++++++++++++++++++++++++++++++++++*/
		
		/*  Get dependencies and put them in the 'targetDir' folder.
			What to get is defined in the bower.json file
		*/		
		bower: {
			install: {
				options: {
					targetDir : 'bower_components'
					, cleanBowerDir : true
					//,	verbose: true
				}			
			}
		},
		
		uglify: {
		  options: {
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
			mangle: true,
			compress: {
				drop_console: true
			},
			sourceMap: true
		  }
		  //,
		  //Mangle all your custom JS files into one
		  /*dist: {
			 files: {
			 	'build/app/main.min.js': 
			 	[
            		'build/app/main.min.js',
            	]
            }
          }*/
		},
		/*+++++++++++++++++++++++++++++++ End JavaScript Section +++++++++++++++++++++++++++++++++++++++++++*/
		
		/*+++++++++++ Dealing with Revisions (file renaming and replacing sources) +++++++++++++++++++++++++*/
		
		filerev: {
			options: {
			  encoding: 'utf8',
			  algorithm: 'md5',
			  length: 4
			},
			sourcemaps: {        // Rename sourcemaps.
			  src: ['build/app/*.map']
			},
			assets: {            // Rename minified js/css.
				src: [
					'build/app/*.js',
					'build/app/assets/css/*.css'
					//'build/app/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp}'
				]
			}
		},

		//Reference revisions in .map files
		userev: {
			options: {
			  hash: /(\.[a-f0-9]{8})\.[a-z]+$/,
			},
			// Link to sourcemaps in minified js/css.
			sourcemaps: {            
			  src: ['build/app/assets/css/*.css', 'build/app/*.js', 'build/app/*.map'],
			  options: {
				patterns: {
				  'Linking versioned source maps': /sourceMappingURL=([a-z0-9.]*\.map)/
				}
			  }
			}
		},		
		// Replace all the file blocks in with one file, and use the revved version
		
		useminPrepare: {
		    html: 'app/index.html',
		    options: {  
			    flow: {
			      html: {
			        steps: {
			          concat: ['concat'],
			          uglify: ['uglifyjs'],
			          css: ['cssmin']
			        },
			        post: {}
			      }
			    },
			    root: 'app',
		    	dest: 'build/app'
		    }
		}
		,
		usemin: {
		  html: ['build/app/index.html'],
		  css: ['build/app/assets/css/{,*/}*.css'],
		  options: {
			//dirs: ['build','build/app']

			blockReplacements: {
		      'uglify': function (block) {

		      	  return '<script src="' + block.dest + '"></script>';
		      },
		      'concat': function (block) {
		          return '<script src="' + block.dest + '"></script>';
		      }
		    }
		  }
		},
		/*+++++++++++++++++++++++++++++++ End Revision Section +++++++++++++++++++++++++++++++++++++++++++*/
		
		
		
		/*+++++++++++++++++++++++++++++++++++++++ Extra tasks ++++++++++++++++++++++++++++++++++++++++++++*/
		
		//Delete all the files in the build folder, before every new build
		clean: ["build/"],
		
		//Copy to build destination folder. Whatever is there will be all we need to run the app
		copy: { 			
			main: {
				files: [
					{ 	expand: true, cwd: '<%= base.path %>/app/assets/img/', src: ['**'], dest: 'build/app/assets/img/', filter: 'isFile' },
					{ 	expand: true, cwd: '<%= base.path %>/app/partials/', src: ['**'], dest: 'build/app/partials/', filter: 'isFile' },
					{ 	expand: true, cwd: '<%= base.path %>/app/config/', src: ['**'], dest: 'build/app/config/', filter: 'isFile' },
					{ 	expand: true, cwd: '<%= base.path %>/app/cordova/', src: ['**'], dest: 'build/app/cordova/', filter: 'isFile' },
					{ 	expand: true, cwd: '<%= base.path %>/app/', src: ['index.html'], dest: 'build/app/', filter: 'isFile' }
				//	,					{ 	expand: true, cwd: '<%= base.path %>/components', src: ['**'], dest: 'build/components', filter: 'isFile' }
				]
			}
		},
		//Replace certain URLs with CDN
		'string-replace': {
		  inline: {
			files: {
				'build/': ['build/app/*.html', 'build/**/*.js', 'build/**/*.css'] // include JS files in two diff dirs
			},
			options: {
			  replacements: [{
				//pattern: 'app/config/',
			    //replacement: '/configs/'
			  }]
			}
		  }
		},
		
		// Which directory/files to watch for changes, and then rebuild
		watch: {
			all: {
				
				files: [
					'<%= base.path %>/app/assets/**/*.*', 
					'<%= base.path %>/app/**/*.*', 
					'<%= base.path %>/app/*.html'
				],
				tasks: ['afterInit'],
				options: {
					nospawn: true
				}
			}
		}
	});
	
	
	//Tasks.
	
	//Stylesheet tasks
	grunt.registerTask('stylesheetTasks', [
		'sass',					 // compile sass to css
		'cssmin'			     // concatenate and minify css files
		/*
		'less',
		'autoprefixer'
		*/
	]);
	
	//JavaScript concatenation & minification
	grunt.registerTask('javascriptTasks', [
					     // concatenate js files
	  	'uglify'			     // obfuscate main.min.js
	]);
	
	grunt.registerTask( 'rev', [
	  'filerev:sourcemaps',  // Rename sourcemaps.
	  'userev:sourcemaps',   // Link to sourcemaps in minified js/css.
	  'filerev:assets',      // Rename minified js/css.
	  'usemin'				 // Replace all the file blocks in with one file, and use the revved version
	  
	  //'userev:index'        // Link to minified js/css in index html.	  
	  
	]);
	
	grunt.registerTask('afterInit', [
		'clean',
		'copy',				// Copy the whole dev folder into build folder
		'useminPrepare',	// prepares the configuration for the next two tasks: concat and cssmin
		'stylesheetTasks',	// Run tasks like compiling .scss into .css and autoprefix
		'javascriptTasks',	// Run javascript related tasks such as uglification
		'rev',				// Rename files with revision number to avoid caching
		'string-replace'	// Replace certain assets with CDN sources
	]);

	//Run 'em all
	grunt.registerTask('default', [
		'clean',			// Clean build folder before creating a new build
		'afterInit',		// Runs whenever files are changed through 'watch'
		'watch:all'			// Watch files for changes and automatically rerun the build process 
	]);
};
