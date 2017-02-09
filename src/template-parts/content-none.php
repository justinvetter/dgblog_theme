<?php
/**
 * Template part for displaying a message that posts cannot be found.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package DigitalGlobe_Blog_Theme
 */

?>

<article <?php post_class('article article--full no-results not-found'); ?>>


	<div class="entry-content article__body post">
		<header class="page-header">
		<h1 class="page__title"><?php esc_html_e( 'Nothing Found', 'dgblog_theme' ); ?></h1>
	</header><!-- .page-header -->
		<?php
		if ( is_home() && current_user_can( 'publish_posts' ) ) : ?>

			<p><?php printf( wp_kses( __( 'Ready to publish your first post? <a href="%1$s">Get started here</a>.', 'dgblog_theme' ), array( 'a' => array( 'href' => array() ) ) ), esc_url( admin_url( 'post-new.php' ) ) ); ?></p>

		<?php elseif ( is_search() ) : ?>

			<p><?php esc_html_e( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'dgblog_theme' ); ?></p>
			<?php

		else : ?>

			<p><?php esc_html_e( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'dgblog_theme' ); ?></p>
			<?php

		endif; ?>
	</div><!-- .page-content -->
</article><!-- .no-results -->
