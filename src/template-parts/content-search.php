<?php
/**
 * Template part for displaying results in search pages.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package DigitalGlobe_Blog_Theme
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class('article article--snippit'); ?>>
	<header class="entry-header">
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
	</header><!-- .entry-header -->

  <div class="row no-pad is-flex" data-style="display: flex;">
    <div class="col-md-6 col-sm-12">
     
       <a href="<?php echo esc_url( get_permalink() ) ?>" class="article__featureimage--link">
      <?php
    if (has_post_thumbnail()) {
      ?>
        <div class="article__featureimage" style="background-image: url(<?php the_post_thumbnail_url( 'medium' ); ?>)">
          <?php
    } else { 
          $image = get_field('default_feature_image', 'option');
              
              
              $url = $image['url'];
              $size = 'medium'; // (thumbnail, medium, large, full or custom size)
              $featureImage = $image['sizes'][$size];
          ?>
        <div class="article__featureimage" style="background-image: url(<?php echo $featureImage; ?>)">
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
              </a>
    </div>


    <div class="col-md-6 col-sm-12">
      <div class="article__body post">
        <div class="post__meta">
          <h5 class="post__author">By: <?php if ( get_field('author') ):
              the_field('author');
            elseif(get_post_meta($post->ID, 'guest-author', true)):
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
  </div>
</article><!-- #post-## -->
