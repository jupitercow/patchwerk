<?php
/**
 * Basic Theme Support Settings
 */

/**
 * Add an oembed content width
 */
if (! isset($content_width) ) {
	$content_width = 640;
}

/**
 * Example custom thumbnail sizes
 * /
add_image_size( 'custom-thumb-600', 600, 150, true );
add_image_size( 'custom-thumb-300', 300, 100, true );


/**
 * Example widgetized areas
 * /
add_action( 'widgets_init', 'custom_register_sidebars' );
function custom_register_sidebars()
{
	register_sidebar( array(
		'id'            => 'sidebar1',
		'name'          => 'Sidebar 1',
		'description'   => 'The first (primary) sidebar.',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	) );
}


/**
 * Updating WordPress Functions & Theme Support
 *
 * Use this to turn off/on and customize support for features as needed by your theme
 */
add_action( 'after_setup_theme', 'custom_theme_support' );
function custom_theme_support()
{
	/* Featured Image * /
	add_theme_support( 'post-thumbnails', array( 'post', 'press', 'calendar' ) ); // Posts, Press & Calendar

	/* default thumb size * /
	set_post_thumbnail_size( 120, 120, true );

	/* This feature enables post and comment RSS feed links to head * /
	add_theme_support( 'automatic-feed-links' );

	/* Enable support for HTML5 markup. */
	add_theme_support( 'html5', 
		array(
			'comment-list',
			'search-form',
			'comment-form',
			'gallery',
			'caption'
		)
	);
			
	/* adding post format support * /
	add_theme_support( 'post-formats',
		array(
			'aside',             // title less blurb
			'gallery',           // gallery of images
			'link',              // quick link to other site
			'image',             // an image
			'quote',             // a quick quote
			'status',            // a Facebook like status update
			'video',             // video
			'audio',             // audio
			'chat'               // chat transcript
		)
	);

	/* wp menus */
	add_theme_support( 'menus' );

	/* registering menus */
	register_nav_menus( array(
		'main-nav'   => 'Main Navigation',     // main nav in header
		'footer-nav' => 'Footer Navigation',   // links in footer
	) );
}


/**
 * Add options page support
 * /
if ( function_exists('acf_add_options_page') )
{
	acf_add_options_page( array(
		'page_title' => get_option('blogname') . ' Settings',
		'menu_title' => 'Site Settings',
	) );
}


/**
 * Add options page support
 * /
if ( function_exists('acf_add_options_page') )
{
	acf_add_options_page( array(
		'page_title' => get_option('blogname') . ' Settings',
		'menu_title' => 'Site Settings',
	) );
}


/**
 * Deregister admin styles on the front end when using ACF forms
 * /
add_action( 'wp_print_styles', 'custom_acf_deregister_styles', 100 );
function custom_acf_deregister_styles()
{
	if (! is_admin() ) wp_deregister_style( 'wp-admin' );
}

/**
 * Deregister most of the ACF default styles
 * /
add_action( 'wp_print_styles', 'remove_acf_styles', 200 );
function remove_acf_styles()
{
	$styles = array(
		'acf',
		'acf-field-group',
		'acf-pro-field-group',
		'acf-global',
		'acf-input',
		'acf-pro-input',
		'acf-datepicker',
	);
	foreach( $styles as $v ) {
		wp_deregister_style( $v ); 
	}
}
/**/