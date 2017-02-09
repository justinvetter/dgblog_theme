<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package dg_blog
 */

?>
  <!DOCTYPE html>
  <html <?php language_attributes(); ?>>

  <head <?php do_action( 'add_head_attributes' ); ?>>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">

    <?php wp_head(); ?>
  </head>

  <body <?php body_class(); ?>>
    <div id="page" class="site">
      <a class="skip-link screen-reader-text" href="#content">
        <?php esc_html_e( 'Skip to content', 'dg_blog' ); ?>
      </a>
      <header>
        <div class="masthead">
          <a href="<?php echo esc_url( home_url() ); ?>">
            <div class="glogo">
              <?php
              
              
              $image = get_field('glogo_image', 'option');
              
              
              $url = $image['url'];
              $size = 'medium'; // (thumbnail, medium, large, full or custom size)
              $glogoURL = $image['sizes'][$size];
              
              
              ?>
              <div class="glogo__circle" style="background-image: url(<?php echo $glogoURL; ?>)">
                <img src="<?php echo get_template_directory_uri() ?>/assets/images/dg-logo.svg">
              </div>
              <div class="glogo__tagline">
                <img src="<?php echo get_template_directory_uri() ?>/assets/images/sabw_promise.svg">
              </div>
            </div>
          </a>
        </div>



        <nav class="navbar navbar-default" data-spy="affix" data-offset-top="200">

          <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
             
              <button type="button" class="navbar-toggle collapsed pull-left" data-toggle="collapse" data-target="#dg-menu-collapse" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
                <button type="button" class="tcon tcon-search--xcross pull-right hidden-lg hidden-md" id="serachicon" aria-label="toggle search">
                <span class="tcon-search__item" aria-hidden="true"></span>
                <span class="tcon-visuallyhidden">toggle search</span>
              </button>
            </div>

            <?php 
      wp_nav_menu( array(
        'theme_location' => 'primary',
        'container' => 'nav',
        'container_class' => 'navbar-collapse collapse',
        'container_id' => 'dg-menu-collapse',
        'menu_class' => 'nav navbar-nav'
      ));
    ?>
              <!-- /.navbar-collapse -->
      <div class="search-button clearfix">
        <div id="searchbar" class="clearfix">
          <form id="searchform" method="get" action="<?php echo home_url( '/' ); ?>">
            <input type="search" name="s" id="s" placeholder="Search" autocomplete="off">
          </form>
        </div>
      </div>
          </div>
          <!-- /.container-fluid -->

        </nav>
      </header>