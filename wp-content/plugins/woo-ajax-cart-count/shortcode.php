<?php
# WOOCOMMERCE CART TOTAL
add_filter('woocommerce_add_to_cart_fragments', 'woocommercAddToCart');
function woocommercAddToCart( $fragments ) 
{
	global $woocommerce;
	ob_start();
	?>
	<a class="cart-customlocation imsAjaxCartCount" style="font-size: <?php echo get_option('imsAjaxCartCount_optionFontSize'); ?>px; color:<?php echo get_option('imsAjaxCartCount_optionColor'); ?>" href="<?php echo $woocommerce->cart->get_cart_url(); ?>" title="<?php _e('View your shopping cart', 'woothemes'); ?>"><i style="padding: 10px" class="fa <?php echo get_option('imsAjaxCartCount_optionIcon'); ?>" aria-hidden="true"></i><?php echo sprintf(_n('<div class="counts">%d</div> <span>item <br>my cart</span>', '<div class="counts">%d</div>  <span>items <br>my cart</span>', $woocommerce->cart->cart_contents_count, 'woothemes'), $woocommerce->cart->cart_contents_count);?>&nbsp;<?php echo $woocommerce->cart->get_cart_total(); ?></a>
	<?php
	$fragments['a.cart-customlocation'] = ob_get_clean();
	return $fragments;
}



add_shortcode( 'WooAjaxCartCount','WooAjaxCartCount' );

function WooAjaxCartCount( $cart_total )
{
	global $woocommerce;
	ob_start();
	?>
	<a class="cart-customlocation imsAjaxCartCount" style="font-size: <?php echo get_option('imsAjaxCartCount_optionFontSize'); ?>px; color:<?php echo get_option('imsAjaxCartCount_optionColor'); ?>" href="<?php echo $woocommerce->cart->get_cart_url(); ?>" title="<?php _e('View your shopping cart', 'woothemes'); ?>"><i style="padding: 10px" class="fa <?php echo get_option('imsAjaxCartCount_optionIcon'); ?>" aria-hidden="true"></i><?php echo sprintf(_n('<div class="counts">%d</div> <span>item <br>my cart', '<div class="counts">%d</div>  <span>items<br> my cart</span>', $woocommerce->cart->cart_contents_count, 'woothemes'), $woocommerce->cart->cart_contents_count);?>&nbsp;<?php echo $woocommerce->cart->get_cart_total(); ?></a>
	<?php
	$cart_total = ob_get_clean();

	return $cart_total;
}