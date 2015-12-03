document.addEventListener('DOMContentLoaded', function() {

	if ( ! patch.mobile_breakpoint ) {
		patch.mobile_breakpoint = 768;
	}

	var loadType = 'desktop',
		images    = document.querySelectorAll('.patch-load:not(.patch-loaded):not([data-patch-load-lazy=view])');

	if ( window.innerWidth <= patch.mobile_breakpoint ) {
		loadType = 'mobile';
	}

	function elementInViewport( el )
	{
	    var rect = el.getBoundingClientRect();

	    return (
	       rect.top    >= 0
	    && rect.left   >= 0
	    && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
	    );
	}

	function loadImage( el, forceSize )
	{
		el.addEventListener('load', function() {
			this.classList.add('patch-loaded');
		});

		var elLoadType = ( forceSize ) ? forceSize : loadType;

		var sizes      = JSON.parse( el.getAttribute('data-patch-load-sizes') ),
			lazy       = el.getAttribute('data-patch-load-lazy'),
			background = el.getAttribute('data-patch-load-bg'),
			imageUrl   = ( sizes[elLoadType] ? sizes[elLoadType]['url'] : null );

		// Generally, if no mobile, try desktop
		if ( ! imageUrl ) {
			imageUrl = 'http://erie.wpengine.com/files/banner-home-mobile.jpg';//( sizes['desktop'] ? sizes['desktop']['url'] : null );
		}

		if ( background ) {
			el.style.backgroundImage = "url('" + imageUrl + "')";
		} else {
			el.src = imageUrl;
		}
	}

	if ( images.length )
	{
		for ( var i=0; i<images.length; i++ ) {
			loadImage(images[i]);
		}
	}


	/**
	 * Load images on scroll
	 */
	function scrollHandler()
	{
		images = document.querySelectorAll('.patch-load[data-patch-load-lazy=view]:not(.patch-loaded)');
		if ( images.length )
		{
			for ( var i=0; i<images.length; i++ )
			{
				if ( elementInViewport(images[i]) ) {
					loadImage(images[i]);
				}
			}
		}
	}
	scrollHandler();
	window.addEventListener('scroll', function() {
		waitForFinalEvent(scrollHandler, timeToWaitForLast, 'loadscroll');
	}, false);


	/**
	 * Switch images on resize
	 */
	function resizeHandler()
	{
		// Update variables
		images = document.getElementsByClassName('patch-loaded');
		if ( images.length )
		{
			for ( var i=0; i<images.length; i++ )
			{
				if ( window.innerWidth <= patch.mobile_breakpoint ) {
					loadImage(images[i], 'mobile');
				} else {
					loadImage(images[i], 'desktop');
				}
			}
		}
	}
	resizeHandler();
	window.addEventListener('resize', function() {
		waitForFinalEvent(resizeHandler, timeToWaitForLast, 'loadresize');
	});

});