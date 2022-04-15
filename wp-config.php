<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'shh' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'HnT%L],EhI$K%)<[Mm~Z#S.:u_(xOz)B!6^ ;L5.2n (2CzCHtWFRfnkzV|gb;_u' );
define( 'SECURE_AUTH_KEY',  'sHp;]2X<cA_o*ktP&f/ph [c7q.R?BlH.|?NTfTw1N1#eA0k5??hf?`p!(N`Xi??' );
define( 'LOGGED_IN_KEY',    ',#P Mx0.Ww|ep[84-U0*S+8DkH @L-Uv%(q~$.pC3P}bAcUPhFm3ROmrwnU|y.q0' );
define( 'NONCE_KEY',        '+d4L`o;K^tZPTm8uL&W7+y|d0B3n5w{>fm$ClX.F~brZC#=MMUtY`Lj Il{TG731' );
define( 'AUTH_SALT',        'hqvD=VePbfS:~K}L.r9xVaUSCw.qJ2~y=7ek^BQm@^SvACUYm` 4q^Tc}!a9H^,L' );
define( 'SECURE_AUTH_SALT', '.UFy0}:iuT.~eQ;H<.#^ W<+2l.*Oc@;qRm,ssEL[VPzk>[?o1Lqq;[m9yb[$+9E' );
define( 'LOGGED_IN_SALT',   'h^acpZ:&@!oS;s}59=`lIKh23Z_5z3**?dk.x4pY5Gf@R;n=[/8>{BzeC&7k<:ns' );
define( 'NONCE_SALT',       '@(-b=XlB]%IsX5u7{V7u]L+[PaIF.D[d|SG?>o>tu ^9o%^sN<EH[N[O Ut<[U)L' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
