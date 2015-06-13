document.addEventListener('DOMContentLoaded', function() {

	var mobile_nav   = document.getElementById('mobile-nav'),
		container    = document.getElementById('container'),
		nav_overlay  = document.createElement("div");

	function updateMobileIcon()
	{
		// Update the mobile item icon
		var icon = mobile_nav.querySelector('span');
		icon.classList.toggle('icon-menu');
		icon.classList.toggle('icon-close');

		// Update the mobile item active status
		mobile_nav.classList.toggle('active');

		// Toggle page drawer "open" status
		document.body.classList.toggle('open-drawer');
	}

	/**
	 * Simple Mobile Nav
	 */
	if ( document.body.classList.contains('slide-nav') )
	{
		mobile_nav.addEventListener('click', function(e) {
			e.preventDefault();
			document.getElementById('side-drawer').classList.toggle('active');
			updateMobileIcon();
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
			updateMobileIcon();
		});

		// Click overlay
		nav_overlay.addEventListener('click', function(e) {
			e.preventDefault();
			updateMobileIcon();
		});
	}
	/**/

});