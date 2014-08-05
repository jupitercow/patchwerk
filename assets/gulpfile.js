var environment = 'development', // 'production'
	gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	stripDebug = require('gulp-strip-debug'),
	jsHint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	clean = require('gulp-clean'),
	cache = require('gulp-cache'),
	compression = ( 'production' === environment ? 'compressed' : 'expanded' );

function base_style( filename, message )
{
	return gulp.src( filename )
		.pipe( sass({ style: compression }) )
		.pipe( autoprefixer('last 2 versions', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4') )
		.pipe( gulpif('production'==environment, minifycss()) )
		.pipe( gulp.dest('css') )
		.pipe( notify({ message: message }) );
}

// CSS
gulp.task('styles', function() {
	return base_style('scss/style.scss', 'Styles task complete');
});
gulp.task('styles-login', function() {
	return base_style('scss/login.scss', 'Admin styles task complete');
});
gulp.task('styles-editor', function() {
	return base_style('scss/editor.scss', 'Editor styles task complete');
});
gulp.task('styles-ie', function() {
	return gulp.src('scss/ie.scss')
		.pipe( sass({ style: compression }) )
		.pipe( autoprefixer('ie 7', 'ie 8') )
		.pipe( gulpif('production'==environment, minifycss()) )
		.pipe( gulp.dest('css') )
		.pipe( notify({ message: 'IE styles task complete' }) );
});

// JS
gulp.task('scripts', function() {
	return gulp.src([
			'js/src/libs/*.js',
			'js/src/**/*.js',
		])
		.pipe( concat('scripts.js') )
		.pipe( jsHint() )
		.pipe( gulpif('production'==environment, stripDebug()) )
		.pipe( gulpif('production'==environment, uglify()) )
		.pipe( gulp.dest('js') )
		.pipe( notify({ message: 'Scripts task complete' }) );
});

// default: gulp
gulp.task('default', function() {
	gulp.start('styles', 'styles-login', 'styles-editor', 'styles-ie', 'scripts');
});

// gulp watch (does not compile styles-ie, styles-login, or styles-editor)
gulp.task('watch', function() {
	gulp.watch('scss/**/*.scss', ['styles']);
	gulp.watch('js/**/*.js', ['scripts']);
});