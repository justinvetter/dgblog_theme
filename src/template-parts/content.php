<?php
/**
 * Template part for displaying posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package DigitalGlobe_Blog_Theme
 */
$article = (is_single()) ? 'article--full' : 'article--snippit';
?>

  <article id="post-<?php the_ID(); ?>" <?php post_class( 'article ' . $article); ?>>
    <header class="entry-header">
      <?php
		if ( is_single() ) :
			?>
        <div class="article__header">
          <div class="row">
            <div class="col-sm-10">
              <?php the_title('<h3>', '</h3>') ?>
            </div>
            <div class="col-sm-2 hidden-sm hidden-xs">
              <aside class="pull-right">
                <span>
                    <?php the_time('j'); ?>
                  </span>
                <?php the_time('M y') ?>
              </aside>
            </div>
          </div>
        </div>


        <?php
		else :
    ?>
          <a href="<?php echo esc_url( get_permalink() ) ?>">
            <div class="article__header">
              <div class="row">
                <div class="col-sm-10">
                  <?php the_title('<h3>', '</h3>') ?>
                </div>
                <div class="col-sm-2 hidden-sm hidden-xs">
                  <aside class="pull-right">
                    <span>
                    <?php the_time('j'); ?>
                  </span>
                    <?php the_time('M y') ?>
                  </aside>
                </div>
              </div>
            </div>
          </a>
          <?php
		endif; ?>
    </header>
    <!-- .entry-header -->



    <?php
    if ( is_single() ) :
    if (has_post_thumbnail()) :
    ?>

      <div class="article__featureimage clearfix" style="background-image: url(<?php the_post_thumbnail_url( 'large' ); ?>)">
        <aside class="pull-right hidden-md hidden-lg hidden-xl">
          <span>
            <?php the_time('j'); ?>
          </span>
          <?php the_time('M y') ?>
        </aside>
      </div>
      <?php endif; ?>


        <!-- Share section -->
        <?php get_template_part( 'template-parts/content-share', get_post_format() ); ?>
          <!-- End Share section -->
          <div class="article__body post">
            <div class="post__meta">
              <?php the_subtitle('<h3 class="post__subtitle">', '</h3>'); ?>
                <h5 class="post__author">By: <?php if (get_post_meta($post->ID, 'guest-author', true)) :
                      echo get_post_meta($post->ID, 'guest-author', true);
                        else:
                        echo 'DigitalGlobe';
                        endif;
                      ?></h5>
            </div>
            <div class="post__copy">
              <?php
			the_content( sprintf(
				/* translators: %s: Name of current post. */
				wp_kses( __( 'Continue reading %s <span class="meta-nav">&rarr;</span>', 'dgblog_theme' ), array( 'span' => array( 'class' => array() ) ) ),
				the_title( '<span class="screen-reader-text">"', '"</span>', false )
			) ); 
          
              
              
              ?>
                <div class="article__pagination">
                  <?php previous_post_link('%link', 'Previous'); ?>
                    <?php next_post_link('%link', 'Next'); ?>
                </div>
            </div>

          </div>

          <?php  
    
    
    
    
     else :
      ?>
            <div class="row no-pad is-flex" data-style="display: flex;">
              <div class="col-md-6 col-sm-12">
                <?php
              if (has_post_thumbnail()) {
                ?>
                  <div class="article__featureimage" style="background-image: url(<?php the_post_thumbnail_url( 'medium' ); ?>)">
                    <?php
              };
              ?>
                      <aside class="pull-right hidden-md hidden-lg hidden-xl">
                        <span>
                    <?php the_time('j'); ?>
                  </span>
                        <?php the_time('M y') ?>
                      </aside>
                  </div>
              </div>

              <div class="col-md-6 col-sm-12">
                <div class="article__body post">
                  <div class="post__meta">
                    <h5 class="post__author">By: <?php if (get_post_meta($post->ID, 'guest-author', true)) :
                      echo get_post_meta($post->ID, 'guest-author', true);
                        else:
                        echo 'DigitalGlobe';
                        endif;
                      ?></h5>
                  </div>
                  <div class="post__copy">
                    <?php
                      the_excerpt();
                    ?>
                      <a href="<?php echo esc_url( get_permalink() ) ?>">read more</a>
                  </div>
                </div>
              </div>
            </div>
            <?php
    endif;
                         
                         
          if ( is_single() ) :
          echo '<div class="related">';
          echo '<h4>Related Posts</h4>';
          echo '<ul>';
          if ( function_exists( 'get_crp_posts_id' ) ) {
            global $post;
            $scores = get_crp_posts_id( array(
               'postid' => $post->ID,
                'limit' => 4 
            ) );
            $posts = wp_list_pluck( (array) $scores, 'ID' );
            $args = array(
               'post__in' => $posts,
              'posts_per_page' => 4,
              'ignore_sticky_posts' => 1,
              'cat' => -1
            );
            $my_query = new WP_Query( $args );
            if ( $my_query->have_posts() ) {
              while ( $my_query->have_posts() ) {
                $my_query->the_post();
                $categories = get_the_category();
                if (! empty( $categories )) {
                  $category = esc_html($categories[0]->slug);
                }
                
                ?>
                <li style="background-image: url(<?php the_post_thumbnail_url('thumbnail') ?>)"> <?php
                echo '<a href="' . get_permalink( get_the_ID() ) . '">';
                echo '<div class="related__title category__'.$category.'">';
                the_title('<p>', '</p>');
                echo '</div>';
                echo '</a></li>';
                wp_reset_postdata();
              }
            } else {
            }
            wp_reset_query();
          }
          
          echo '</ul>';
          echo "</div>";
          endif;
                         

			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'dgblog_theme' ),
				'after'  => '</div>',
			) );
		?>


  </article>
  <!-- #post-## -->