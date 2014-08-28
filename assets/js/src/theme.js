/**
 * Get Viewport Dimensions
 * returns object with viewport dimensions to match css in width and height properties
 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
 */
function updateViewportDimensions() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return { width:x,height:y }
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

/*
 * Put all your regular jQuery in here.
*/
document.addEventListener('DOMContentLoaded', function(){

	/**
	 * Adds the screen reader text to the icon's title so it will show on hover
	 */
	var icons = document.querySelectorAll('span[aria-hidden=true]');
	for ( var i = 0, len = icons.length; i < len; i++ )
	{
		var text = icons[i].parentNode.querySelector('.screen-reader-text').innerHTML;
		icons[i].setAttribute('title', text);
	}

	/**
	 * For the share permalink field
	 */
	var share_links = document.getElementsByClassName('share-links');
	for ( var i = 0, len = share_links.length; i < len; i++ )
	{
		this.querySelector('.share-url').addEventListener('click', function(e) {
			this.select();
		});
	}

}); /* end of as page load scripts */