<!doctype html>
<html dir="ltr" lang="en-US">

<head>
	<title><?php wp_title(); ?></title>
	<?php do_action('sewn/seo/meta/description'); ?>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="HandheldFriendly" content="True" />
	<meta name="MobileOptimized" content="320" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="revisit-after" content="15 days" />
	<meta name="rating" content="general" />
	<meta name="distribution" content="global" />
	<?php do_action('sewn/seo/meta/classification'); ?>
	<meta name="author" content="<?php echo get_option('blogname'); ?>" />
	<meta name="creator" content="<?php echo get_option('blogname'); ?>" />
	<meta name="publisher" content="<?php echo get_option('blogname'); ?>" />
	<?php do_action('sewn/seo/meta/site_name'); ?>
	<?php do_action('sewn/seo/meta/og:title'); ?>
	<?php do_action('sewn/seo/meta/og:image'); ?>
	<?php do_action('sewn/seo/meta/og:type'); ?>

	<link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/assets/img/apple-touch-icon.png">
	<link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicon.png">
	<!--[if IE]><link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicon.ico"><![endif]-->

	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="<?php echo get_template_directory_uri(); ?>/assets/img/mstile-310x310.png">

	<?php wp_head(); ?>
</head>

<body <?php body_class('drawer-nav'); ?>>

	<div id="container">

		<header id="header" role="banner">

			<div id="inner-header" class="wrap cf">

				<h1 id="logo">
					<a href="<?php echo home_url(); ?>" title="Home">
						<?php /** / echo get_option('blogname'); /** / ?>
						<svg role="img" aria-labelledby="title desc">
							<title id="title"><?php echo get_option('blogname'); ?></title>
							<desc id="desc"><?php echo get_option('blogdescription'); ?></desc>
							<use xlink:href="<?php echo get_template_directory_uri(); ?>/assets/icons/icons.svg#logo"></use>
						</svg>
						<?php /**/ ?><img src="<?php echo get_template_directory_uri(); ?>/assets/img/logo.png" alt="<?php echo get_option('blogname'); ?>" /><?php /**/ ?>
					</a>
				</h1>

				<?php /* Use the 'slide-nav' class for both '#mobile-nav' and '#side-drawer' to switch off side drawer and use the simple slide up/down method */ ?>
				<span id="mobile-nav">
					<span class="icon-menu" aria-hidden="true"></span>
					<span class="screen-reader-text">MENU</span>
				</span>

				<div id="side-drawer">
					<nav id="main-nav" role="navigation">
					<?php wp_nav_menu(array(
						'container' => false,						// remove nav container
						'menu' => 'Main Navigation',				// nav name
						'menu_id' => '',						 	// adding custom nav id
						'menu_class' => '',							// adding custom nav class
						'theme_location' => 'main-nav',				// where it's located in the theme
						'before' => '',								// before the menu
						'after' => '',								// after the menu
						'link_before' => '',						// before each link
						'link_after' => '',							// after each link
						'depth' => 2								// limit the depth of the nav
					)); ?>
					</nav>
				</div>

			</div>

		</header>
