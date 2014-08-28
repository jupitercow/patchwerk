<div id="sidebar" role="complementary">

	<div class="side-content">

		<h2>Sidebar</h2>

		<?php if ( is_active_sidebar( 'sidebar1' ) ) : ?>

			<?php dynamic_sidebar( 'sidebar1' ); ?>

		<?php endif; ?>

	</div>

</div>
