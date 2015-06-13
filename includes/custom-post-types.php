<?php
/**
 * Custom Post Types
 */

/**
 * Flush rewrite rules for custom post types
 *
 * @return	void
 */
add_action( 'after_switch_theme', 'patch_flush_rewrite_rules' );
function patch_flush_rewrite_rules()
{
	flush_rewrite_rules();
}

/**
 * Examples
 *
 * @return	void
 */
add_action( 'init', 'custom_register_post_type');
function custom_register_post_type()
{
	register_post_type( 'products',
		array( 'labels' => 
			array(
				'name'               => 'Products',
				'singular_name'      => 'Product',
				'all_items'          => 'All Products',
				'add_new'            => 'Add New',
				'add_new_item'       => 'Add New Product',
				'edit'               => 'Edit',
				'edit_item'          => 'Edit Product',
				'new_item'           => 'New Product',
				'view_item'          => 'View Product',
				'search_items'       => 'Search Products',
				'not_found'          => 'Nothing found in the Database.',
				'not_found_in_trash' => 'Nothing found in Trash',
				'parent_item_colon'  => '',
			),
			'description'         => 'Products',
			'public'              => true,
			'publicly_queryable'  => true,
			'exclude_from_search' => false,
			'show_ui'             => true,
			'query_var'           => true,
			'menu_position'       => 8,
			'menu_icon'           => 'dashicons-products',
			'rewrite'	          => array( 'slug' => 'product', 'with_front' => false ),
			'has_archive'         => 'products',
			'capability_type'     => 'post',
			'hierarchical'        => false,
			'supports'            => array( 'title', 'editor', 'author', 'thumbnail', 'revisions'),
		)
	);

	/* this adds your post categories to your custom post type */
	register_taxonomy_for_object_type( 'category', 'products' );
	/* this adds your post tags to your custom post type */
	register_taxonomy_for_object_type( 'post_tag', 'products' );

	/* Custom Taxonomy (Category) */
	register_taxonomy( 'product_types',
		array('products'), // if you change the name of register_post_type( 'custom_type', then you have to change this
		array('hierarchical' => true, // if this is true, it acts like categories
			'labels' => array(
				'name' => 'Product Types',
				'singular_name' => 'Product Type',
				'search_items' =>  'Search Product Types',
				'all_items' => 'All Product Types',
				'parent_item' => 'Parent Product Type',
				'parent_item_colon' => 'Parent Product Type:',
				'edit_item' => 'Edit Product Type',
				'update_item' => 'Update Product Type',
				'add_new_item' => 'Add New Product Type',
				'new_item_name' => 'New Product Type Name',
			),
			'show_admin_column' => true,
			'show_ui' => true,
			'query_var' => true,
			'rewrite' => array( 'slug' => 'product-type' ),
		)
	);

	/* Custom Taxonomy (Tag) */
	register_taxonomy( 'custom_tag',
		array('products'), // if you change the name of register_post_type( 'custom_type', then you have to change this
		array('hierarchical' => false, // if this is false, it acts like tags
			'labels' => array(
				'name' => 'Custom Tags',
				'singular_name' => 'Custom Tag',
				'search_items' =>  'Search Custom Tags',
				'all_items' => 'All Custom Tags',
				'parent_item' => 'Parent Custom Tag',
				'parent_item_colon' => 'Parent Custom Tag:',
				'edit_item' => 'Edit Custom Tag',
				'update_item' => 'Update Custom Tag',
				'add_new_item' => 'Add New Custom Tag',
				'new_item_name' => 'New Custom Tag Name',
			),
			'show_admin_column' => true,
			'show_ui' => true,
			'query_var' => true,
		)
	);
}