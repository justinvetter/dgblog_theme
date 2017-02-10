<aside class="share hidden-xs hidden-sm">
  <p>SHARE</p>
  <a href="http://www.linkedin.com/shareArticle?mini=true&amp;&amp;url=<?php the_permalink($post->ID); ?>" target="_blank" title="Share on LinkedIn" class="social">
    <svg id="icon-linkedin" class="social__icon icon-linkedin" width="32" height="32" viewBox="0 0 32 32" x="0" y="0">
      <path d="M12 12h5.535v2.837h0.079c0.77-1.381 2.655-2.837 5.464-2.837 5.842 0 6.922 3.637 6.922 8.367v9.633h-5.769v-8.54c0-2.037-0.042-4.657-3.001-4.657-3.005 0-3.463 2.218-3.463 4.509v8.688h-5.767v-18z"></path>
      <path d="M2 12h6v18h-6v-18z"></path>
      <path d="M8 7c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3z"></path>
    </svg>
  </a>
  <a href="http://twitter.com/home/?status=<?php urlencode( the_title( $post->ID ) ); ?>+<?php the_permalink($post->ID)); ?>" title="Tweet this!" target="_blank" class="social">
    <svg class="social__icon icon-twitter" id="icon-twitter" width="32" height="32" viewBox="0 0 32 32" x="144" y="0">
      <path d="M32 7.075c-1.175 0.525-2.444 0.875-3.769 1.031 1.356-0.813 2.394-2.1 2.887-3.631-1.269 0.75-2.675 1.3-4.169 1.594-1.2-1.275-2.906-2.069-4.794-2.069-3.625 0-6.563 2.938-6.563 6.563 0 0.512 0.056 1.012 0.169 1.494-5.456-0.275-10.294-2.888-13.531-6.862-0.563 0.969-0.887 2.1-0.887 3.3 0 2.275 1.156 4.287 2.919 5.463-1.075-0.031-2.087-0.331-2.975-0.819 0 0.025 0 0.056 0 0.081 0 3.181 2.263 5.838 5.269 6.437-0.55 0.15-1.131 0.231-1.731 0.231-0.425 0-0.831-0.044-1.237-0.119 0.838 2.606 3.263 4.506 6.131 4.563-2.25 1.762-5.075 2.813-8.156 2.813-0.531 0-1.050-0.031-1.569-0.094 2.913 1.869 6.362 2.95 10.069 2.95 12.075 0 18.681-10.006 18.681-18.681 0-0.287-0.006-0.569-0.019-0.85 1.281-0.919 2.394-2.075 3.275-3.394z"></path>
    </svg>
  </a>
  <a href="http://www.facebook.com/sharer.php?u=<?php the_permalink($post->ID);?>" title="Share on Facebook." target="_blank" class="social">
    <svg id="icon-facebook" class="social__icon icon-facebook" width="32" height="32" viewBox="0 0 32 32" x="240" y="0">
      <path d="M19 6h5v-6h-5c-3.86 0-7 3.14-7 7v3h-4v6h4v16h6v-16h5l1-6h-6v-3c0-0.542 0.458-1 1-1z"></path>
    </svg>
  </a>
  <a href="mailto:%20?body=<?php the_permalink($post->ID);?>,&subject=<?php urlencode( the_title( $post->ID ) ); ?>" class="social" target="_blank">
    <svg id="icon-email" class="social__icon icon-email" width="32" height="32" viewBox="0 0 32 32" x="96" y="0">
      <path class="path1" d="M28 5h-24c-2.209 0-4 1.792-4 4v13c0 2.209 1.791 4 4 4h24c2.209 0 4-1.791 4-4v-13c0-2.208-1.791-4-4-4zM2 10.25l6.999 5.25-6.999 5.25v-10.5zM30 22c0 1.104-0.898 2-2 2h-24c-1.103 0-2-0.896-2-2l7.832-5.875 4.368 3.277c0.533 0.398 1.166 0.6 1.8 0.6 0.633 0 1.266-0.201 1.799-0.6l4.369-3.277 7.832 5.875zM30 20.75l-7-5.25 7-5.25v10.5zM17.199 18.602c-0.349 0.262-0.763 0.4-1.199 0.4s-0.851-0.139-1.2-0.4l-12.8-9.602c0-1.103 0.897-2 2-2h24c1.102 0 2 0.897 2 2l-12.801 9.602z"></path>
    </svg>
  </a>
</aside>