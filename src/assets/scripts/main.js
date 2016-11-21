//Main Js
transformicons.add('.tcon');


$(function () {
  var $searchlink = $('#serachicon');
  var $searchbar = $('#searchbar');
  var $searchholder = $('.search');

  $('.navbar button').on('click', function (e) {
    e.preventDefault();

    if ($(this).attr('id') == 'serachicon') {
      if (!$searchbar.is(":visible")) {
        // if invisible we switch the icon to appear collapsable
        $searchholder.show();
        $searchbar.removeClass('fa-search').addClass('fa-search-minus');

      } else {
        // if visible we switch the icon to appear as a toggle
        $searchholder.hide();
        $searchbar.removeClass('fa-search-minus').addClass('fa-search');
      }

      $searchbar.slideToggle(300, function () {
        $("#s").val("").focus();
      });
    }
  });
});

(function ($) {

    var PULLQUOTERIGHT = 'data-pullquoteright';
    var PULLQUOTELEFT = 'data-pullquoteleft';

    $('[' + PULLQUOTERIGHT + ']').each(function () {

      var $parent = $(this),
        $quote = $parent.find($parent.data('pullquoteright'));

      if ($quote.length > 0) {
        $parent
          .attr(PULLQUOTERIGHT, $quote.eq(0).text())
          .addClass('has-pullquote has-pullquote-right');
      }

    });



    $('[' + PULLQUOTELEFT + ']').each(function () {

      var $parent = $(this),
        $quote = $parent.find($parent.data('pullquoteleft'));

      if ($quote.length > 0) {
        $parent
          .attr(PULLQUOTELEFT, $quote.eq(0).text())
          .addClass('has-pullquote has-pullquote-left ');
      }

    });

    $(function () {

        // Define element to slide
        var el = $("aside.share");
        var related = $('.related');
 
        // Load top default
        el.attr('data-top', el.css('top'));
        el.attr('data-bottom', el.css('bottom'));
        

        // Listen to scroll
        $(window).scroll(function () {
            clearTimeout($.data(this, "scrollCheck"));
            $.data(this, "scrollCheck", setTimeout(function () {
              var nBottom = parseInt(el.css('bottom'));
              console.log(nBottom);
              var nTop = parseInt(el.attr('data-top')) + 200;
              if (nBottom >= 380) {
                 el.attr('data-bottom', el.css('bottom'));
                el.css('opacity', 1);
                if ($(window).scrollTop() >= nTop) {
                  el.animate({
                    top: $(window).scrollTop() - 200
                  }, 50);
                } else {
                  el.animate({
                    top: nTop - 200
                  })
                }
              } else if (nBottom < 380) {
                 el.attr('data-bottom', el.css('bottom'));
                el.css('opacity', 0);
                if ($(window).scrollTop() >= nTop) {
                  el.animate({
                    top: $(window).scrollTop() - 200
                  }, 50);
                } else {
                  el.animate({
                    top: nTop - 200
                  })
                }
              }
            }, 50));
        });
    });



}(jQuery));

// Slide on scroll effect