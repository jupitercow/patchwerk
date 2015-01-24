<?php

/**
 * Related Posts
 *
 * Usage:	do_action('patch/related_posts');				// Show default number of posts (3)
 *			do_action('patch/related_posts', 5);	// Show 5 posts
 *
 * @return	void
 */
add_action( 'patch/related_posts', 'patch_related_posts' );
function patch_related_posts( $limit )
{
	global $post;

	if (! $limit ) { $limit = 3; }

	echo '<ul id="related-posts">';
	$tags = wp_get_post_tags( $post->ID, 'fields=slugs' );

	if ( $tags )
	{
		$tag = implode(',', $tags);
		$args = array(
			'tag'            => $tag,
			'posts_per_page' => $limit,
			'post__not_in'   => array($post->ID),
		);
		$related_posts = new WP_Query( $args );

		if ( $related_posts->have_posts() )
		{
			while ( $related_posts->have_posts() )
			{
				$related_posts->the_post();
				get_template_part( 'partials/related-post' );
			}
		}
		else
		{
			get_template_part( 'partials/related-post', 'missing' );
		}
		wp_reset_postdata();
	}
	else
	{
		get_template_part( 'partials/related-post', 'missing' );
	}
	echo '</ul>';
}