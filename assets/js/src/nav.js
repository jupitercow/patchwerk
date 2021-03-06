document.addEventListener('DOMContentLoaded', function() {

	var mobile_nav   = document.getElementById('mobile-nav'),
		container    = document.getElementById('container'),
		nav_overlay  = document.createElement("div");

	function updateMobileIcon()
	{
		if ( mobile_nav )
		{
			// Update the mobile item icon
			var icon = mobile_nav.querySelector('span');
			if ( icon )
			{
				icon.classList.toggle('icon-menu');
				icon.classList.toggle('icon-close');
			}

			// Update the mobile item active status
			mobile_nav.classList.toggle('active');
		}

		// Toggle page drawer "open" status
		document.body.classList.toggle('open-drawer');
	}

	/**
	 * Simple Mobile Nav
	 */
	if ( document.body.classList.contains('slide-nav') && mobile_nav )
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
		if ( container )
		{
			container.appendChild(nav_overlay);
		}

		// Click button
		if ( mobile_nav )
		{
			mobile_nav.addEventListener('click', function(e) {
				e.preventDefault();
				updateMobileIcon();
			});
		}

		// Click overlay
		if ( nav_overlay )
		{
			nav_overlay.id = "nav-overlay";
			nav_overlay.addEventListener('click', function(e) {
				e.preventDefault();
				updateMobileIcon();
			});
		}
	}

	/**
	 * Sub menu functionality for iPad
	 *
	 * NEEDS TESTING
	 */
	var nav         = document.getElementById('main-nav'),
		navAnchors  = nav.querySelectorAll('a'),
		navChildren = document.querySelectorAll('.menu-item-has-children > a'),
		i;

	if ( navAnchors )
	{
		for ( i=0; i<navAnchors.length; i++ )
		{
			navAnchors[i].addEventListener('focus blur', function() {
				this.parentNode.classList.toggle( 'focus' );
			});
		}
	}

	if ( 'ontouchstart' in window && navChildren )
	{
		for ( i=0; i<navChildren.length; i++ )
		{
			navChildren[i].addEventListener('focus blur', function(e) {
				var el = this.parentNode;
				if ( ! el.classList.contains( 'focus' ) )
				{
					e.preventDefault();
					el.classList.add( 'focus' );
					var siblings = el.parentNode.getElementsByClassName( '.focus' );
					if ( siblings )
					{
						for ( var k = 0, len = siblings.length; k < len; k++ )
						{
							siblings[k].classList.remove( 'focus' );
						}
					}
				}
			});
		}
	}
	/**/

});