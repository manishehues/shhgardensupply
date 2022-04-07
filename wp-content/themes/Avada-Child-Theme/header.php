<?php
/**
 * Header template.
 *
 * @package Avada
 * @subpackage Templates
 */

// Do not allow directly accessing this file.
if ( ! defined( 'ABSPATH' ) ) {
	exit( 'Direct script access denied.' );
}
?>
<!DOCTYPE html>
<html class="<?php avada_the_html_class(); ?>" <?php language_attributes(); ?>>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<?php Avada()->head->the_viewport(); ?>

	<?php wp_head(); ?>

	<?php
	/**
	 * The setting below is not sanitized.
	 * In order to be able to take advantage of this,
	 * a user would have to gain access to the database
	 * in which case this is the least of your worries.
	 */
	echo apply_filters( 'avada_space_head', Avada()->settings->get( 'space_head' ) ); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	
</head>

<?php
$object_id      = get_queried_object_id();
$c_page_id      = Avada()->fusion_library->get_page_id();
$wrapper_class  = 'fusion-wrapper';
$wrapper_class .= ( is_page_template( 'blank.php' ) ) ? ' wrapper_blank' : '';
?>
<body <?php body_class(); ?> <?php fusion_element_attributes( 'body' ); ?>>
	<?php do_action( 'avada_before_body_content' ); ?>
	<div id="cusHead">

		<div class="topBar">

			<div class="fusion-row">

				<div class="topEmail topCus">

					<!-- <h6><a href="mailto:<?php //echo of_get_option( 'email' ); ?>"><?php //echo of_get_option( 'email' ); ?></a></h6> -->
				<ul>
					<li><h6><a href="<?php echo of_get_option( 'facebook' ); ?>" target="_blank"><i class="fab fa-facebook-f"></i></a></h6></li>
					<li><h6><a href="<?php echo of_get_option( 'instagram' ); ?>" target="_blank"><i class="fab fa-instagram"></i></a></h6></li>
				</ul>					

				</div>

				<div class="topRight">

					<div class="topTimes topCus">

						<h6><?php echo of_get_option( 'hours' ); ?></h6>

					</div>

					<div class="topCall topCus">

						<h6><?php echo avada_contact_info(); ?></h6>

					</div>

				</div>

			</div>

		</div>

		<div class="cusHeader">

			<div class="fusion-row">

				<div class="logo">

					<?php avada_logo(); ?>

				</div>

				<div class="cus-Search">

					<div class="mobile_toggle">

						<span class="bar one"></span>

						<span class="bar two"></span>

						<span class="bar three"></span>

						<span class="bar four"></span>

					</div>

					<div class="cusHeaderRight">

						<div class="cusSearch">

							<?php get_product_search_form(); ?> 

						</div>

						<div class="topcounters">

							<div class="cusWishlist ch_counts">

								<?php echo do_shortcode('[ti_wishlist_products_counter]'); ?>

							</div>

							<div class="cusCart ch_counts">

								<?php echo do_shortcode('[WooAjaxCartCount]'); ?>

							</div>

						</div>

					</div>

				</div>

			</div>

		</div>

		<div id="MobileMenu" class="cusMenuBar">

			<div class="fusion-row">

				<div class="homebread">

					<a href="<?php echo site_url('/'); ?>"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/homeVector.svg"></a>

				</div>

				<div class="overLay"></div>

				<div class="mbNav">

					<div class="logo mbLogo">

						<?php avada_logo(); ?>

						<div class="closeMenu"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/close.svg"></div>

					</div>

					<?php avada_main_menu(); ?>

				</div>

				<div class="cusSearch mbSearch">

					<?php get_product_search_form(); ?> 
				</div>

			</div>			

		</div>

		<div class="breadCrumbs">

			<div class="fusion-row fusion-builder-row">

			<?php if(function_exists('bcn_display')) {

	                bcn_display();

	           }?>

	        </div>

		</div>

	</div>

	<div id="boxed-wrapper">
		<div class="fusion-sides-frame"></div>
		<div id="wrapper" class="<?php echo esc_attr( $wrapper_class ); ?>">
			
			

			

			<?php
			$row_css    = '';
			$main_class = '';

			if ( apply_filters( 'fusion_is_hundred_percent_template', false, $c_page_id ) ) {
				$row_css    = 'max-width:100%;';
				$main_class = 'width-100';
			}

			if ( fusion_get_option( 'content_bg_full' ) && 'no' !== fusion_get_option( 'content_bg_full' ) ) {
				$main_class .= ' full-bg';
			}
			do_action( 'avada_before_main_container' );
			?>
			<main id="main" class="clearfix <?php echo esc_attr( $main_class ); ?>">
				<div class="fusion-row" style="<?php echo esc_attr( $row_css ); ?>">
