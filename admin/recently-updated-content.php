<?php
/**
 * Patchwerk Recently Updated Content Admin Dashboard Widget
 */

/**
 * Sets up the widget
 *
 * @author  Stanislav Kostadinov
 * @return	void
 */
add_action( 'wp_dashboard_setup', 'recently_updated_content_dashboard_widget' );
function recently_updated_content_dashboard_widget()
{
	$widget_id   = 'recently_updated_content'; // Widget slug
	$widget_name = 'Recently Updated Content'; // Title
	$callback    = 'recently_updated_content_function';
	wp_add_dashboard_widget( $widget_id, $widget_name, $callback );
}

	/**
	 * Create the function to output the contents of our Dashboard Widget.
	 *
	 * @author  Stanislav Kostadinov
	 * @since	1.0.0
	 * @return	void
	 */
	function recently_updated_content_function()
	{
		global $current_user; get_currentuserinfo(); // Get the logged in user info

		echo "Hello, <b>" . $current_user->display_name . "</b>!<br />Below you can see all content updated in the past 30 days.";

		// Get the posts from the last 30 days only
		function filter_where( $where = '' ) {
			$where .= " AND post_modified > '" . date('Y-m-d', strtotime('-30 days')) . "'";
			return $where;
		}

		add_filter( 'posts_where', 'filter_where' );

		// The Query
		$modified_posts_query = new WP_Query( array(  'post_type' => array( 'post', 'page' ),
			'posts_per_page' => '-1',
			'orderby' => 'modified',
			'order'=> 'DESC',
		));

		// The Loop
		if ( $modified_posts_query->have_posts() ) {

			// Style the table
			?>
			<style>
			#recently-updated-posts {margin-top: 15px; width: 100%;}
			.modified-number-col {width: 4%;}
			.modified-title-col {width: 50%;}
			.modified-date-col {width: 26%;}
			.modified-user-col {width: 20%;}

			#recently-updated-posts tr:nth-child(odd) {background: #f6f6f6;}
			#recently-updated-posts tr:first-child {background: #2ea2cc; color: #fff;}
			#recently-updated-posts .modified-number {text-align: center;}
			</style>

			<table id="recently-updated-posts" cellpadding="6">
			<tr>
				<td class="modified-number-col"></td>
				<td class="modified-title-col">Title</td>
				<td class="modified-date-col">Last Updated</td>
				<td class="modified-user-col">By</td>
			</tr>

			<?php
			$count = 0;

			while ( $modified_posts_query->have_posts() ) {
			
				$modified_posts_query->the_post();
				
				// Check if the modified date is different from the publish date
				if (get_the_modified_time() != get_the_time()) {

					$count++; ?>

					<tr id="post-<?php the_ID(); ?>">
						<td class="modified-number"><?php echo $count . '.'; ?></td>
						<td class="modified-title"><strong><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></strong> | <a href="<?php echo get_edit_post_link(); ?>">Edit</a></td>
						<td class="modified-date"><?php the_modified_date('M j, Y'); ?> at <?php the_modified_date('H:i'); ?></td>
						<td class="modified-user"><?php the_modified_author(); ?></td>
					</tr>

					<?php

				}
			}

			echo '</table>';

			// Leave a message if no posts have been modified yet.
			if (!isset($count)) {

				echo '<p>No content has been modified recently.</p>';

			}

		}

		// Leave a message if the query returns no results.
		else {
			echo '<p>No pages found.</p>';
		}

		// Restore original Post Data.
		wp_reset_postdata();
	}