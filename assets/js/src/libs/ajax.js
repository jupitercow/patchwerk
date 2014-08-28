var ajax = {
	x: function()
	{
		if ( 'undefined' !== typeof XMLHttpRequest ) {
			return new XMLHttpRequest();  
		}
	},
	send: function( url, callback, method, data, sync )
	{
		var x = ajax.x();
		x.open(method, url, sync);
		x.onreadystatechange = function() {
			if ( 4 == x.readyState ) {
				callback( x.responseText );
			}
		};
		if ( 'POST' == method ) {
			x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		}
		x.send(data);
	},
	get: function( url, data, callback, sync )
	{
		var query = [];
		for ( var key in data )
		{
			query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
		}
		ajax.send(url + '?' + query.join('&'), callback, 'GET', null, sync)
	},
	post: function( url, data, callback, sync )
	{
		var query = [];
		for ( var key in data )
		{
			query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
		}
		ajax.send(url, callback, 'POST', query.join('&'), sync)
	}
};