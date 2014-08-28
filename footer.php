		</div>

		<footer id="footer" role="contentinfo">

			<div id="inner-footer" class="wrap cf">

				<nav id="footer-nav" role="navigation">
				<?php wp_nav_menu(array(
					'container' => false,							// remove nav container
					'menu' => 'Footer Navigation',					// nav name
					'menu_class' => '',								// adding custom nav class
					'theme_location' => 'footer-nav',				// where it's located in the theme
					'before' => '',									// before the menu
					'after' => '',									// after the menu
					'link_before' => '',							// before each link
					'link_after' => '',								// after each link
					'depth' => 0									// limit the depth of the nav
				)); ?>
				</nav>

				<p class="copyright">&copy; <?php echo date('Y'); ?> <?php bloginfo( 'name' ); ?>.</p>

			</div>

		</footer>

		<?php wp_footer(); ?>
	</body>
</html>
