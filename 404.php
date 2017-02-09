<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package DigitalGlobe_Blog_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area page__content">
		<main id="main" class="site-main" role="main">

			<section class="error-404 not-found">
      
      
      <article <?php post_class('article article--full article--page'); ?>>
				<div class="page-content article__body post">
				
				<div class="page__title">
				<div class="container">
					<h2><?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'dgblog_theme' ); ?></h2>
					</div>
				</div><!-- .page-header -->
				
					<p><?php esc_html_e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'dgblog_theme' ); ?></p>

					<?php

						the_widget( 'WP_Widget_Recent_Posts' );


					?>

				</div><!-- .page-content -->
			</article><!-- .error-404 -->
    </section>
		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
