<?php
/**
 * Patchwerk Disable Comments in the Admin
 */

// actions
add_action( 'wp_before_admin_bar_render',       'patch_remove_comments_admin_bar' );
add_action( 'admin_menu',                       'patch_remove_comments_admin_menu', 999 );
add_action( 'admin_head-edit.php',              'patch_remove_comments_quick_edit' );
add_action( 'admin_menu',                       'patch_remove_comments_metaboxes' );

// filters
add_filter( 'manage_edit-page_columns',         'patch_remove_comments_list_columns', 10, 1 );	
add_filter( 'manage_edit-post_columns',         'patch_remove_comments_list_columns', 10, 1 );
add_filter( 'manage_media_columns',             'patch_remove_comments_list_columns', 10, 1 );	
#add_filter( 'manage_edit-CUSTOMPOSTTYPE_columns', 'patch_remove_comments_list_columns', 10, 1 );
add_filter( 'wp_head', 							'patch_remove_wp_widget_recent_comments_style', 1 );
add_action( 'wp_head',							'patch_remove_recent_comments_style', 1 );

/**
 * Remove from wpadmin menu (TOP BAR)
 */
function patch_remove_comments_admin_bar()
{
	global $wp_admin_bar;
	$wp_admin_bar->remove_menu('comments');
}

/**
 * Remove from admin menu (LEFT SIDEBAR)
 */
function patch_remove_comments_admin_menu()
{	
	remove_menu_page('edit-comments.php');
	remove_submenu_page( 'options-general.php', 'options-discussion.php' );
}

/**
 * Remove ping option and comments option from Quick Edit
 */
function patch_remove_comments_quick_edit() 
{    
	global $current_screen;
	if ( 'edit-post' != $current_screen->id && 'edit-page' != $current_screen->id )
		return;
	?>
	<script type="text/javascript">			
		jQuery(document).ready( function($) {
			$('span:contains("Allow Comments")').each(function (i) {
				$(this).parent().remove();
			});
			$('span:contains("Allow Pings")').each(function (i) {
				$(this).parent().remove();
			});
		});	   
	</script>
	<?php
} 

/**
 * Remove Comments Widget from dashboard and metaboxes from Pages & Posts
 */
function patch_remove_comments_metaboxes()
{
	remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'core');	// Comments Widget
	remove_meta_box( 'commentstatusdiv','post','normal' );              // Comments Status Metabox
	remove_meta_box( 'commentsdiv','post','normal' );                   // Comments Metabox
	remove_meta_box( 'commentstatusdiv','page','normal' );              // Comments Metabox
	remove_meta_box( 'commentsdiv','page','normal' );                   // Comments Metabox
}

/**
 * Remove Comments Column from lists-table
 */
function patch_remove_comments_list_columns( $columns )
{
	unset($columns['comments']);
	return $columns;
}


// remove injected CSS for recent comments widget
function patch_remove_wp_widget_recent_comments_style() {
	if ( has_filter( 'wp_head', 'wp_widget_recent_comments_style' ) ) {
		remove_filter( 'wp_head', 'wp_widget_recent_comments_style' );
	}
}

// remove injected CSS from recent comments widget
function patch_remove_recent_comments_style() {
	global $wp_widget_factory;
	if (isset($wp_widget_factory->widgets['WP_Widget_Recent_Comments'])) {
		remove_action( 'wp_head', array($wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style') );
	}
}

