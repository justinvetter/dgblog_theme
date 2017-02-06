//Main Js
transformicons.add('.tcon');
console.log('test');

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
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD module
    define(factory);
  } else if (typeof exports === 'object') {
    // CommonJS-like environment (i.e. Node)
    module.exports = factory();
  } else {
    // Browser global
    root.transformicons = factory();
  }
}(this || window, function () {

  // ####################
  // MODULE TRANSFORMICON
  // ####################
  'use strict';

  var
    tcon = {}, // static class
    _transformClass = 'tcon-transform',

    // const
    DEFAULT_EVENTS = {
      transform : ['click'],
      revert : ['click']
    };

  // ##############
  // private methods
  // ##############

  /**
  * Normalize a selector string, a single DOM element or an array of elements into an array of DOM elements.
  * @private
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements
  * @returns {array} Array of DOM elements
  */
  var getElementList = function (elements) {
    if (typeof elements === 'string') {
      return Array.prototype.slice.call(document.querySelectorAll(elements));
    } else if (typeof elements === 'undefined' || elements instanceof Array) {
      return elements;
    } else {
      return [elements];
    }
  };

  /**
  * Normalize a string with eventnames separated by spaces or an array of eventnames into an array of eventnames.
  * @private
  *
  * @param {(string|array)} elements - String with eventnames separated by spaces or array of eventnames
  * @returns {array} Array of eventnames
  */
  var getEventList = function (events) {
    if (typeof events === 'string') {
      return events.toLowerCase().split(' ');
    } else {
      return events;
    }
  };

  /**
  * Attach or remove transformicon events to one or more elements.
  * @private
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements to be toggled
  * @param {object} [events] - An Object containing one or more special event definitions
  * @param {boolean} [remove=false] - Defines wether the listeners should be added (default) or removed.
  */
  var setListeners = function (elements, events, remove) {
    var
      method = (remove ? 'remove' : 'add') + 'EventListener',
      elementList = getElementList(elements),
      currentElement = elementList.length,
      eventLists = {};

    // get events or use defaults
    for (var prop in DEFAULT_EVENTS) {
      eventLists[prop] = (events && events[prop]) ? getEventList(events[prop]) : DEFAULT_EVENTS[prop];
    }
    
    // add or remove all events for all occasions to all elements
    while(currentElement--) {
      for (var occasion in eventLists) {
        var currentEvent = eventLists[occasion].length;
        while(currentEvent--) {
          elementList[currentElement][method](eventLists[occasion][currentEvent], handleEvent);
        }
      }
    }
  };

  /**
  * Event handler for transform events.
  * @private
  *
  * @param {object} event - event object
  */
  var handleEvent = function (event) {
    tcon.toggle(event.currentTarget);
  };

  // ##############
  // public methods
  // ##############

  /**
  * Add transformicon behavior to one or more elements.
  * @public
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements to be toggled
  * @param {object} [events] - An Object containing one or more special event definitions
  * @param {(string|array)} [events.transform] - One or more events that trigger the transform. Can be an Array or string with events seperated by space.
  * @param {(string|array)} [events.revert] - One or more events that trigger the reversion. Can be an Array or string with events seperated by space.
  * @returns {transformicon} transformicon instance for chaining
  */
  tcon.add = function (elements, events) {
    setListeners(elements, events);
    return tcon;
  };

  /**
  * Remove transformicon behavior from one or more elements.
  * @public
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements to be toggled
  * @param {object} [events] - An Object containing one or more special event definitions
  * @param {(string|array)} [events.transform] - One or more events that trigger the transform. Can be an Array or string with events seperated by space.
  * @param {(string|array)} [events.revert] - One or more events that trigger the reversion. Can be an Array or string with events seperated by space.
  * @returns {transformicon} transformicon instance for chaining
  */
  tcon.remove = function (elements, events) {
    setListeners(elements, events, true);
    return tcon;
  };

  /**
  * Put one or more elements in the transformed state.
  * @public
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements to be transformed
  * @returns {transformicon} transformicon instance for chaining
  */
  tcon.transform = function (elements) {
    getElementList(elements).forEach(function(element) {
      element.classList.add(_transformClass);
    });
    return tcon;
  };

  /**
  * Revert one or more elements to the original state.
  * @public
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements to be reverted
  * @returns {transformicon} transformicon instance for chaining
  */
  tcon.revert = function (elements) {
    getElementList(elements).forEach(function(element) {
      element.classList.remove(_transformClass);
    });
    return tcon;
  };
  
  /**
  * Toggles one or more elements between transformed and original state.
  * @public
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements to be toggled
  * @returns {transformicon} transformicon instance for chaining
  */
  tcon.toggle = function (elements) {
    getElementList(elements).forEach(function(element) {
      tcon[element.classList.contains(_transformClass) ? 'revert' : 'transform'](element);
    });
    return tcon;
  };

  return tcon;
}));