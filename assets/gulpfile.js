var environment = 'development', // production | development
	gulp        = require('gulp'),
	p           = require('gulp-load-plugins')(), // {DEBUG: true}
	compression = ( 'production' === environment ? 'compressed' : 'expanded' );


/**
 * Default error handler
 */
var onError = function( error ) {
	p.notify.onError({
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
		.pipe( p.plumber({ errorHandler: onError }) )
		.pipe( p.sass({ style: compression }) )
		.pipe( p.autoprefixer('last 2 versions', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4') )
		.pipe( p.if('production'==environment, p.minifyCss()) )
		.pipe( gulp.dest('css') )
		.pipe( p.notify({
			title: 'Styles',
			message: message
		}) );
}


/**
 * CSS
 */
gulp.task('styles', function() {
	return base_style('scss/style.scss', 'Main complete');
});
gulp.task('styles-login', function() {
	return base_style('scss/login.scss', 'Log in complete');
});
gulp.task('styles-editor', function() {
	return base_style('scss/editor.scss', 'Editor complete');
});
gulp.task('styles-ie', function() {
	return gulp.src('scss/ie.scss')
		.pipe( p.sass({ style: compression }) )
		.pipe( p.autoprefixer('ie 7', 'ie 8') )
		.pipe( p.if('production'==environment, p.minifyCss()) )
		.pipe( gulp.dest('css') )
		.pipe( p.notify({
			title: 'Styles',
			message: 'IE complete'
		}) );
});
gulp.task('styles-admin', function() {
	return gulp.src( '../admin/assets/scss/admin.scss' )
		.pipe( p.sass({ style: compression }) )
		.pipe( p.autoprefixer('last 2 versions', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4') )
		.pipe( p.if('production'==environment, p.minifyCss()) )
		.pipe( gulp.dest('../admin/assets/css') )
		.pipe( p.notify({
			title: 'Styles',
			message: 'Admin complete'
		}) );
});


/**
 * IMAGES
 */
gulp.task('images', function () {
	return gulp.src(['img/src/*', '!img/src/screenshot.png'])
		.pipe( p.imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
		}) )
		.pipe( gulp.dest('img') )
		//.pipe( webp() )
		.pipe( p.notify({
			title: 'Images',
			message: 'Main complete'
		}) );
});

gulp.task('screenshot', function () {
	return gulp.src('img/src/screenshot.png')
		.pipe( p.imagemin({
			progressive: true,
			optimizationLevel: 5,
		}) )
		.pipe( gulp.dest('..') )
		.pipe( p.notify({
			title: 'Images',
			message: 'Screenshot complete'
		}) );
});

gulp.task('favicons', function(cb) {
	p.favicons({
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
	})
	.pipe( p.notify({
		title: 'Images',
		message: 'Favicon complete'
	}) );



    return gulp.src('img/src/favicon.png')
	    .pipe( p.favicons({
	        background: "#fff",
	        path: "",
	        display: "standalone",
	        html: null,
	        logging: false,
	        online: false,
			files: {
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
				twitter: false,
				windows: false,
				yandex: false,
			},
	    }))
	    .pipe( gulp.dest('img') )
		.pipe( p.notify({
			title: 'Images',
			message: 'Favicon complete'
		}) );
});


/**
 * SVG ICONS
 */
gulp.task('icons', function() {
	return gulp.src('icons/src/*')
		//.pipe( p.if('production'==environment, svgmin()) )
		.pipe( p.if('production'==environment, p.svgmin()) )
		.pipe( p.svgstore({ inlineSvg: true }) )
		.pipe( p.cheerio({
			run: function( $, file ) {
				$('svg').addClass('hide');
				$('symbol[id!=logo]').find('path,g,polygon,circle,rect').removeAttr('fill');
				//$('symbol[id!=logo] g').removeAttr('fill');
			},
			parserOptions: { xmlMode: true },
		}))
		.pipe( p.rename('icons.svg') )
		.pipe( gulp.dest('icons') )
		.pipe( p.notify({
			title: 'Images',
			message: 'Icons complete'
		}) );
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
		.pipe( p.jshint() )
		.pipe( p.jshint.reporter('jshint-stylish') )
		.pipe( p.jshint.reporter('fail') )
		.pipe( p.notify(function(file) {
			return {
				title: 'JSHint',
				message: 'Passed: ' + file.relative,
			};
        }) )
		.pipe( p.concat('scripts.js') )
		.pipe( p.if('production'==environment, p.stripDebug()) )
		.pipe( p.if('production'==environment, p.uglify()) )
		.pipe( gulp.dest('js') )
		.pipe( p.notify({
			title: 'Scripts',
			message: 'Main complete'
		}) );
});


/**
 * default: gulp
 */
gulp.task('default', function() {
	gulp.start('styles', 'styles-login', 'styles-editor', 'styles-ie', 'scripts');
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