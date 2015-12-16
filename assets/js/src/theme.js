/**
 * Get Viewport Dimensions
 * returns object with viewport dimensions to match css in width and height properties
 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
 */
function updateViewportDimensions() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return { width:x,height:y };
}
// setting the viewport width
var viewport = updateViewportDimensions();

/**
 * Throttle Resize-triggered Events
 * Wrap your actions in this function to throttle the frequency of firing them off, for better performance, esp. on mobile.
 * ( source: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed )
 */
var waitForFinalEvent = (function () {
	var timers = {};
	return function (callback, ms, uniqueId) {
		if (!uniqueId) { uniqueId = "Don't call this twice without a uniqueId"; }
		if (timers[uniqueId]) { clearTimeout (timers[uniqueId]); }
		timers[uniqueId] = setTimeout(callback, ms);
	};
})();

// how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
var timeToWaitForLast = 100;


document.addEventListener('DOMContentLoaded', function() {

	if ( ! patch.mobile_breakpoint ) {
		patch.mobile_breakpoint = 768;
	}


	/**
	 * Adds the screen reader text to the icon's title so it will show on hover
	 */
	function patch_addScreenReaderHover()
	{
		var icons = document.querySelectorAll('span[aria-hidden=true]');
		for ( var i=0, len=icons.length; i<len; i++ )
		{
			var icon_parent = icons[i].parentNode.querySelector('.screen-reader-text');
			if ( icon_parent ) {
				var icon_text = icon_parent.innerHTML;
				icons[i].setAttribute('title', icon_text);
			}
		}
	}
	patch_addScreenReaderHover();


	/**
	 * Open share links in new window & select all on the share permalink field
	 */
	function patch_shareLinks()
	{
		var shareLinks = document.getElementsByClassName('share-links'),
			i,
			shareSelectClick = function(e) {
				this.select();
			},
			shareAnchorClick = function(e) {
				e.preventDefault();
				window.open( this.getAttribute('href'), 'Share', 'height=470, width=550, top='+(window.height/2 - 225) +', left='+window.width/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
			};
		if ( shareLinks )
		{
			for ( i=0; i<shareLinks.length; i++ )
			{
				var shareAnchors = shareLinks[i].getElementsByTagName('a'),
					shareUrl     = shareLinks[i].querySelector('.share-url');

				if ( shareUrl )
				{
					shareUrl.addEventListener('click', shareSelectClick);
				}

				if ( shareAnchors )
				{
					for ( i=0; i<shareAnchors.length; i++ )
					{
						shareAnchors[i].addEventListener('click', shareAnchorClick);
					}
				}
			}
		}
	}
	patch_shareLinks();


	/**
	 * Cache and declare variables
	 * /
	var window_height     = window.innerHeight,
		window_width      = window.innerWidth,
		doc_top           = document.scrollTop,
		last_top          = doc_top,
		cur_top           = 0,
		cur_pos           = window_height - header_height,
		scrollParent      = document.documentElement.scrollTop ? document.documentElement : document.body;


	/**
	 * Resize image slides to fill window height
	 * /
	function resizeHandler()
	{
		// Update variables
		window_height     = window.innerHeight;
		window_width      = window.innerWidth;
		header_height     = header.offsetHeight;
		cur_pos           = window_height - header_height;
	}
	resizeHandler();
	window.addEventListener('resize', function() {
		waitForFinalEvent(resizeHandler, timeToWaitForLast, 'mainresize');
	});


	/**
	 * Checks the scroll position to see if the header should be fixed or not
	 * /
	function scrollHandler()
	{
		doc_top = scrollParent.scrollTop;
		cur_top = cur_pos - doc_top; // Determines the position of the header

		last_top = doc_top;
	};
	scrollHandler();
	window.addEventListener('scroll', function() {
		waitForFinalEvent(scrollHandler, timeToWaitForLast, 'mainscroll');
	}, false);
	/**/

});