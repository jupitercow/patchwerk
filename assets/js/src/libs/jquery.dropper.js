/**
 * jquery.dropper.js v1.0.0
 * inspired by http://www.codrops.com, but greatly simplified
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Jupitercow
 * http://www.Jupitercow.com/
 */
;(function( $, window, document, undefined )
{
	var pluginName = 'dropper';

	function Dropper( element, options )
	{
		var base = this;
		
		base.$el = $(element);
		base.el  = element;

		base.options   = $.extend( {}, base.defaults, options);

		base._defaults = base.defaults;
		base._name     = pluginName;

		base.init();
	}

	/**
	 * Initialize
	 */
	Dropper.prototype = {
		defaults: {
			skipFirst: false,
			onOptionSelect: function(opt) { return false; }
		},

		init: function()
		{
			var base = this;

			if (! base.$el.attr('data-droppered') )
			{
				if ( base.$el.is('select') )
				{
					base.transformSelect();
				}
				else
				{
					base.dd = base.$el;
					base.selectlabel = $('.dropper-label', base.dd);
					base.listopts = $('ul', base.dd);
					base.inputEl = $('input', base.dd);
				}
	
				base.initEvents();
			}
		},

		forceNumber : function( val )
		{
			val = isNaN( val ) ? val : Number( val );
			return val;
		},

		transformSelect : function()
		{
			var base = this;

			var optshtml = '', selectlabel = '&mdash; Select &mdash;', value = -1;

			base.$el.children('option').each( function(o) {
				var $this      = $(this),
					val        = this.getAttribute('value'),
					selected   = this.getAttribute('selected'),
					attributes = $this[0].attributes,
					label      = $this.text();

				if ( isNaN(val) ) {
					val = Number(val);
				}

				if ( -1 !== val && (0 < o || ! base.options.skipFirst) )
				{
					optshtml += '<li data-value="' + val + '"><span';
					if ( attributes )
					{
						for ( var i=0; i<attributes.length; i++ )
						{
							if ( 'value' !== attributes[i] && 'selected' !== attributes[i] ) {
								optshtml += ' ' + attributes[i].name + '="' + attributes[i].value + '"';
							}
						}
					}
					optshtml += '>' + label + '</span></li>';
				}

				if ( selected )
				{
					selectlabel = label;
					value = val;
				}
			} );

			base.listopts = $( '<ul/>' ).append( optshtml );
			base.selectlabel = $( '<div/>', {'class': 'dropper-label'} );
			base.selectlabel.append( '<span>' + selectlabel + '</span>' );
			base.dd = $( '<div class="dropper-select"/>' ).data('droppered', 1).append( base.selectlabel, base.listopts ).insertAfter( base.$el );
			base.$el.remove();

			// Add the hidden input to replace select in the form
			base.inputEl = $( '<input type="hidden" name="' + base.$el.attr('name') + '" value="' + value + '"></input>' ).insertAfter( base.selectlabel );

			base.close();

			return value;
		},

		initEvents : function()
		{
			var base = this;

			//$('.dropper-select').on( 'click', '.dropper-label', function(e) {
			base.selectlabel.on( 'click', function(e) {
				// Close other dropdowns
				$('.dropper-active').not(base.dd).each(function() {
					$(this).data('plugin_dropper').close();
				});

				e.preventDefault();
				e.stopPropagation();
				if ( base.opened ) {
					base.close();
				} else {
					base.open();
				}
			} );

			//$('.dropper-select').on( 'click', 'ul > li', function(e) {
			base.listopts.children('li').on( 'click', function(e) {
				e.stopPropagation();
				e.stopPropagation();

				if ( base.opened )
				{
					var opt = $(this);
					base.options.onOptionSelect( opt );
					base.inputEl.val( opt.data('value') );
					base.inputEl.trigger('change');
					base.selectlabel.html( opt.html() );
					base.close();
				}
			} );

			/** /
			base.dd.blur(function(){
				base.close();
			});
			/**/
			$(document).click(function(e) {
				//console.log(e);
				base.close();
			});
			/**/
		},

		open : function()
		{
			var base = this;
			base.dd.addClass( 'dropper-active' );
			base.listopts.slideDown('fast').fadeIn('fast');
			this.opened = true;
		},

		close : function()
		{
			var base = this;
			base.dd.removeClass( 'dropper-active' );
			base.listopts.slideUp('fast').fadeOut('fast');
			this.opened = false;
		}
	};

	$.fn[pluginName] = function( options )
	{
		return this.each(function()
		{
			if (! $.data(this, 'plugin_' + pluginName) )
			{
				$.data(this, 'plugin_' + pluginName,
				new Dropper( this, options ));
			}
		});
	};

})( jQuery, window, document );
