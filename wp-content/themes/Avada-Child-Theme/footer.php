<?php
/**
 * The footer template.
 *
 * @package Avada
 * @subpackage Templates
 */

// Do not allow directly accessing this file.
if ( ! defined( 'ABSPATH' ) ) {
	exit( 'Direct script access denied.' );
}
?>
						<?php do_action( 'avada_after_main_content' ); ?>

					</div>  <!-- fusion-row -->
				</main>  <!-- #main -->
				<div id="cusFooter" class="cusFooter">
	<div class="fusion-row fusion-builder-row">
		<div class="cusftRow">
			<div class="cmfooter col1">
				<?php dynamic_sidebar( 'avada-custom-sidebar-disclaimer' ); ?>
			</div>
			<div class="cmfooter col2">
				<?php dynamic_sidebar( 'avada-custom-sidebar-menu' ); ?>
			</div>
			<div class="cmfooter col3">
				<?php dynamic_sidebar( 'avada-custom-sidebar-location' ); ?>
			</div>
			<div class="cmfooter col4">
				<?php dynamic_sidebar( 'avada-custom-sidebar-contact' ); ?>
			</div>
		</div>
		<div class="cusCopyright">
			<p>2022 © SHH Garden Supply Inc.</p>
		</div>
	</div>
</div>

		<?php wp_footer(); ?>
		<script>
		    jQuery(document).ready(function(){
		      jQuery(".mobile_toggle").click(function(){
		        jQuery("#MobileMenu").toggleClass("openMenu");
		      });
		       jQuery(".overLay").click(function(){
		        jQuery("#MobileMenu").removeClass("openMenu");
		        jQuery("#locations").removeClass("openLocation");
		      });
		       jQuery(".closeMenu").click(function(){
		         jQuery("#MobileMenu").removeClass("openMenu");
		      });
		       jQuery(".has_sub_menu").click(function(){
		          jQuery(this).find(".sub-menu").toggle();
		        })

				jQuery('#social_links-widget-2 .fusion-social-networks-wrapper a').each(function() {
				   var a = new RegExp('/' + window.location.host + '/');
				   if (!a.test(this.href)) {
				      jQuery(this).attr("target","_blank");
				   }
				});

		    });
  		</script>
  		
	</body>
</html>
