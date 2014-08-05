<?php

/**
 * Set up the theme
 */
define( 'PATCH_DEVELOPER',     'Jupitercow' );
define( 'PATCH_DEVELOPER_URL', 'http://Jupitercow.com/' );

/**
 * Easy way to get theme info if needed
 */
#$patch_info = wp_get_theme();
#define( 'PATCH_VERSION',        $patch_info->Version );

/**
 * Load modules
 *
 * Comment out modules that are not desired for the current site.
 */

// Admin
require_once( 'admin/admin.php' );
require_once( 'admin/login.php' );
require_once( 'admin/tinymce.php' );
#require_once( 'admin/dashboard-widget.php' ); 			// A basic example to show instructions
#require_once( 'admin/recently-updated-content.php' ); 	// Shows recently updated content. REQUIRES customization
#require_once( 'admin/disable-comments.php' );          // Completely remove comments from the admin area

// Front end
require_once( 'includes/cleanup.php' );
require_once( 'includes/theme-support.php' );
require_once( 'includes/enqueue.php' );
require_once( 'includes/page-navi.php' );
require_once( 'includes/related-posts.php' );
#require_once( 'includes/custom-post-types.php' );		// Create custom post types
#require_once( 'includes/nice-search.php' );			// Clean search urls
#require_once( 'includes/assets-rewrites.php' );		// Rewrite theme assets to /assets and plugins to /plugins. DOES NOT WORK ON NGINX SERVERS LIKE WPENGINE

/**
 * Customize Site
 */
