<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package DigitalGlobe_Blog_Theme
 */

get_header(); ?>

  <div id="primary" class="content-area page__content">
    <main id="main" class="site-main" role="main">
      <?php if ( is_home() && ! is_front_page() ) : ?>
        <section class="page__title">
          <div class="container">
            <h2 class="screen-reader-text"><?php single_post_title(); ?></h2>
          </div>
        </section>
        <?php endif; ?>
          <section>
            <div class="container">
              <?php
		if ( have_posts() ) :

			
            
			/* Start the Loop */
			while ( have_posts() ) : the_post();

				/*
				 * Include the Post-Format-specific template for the content.
				 * If you want to override this in a child theme, then include a file
				 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
				 */
				get_template_part( 'template-parts/content', get_post_format() );

			endwhile;

			the_posts_navigation( array(
        'prev_text'  => 'Previous',
        'next_text'  => 'Next'
      ));

		else :

			get_template_part( 'template-parts/content', 'none' );

		endif; ?>
            </div>
          </section>
    </main>
    <!-- #main -->
  </div>
  <!-- #primary -->

  <?php
get_sidebar();
get_footer();