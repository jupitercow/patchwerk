<?php
/**
 * Enqueue Scripts & Styles
 */

/**
 * Add enqueue scripts/styles
 *
 * @return	void
 */
add_action( 'after_setup_theme', 'patch_enqueue' );
function patch_enqueue()
{
	add_action( 'wp_enqueue_scripts', 'patch_styles', 999 );
	add_action( 'wp_enqueue_scripts', 'patch_scripts', 999 );
}

/**
 * Load in the base styles
 *
 * @return	void
 */
function patch_styles()
{
	global $wp_styles;

	// register main stylesheet
	wp_enqueue_style( 'patch-stylesheet', get_stylesheet_directory_uri() . '/assets/css/style.css', array(), null, 'all' );

	// ie-only style sheet
	wp_enqueue_style( 'patch-ie-only', get_stylesheet_directory_uri() . '/assets/css/ie.css', array(), null );
	$wp_styles->add_data( 'patch-ie-only', 'conditional', 'lt IE 9' );
}

/**
 * Load in the base scripts
 *
 * @return	void
 */
function patch_scripts()
{
	global $wp_scripts;

	/* call jQuery from Google and move to footer * /
	wp_deregister_script('jquery');
	wp_register_script('jquery', ('//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js'), false, null, true);

	/* move core jQuery to footer * /
	wp_deregister_script('jquery');
	wp_register_script('jquery', includes_url( '/js/jquery/jquery.js' ), false, null, true);

	/* modernizr (without media query polyfill) */
	#wp_register_script( 'patch-modernizr', get_stylesheet_directory_uri() . '/assets/js/modernizr.custom.min.js', array(), null, false );
	wp_enqueue_script( 'patch-shiv', '//html5shim.googlecode.com/svn/trunk/html5.js', false, null, false );
	$wp_scripts->add_data( 'patch-shiv', 'conditional', 'lt IE 9' );

	/* comment reply script for threaded comments * /
	if ( is_singular() && comments_open() && 1 == get_option('thread_comments') ) {
		wp_enqueue_script( 'comment-reply' );
	}
	
	/* Adding scripts file in the footer */
	wp_enqueue_script( 'patch-js', get_stylesheet_directory_uri() . '/assets/js/scripts.js', false, null, true );//array( 'jquery' )
	$args = array(
		'ajaxurl' => admin_url('admin-ajax.php'),
	);
	wp_localize_script( 'patch-js', 'patch', $args );
}

/**
 * Remove jQuery Migrate
 *
 * Be absolutely sure, you are ok to do this, and test your code afterwards.
 *
 * @return	void
 * /
add_filter( 'wp_default_scripts', 'patch_dequeue_jquery_migrate' );
function patch_dequeue_jquery_migrate( &$scripts )
{
	if (! is_admin() )
	{
		$scripts->remove( 'jquery');
		$scripts->add( 'jquery', false, array( 'jquery-core' ), '1.10.2' );
	}
}
/**/