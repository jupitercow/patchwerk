document.addEventListener('DOMContentLoaded', function(){

	var mobile_nav   = document.getElementById('mobile-nav'),
		container    = document.getElementById('container'),
		nav_overlay  = document.createElement("div");

	/**
	 * Simple Mobile Nav
	 */
	if ( document.body.classList.contains('slide-nav') )
	{
		mobile_nav.addEventListener('click', function(e) {
			e.preventDefault();
			var icon = this.querySelector('span'),
				nav  = document.getElementById('side-drawer');
			this.classList.toggle('active');
			icon.classList.toggle('icon-menu');
			icon.classList.toggle('icon-close');
			//nav.style.display = (! nav.style.display || 'none' == nav.style.display ) ? 'block' : 'none';
			nav.classList.toggle('active');
		});
	}

	/**
	 * Side Drawer Mobile Nav
	 */
	else
	{
		nav_overlay.id = "nav-overlay";

		container.appendChild(nav_overlay);

		// Click button
		mobile_nav.addEventListener('click', function(e) {
			e.preventDefault();
			var icon = this.querySelector('span');
			document.body.classList.toggle('open-drawer');
			this.classList.toggle('active');
			icon.classList.toggle('icon-menu');
			icon.classList.toggle('icon-close');
		});

		// Click overlay
		nav_overlay.addEventListener('click', function(e) {
			document.body.classList.remove('open-drawer');
			mobile_nav.classList.remove('active');
		});
	}
	/**/

});