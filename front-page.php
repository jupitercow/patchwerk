<?php get_header(); // Template Name: Home ?>

<div id="content">

	<div class="wrap">

		<div id="main" role="main">

			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

			<article <?php post_class( 'cf' ); ?>>

				<header class="article-header">
					<h1 class="page-title"><?php the_title(); ?></h1>
				</header>

				<section class="entry-content" itemprop="articleBody">
					<?php the_content(); ?>

					<h2>2 columns</h2>
					<p>Basic two column grid, where "1" is the column size and "2" is the total columns.</p>
					<pre><code>#grid_col_2 {
	> div {
		@include grid_col(1,2);
	}
}</code></pre>
					<div id="grid_col_2" class="grid_container">
						<div><div></div></div>
						<div><div></div></div>
					</div>

					<h2>2 of 12 columns</h2>
					<p>Basic twelve column grid with two items, where "1" is the column size and "12" is the total columns.</p>
					<pre><code>#grid_col_2_12 {
	> div {
		@include grid_col(1,22);
	}
}</code></pre>
					<div id="grid_col_2_12" class="grid_container">
						<div><div></div></div>
						<div><div></div></div>
					</div>

					<h2>2 of 12 columns, first/last</h2>
					<p>Basic twelve column grid with two items, but first and last columns are specified.</p>
					<pre><code>#grid_col_2_12_fl {
	> div:first-child {
		@include grid_col(1,12,'first');
	}
	> div:last-child {
		@include grid_col(1,12,'last');
	}
}</code></pre>
					<div id="grid_col_2_12_fl" class="grid_container">
						<div><div></div></div>
						<div><div></div></div>
					</div>

					<h2>3 columns</h2>
					<pre><code>#grid_col_3 {
	> div {
		@include grid_col(1,3);
	}
}</code></pre>
					<div id="grid_col_3" class="grid_container">
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
					</div>

					<h2>3 of 12 columns</h2>
					<p>Three columns out of twelve, but here a left and right are specified on the first item. This adds "blank" columns of margin on either side.</p>
					<p>In the <i>first-child</i>, <b>1</b> is column size, <b>12</b> is total columns, <b>2</b> adds two blank columns to the left, <b>2</b> adds two blank columns to the right.</p>
					<pre><code>#grid_col_3_12 {
	> div {
		@include grid_col(1);
		&:first-child {
			@include grid_col(1,12,2,2);
		}
	}
}</code></pre>
					<div id="grid_col_3_12" class="grid_container">
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
					</div>

					<h2>4 columns</h2>
					<pre><code>#grid_col_4 {
	> div {
		@include grid_col(1,4);
	}
}</code></pre>
					<div id="grid_col_4" class="grid_container">
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
					</div>

					<h2>6 columns</h2>
					<pre><code>#grid_col_6 {
	> div {
		@include grid_col(1,6);
	}
}</code></pre>
					<div id="grid_col_6" class="grid_container">
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
					</div>

					<h2>12 columns</h2>
					<pre><code>#grid_col_12 {
	> div {
		@include grid_col(1);
	}
}</code></pre>
					<div id="grid_col_12" class="grid_container">
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
					</div>

					<h2>12 columns, unlimited items</h2>
					<p>These last two use an auto grid where no matter how many items you throw in, they will fit them in evenly spaced, but will try to maintain the columns specified</p>
					<pre><code>#flex_grid_auto {
	@include flex_grid_auto(12);
}</code></pre>
					<div id="flex_grid_auto" class="grid_container">
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
					</div>

					<h2>6 columns, unlimited items</h2>
					<p>You can see this doesn't have an exact number, so the last row gets stretched, that is the nature of this format.</p>
					<pre><code>#flex_grid_auto_6 {
	@include flex_grid_auto(6);
}</code></pre>
					<div id="flex_grid_auto_6" class="grid_container">
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
						<div><div></div></div>
					</div>

				</section>

			</article>

			<?php endwhile; endif; ?>

		</div>

	</div>

</div>

<?php get_footer(); ?>
