// required
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	compass = require('gulp-compass'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	rename = require('gulp-rename');

// task
gulp.task('scripts', function() {
	gulp.src([ 'app/js/**/*.js', '!app/js/**/*.min.js' ])
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
		.pipe(reload({ stream: true }));
});

// compass
gulp.task('compass', function() {
	gulp.src('app/scss/style.scss')
		.pipe(plumber())
		/*
		.pipe(compass({
			config_file: './config.rb',
			css: 'app/css',
			sass: 'app/scss',
			require: [ 'susy' ]
		}))
		/*	*/
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('app/css'))
		.pipe(reload({ stream: true }));
});

// html
gulp.task('html', function() {
	gulp.src('app/**/*.html')
		.pipe(reload({ stream: true }));
});

// browser sync
gulp.task('browser-sync', function() {
	browserSync({
		notify: false,
		injectChanges: true,
		server: {
			baseDir: './app/'
		},
		ghostMode: {
			clicks: true,
			forms: true,
			scroll: true
		},
		scrollThrottle: 100,
		scrollElements: ['.scroller']
	})
});

// watch
gulp.task('watch', function() {
	gulp.watch('app/**/*.html', [ 'html' ]);
	gulp.watch('app/js/**/*.js', [ 'scripts' ]);
	gulp.watch('app/scss/**/*.scss', [ 'compass' ]);
});

// default
gulp.task('default', [ 'scripts', 'compass', 'html', 'browser-sync', 'watch' ]);
