<?php

/**
 * If ACF is not turned on yet,these functions help keep things from breaking.
 */
/**
 * Plugins list
 *
 * classname => relative url to plugin file
 */

function patch_get_field( $field_key, $post_id=false, $format_value=true )
{
	if ( function_exists('get_field') ) {
		return get_field( $field_key, $post_id, $format_value );
	}

	$output = false;
	if ( false !== strpos($post_id, 'user_') ) {
		$post_id = str_replace('user_', '', $post_id);
		$output  = get_user_meta($post_id, $field_key, true);
	} elseif ( false !== strpos($post_id, 'option') ) {
		$output  = get_option($field_key);
	} else {
		$output  = get_post_meta( $field_key, $post_id, true);
	}
	return $output;
}

function patch_the_field( $field_key, $post_id=false )
{
	if ( function_exists('the_field') ) {
		echo the_field( $field_key, $post_id );
		return;
	}

	$output = patch_get_field($field_key, $post_id);
	if ( is_array($output) ) {
		$output = @implode(', ',$output);
	}
	echo $output;
}