<?php
/**
 * Customize the login screen
 */
add_action( 'login_init', 'patch_login_init' );
function patch_login_init()
{
	// actions
	add_action( 'login_enqueue_scripts', 'patch_login_css' );

	// filters
	add_filter( 'login_headerurl',       'patch_login_url' );
	add_filter( 'login_headertitle',     'patch_login_title' );
}

/**
 * Add theme log in css
 */
function patch_login_css()
{
	wp_enqueue_style( 'patch_admin_login', get_template_directory_uri() . '/assets/css/login.css', false );
}

/**
 * Change the logo link from wordpress.org to the site home
 */
function patch_login_url()
{
	return home_url( '/' );
}

/**
 * Change the alt text on the logo to site name
 */
function patch_login_title()
{
	return get_option('blogname');
}
