<?php

/**
 * rewrites urls like /wp-content/themes/goldenpatch/assets/* to /assets/*
 * and /wp-content/plugins/* to /plugins/*
 */
add_action( 'after_setup_theme', 'patch_assets_rewrites' );
function patch_assets_rewrites()
{
	/**
	 * Define helper constants
	 */
	$get_theme_name = explode( '/themes/', get_template_directory() );

	define( 'RELATIVE_PLUGIN_PATH',  str_replace( home_url() . '/', '', plugins_url() ) );
	define( 'RELATIVE_CONTENT_PATH', str_replace( home_url() . '/', '', content_url() ) );
	define( 'THEME_NAME',            next($get_theme_name) );
	define( 'THEME_PATH',            RELATIVE_CONTENT_PATH . '/themes/' . THEME_NAME );

	/**
	 * Rewrites do not happen for multisite installations or child themes
	 *
	 * Rewrite:
	 *   /wp-content/themes/themename/assets/css/ to /assets/css/
	 *   /wp-content/themes/themename/assets/js/  to /assets/js/
	 *   /wp-content/themes/themename/assets/img/ to /assets/img/
	 *   /wp-content/plugins/                     to /plugins/
	 *
	 * If you aren't using Apache, Nginx configuration settings can be found in the README
	 */
	function patch_add_rewrites( $content )
	{
		global $wp_rewrite;
		$new_non_wp_rules = array(
			'assets/(.*)'          => THEME_PATH . '/assets/$1',
			'plugins/(.*)'         => RELATIVE_PLUGIN_PATH . '/$1'
		);
		$wp_rewrite->non_wp_rules = array_merge($wp_rewrite->non_wp_rules, $new_non_wp_rules);
		return $content;
	}

	function patch_clean_urls( $content )
	{
		if ( strpos($content, RELATIVE_PLUGIN_PATH) > 0 ) {
			return str_replace('/' . RELATIVE_PLUGIN_PATH,  '/plugins', $content);
		} else {
			return str_replace('/' . THEME_PATH, '', $content);
		}
	}

	if (! is_multisite() && ! is_child_theme() )
	{
		add_action('generate_rewrite_rules', 'patch_add_rewrites');

		if (! is_admin() )
		{
			$tags = array(
				'plugins_url',
				'bloginfo',
				'stylesheet_directory_uri',
				'template_directory_uri',
				'script_loader_src',
				'style_loader_src'
			);

			foreach ( $tags as $tag ) {
				add_filter($tag, 'patch_clean_urls');
			}
		}
	}
}