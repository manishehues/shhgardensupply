<?php


function theme_enqueue_styles() {
    wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/style.css', array( 'fusion-dynamic-css' ) );    
    wp_enqueue_style( 'responsive-style', get_stylesheet_directory_uri() . '/assets/css/responsive.css', array( 'fusion-dynamic-css' )  );
    wp_enqueue_style( 'fontawesome-style', 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css', array( 'fusion-dynamic-css' ) );
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );