var environment = 'development', // production | development
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
	cache = require('gulp-cache'),
	imagemin = require('gulp-imagemin'),
	//webp = require('gulp-webp'),
	//svgSprite = require('gulp-svg-sprite'),
	filter = require('gulp-filter'),
	svg2png = require('gulp-svg2png'),
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
	return gulp.src('img/src/*')
		.pipe( imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
		}) )
		.pipe( gulp.dest('img') )
		//.pipe( webp() )
		//.pipe( gulp.dest('img') )
		.pipe( notify({ message: 'Image task complete' }) );
});


/**
 * SVG ICONS
 * /
gulp.task('icons', function () {
	return svg = gulp.src('icons/src/*')
		.pipe( svgSprite({
			common: "svg-icon",
			svgId: "svg-%f",
			cssFile: "_icons.scss",
			svgPath: "../icons/%f",
			pngPath: "../icons/%f",
			svg: {
				sprite: "icons.svg"
			},
			preview: {
				sprite: "preview.html"
			}
		}) )
		.pipe( gulp.dest("icons") )
		.pipe( filter("** /*.svg") )
		.pipe( svg2png() )
		.pipe( gulp.dest("icons") );
});


/**
 * JS
 */
gulp.task('scripts', function() {
	return gulp.src([
			'js/src/polyfills/*.js',
			'js/src/libs/*.js',
			'js/src/field_*.js',
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
	gulp.start('images', /*'icons',*/ 'styles', 'styles-login', 'styles-editor', 'styles-ie', 'scripts');
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
	gulp.start('images', /*'icons',*/ 'styles', 'styles-editor', 'styles-ie' );
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