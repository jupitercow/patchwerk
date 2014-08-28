jQuery(document).ready(function($) {

	/**
	 * Simple Mobile Nav
	 * /
	document.getElementById('mobile-nav').addEventListener('click', function(e) {
		e.preventDefault();
		var icon = this.querySelector('span'),
			nav  = document.getElementById('main-nav');
		this.classList.toggle('active');
		icon.classList.toggle('icon-menu');
		icon.classList.toggle('icon-close');
		//nav.style.display = (! nav.style.display || 'none' == nav.style.display ) ? 'block' : 'none';
		nav.classList.toggle('active');
	});

	/**
	 * Side Drawer Mobile Nav
	 */
	var mobile_nav   = document.getElementById('mobile-nav'),
		container    = document.getElementById('container'),
		nav_overlay  = document.createElement("div");

	nav_overlay.id = "nav-overlay";

	container.appendChild(nav_overlay);

	// Click button
	mobile_nav.addEventListener('click', function(e) {
		e.preventDefault();
		document.body.classList.toggle('open-drawer');
		this.classList.toggle('active');
	});

	// Click overlay
	nav_overlay.addEventListener('click', function(e) {
		document.body.classList.remove('open-drawer');
		mobile_nav.classList.remove('active');
	});
	/**/

});