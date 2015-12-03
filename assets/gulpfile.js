var environment  = 'development', // production | development
	gulp         = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	cache        = require('gulp-cache'),
	cheerio      = require('gulp-cheerio'),
	clean        = require('gulp-clean'),
	concat       = require('gulp-concat'),
	favicons     = require('favicons'),
	filter       = require('gulp-filter'),
	gulpif       = require('gulp-if'),
	imagemin     = require('gulp-imagemin'),
	jsHint       = require('gulp-jshint'),
	minifycss    = require('gulp-minify-css'),
	notify       = require('gulp-notify'),
	plumber      = require('gulp-plumber'),
	rename       = require('gulp-rename'),
	sass         = require('gulp-sass'),
	stripDebug   = require('gulp-strip-debug'),
	//svg2png      = require('gulp-svg2png'),
	svgmin       = require('gulp-svgmin'),
	//svgSprite    = require('gulp-svg-sprite'),
	svgstore     = require('gulp-svgstore'),
	uglify       = require('gulp-uglify'),
	//webp         = require('gulp-webp'),
	compression  = ( 'production' === environment ? 'compressed' : 'expanded' );

/**
 * Default error handler
 */
var onError = function( error ) {
	notify.onError({
		title:    "Gulp",
		subtitle: "Failure!",
		message:  "Error: <%= error.message %>"
	})(error);
	this.emit('end');
}


/**
 * Base style processing
 */
function base_style( filename, message )
{
	return gulp.src( filename )
		.pipe( plumber({ errorHandler: onError }) )
		.pipe( sass({ style: compression }) )
		.pipe( autoprefixer('last 2 versions', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4') )
		.pipe( gulpif('production'==environment, minifycss()) )
		.pipe( gulp.dest('css') )
		.pipe( notify({ message: message }) );
}


/**
 * CSS
 */
gulp.task('styles', function() {
	return base_style('scss/style.scss', 'Styles task complete');
});
gulp.task('styles-login', function() {
	return base_style('scss/login.scss', 'Log in styles task complete');
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
gulp.task('styles-admin', function() {
	return gulp.src( '../admin/assets/scss/admin.scss' )
		.pipe( sass({ style: compression }) )
		.pipe( autoprefixer('last 2 versions', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4') )
		.pipe( gulpif('production'==environment, minifycss()) )
		.pipe( gulp.dest('../admin/assets/css') )
		.pipe( notify({ message: 'Admin styles task complete' }) );
});


/**
 * IMAGES
 */
gulp.task('images', function () {
	return gulp.src(['img/src/*', '!img/src/screenshot.png'])
		.pipe( imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
		}) )
		.pipe( gulp.dest('img') )
		//.pipe( webp() )
		.pipe( notify({ message: 'Image task complete' }) );
});

gulp.task('screenshot', function () {
	return gulp.src('img/src/screenshot.png')
		.pipe( imagemin({
			progressive: true,
			optimizationLevel: 5,
		}) )
		.pipe( gulp.dest('..') )
		.pipe( notify({ message: 'Screenshot task complete' }) );
});

gulp.task('favicons', function(cb) {
	favicons({
		files: {
			src: 'img/src/favicon.png',
			dest: 'img',
			html: null,
			iconsPath: null,
			androidManifest: null,
			browserConfig: null,
			firefoxManifest: null,
			yandexManifest: null,
		},
		icons: {
			android: false,
			appleIcon: false,
			appleStartup: false,
			coast: false,
			favicons: true,
			firefox: false,
			opengraph: false,
			windows: false,
			yandex: false,
		},
	});
});


/**
 * SVG ICONS
 */
gulp.task('icons', function() {
	return gulp.src('icons/src/*')
		//.pipe( gulpif('production'==environment, svgmin()) )
		.pipe( gulpif('production'==environment, svgmin()) )
		.pipe( svgstore({ inlineSvg: true }) )
		.pipe( cheerio({
			run: function( $, file ) {
				$('svg').addClass('hide');
				$('symbol[id!=logo]').find('path,g,polygon,circle,rect').removeAttr('fill');
				//$('symbol[id!=logo] g').removeAttr('fill');
			},
			parserOptions: { xmlMode: true },
		}))
		.pipe( rename('icons.svg') )
		.pipe( gulp.dest('icons') )
		.pipe( notify({ message: 'Icon task complete' }) );
		//.pipe( reload({ stream:true }) );
});


/**
 * JS
 */
gulp.task('scripts', function() {
	return gulp.src([
			'js/src/polyfills/*.js',
			'js/src/libs/*.js',
			'js/src/theme.js',
			'js/src/**/*.js',
		])
		.pipe( concat('scripts.js') )
		.pipe( jsHint() )
		.pipe( gulpif('production'==environment, stripDebug()) )
		.pipe( gulpif('production'==environment, uglify()) )
		.pipe( gulp.dest('js') )
		.pipe( notify({ message: 'Scripts task complete' }) );
});

gulp.task('pdf_script', function() {
	return gulp.src('js/pdfsrc/pdf.js')
		.pipe( gulpif('production'==environment, stripDebug()) )
		.pipe( gulpif('production'==environment, uglify()) )
		.pipe( rename('pdf.js') )
		.pipe( gulp.dest('js') )
		.pipe( notify({ message: 'PDF.js task complete' }) );
});

gulp.task('pdf_worker_script', function() {
	return gulp.src('js/pdfsrc/pdf.worker.js')
		.pipe( gulpif('production'==environment, stripDebug()) )
		.pipe( gulpif('production'==environment, uglify()) )
		.pipe( rename('pdf.worker.js') )
		.pipe( gulp.dest('js') )
		.pipe( notify({ message: 'PDF.js Worker task complete' }) );
});


/**
 * default: gulp
 */
gulp.task('default', function() {
	gulp.start('images', 'icons', 'styles', 'styles-login', 'styles-editor', 'styles-ie', 'scripts');
});


/**
 * pdf worker
 */
gulp.task('pdf', function() {
	gulp.start('pdf_script', 'pdf_worker_script');
});


/**
 * gulp images
 *
 * only processes images and icons, and then updates necessary styles
 */
gulp.task('img', function() {
	gulp.start('images', 'icons', 'favicons');
});


/**
 * gulp watch
 *
 * does not compile styles-ie, styles-login, or styles-editor, doesn't process images or icons
 */
gulp.task('watch', function() {
	gulp.watch('scss/**/*.scss', ['styles']);
	gulp.watch('js/**/*.js', ['scripts']);
});