(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = (function (window, document, undefined) {
  "use strict";

  function setCookie(name, value, expires) {
    if (typeof expires === 'number') {
      var d = new Date();
      d.setTime(d.getTime() + expires * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = name + "=" + value + "; " + expires + "; path=/";
    } else {
      document.cookie = name + "=" + value + "; path=/";
    }
  }

  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  return {
    setCookie: setCookie,
    getCookie: getCookie
  };
})(window, document);

},{}],2:[function(require,module,exports){
// check the value of the css :before psuedo element
// values look for "true" or "false"

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function ($el) {
  var value = "true";
  try {
    value = window.getComputedStyle($el[0], ':before').getPropertyValue('content').replace(/\"/g, '');
  } catch (err) {}
  return value === "false" ? false : true;
};

module.exports = exports['default'];

},{}],3:[function(require,module,exports){
/**
  * Get outerHTML of elements, taking care
  * of SVG elements in IE as well.
  *
  * @param {Element} DOM object
  * @return {String}
  */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (el) {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
};

module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

module.exports = function (name) {
    if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
        jQuery.ajax({
            url: ma.themePath + '/js/templates/' + name + '.html',
            success: function success(data) {
                if (Handlebars.templates === undefined) {
                    Handlebars.templates = {};
                }
                Handlebars.templates[name] = Handlebars.compile(data);
            },
            async: false
        });
    }
    return Handlebars.templates[name];
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {
  $.extend($.expr[':'], {
    // jQuery find all focusable elements
    // see: https://coderwall.com/p/jqsanw/jquery-find-every-focusable-elements
    focusable: function focusable(el, index, selector) {
      return $(el).is('a, button, :input, [tabindex]');
    }
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _helpersGetHandlebarTemplateJs = require("../helpers/getHandlebarTemplate.js");

var _helpersGetHandlebarTemplateJs2 = _interopRequireDefault(_helpersGetHandlebarTemplateJs);

var _helpersStickyJs = require("../helpers/sticky.js");

var _helpersStickyJs2 = _interopRequireDefault(_helpersStickyJs);

var _vendorBower_componentsMomentSrcMoment = require("../vendor/bower_components/moment/src/moment");

var _vendorBower_componentsMomentSrcMoment2 = _interopRequireDefault(_vendorBower_componentsMomentSrcMoment);

var _helpersGetElementOuterHtmlJs = require("../helpers/getElementOuterHtml.js");

var _helpersGetElementOuterHtmlJs2 = _interopRequireDefault(_helpersGetElementOuterHtmlJs);

exports["default"] = (function (window, document, undefined, $) {
  "use strict";

  /**
   * Common Helpers between event + location listings
   */

  /**
   * Renders the new page of location listing image promos and broadcasts the rendered master data instance.
   *
   * @param args
   *   Arguments object with the following structure:
   *   {
   *      page: (optional) the page to be rendered, defaults to 1
   *      data: the instance of master data to render
   *   }
   */
  function renderListingPage(args) {
    if (args.data.hasOwnProperty('selectors')) {
      (function () {
        clearListingPage(args.data.selectors.container, args.data.selectors.parent);
        var $el = $(args.data.selectors.container).find(args.data.selectors.parent),
            page = args.page ? args.page : 1;

        args.data.items.forEach(function (item) {
          if (item.isActive && item.page === page) {
            $el.append(item.markup);
          }
        });

        // Focus on the first focusable element in the first listing
        var $firstListing = $el.find(args.data.selectors.row).first();
        // :focusable is possible with helpers/jQueryExtend.js
        $firstListing.find(':focusable').eq(0).focus();

        if (args.data.selectors.hasOwnProperty('map') && args.data.selectors.map) {
          _helpersStickyJs2["default"].init($(args.data.selectors.map));
        }
      })();
    } else {
      console.warn("masterData.selectors must be set for this listing.");
      return false;
    }
  }

  /**
   * Returns the data structure necessary to render pagination component, reflecting current state.
   *
   * @param args
   *   An object with the following structure:
   *   {
   *     data: [instance of filtered, sorted master data],
   *     targetPage: (optional) the page which should be active
   *   }
   *
   * @returns {*}
   *   Data structure necessary to render pagination component
   */
  function transformPaginationData(args) {
    var data = args.data;
    var targetPage = args.targetPage ? args.targetPage : 1; // default to first page if none passed
    var totalPages = data.totalPages;
    var pages = [];

    for (var i = 1; i <= totalPages; i++) {
      pages.push({
        text: i.toString(),
        active: i === targetPage
      });
    }

    data.pagination.prev = {
      text: "Previous",
      disabled: targetPage === 1
    };

    data.pagination.next = {
      text: "Next",
      disabled: targetPage === totalPages
    };

    data.pagination.pages = pages;
    data.pagination.currentPage = targetPage;

    return data.pagination;
  }

  /**
   * Updates the resultsHeading data structure to reflect the current component state.
   *
   * @param args
   *    Arguments object with the following structure:
   *    args: {
   *      data: the current instance of master data,
   *      page: (optional) the current page, defaults to 1
   *    }
   *
   * @returns {resultsHeading|{numResults, totalResults}|*}
   */
  function transformResultsHeading(args) {
    var pageTotal = 0,
        totalActive = 0,
        page = args.page ? args.page : 1,
        data = args.data,
        resultsHeading = data.resultsHeading; // preserve active resultsHeading.tags

    // Tally the total active and page length.
    data.items.map(function (item) {
      if (item.isActive) {
        totalActive += 1;
        if (item.page === page) {
          pageTotal += 1;
        }
      }
    });

    // Get the index (from 1) of the first and last items on this page.
    var firstItem = Number(data.maxItems) * Number(page) - (Number(data.maxItems) - 1),
        lastItem = firstItem + (Number(pageTotal) - 1);

    resultsHeading.totalResults = totalActive;
    resultsHeading.numResults = firstItem + " - " + lastItem; // @todo add accessibility consideration here

    return resultsHeading;
  }

  /**
   * Creates an array with generated markup for location listing items, preserving original index.
   *
   * @param listing
   *  The array of items
   * @param template
   *  The string name of the template
   *
   * @returns {Array}
   *  An array of compiled markup
   */
  function transformListing(listing, template) {
    // Get template for location listing (organisms > imagePromo)
    var compiledTemplate = (0, _helpersGetHandlebarTemplateJs2["default"])(template);
    var listingMarkup = [];
    listing.forEach(function (data, index) {
      var itemData = itemTransform(data);
      listingMarkup[index] = compiledTemplate(itemData);
    });
    return listingMarkup;
  }

  /**
   * Returns transformed item data object.
   *
   * @param item
   *   The item.item[]{} being transformed.
   *
   * @returns {*}
   *   The original item object with a formatted tag property.
   */
  function itemTransform(item) {
    // Ensure tags are an array.
    var tags = [];

    $.map(item.tags, function (val, index) {
      tags[index] = val;
    });

    item.tags = tags;

    var tagsData = {
      tagsFormatted: item.tags.map(transformTag)
    };
    return Object.assign({}, item, tagsData);
  }

  /**
   * Returns a formatted item.tag object with a label and svg icon markup.
   *
   * @param tag
   *   The tag being transformed.
   *
   * @returns {{label, svg: boolean}}
   */
  function transformTag(tag) {
    return {
      label: tag.label,
      svg: getSvgFromTag(tag.id)
    };
  }

  /**
   * Returns the svg element markup from the corresponding tag filter checkbox label icon
   *
   * @param tag
   *  The imagePromo tag.id whose icon we need
   *
   * @return string
   *  The svg element for the matching filter form tag input.
   */
  function getSvgFromTag(tag) {
    // Get the existing corresponding icon markup so we don't have to worry about outdated markup.
    // return $('.js-filter-by-tags').find("#" + tag).parent().siblings('svg').prop('outerHTML');
    // Get outerHtml of svgElement shim for IE
    // See: https://stackoverflow.com/questions/12592417/outerhtml-of-an-svg-element
    return (0, _helpersGetElementOuterHtmlJs2["default"])($('.js-filter-by-tags').find("#" + tag).siblings('svg')[0]);
  }

  /**
   * Returns true if the passed filters array includes an item with the passed type.
   *
   * @param filters
   *   Array of filters.
   * @param type
   *   The type of filter to search for.
   *
   * @returns {*|boolean}
   */
  function hasFilter(filters, type) {
    return filters.some(function (filter) {
      return filter.hasOwnProperty('type') && filter['type'] === type;
    });
  }

  /**
   * Returns the value(s) of the passed filters of the passed type.
   *
   * @param filters
   *   Array of filters from which to abstract values.
   * @param type
   *   The type of filter to search for.
   *
   * @return array
   *   An array of filter values of type.
   */
  function getFilterValues(filters, type) {
    return filters.filter(function (data) {
      return data.type === type;
    }).map(function (data) {
      return data.value;
    });
  }

  /**
   * Creates the active filter object based on either cleared or submitted filter data.
   *
   * @param args
   *   An object with the following structure:
   *   data {
   *    [masterData current instance]
   *   },
   *   filterData: {
   *     clearedFilter: (optional cleared filter data)
   *     {
   *       type: '[filter type]: location || tag',
   *       text: '[filter text or label]',
   *       value: '[filter value]'
   *     }, || 'all' (if clear all button was pressed)
   *     {
   *       formData: (optional submitted form filter data)
   *       [
   *         {
   *           type: '[filter type] location || tag',
   *           text: '[filter label]',
   *           value: '[filter value]'
   *         }, ...
   *       ]
   *     }
   *   }
   *
   * @returns {*}
   */
  function transformActiveTagsData(args) {
    if (args.filterData.hasOwnProperty('clearedFilter')) {
      return getActiveFilters(args.data, args.filterData); // This was an active tag interaction, get remaining filters.
    } else {
        return args.filterData.formData; // This was a form submission, so just return the applied form data.
      }
  }

  /**
   * Returns an array of the currently active filters, based on passed filterData.
   *
   * @param data
   *   The current instance of master data structure.
   *
   * @param filterData
   *  An object representing the cleared filter:
   *  {
   *    clearedFilter: {
   *       type: '[filter type]: location || tag',
   *       text: '[filter text or label]',
   *       value: '[filter value]'
   *     } || 'all' (if clear all button was pressed)
   *  }
   *
   * @returns {Array}
   *   An array of the currently active filters:
   *   [  {
   *        type:
   *        text:
   *        value:
   *      }, ... ]
   */
  function getActiveFilters(data, filterData) {
    // Single filter button clicked, so remove that filter from the list.
    if (filterData.clearedFilter !== "all") {
      var filters = data.resultsHeading.tags;
      // Remove the clicked tag from the tags array.
      return filters.filter(function (tag) {
        return tag.value !== filterData.clearedFilter.value;
      });
    } else {
      // Clear all button was clicked so remove all filters.
      return [];
    }
  }

  /**
   * Assigns page values to masterData items, based on the provided max number.
   *
   * @param items
   *   The master data items.
   *
   * @param max
   *   The max number of items to show per page.
   *
   * @returns
   *   The updated master data items.
   */
  function paginateItems(items, max) {
    var page = 1,
        pageTotal = 0;
    var paginatedItems = items.map(function (item) {
      if (item.isActive) {
        if (pageTotal < max) {
          item.page = page;
        } else {
          page += 1;
          pageTotal = 0;
          item.page = page;
        }
        pageTotal += 1;
      }
      return item;
    });

    return {
      items: paginatedItems,
      totalPages: page
    };
  }

  // Remove the listing content children on the current listing page.
  function clearListingPage(listing, parent) {
    $(listing).find(parent).html('');
  }

  /**
   * Filters the listing data based on component filter state.
   *
   * @param data
   *  An instance of masterData to start from.
   * @param filterData
   *  Data structure representing either the newly applied or cleared filters.
   * @returns {*}
   */
  function filterListingData(data, filterData) {
    // Get the currently active filters.
    var filters = transformActiveTagsData({ data: data, filterData: filterData });
    // Update the results heading tags with the new active filters.
    data.resultsHeading.tags = filters;

    // If tag (checkbox) filter is present, filter based on current tag values.
    if (hasFilter(filters, 'tag')) {
      // Get just the tag values from the filters array.
      var tags = getFilterValues(filters, 'tag');
      // Identify active data based on filter.
      return filterDataByTags(tags, data);
    }

    // If a date filter is present, filter based on the date filter values.
    if (hasFilter(filters, 'dateRange')) {
      return filterDataByDateTags(filters, data);
    }

    // Either there are no filters or the only active filter is location, make all items active
    return makeAllActive(data);
  }

  /**
   * Returns an instance of master data which is sorted alphabetically by item data.title.text
   *
   * @param data
   *    The instance of master data being sorted.
   *
   * @returns {*}
   *    Sorted instance of master data.
   */
  function sortDataAlphabetically(data) {
    var items = data.items.sort(function (a, b) {
      var nameA = a.data.title.text.toUpperCase();
      var nameB = b.data.title.text.toUpperCase();

      // Sort the items alphabetically
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });

    var paginated = paginateItems(items, data.maxItems);
    data.items = paginated.items;
    data.totalPages = paginated.totalPages;
    return data;
  }

  /**
   * Geocodes an address string arg and executes callback upon successful return.
   *
   * @param address
   *   Address string to be geocoded.
   * @param callback
   *   Callback function to call upon successful geocode return.
   *
   * @returns {*}
   *   Upon success, the return value of the passed callback function.
   */
  function geocodeAddressString(address, callback) {
    // Only attempt to execute if google's geocode library is loaded.
    if (typeof ma.geocoder === "undefined") {
      return;
    }

    // Geocode address string, then execute callback with argument upon success.
    ma.geocoder.geocode({ address: address }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        var place = results[0];
        return callback(place);
      } else {
        console.warn('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  /**
   * Geocodes an address string arg and executes callback upon successful return.
   *
   * @param address
   *   Address string to be geocoded.
   * @param callback
   *   Callback function to call upon successful geocode return.
   *
   * @returns {*}
   *   Upon success, the return value of the passed callback function.
   */
  function geocodePlaceId(place_id, callback) {
    // Only attempt to execute if google's geocode library is loaded.
    if (typeof ma.geocoder === "undefined") {
      return;
    }

    // Geocode address string, then execute callback with argument upon success.
    ma.geocoder.geocode({ 'placeId': place_id }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        var place = results[0];
        return callback(place);
      } else {
        console.warn('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  /**
   * Resets all items in a master data instance to active (i.e. not filtered out).
   *
   * @param data
   *    The instance of master data whose items are being made active.
   *
   * @returns {*}
   *    The master data instance with all active items.
   */
  function makeAllActive(data) {
    data.items = data.items.map(function (item) {
      item.isActive = true;
      return item;
    });
    return data;
  }

  /**
   * Returns masterData with necessary filtered items flagged inactive.
   *
   * @param tags
   *  The array of filters by which to filter.
   *
   * @param data
   *   The current instance of master data being filtered.
   *
   * @returns {*}
   *   The 'filtered' (flagged) instance of master data.
   */
  function filterDataByTags(tags, data) {
    // @todo use map similar to sortDataAlphabetically
    data.items = data.items.map(function (item) {
      item.isActive = doesItemContainTags(item.data.tags, tags);
      return item;
    });

    return data;
  }

  /**
   * Location Listing Specific
   */

  /**
   * Determines if an masterData item contains the necessary tag(s).
   *
   * @param haystack
   *  The data object in question.
   *
   * @param needle
   *   The tag(s) being searched for.
   *
   * @returns {boolean|*}
   */
  function doesItemContainTags(haystack, needle) {
    return needle.every(function (v) {
      return Boolean(haystack.filter(function (item) {
        // return Object.values(item).indexOf(v) !== -1;
        // return Object.values(item).indexOf(v) !== -1;
        // Object.values shim for IE11
        return Object.keys(item).map(function (i) {
          return item[i];
        }).indexOf(v) !== -1;
      }).length);
    });
  }

  /**
   * Event Listing specific helpers
   */

  /**
   * Calculate distance from lat/lng.
   *
   * @param lat1
   *    Latitude 1 input.
   * @param lon1
   *    Longitude 1 input.
   * @param lat2
   *    Latitude 2 input.
   * @param lon2
   *    Longitude 2 input.
   * @param unit
   *
   * @returns {*}
   *    Return the distance from points.
   */
  function calculateDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var radlon1 = Math.PI * lon1 / 180;
    var radlon2 = Math.PI * lon2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;

    if (unit === "K") {
      dist = dist * 1.609344;
    }
    if (unit === "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }

  /**
   * Create a moment.js object for a passed eventTeaser date data
   *
   * @param args
   *   Data structure for eventTeaser.date and a type ("start" || "end") property
   * @returns
   *   A moment.js object for the event start/end date in MM/D format.
   *   See: https://momentjs.com/docs/#/parsing/string-format/
   */
  function makeMoment(args) {
    /**
     * args: {
     *   data: {
     *     summary: "March 2, 2017 - April 25, 2017",
     *     startMonth: "Mar",
     *     startDay: "2",
     *     startTimestamp: "3/2/2017 - 14:00",
     *     endMonth: "Apr",
     *     endDay: "25",
     *     endTimestamp: "4/25/2017 - 15:00"
     *   },
     *   type: 'start' || 'end'
     * }
     */
    // Create moment.js object for start timestamp
    if (args.hasOwnProperty('type') && args.type === 'start') {
      return (0, _vendorBower_componentsMomentSrcMoment2["default"])(args.data.startTimestamp, 'M/DD/YYYY');
    }
    // Create a moment.js object for end timestamp
    if (args.hasOwnProperty('type') && args.type === 'end') {
      return args.data.endTimestamp ? (0, _vendorBower_componentsMomentSrcMoment2["default"])(args.data.endTimestamp, 'M/DD/YYYY') : "";
    }
    return false;
  }

  /**
   * Returns an instance of master data which is sorted by start timestamp then alphabetically by item data.title.text
   *
   * @param data
   *    The instance of master data being sorted.
   * @param dateType
   *    The type of date by which to sort: start || end
   *
   * @returns {*}
   *    Sorted instance of master data.
   */
  function sortDataByDate(data, dateType) {
    var type = dateType ? dateType : 'start';
    var dateA = '';
    var dateB = '';
    var items = data.items.sort(function (a, b) {
      if (type !== "end") {
        dateA = a.start;
        dateB = b.start;
      } else {
        dateA = a.end;
        dateB = b.end;
      }

      var nameA = a.data.title.text.toUpperCase();
      var nameB = b.data.title.text.toUpperCase();

      // Sort the items by start date timestamp, then alphabetically.
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
      return dateA.isBefore(dateB, 'minute') ? -1 : dateA.isAfter(dateB, 'minute') ? 1 : nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });

    var paginated = paginateItems(items, data.maxItems);
    data.items = paginated.items;
    data.totalPages = paginated.totalPages;
    return data;
  }

  /**
   * Returns data with necessary items flagged inactive according to date/date range.
   *
   * @param tags
   *  The array of filters by which to filter.
   *
   * @param data
   *   The current instance of master data being filtered.
   *
   * @returns {*}
   *   The 'filtered' instance of data after checking date(s).
   */
  function filterDataByDateTags(tags, data) {
    data.items = data.items.map(function (item) {
      item.isActive = isEventInDateRange(item, tags);
      return item;
    });
    var paginated = paginateItems(data.items, data.maxItems);
    data.items = paginated.items;
    data.totalPages = paginated.totalPages;
    return data;
  }

  /**
   * Returns an item's isActive value depending on the date range from date filters.
   *
   * @param item
   *   The item.item[]{} being transformed.
   *
   * @param tags
   *  The array of filters by which to filter.
   *
   * @returns
   *   The updated item.
   */
  function isEventInDateRange(item, tags) {
    var filterStart = '';
    var filterEnd = '';

    tags.map(function (tag) {
      if (tag.type == 'dateRange') {
        filterStart = (0, _vendorBower_componentsMomentSrcMoment2["default"])(tag.start, 'M/DD/YYYY');
      }
      if (tag.type == 'dateRange') {
        filterEnd = (0, _vendorBower_componentsMomentSrcMoment2["default"])(tag.end, 'M/DD/YYYY');
      }
    });

    if (filterEnd && filterStart) {
      return item.start.isSameOrAfter(filterStart, 'day') && item.start.isSameOrBefore(filterEnd, 'day') ? true : false;
    } else {
      return item.start.isSame(filterStart, 'day') ? true : false;
    }
  }

  return {
    renderListingPage: renderListingPage,
    transformPaginationData: transformPaginationData,
    transformResultsHeading: transformResultsHeading,
    filterListingData: filterListingData,
    hasFilter: hasFilter,
    getFilterValues: getFilterValues,
    filterDataByTags: filterDataByTags,
    filterDataByDateTags: filterDataByDateTags,
    transformActiveTagsData: transformActiveTagsData,
    paginateItems: paginateItems,
    clearListingPage: clearListingPage,
    sortDataAlphabetically: sortDataAlphabetically,
    sortDataByDate: sortDataByDate,
    geocodeAddressString: geocodeAddressString,
    geocodePlaceId: geocodePlaceId,
    makeAllActive: makeAllActive,
    calculateDistance: calculateDistance,
    transformListing: transformListing,
    makeMoment: makeMoment
  };
})(window, document, undefined, jQuery);

;
module.exports = exports["default"];

},{"../helpers/getElementOuterHtml.js":3,"../helpers/getHandlebarTemplate.js":4,"../helpers/sticky.js":7,"../vendor/bower_components/moment/src/moment":136}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersCssControlCodeJs = require("../helpers/cssControlCode.js");

var _helpersCssControlCodeJs2 = _interopRequireDefault(_helpersCssControlCodeJs);

exports['default'] = (function (window, document, $, undefined) {
  var $el = undefined,
      $elParent = undefined,
      elHeight = undefined,
      elWidth = undefined,
      lowerLimit = undefined,
      upperLimit = undefined,
      debounceTimer = undefined,
      runCode = false;

  function init(element) {
    $el = element;
    $elParent = $el.parent().css('position') === 'relative' ? $el.parent() : $el.parent().offsetParent();

    // default assumption as to where the screen will load
    $el.attr('data-sticky', 'top');

    updateData();

    // update variables one more time to catch any post page load changes
    window.setTimeout(function () {
      updateData();
    }, 1000);

    $(window).resize(function () {
      updateData();
      setPosition();
    });

    // toggle the sticky positioning
    $(window).scroll(function () {
      setPosition();
    });
  }

  function updateData() {
    var newRunCode = (0, _helpersCssControlCodeJs2['default'])($el);

    if (runCode && !newRunCode) {
      $el.removeAttr('style');
    }

    runCode = newRunCode;

    if (!runCode) {
      return;
    }

    runCode = newRunCode;
    elHeight = $el.height();
    elWidth = $elParent.width();
    upperLimit = $elParent.offset().top;
    lowerLimit = upperLimit + $elParent.outerHeight(true) - $el.height();

    $el.width(elWidth);
  }

  function setPosition() {
    if (!runCode) {
      $el.attr('data-sticky', 'top');
      return false;
    }

    var windowTop = $(window).scrollTop(),
        attr = $el.attr('data-sticky'),
        top = attr !== 'top' && windowTop <= upperLimit,
        middle = attr !== 'middle' && windowTop < lowerLimit && windowTop > upperLimit,
        bottom = attr !== 'bottom' && windowTop >= lowerLimit;

    if (top) {
      $el.attr('data-sticky', 'top');
    } else if (middle) {
      $el.attr('data-sticky', 'middle');
    } else if (bottom) {
      $el.attr('data-sticky', 'bottom');
    }
  }

  return { init: init };
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/cssControlCode.js":2}],8:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("./helpers/jQueryExtend.js");

var _modulesAccordionsJs = require("./modules/accordions.js");

var _modulesAccordionsJs2 = _interopRequireDefault(_modulesAccordionsJs);

var _modulesGoogleMapJs = require("./modules/googleMap.js");

var _modulesGoogleMapJs2 = _interopRequireDefault(_modulesGoogleMapJs);

var _modulesBack2topJs = require("./modules/back2top.js");

var _modulesBack2topJs2 = _interopRequireDefault(_modulesBack2topJs);

var _modulesClickableJs = require("./modules/clickable.js");

var _modulesClickableJs2 = _interopRequireDefault(_modulesClickableJs);

var _modulesDropdownJs = require("./modules/dropdown.js");

var _modulesDropdownJs2 = _interopRequireDefault(_modulesDropdownJs);

var _modulesEmergencyAlertsJs = require("./modules/emergencyAlerts.js");

var _modulesEmergencyAlertsJs2 = _interopRequireDefault(_modulesEmergencyAlertsJs);

var _modulesEventFilters = require("./modules/eventFilters");

var _modulesEventFilters2 = _interopRequireDefault(_modulesEventFilters);

var _modulesEventListingInteractive = require("./modules/eventListingInteractive");

var _modulesEventListingInteractive2 = _interopRequireDefault(_modulesEventListingInteractive);

var _modulesFootnoteJs = require("./modules/footnote.js");

var _modulesFootnoteJs2 = _interopRequireDefault(_modulesFootnoteJs);

var _modulesFormValidationJs = require("./modules/formValidation.js");

var _modulesFormValidationJs2 = _interopRequireDefault(_modulesFormValidationJs);

var _modulesHideAlertJs = require("./modules/hideAlert.js");

var _modulesHideAlertJs2 = _interopRequireDefault(_modulesHideAlertJs);

var _modulesKeywordSearchJs = require("./modules/keywordSearch.js");

var _modulesKeywordSearchJs2 = _interopRequireDefault(_modulesKeywordSearchJs);

var _modulesLocationFiltersJs = require("./modules/locationFilters.js");

var _modulesLocationFiltersJs2 = _interopRequireDefault(_modulesLocationFiltersJs);

var _modulesLocationListingJs = require("./modules/locationListing.js");

var _modulesLocationListingJs2 = _interopRequireDefault(_modulesLocationListingJs);

var _modulesMainNavJs = require("./modules/mainNav.js");

var _modulesMainNavJs2 = _interopRequireDefault(_modulesMainNavJs);

var _modulesMobileNavJs = require("./modules/mobileNav.js");

var _modulesMobileNavJs2 = _interopRequireDefault(_modulesMobileNavJs);

var _modulesOrgSelectorJs = require("./modules/orgSelector.js");

var _modulesOrgSelectorJs2 = _interopRequireDefault(_modulesOrgSelectorJs);

var _modulesPaginationJs = require("./modules/pagination.js");

var _modulesPaginationJs2 = _interopRequireDefault(_modulesPaginationJs);

var _modulesPikadayJs = require("./modules/pikaday.js");

var _modulesPikadayJs2 = _interopRequireDefault(_modulesPikadayJs);

var _modulesResponsiveVideoJs = require("./modules/responsiveVideo.js");

var _modulesResponsiveVideoJs2 = _interopRequireDefault(_modulesResponsiveVideoJs);

var _modulesResultsHeadingJs = require("./modules/resultsHeading.js");

var _modulesResultsHeadingJs2 = _interopRequireDefault(_modulesResultsHeadingJs);

var _modulesRichTextJs = require("./modules/richText.js");

var _modulesRichTextJs2 = _interopRequireDefault(_modulesRichTextJs);

var _modulesScrollAnchorsJs = require("./modules/scrollAnchors.js");

var _modulesScrollAnchorsJs2 = _interopRequireDefault(_modulesScrollAnchorsJs);

var _modulesFormInputsJs = require("./modules/formInputs.js");

var _modulesFormInputsJs2 = _interopRequireDefault(_modulesFormInputsJs);

var _modulesUtilNavJs = require("./modules/utilNav.js");

var _modulesUtilNavJs2 = _interopRequireDefault(_modulesUtilNavJs);

},{"./helpers/jQueryExtend.js":5,"./modules/accordions.js":9,"./modules/back2top.js":10,"./modules/clickable.js":11,"./modules/dropdown.js":12,"./modules/emergencyAlerts.js":13,"./modules/eventFilters":14,"./modules/eventListingInteractive":15,"./modules/footnote.js":16,"./modules/formInputs.js":17,"./modules/formValidation.js":18,"./modules/googleMap.js":19,"./modules/hideAlert.js":20,"./modules/keywordSearch.js":21,"./modules/locationFilters.js":22,"./modules/locationListing.js":23,"./modules/mainNav.js":24,"./modules/mobileNav.js":25,"./modules/orgSelector.js":26,"./modules/pagination.js":27,"./modules/pikaday.js":28,"./modules/responsiveVideo.js":29,"./modules/resultsHeading.js":30,"./modules/richText.js":31,"./modules/scrollAnchors.js":32,"./modules/utilNav.js":33}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersCssControlCodeJs = require("../helpers/cssControlCode.js");

var _helpersCssControlCodeJs2 = _interopRequireDefault(_helpersCssControlCodeJs);

exports['default'] = (function (window, document, $, undefined) {

  $('.js-accordion').each(function (index) {
    var $el = $(this),
        $link = $el.find('.js-accordion-link'),
        $content = $el.find('.js-accordion-content'),
        id = $content.attr('id') || 'accordion' + (index + 1),
        active = (0, _helpersCssControlCodeJs2['default'])($el),
        open = $el.hasClass('is-open');

    $content.attr('id', id);
    $link.attr('aria-expanded', open).attr('aria-controls', id);

    if (open) {
      // setup the inline display block
      $content.stop(true, true).slideDown();
    }

    $link.on('click', function (e) {
      if (active) {
        e.preventDefault();
        open = $el.hasClass('is-open');
        if (open) {
          $content.stop(true, true).slideUp();
        } else {
          $content.stop(true, true).slideDown();
        }
        $link.attr('aria-expanded', !open);
        $el.toggleClass('is-open');
      }
    });

    $(window).resize(function () {
      var temp = (0, _helpersCssControlCodeJs2['default'])($el);

      if (temp !== active && !temp) {
        $content.removeAttr('style');
        $el.removeClass('is-open');
        $link.attr('aria-expanded', 'false');
      }

      active = temp;
    }).resize();
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/cssControlCode.js":2}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {
  var $footer = $('.js-footer'),
      visibleThreshold = 250,
      staticThreshold = 50;

  $(".js-back2top").each(function () {
    var $el = $(this);

    $el.on('click', function (e) {
      e.preventDefault();
      try {
        $("html, body").stop(true, true).animate({ scrollTop: 0 }, '750');
      } catch (e) {
        $('body').scrollTop(0);
      }
      // Bring keyboard focus back to top as well.
      $("#main-content").focus();
      return false;
    });

    $(window).on('scroll', function () {
      // if we've exceeded the threshold of scrolling
      // from the top, show control
      var scrollTop = $(window).scrollTop();

      if (scrollTop > visibleThreshold) {
        $el.removeClass('is-hidden');
      } else {
        $el.addClass('is-hidden');
      }
    });
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {
  $('.js-clickable').each(function () {
    // if the this is clicked
    $(this).click(function (event) {
      event.preventDefault();

      var $el = $(this).find('.js-clickable-link').first();
      // find the destination
      var dest = $el.attr("href");
      // if the target attribute exists
      if ("_blank" === $el.attr("target")) {
        // launch new tab/window
        window.open(dest);
      } else {
        // otherwise redirect to a new page
        window.location = dest;
      }
    });
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],12:[function(require,module,exports){
// ****** basic custom select that uses mobile select keyboard ******
"use strict";

var dropdownMenu = document.querySelectorAll(".js-dropdown");

if (null !== dropdownMenu) {

  var _length = dropdownMenu.length;

  var _loop = function (i) {
    var parentEl = dropdownMenu[i],
        selectEl = parentEl.querySelector(".js-dropdown-select"),
        link = parentEl.querySelector(".js-dropdown-link");

    if (null === selectEl || null === link) {
      return "break";
    }

    selectEl.onchange = function () {
      var elem = typeof this.selectedIndex === "undefined" ? window.event.srcElement : this;
      link.innerText = elem.text || elem.options[elem.selectedIndex].text;
    };
  };

  for (var i = 0; i < _length; i++) {
    var _ret = _loop(i);

    if (_ret === "break") break;
  }
}

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersCookiesJs = require("../helpers/cookies.js");

var _helpersCookiesJs2 = _interopRequireDefault(_helpersCookiesJs);

exports['default'] = (function (window, document, $, undefined) {
  // Emergency Alerts start close on page load
  // the default behavior is to expand the alerts
  // Emergency Alerts should stay closed if the cookie is set to false

  /* ********* NOTE: 
    This component is dependent on the 
    accordion.js component runing before it. 
  ********* */

  $('.js-emergency-alerts').each(function () {
    var $el = $(this),
        open = true,
        id = $el.data('id'),
        cookieName = 'emergency-alerts' + id,
        cookieValue = _helpersCookiesJs2['default'].getCookie(cookieName),
        $button = $el.find('.js-accordion-link');

    $button.on('click', function () {
      // clicking this link also triggers the accordion click
      // toggle the current state
      open = !open;
      // update open/close state cookie
      // leave off third argument to make it expire on session
      _helpersCookiesJs2['default'].setCookie(cookieName, open);
    });

    // if the user has closed the alerts on a previous page
    if (typeof cookieValue !== 'undefined' && cookieValue === 'false') {
      open = false;
      // set the state of aria-expanded
      $button.attr('aria-expanded', open);
    }

    // Emergency Alerts loads closed so expand it.
    if (open) {
      open = false; // clicking the link swaps the value
      $button.first().trigger('click');
    }
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/cookies.js":1}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {
  $('.js-event-filters').each(function () {
    var $el = $(this);

    // When google map libraries are loaded, initialize places.autocomplete on the location input, if it exists.
    $(document).on('ma:LibrariesLoaded:GoogleMaps', function () {
      var $locationFilterParent = $('.js-event-filter-by-location', $el);
      var $locationFilter = $locationFilterParent.find('input');
      if ($locationFilter.length) {
        // Create the google places autocomplete object and associate it with the zip code text input.
        var locationInput = document.getElementById($locationFilter.attr('id'));
        var swLat = $locationFilterParent.data('maPlaceBoundsSwLat');
        var swLng = $locationFilterParent.data('maPlaceBoundsSwLng');
        var neLat = $locationFilterParent.data('maPlaceBoundsNeLat');
        var neLng = $locationFilterParent.data('maPlaceBoundsNeLng');

        var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(swLat, swLng), new google.maps.LatLng(neLat, neLng));

        // See options: https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete
        var options = {
          bounds: defaultBounds,
          strictBounds: true,
          types: ['geocode'],
          componentRestrictions: { country: 'us' },
          placeIdOnly: true
        };
        ma.autocomplete = new google.maps.places.Autocomplete(locationInput, options);
      }
    });

    // Listen for new data from another component interaction (i.e. results heading), update form.
    $el.on('ma:FormFilter:DataUpdated', function (e, data) {
      renderForm({ clearedFilter: data.clearedFilter, $form: $el });
    });

    // Handle global form submission.
    $el.submit(function (e) {
      e.preventDefault();
      // Update master data with the various filter values.
      var formData = getFormData({ $form: $(this) });

      // Trigger location listing filter event with current filter values.
      $el.trigger('ma:EventFilter:FormSubmitted', [{ formData: formData }]);
    });
  });

  function renderForm(args) {
    var clearedFilter = args.clearedFilter;
    // The clear all button was pressed.
    if (clearedFilter === "all") {
      clearForm(args);
    }
    // Single filter button was pressed.
    else {
        clearDeactivatedFilter(args);
      }
  }

  function getFormData(args) {
    var $form = $(args.$form),
        $location = $form.find('.js-event-filter-by-location'),
        $tags = $form.find('.js-filter-by-tags'),
        $dateStart = $form.find('.js-filter-by-date-range__start'),
        $dateEnd = $form.find('.js-filter-by-date-range__end'),
        formData = [];

    // Get location
    if ($location.find('input').length) {
      var place = $location.find('input').val();
      if (place) {
        formData.push({
          type: 'location',
          text: place,
          value: place
        });
      }
    }

    var dateRange = '',
        startDate = '',
        endDate = '',
        useToday = false;

    // Get start date.
    if ($dateStart.find('input').length) {
      startDate = $dateStart.find('input').val();
      if (startDate) {
        dateRange += startDate;
      } else {
        startDate = moment().format('M/DD/YYYY');
        useToday = true;
      }
    }

    // Get end date.
    if ($dateEnd.find('input').length) {
      endDate = $dateEnd.find('input').val();
      if (endDate) {
        if (startDate && !useToday) {
          dateRange += ' - ' + endDate;
        } else {
          dateRange = 'Today - ' + endDate;
        }
      }
    }

    if (dateRange) {
      formData.push({
        type: 'dateRange',
        text: dateRange,
        value: dateRange,
        start: startDate,
        end: endDate
      });
    }

    // Get checkboxes/tags.
    $tags.find('input:checked').each(function () {
      formData.push({
        'type': 'tag',
        'text': $(this).next("label").text(),
        'value': $(this).val()

      });
    });

    return formData;
  }

  function clearDeactivatedFilter(args) {
    var $form = $(args.$form),
        $place = $form.find('.js-event-filter-by-location'),
        $dateStart = $form.find('.js-filter-by-date-range__start'),
        $dateEnd = $form.find('.js-filter-by-date-range__end'),
        $tags = $form.find('.js-filter-by-tags'),
        clearedFilter = args.clearedFilter;

    // If the cleared filter button was for a location filter.
    if (clearedFilter.type === 'location') {
      $place.find('input').val("");
      return;
    }
    // Clear dates text inputs.
    if (clearedFilter.type === 'dateRange') {
      $dateStart.find('input').val("");
      $dateEnd.find('input').val("");
      return;
    }
    // If the cleared filter button was for a tag filter.
    if (clearedFilter.type === 'tag') {
      $tags.find('input[type=checkbox][value=' + clearedFilter.value + ']').prop('checked', false);
    }
  }

  function clearForm(args) {
    var $form = $(args.$form),
        $place = $('.js-event-filter-by-location', $form).find('input'),
        $dateStart = $('.js-filter-by-date-range__start', $form).find('input'),
        $dateEnd = $('.js-filter-by-date-range__end', $form).find('input');

    // Clear location text input.
    if ($place.length) {
      $place.val("");
    }

    // Clear start date text input.
    if ($dateStart.length) {
      $dateStart.val("");
    }

    // Clear end date text input.
    if ($dateEnd.length) {
      $dateEnd.val("");
    }

    // Check for tags and uncheck all checked tags inputs.
    if (typeof $tags != "undefined") {
      $tags.find('input:checked').prop('checked', false);
    }
  }
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersListingJs = require("../helpers/listing.js");

var _helpersListingJs2 = _interopRequireDefault(_helpersListingJs);

exports['default'] = (function (window, document, $, undefined) {
  var container = '.js-event-listing-interactive',
      parent = '.js-event-listing-items',
      row = '.js-event-listing-item';

  $('.js-event-listing-interactive').each(function (i) {
    var $el = $(this),
        $resultsHeading = $el.find('.js-results-heading'),
        $pagination = $el.find('.js-pagination'),
        $eventFilter = $el.find('.js-event-filters');

    // Get the location listing component data (this could be replaced with an api)
    var rawData = ma.eventListingInteractive[i]; // Data object created in @organisms/by-author/event-listing-interactive.twig

    var masterData = []; // master data structure to preserve state

    masterData = populateMasterDataSource(rawData); // to preserve state

    // Handle location listings form interaction (triggered by locationFilters.js).
    $eventFilter.on('ma:EventFilter:FormSubmitted', function (e, formValues) {
      // transformData() returns a jQuery deferred object which allows us to wait for any asynchronous js execution to return before executing the .done(callback).
      // @see: https://api.jquery.com/deferred.done/
      transformData(masterData, formValues).done(function (transformation) {
        masterData = transformation.data; // preserve state
        // Update the results heading based on the current items state.
        transformation.data.resultsHeading = _helpersListingJs2['default'].transformResultsHeading({ data: transformation.data });
        // Update pagination data structure, reset to first page
        transformation.data.pagination = _helpersListingJs2['default'].transformPaginationData({ data: transformation.data });
        // Render the listing page.
        _helpersListingJs2['default'].renderListingPage({ data: transformation.data });
        // Trigger child components render with updated data
        updateChildComponents(transformation);
      });
    });

    // Handle active filter/tag button interactions (triggered by resultsHeading.js).
    $resultsHeading.on('ma:ResultsHeading:ActiveTagClicked', function (e, clearedFilter) {
      // transformData() returns a jQuery deferred object which allows us to wait for any asynchronous js execution to return before executing the .done(callback).
      // @see: https://api.jquery.com/deferred.done/
      transformData(masterData, clearedFilter).done(function (transformation) {
        masterData = transformation.data; // preserve state
        transformation.clearedFilter = clearedFilter;

        masterData = transformation.data; // preserve state
        // Update the results heading based on the current items state.
        transformation.data.resultsHeading = _helpersListingJs2['default'].transformResultsHeading({ data: transformation.data });
        // Update pagination data structure, reset to first page
        transformation.data.pagination = _helpersListingJs2['default'].transformPaginationData({ data: transformation.data });
        // Render the listing page.
        _helpersListingJs2['default'].renderListingPage({ data: transformation.data });
        // Trigger child components render with updated data
        updateChildComponents(transformation);
      });
    });

    // Handle pagination click events -- winning!
    $pagination.on('ma:Pagination:Pagination', function (e, target) {
      "use strict";
      var nextPage = target;

      // Get the current page, default to first page if not in global data object.
      var currentPage = masterData.pagination.currentPage ? masterData.pagination.currentPage : 1;
      if (target === "next") {
        nextPage = currentPage + 1;
      }
      if (target === "previous") {
        nextPage = currentPage - 1;
      }

      masterData.pagination = _helpersListingJs2['default'].transformPaginationData({ data: masterData, targetPage: nextPage });
      masterData.resultsHeading = _helpersListingJs2['default'].transformResultsHeading({ data: masterData, page: nextPage });
      _helpersListingJs2['default'].renderListingPage({ data: masterData, page: nextPage });

      // Trigger child components render with updated data
      updateChildComponents({ data: masterData });
    });

    // Trigger events to update child components with new data.
    function updateChildComponents(args) {
      $resultsHeading.trigger('ma:ResultsHeading:DataUpdated', [args.data.resultsHeading]);

      $pagination.trigger('ma:Pagination:DataUpdated', [args.data.pagination]);
      if (args.clearedFilter) {
        $eventFilter.trigger('ma:FormFilter:DataUpdated', [args.clearedFilter]);
      }
    }

    /**
     * Returns a master data structure with page level / listing item level data and markup, to reflect component state.
     *
     * @param listing
     *   The listing data structure to use as a source
     * @returns {Array}
     *   An array with the following structure:
     *    [
     *      maxItems: the max number of items to show per listing "page" if provided, defaults to all
     *      totalPages: the number of pages of items that should render, given the current filters
     *      resultsHeading: the data structure necessary to render a resultsHeading component
     *      items: an array of listing items [
     *        isActive: whether or not the listing should be shown, given current filters state
     *        page: the page that the listing, if active, will appear on, given the current sort order
     *        data: the data structure for the eventTeaser component
     *        markup: the compiled eventTeaser markup
     *        start: the momentjs object for the start timestamp
     *      ]
     *      pagination: the data structure necessary to render a pagination component,
     *      selectors: the necessary $selectors for rendering the listing
     *    ]
     */
    function populateMasterDataSource(listing) {
      // Populate master data structure
      var masterData = [];

      // Ensure eventListing.events.items is an array (the twig template json_encode()'s a php array)
      var listArray = [];
      $.map(listing.eventListing.events, function (val, index) {
        listArray[index] = val;
      });

      listing.eventListing.events = listArray;

      // Ensure eventListing.pagination.pages is an array (the twig template json_encode()'s a php array)
      var pages = [];
      $.map(listing.pagination.pages, function (val, index) {
        pages[index] = val;
      });
      listing.pagination.pages = pages;

      // Get the current page from the initial data structure, default to 1 if none passed.
      var currentPage = 1;
      pages.forEach(function (page) {
        if (page.active) {
          currentPage = Number(page.text);
        }
      });

      // Get the listing events, generate markup for each
      var masterListing = listing.eventListing.events,

      // Pass in listing and template name.
      masterListingMarkup = _helpersListingJs2['default'].transformListing(masterListing, 'eventListingRow');

      // The max number of items per page, if designated in eventListing data structure, else all
      masterData.maxItems = listing.maxItems ? listing.maxItems : masterListing.length;

      // The initial results heading data structure
      masterData.resultsHeading = listing.resultsHeading;

      // Create items with listing and markup.
      masterData.items = getMasterListingWithMarkup(masterListing, masterListingMarkup, masterData.maxItems);

      // The initial pagination data structure + currentPage;
      masterData.pagination = listing.pagination;
      masterData.pagination.currentPage = currentPage;

      // The total number of pages, given the number of items and the maxItems variable
      masterData.totalPages = Math.ceil(masterData.items.length / masterData.maxItems);

      // Set the selector properties necessary to render
      masterData.selectors = {};
      masterData.selectors.container = container;
      masterData.selectors.parent = parent;
      masterData.selectors.row = row;

      return masterData;
    }

    /**
     * Creates the master data structure items array
     *
     * @param listing
     *   The eventListing data structure
     * @param markup
     *   The generated array of item markup
     * @param max
     *   The maximum number of items per page
     * @returns {Array}
     *  An array of listing items with the following structure:
     *  [
     *      isActive: whether or not the listing should be shown, given current filters state
     *      page: the page that the listing, if active, will appear on, given the current sort order
     *      data: the data structure for the eventListing component
     *      markup: the compiled event markup
     *      start: a momentjs object for this event's start timestamp
     *   ]
     */
    function getMasterListingWithMarkup(listing, markup, max) {
      var items = [];
      listing.forEach(function (item, index) {
        // determine if there is an end date to this event
        var endDate = listing[index].date.endDay.length;

        items[index] = {
          isActive: true, // @todo consider checking for this in case of server side preprocessing of state
          page: Math.ceil((index + 1) / max),
          markup: markup[index],
          data: listing[index],
          start: _helpersListingJs2['default'].makeMoment({ data: listing[index].date, type: 'start' }),
          end: endDate ? _helpersListingJs2['default'].makeMoment({ data: listing[index].date, type: 'end' }) : endDate
        };
      });
      return items;
    }
  });

  /**
   * The main data transformation wrapper, returns an instance of masterData which reflects the component state.
   *
   * @param data
   *  An instance of masterData to start from.
   * @param transformation
   *  An object representing the change in state (locationFilter form data, resultsHeading tag interaction, etc.)
   *
   * @returns {{data: *, place: *}}
   *  An object with the current state masterData instance and an array of their related sorted markers to send to map.
   */
  function transformData(data, transformation) {
    // This data transformation potentially involves asynchronous google geocoding.
    // This jQuery deferered object allows us to wait for a return before moving on inside of the parent function (which invokes this function).
    // @see https://api.jquery.com/jquery.deferred/
    var promise = $.Deferred();
    var transformReturn = {};

    // First filter the data based on component state, then sort alphabetically by default.
    var filteredData = _helpersListingJs2['default'].filterListingData(data, transformation),
        tags = filteredData.resultsHeading.tags,
        sortedData = _helpersListingJs2['default'].sortDataByDate(filteredData),
        place = '';

    // Sort data by location, if that filter is present.
    if (_helpersListingJs2['default'].hasFilter(tags, 'location')) {
      place = _helpersListingJs2['default'].getFilterValues(tags, 'location')[0]; // returns array
      // If place argument was selected from the locationFilter autocomplete (initiated on the zipcode text input).
      var autocompletePlace = ma.autocomplete.getPlace();
      // Geocode the address, then sort the markers and instance of locationListing masterData.
      ma.geocoder = ma.geocoder ? ma.geocoder : new google.maps.Geocoder();
      if (typeof autocompletePlace !== "undefined" && autocompletePlace.hasOwnProperty('place_id')) {
        // This is an asynchronous function
        _helpersListingJs2['default'].geocodePlaceId(autocompletePlace.place_id, function (result) {
          transformReturn.data = sortDataAroundPlace(result, filteredData);
          transformReturn.geocode = result;
          // Return the data sorted by location and the geocoded place object
          promise.resolve(transformReturn);
        });
      }
      // If place argument was populated from locationFilter (zipcode text input) but not from Place autocomplete.
      else {
          // This is an asynchronous function
          _helpersListingJs2['default'].geocodeAddressString(place, function (result) {
            transformReturn.data = sortDataAroundPlace(result, filteredData);
            transformReturn.geocode = result;
            // Return the data sorted by location and the geocoded place object
            promise.resolve(transformReturn);
          });
        }
    } else {
      // Return the data sorted by alphabet and the empty place object
      promise.resolve({ data: sortedData, place: place });
    }

    return promise;
  }

  /**
   * Returns instance of location listing masterData, sorted proximity to place.
   *
   * @param place
   *   The geocode information by which to sort.
   * @param data
   *   The instance of location listing masterData.
   * @returns {*}
   *   Sorted instance of location listing masterData.
   */
  function sortDataAroundPlace(place, data) {
    var lat = place.geometry.location.lat(),
        lng = place.geometry.location.lng();

    // Get all existing marker distance from place, assign as marker property.
    for (var key in data.items) {
      if (data.items.hasOwnProperty(key)) {
        data.items[key].distance = _helpersListingJs2['default'].calculateDistance(data.items[key].data.position.lat, data.items[key].data.position.lng, lat, lng, "K");
      }
    }

    // Sort existing markers by closest to the place.
    data.items.sort(function (a, b) {
      return a.distance - b.distance;
    });

    // Update each location listing item's page number based on new marker sort order.
    var paginated = _helpersListingJs2['default'].paginateItems(data.items, data.maxItems);
    data.items = paginated.items;
    data.totalPages = paginated.totalPages;

    // Return the newly sorted instance of location listing masterData.
    return data;
  }
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/listing.js":6}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _helpersCssControlCodeJs = require("../helpers/cssControlCode.js");

var _helpersCssControlCodeJs2 = _interopRequireDefault(_helpersCssControlCodeJs);

exports["default"] = (function (window, document, $, undefined) {

  $('.js-footnote').each(function () {
    var $el = $(this),
        $link = $el.find(".js-footnote-link"),
        $messageLink = $link.clone(),
        $rtelink = null,
        isMobile = (0, _helpersCssControlCodeJs2["default"])($el);

    if ($link.attr('href') === "#") {
      return;
    } else {
      $rtelink = $($link.attr('href'));
    }

    $messageLink.text('');

    $el.find(".js-footnote-message p:last-child").append($messageLink);

    $(window).resize(function () {
      isMobile = (0, _helpersCssControlCodeJs2["default"])($el);
    });

    $el.on('click', '.js-footnote-link', function (e) {
      e.preventDefault();

      var target = $(this).attr('href');
      var position = getPosition($(target).parent());

      scrollTo(position.top, target);
    });

    $rtelink.click(function (e) {
      e.preventDefault();

      var target = $(this).attr('href');
      var position = getPosition($(target));

      scrollTo(position.top, target);
    });

    function getPosition($target) {
      var pos = $target.offset() || 0;

      if (isMobile) {
        var headerHeight = $('.js-sticky-header').height() || 0;
        var navHeight = $(".js-scroll-anchors").height() || 0;

        pos.top = pos.top - headerHeight - navHeight;
      }

      return pos;
    }

    function scrollTo(position, focus) {
      $("html,body").stop(true, true).animate({ scrollTop: position }, '750', function () {
        if (focus) {
          $(focus).focus();
        }
      });
    }
  });
})(window, document, jQuery);

;
module.exports = exports["default"];

},{"../helpers/cssControlCode.js":2}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $('textarea[maxlength]').each(function () {
    var $el = $(this);
    var maxlength = $el.attr('maxlength');

    var remaining = maxlength - $el.val().length;
    var message = remaining + '/' + maxlength;

    $el.wrap('<div class="ma__textarea__wrapper"></div>');

    $el.parent().attr('data-char-left', message);

    $el.on('keyup mouseup blur', function () {
      remaining = maxlength - $el.val().length;
      message = remaining + '/' + maxlength;
      $el.parent().attr('data-char-left', message);
    });
  });

  // number restricted input based on it's pattern (this must run prior to type="number")
  $('input[type="text"][pattern="[0-9]*"]').on('keydown', function (e) {
    // Allow: delte(46), backspace(8), tab(9), escape(27), enter(13) and space(32))
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 32]) !== -1 ||
    // Allow: Ctrl/cmd+A
    e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true) ||
    // Allow: Ctrl/cmd+C
    e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true) ||
    // Allow: Ctrl/cmd+X
    e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true) ||
    // Allow: home, end, left, right
    e.keyCode >= 35 && e.keyCode <= 39) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });

  // number input type
  $('input[type="number"], .js-input-number').each(function () {
    var $el = $(this);
    var $plus = $('<button type="button" aria-label="increase value" class="ma__input-number__plus"></button>');
    var $minus = $('<button type="button" aria-label="decrease value" class="ma__input-number__minus"></button>');

    var value = $el.val();

    // if the input is not an html input and key restrictions
    if ($el.attr('type') !== "number") {
      $el.on('keydown', function (e) {
        // Allow: delte(46), backspace(8), tab(9), escape(27), enter(13) and .(110 & 190))
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl/cmd+A
        e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true) ||
        // Allow: Ctrl/cmd+C
        e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true) ||
        // Allow: Ctrl/cmd+X
        e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true) ||
        // Allow: home, end, left, right
        e.keyCode >= 35 && e.keyCode <= 39) {
          // let it happen, don't do anything
          return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
        }
      });
    }

    $plus.on('click', function () {
      var value = parseInt($el.val().trim(), 10);

      if (value !== value) {
        value = 0;
      }

      $el.val(value + 1);
    });

    $minus.on('click', function () {
      var value = parseInt($el.val(), 10);

      if (value !== value) {
        value = 0;
      }

      $el.val(value - 1);
    });

    $el.wrap('<div class="ma__input-number"></div>');

    $el.parent().append($plus, $minus);
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $('form').each(function () {
    var $form = $(this),
        requiredFields = [],
        $errorList = $form.find('.js-error-list');

    // find all required fields
    $('.js-is-required').each(function () {
      var $field = $(this),
          type = $field.data('type'),
          value = $field.val(),
          valid = validate(value, type);

      requiredFields.push({ type: type, valid: valid, $el: $field });

      $(this).data('index', requiredFields.length);
    });

    // if there aren't any required fields, don't do anything
    if (requiredFields.length === 0) {
      return;
    }

    // $form.on('submit', function(e){
    //   e.preventDefault();
    // });

    $form.find('button[type="submit"], input[type="submit"]').on('click', function (e) {
      var submitForm = true;

      // validate each required field
      requiredFields.forEach(function (item) {
        var value = item.$el.val();

        item.valid = validate(value, item.type);

        if (item.valid) {
          clearError(item.$el);
        } else {
          submitForm = false;
          addError(item.$el);
        }
      });

      if (!submitForm) {
        // prevent the form from submitting
        e.preventDefault();
        // show the form error message
        $form.addClass('has-error');
        // scroll up to the error message
        var position = $form.offset();

        // scroll to the top of the form where the list of errors should be
        // using 100px offset to compenstate for possible sticky headers
        $("html,body").stop(true, true).animate({ scrollTop: position.top - 100 }, '750', function () {
          // bring focus to the item we just scrolled to
          $errorList.focus();
        });
      }
    });
  });

  // receives the jquery object of the input
  function clearError($el) {
    $el.removeClass('has-error');
    $el.prev('.ma__error-msg').removeClass('has-error');
  }

  // receives the jquery object of the input
  function addError($el) {
    $el.addClass('has-error');
    $el.prev('.ma__error-msg').addClass('has-error');
  }

  function validate(value) {
    var type = arguments.length <= 1 || arguments[1] === undefined ? 'text' : arguments[1];

    var valid = false;

    switch (type) {
      case 'email':
        valid = !!value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i);
        break;
      default:
        valid = value.length !== 0;
    }

    return valid;
  }
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersGetHandlebarTemplateJs = require("../helpers/getHandlebarTemplate.js");

var _helpersGetHandlebarTemplateJs2 = _interopRequireDefault(_helpersGetHandlebarTemplateJs);

exports['default'] = (function (window, document, $, undefined) {
  // Only run this code if there is a google map component on the page.
  if (!$('.js-google-map').length || typeof ma.googleMapData === 'undefined') {
    return;
  }

  // Initialize global (at component scope) map properties
  var max = false,
      // Maximum number of map markers per map, can be updated instance
  mapsInitialized = false; // Flag to set to trigger clearInterval(checkForGoogleMaps)

  /**
   * Test for presence of google maps default library (without geocode, places, etc.) until we find it.
   * Loaded in _meta/_01.foot.twig with static api key
   * @todo set up config to pull in dynamic api key
   */
  var checkForGoogleMaps = setInterval(function () {
    if (window.google && window.google.maps && !mapsInitialized) {
      initMaps();
    }
  }, 100);

  // Stop checking for google maps library after 2 minutes.
  var stopChecking = setTimeout(function () {
    clearInterval(checkForGoogleMaps);
  }, 2 * 60 * 1000);

  // Initialize the map
  function initMaps() {
    // Stop checking for google maps library.
    mapsInitialized = true;
    clearInterval(checkForGoogleMaps);
    clearTimeout(stopChecking);

    $(".js-google-map").each(function (i) {
      var $el = $(this);
      max = ma.googleMapData[i].maxItems ? ma.googleMapData[i].maxItems : ma.googleMapData[i].markers.length;

      // Get the maps data (this could be replaced with an api)
      var rawData = ma.googleMapData[i]; // Data object created in @molecules/google-map.twig

      // *** Create the Map *** //
      // Map default config.
      var initMapData = {
        scrollwheel: false
      };
      // Create map data by combining the rawData with the defaults.
      var mapData = Object.assign({}, rawData.map, initMapData);
      // Create google map object assigned to this component instance with map data.
      var map = new google.maps.Map(this, mapData);
      // Initialize global markers, map bounds.
      var bounds = new google.maps.LatLngBounds();
      // Initialize all markers
      var markers = initMarkers(map, rawData.markers);
      // Add up to max markers to the map, zoom map to fit all bounds
      addMarkersToMap(markers, map, bounds);

      // Trigger map initialized event, broadcast master markers.
      $el.trigger('ma:GoogleMap:MapInitialized', [markers]);

      // Add keyboard navigation only after the map is rendered (becoming idle).
      google.maps.event.addListenerOnce(map, 'idle', function () {
        var $mapItems = $(".js-google-map").find('div[title="Show street map"],' + 'div[title="Show street map with terrain"],' + 'div[title="Show satellite imagery"],' + 'div[title="Zoom in to show 45 degree view"],' + 'div[title="Show imagery with street names"],' + 'div[title="Pan up"],' + 'div[title="Pan down"],' + 'div[title="Pan left"],' + 'div[title="Pan right"],' + 'div[title="Return to the last result"],' + 'div[title="Zoom in"],' + 'div[title="Zoom out"],' + 'img[title="Rotate map 90 degrees"],' + '.gmnoprint area');
        $mapItems.each(function (i, o) {
          $(o).attr({
            role: 'button',
            tabindex: '0',
            'aria-label': o.title
          }).bind('keydown', function (ev) {
            // If enter is pressed on one of these elements, trigger a click of the element.
            if (ev.which == 13) {
              ev.preventDefault();
              $(o).trigger('click');
            }
          });
        });
      });

      // Listen for map recenter event
      $el.on("ma:GoogleMap:MapRecenter", function (event, markerIndex) {
        if (typeof markers[markerIndex] === "undefined") {
          return false;
        }
        var marker = markers[markerIndex];
        // center the map on this marker
        map.setCenter(marker.getPosition());
        // close all open infoWindows
        for (var _i in markers) {
          if (markers[_i].open) {
            markers[_i].hideInfo();
          }
        }
        // show the infoWindow for this marker
        marker.showInfo();
      });
      // Listen for map marker bounce event
      $el.on("ma:GoogleMap:MarkerBounce", function (event, markerIndex) {
        if (typeof markers[markerIndex] === "undefined") {
          return false;
        }
        var marker = markers[markerIndex];
        // center and zoom the map on this marker
        map.setCenter(marker.getPosition());
        map.setZoom(15);
        // make the marker bounce three times
        marker.bounce();
      });
      // Listen for data change event to update markers by filters.
      $el.on("ma:GoogleMap:MarkersUpdated", function (e, args) {
        // Update map based on pre-sorted markers order
        markers = updateMapByMarkers({
          dataMarkers: args.markers,
          map: map,
          markers: markers,
          place: args.place ? args.place : false
        });

        // hide all info windows
        for (var _i2 in markers) {
          if (markers[_i2].open) {
            markers[_i2].hideInfo();
          }
        }
      });
    });
  }

  /**
   * Returns the array of initialized current map markers.
   *
   * @param map
   *  The current map object.
   *
   * @param markers
   *  The markers to be initialized.
   *
   * @return {Array}
   */
  function initMarkers(map, markers) {
    var initializedMarkers = [];
    markers.forEach(function (data) {
      var markerData = {
        position: new google.maps.LatLng({
          lat: data.position.lat,
          lng: data.position.lng
        }),
        label: data.label,
        infoWindow: data.infoWindow,
        title: 'Marker: ' + data.infoWindow.name
      };
      var marker = new google.maps.Marker(markerData);
      var infoData = infoTransform(markerData.infoWindow);
      var compiledTemplate = (0, _helpersGetHandlebarTemplateJs2['default'])('googleMapInfo');
      var template = compiledTemplate(infoData);
      var infoWindow = new google.maps.InfoWindow({
        content: template
      });
      var markerBouncing = null;

      marker.addListener('click', function () {
        // hide all info windows
        for (var i in initializedMarkers) {
          if (initializedMarkers[i].open) {
            initializedMarkers[i].hideInfo();
          }
        }

        // show this info window
        marker.showInfo();
      });

      marker.showInfo = function () {
        infoWindow.open(map, marker);
        marker.open = true;
      };

      marker.hideInfo = function () {
        infoWindow.close(map, marker);
        marker.open = false;
      };

      marker.bounce = function () {
        clearTimeout(markerBouncing);
        marker.setAnimation(null);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        markerBouncing = setTimeout(function () {
          marker.setAnimation(null);
        }, 3000);
      };

      initializedMarkers.push(marker);
    });

    return initializedMarkers;
  }

  /**
   * Return formatted marker infowindow data.
   *
   * @param data
   *   Infowindow data object:
   *   "infoWindow": {
   *      "name": "Attleboro District Court",
   *      "phone": "15082225900",
   *      "fax": "15082233706",
   *      "email": "courts@state.ma.us",
   *      "address": "88 North Main Street\nAttleboro, MA 02703"
   *   }
   *
   * @returns {*}
   *   Object with passed data and new infoData property.
   */
  function infoTransform(data) {
    var infoData = {
      phoneFormatted: formatPhone(data.phone),
      faxFormatted: formatPhone(data.fax)
    };
    return Object.assign({}, data, infoData);
  }

  /**
   * Return phone number data formatted for map marker.
   *
   * @param phone
   *   "15082225900",
   * @returns {string}
   *    (508) 222-5900
   */
  function formatPhone(phone) {
    var phoneTemp = phone[0] === '1' ? phone.substring(1) : phone;
    return phoneTemp.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }

  /**
   * Location listing specific map helper functions
   */

  /**
   * Renders a new map, with markers  reference to passed marker order and length.
   *
   * @param args
   *  arguments object:
   *    {
   *      dataMarkers: args.markers, // sorted array of markers by witch to sort and filter master markers
   *      map: map, // initialized map instance
   *      markers: markers, // master list of current map markers
   *      place: args.place, // optional location filter place input
     *    }
   */
  function updateMapByMarkers(args) {
    removeMarkersFromMap(args.markers);

    // Reset bounds to remove previous search locations.
    var bounds = new google.maps.LatLngBounds();
    if (args.place && ma.autocomplete.getPlace()) {
      // Ensure the map includes the provided location based on the place value.
      bounds.extend(args.place.geometry.location);
    }

    // Add the new markers to the map and set new bounds based on filtered markers.
    addMarkersToMap(args.dataMarkers, args.map, bounds);

    // If there is only one marker, zoom out to provide some context.
    if (args.dataMarkers.length === 1) {
      args.map.setZoom(16);
    }

    return args.dataMarkers;
  }

  /**
   * Removes passed marker objects from a given map.
   *
   * @param markers
   *   Array of map marker objects.
   */
  function removeMarkersFromMap(markers) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }

  /**
   * Adds markers to a given map and sets bounds based on those markers.
   *
   * @param markers
   *   Initialized map marker objects to be added.
   * @param map
   *   Initialized map object.
   * @param bounds
   *   Initialized map bounds object.
   */
  function addMarkersToMap(markers, map, bounds) {
    // Set max number of markers to whichever is smaller: max or the number of markers sent.
    var maxItems = markers.length < max ? markers.length : max;

    markers.forEach(function (marker, index) {
      if (index < maxItems) {
        marker.setMap(map);
        // Extend the bounds to include each marker's position.
        bounds.extend(marker.position);
      }
    });

    // Google Maps default behavior with a single marker when calling
    // fitBounds() is to maximize zoom. This can be undesirable behavior.
    // If only a single marker, let mapData define center and zoom.
    if (markers.length > 1) {
      // Make the map zoom to fit the bounds, showing all locations.
      map.fitBounds(bounds);
    }
  }
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/getHandlebarTemplate.js":4}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersCookiesJs = require("../helpers/cookies.js");

var _helpersCookiesJs2 = _interopRequireDefault(_helpersCookiesJs);

exports['default'] = (function (window, document, $, undefined) {

  $('.js-header-alert').each(function () {
    var $el = $(this),
        $link = $el.find('.js-header-alert-link'),
        id = $el.data('id'),
        cookieName = "Alert" + id,
        cookieExpires = 365,
        cookieValue = _helpersCookiesJs2['default'].getCookie(cookieName);

    // show alert if cookie doesn't exist
    if (cookieValue !== "hide") {
      $el.fadeIn().fadeOut('fast').fadeIn('slow');
    }

    // hide the alert
    $link.on('click', function () {
      _helpersCookiesJs2['default'].setCookie(cookieName, "hide", cookieExpires);
      $el.stop(true, true).fadeOut();
    });
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/cookies.js":1}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $('.js-keyword-search').each(function () {
    var $el = $(this),
        $form = $el.find('form');

    $form.on('submit', function (e) {
      e.preventDefault();
      $el.addClass('is-dirty');
    });

    $form.on('reset', function () {
      $el.removeClass('is-dirty');
    });
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {
  $('.js-location-filters').each(function () {
    var $el = $(this);

    // When google map libraries are loaded, initialize places.autocomplete on the location input, if it exists.
    $(document).on('ma:LibrariesLoaded:GoogleMaps', function () {
      var $locationFilterParent = $('.js-filter-by-location', $el);
      var $locationFilter = $locationFilterParent.find('input');
      if ($locationFilter.length) {
        // Create the google places autocomplete object and associate it with the zip code text input.
        var locationInput = document.getElementById($locationFilter.attr('id'));
        var swLat = $locationFilterParent.data('maPlaceBoundsSwLat');
        var swLng = $locationFilterParent.data('maPlaceBoundsSwLng');
        var neLat = $locationFilterParent.data('maPlaceBoundsNeLat');
        var neLng = $locationFilterParent.data('maPlaceBoundsNeLng');

        var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(swLat, swLng), new google.maps.LatLng(neLat, neLng));

        // See options: https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete
        var options = {
          bounds: defaultBounds,
          strictBounds: true,
          types: ['geocode'],
          componentRestrictions: { country: 'us' },
          placeIdOnly: true
        };
        ma.autocomplete = new google.maps.places.Autocomplete(locationInput, options);
      }
    });

    // Listen for new data from another component interaction (i.e. results heading), update form.
    $el.on('ma:FormFilter:DataUpdated', function (e, data) {
      renderForm({ clearedFilter: data.clearedFilter, $form: $el });
    });

    // Handle global form submission.
    $el.submit(function (e) {
      e.preventDefault();
      // Update master data with the various filter values.
      var formData = getFormData({ $form: $(this) });

      // Trigger location listing filter event with current filter values.
      $el.trigger('ma:LocationFilter:FormSubmitted', [{ formData: formData }]);
    });
  });

  function renderForm(args) {
    var clearedFilter = args.clearedFilter;
    // The clear all button was pressed.
    if (clearedFilter === "all") {
      clearForm(args);
    }
    // Single filter button was pressed.
    else {
        clearDeactivatedFilter(args);
      }
  }

  function getFormData(args) {
    var $form = $(args.$form),
        $location = $form.find('.js-filter-by-location'),
        $tags = $form.find('.js-filter-by-tags'),
        formData = [];

    // Get location
    if ($location.find('input').length) {
      var place = $location.find('input').val();
      if (place) {
        formData.push({
          type: 'location',
          text: place,
          value: place
        });
      }
    }

    $tags.find('input:checked').each(function () {
      formData.push({ 'type': 'tag', 'value': $(this).val(), 'text': $(this).siblings("label").text() });
    });

    return formData;
  }

  function clearDeactivatedFilter(args) {
    var $form = $(args.$form),
        $place = $form.find('.js-filter-by-location'),
        $tags = $form.find('.js-filter-by-tags'),
        clearedFilter = args.clearedFilter;

    // If the cleared filter button was for a location filter.
    if (clearedFilter.type === 'location') {
      $place.find('input').val("");
      return;
    }

    // If the cleared filter button was for a tag filter.
    if (clearedFilter.type === 'tag') {
      $tags.find('input[type=checkbox][value=' + clearedFilter.value + ']').prop('checked', false);
    }
  }

  function clearForm(args) {
    var $form = $(args.$form),
        $tags = $('.js-filter-by-tags', $form),
        $place = $('.js-filter-by-location', $form).find('input');

    // Clear location text input.
    if ($place.length) {
      $place.val("");
    }
    // Uncheck all checked tags inputs.
    $tags.find('input:checked').prop('checked', false);
  }
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _helpersStickyJs = require("../helpers/sticky.js");

var _helpersStickyJs2 = _interopRequireDefault(_helpersStickyJs);

var _helpersListingJs = require("../helpers/listing.js");

var _helpersListingJs2 = _interopRequireDefault(_helpersListingJs);

exports["default"] = (function (window, document, $, undefined) {
  // Active state classes for location listing rows.
  var activeClass = 'is-active',
      markerActiveClass = 'is-marker-bounce',

  // Selectors for event listeners on dynamic content.
  row = '.js-location-listing-link',
      activeLocationListingRow = row + '.' + activeClass,
      markerActiveLocationListingRow = row + '.' + markerActiveClass,

  // Parent component selectors.
  container = '.js-location-listing-results',
      parent = '.js-image-promos',
      mapCol = '.js-location-listing-map';

  $('.js-location-listing').each(function (i) {
    var $el = $(this),
        $mapCol = $el.find('.js-location-listing-map'),
        $map = $el.find('.js-google-map'),
        $resultsHeading = $el.find('.js-results-heading'),
        $pagination = $el.find('.js-pagination'),
        $locationFilter = $el.find('.js-location-filters');

    _helpersStickyJs2["default"].init($mapCol);

    // Get the location listing component data (this could be replaced with an api)
    var rawData = ma.locationListing[i]; // Data object created in @organisms/by-author/location-listing.twig

    var masterData = []; // master data structure to preserve state
    // Listen for map initialization, populate master data structure using locationListing, map markers.
    $map.on('ma:GoogleMap:MapInitialized', function (e, markers) {
      masterData = populateMasterDataSource(rawData, markers); // to preserve state
    });

    // Listen for Google Map api library load completion, with geocode, geometry, and places libraries
    $(document).on('ma:LibrariesLoaded:GoogleMaps', function () {
      // Set up click handler for location listing rows.
      $el.on('click', row, function (e) {
        var index = $(e.currentTarget).index();
        // trigger map to recenter on this item based on it's index.
        $map.trigger('ma:GoogleMap:MapRecenter', index);
        // mark this link as active
        $el.find(activeLocationListingRow).removeClass(activeClass);
        $(e.currentTarget).addClass(activeClass); // in case the event is triggered on a child element.
        // focus on the map - mainly for mobile when it is stacked
        var position = $map.offset().top;
        $("html,body").stop(true, true).animate({ scrollTop: position }, '750');
      });

      // Set up hover / focus event for listing rows.
      $el.on('mouseenter focusin', row, function (e) {
        // remove active state from previously selected list item
        $el.find(activeLocationListingRow).removeClass(activeClass);

        // Don't bounce the marker again if focus moves within the same listing.
        if ($(e.currentTarget).hasClass(markerActiveClass)) {
          return false;
        }

        // Remove "focus" class from any "focused" location listing row.
        // ("focus" vs focus because hover doesn't bring focus to element.)
        $el.find(markerActiveLocationListingRow).removeClass(markerActiveClass);

        // Focus moved into listing for first time, so flag with class, recenter + bounce marker.
        $(e.currentTarget).addClass(markerActiveClass);
        var index = $(e.currentTarget).index();

        // Trigger map to recenter on this item and make the marker bounce
        $map.trigger('ma:GoogleMap:MarkerBounce', index);
      });

      // Remove "focus" class from any "focused" location listing row.
      $el.on('mouseleave', row, function (e) {
        $el.find(markerActiveLocationListingRow).removeClass(markerActiveClass);
      });

      // Handle location listings form interaction (triggered by locationFilters.js).
      $locationFilter.on('ma:LocationFilter:FormSubmitted', function (e, formValues) {
        // transformData() returns a jQuery deferred object which allows us to wait for any asynchronous js execution to return before executing the .done(callback).
        // @see: https://api.jquery.com/deferred.done/
        transformData(masterData, formValues).done(function (transformation) {
          masterData = transformation.data; // preserve state
          // Update the results heading based on the current items state.
          transformation.data.resultsHeading = _helpersListingJs2["default"].transformResultsHeading({ data: transformation.data });
          // Update pagination data structure, reset to first page
          transformation.data.pagination = _helpersListingJs2["default"].transformPaginationData({ data: transformation.data });
          // Render the listing page.
          _helpersListingJs2["default"].renderListingPage({ data: transformation.data });
          // Get the associated markers based on the listing items.
          transformation.markers = getActiveMarkers({ data: transformation.data });
          // Trigger child components render with updated data
          updateChildComponents(transformation);
        });
      });

      // Handle active filter/tag button interactions (triggered by resultsHeading.js).
      $resultsHeading.on('ma:ResultsHeading:ActiveTagClicked', function (e, clearedFilter) {
        // transformData() returns a jQuery deferred object which allows us to wait for any asynchronous js execution to return before executing the .done(callback).
        // @see: https://api.jquery.com/deferred.done/
        transformData(masterData, clearedFilter).done(function (transformation) {
          masterData = transformation.data; // preserve state
          transformation.clearedFilter = clearedFilter;

          masterData = transformation.data; // preserve state
          // Update the results heading based on the current items state.
          transformation.data.resultsHeading = _helpersListingJs2["default"].transformResultsHeading({ data: transformation.data });
          // Update pagination data structure, reset to first page
          transformation.data.pagination = _helpersListingJs2["default"].transformPaginationData({ data: transformation.data });
          // Render the listing page.
          _helpersListingJs2["default"].renderListingPage({ data: transformation.data });
          // Get the associated markers based on the listing items.
          transformation.markers = getActiveMarkers({ data: transformation.data });
          // Trigger child components render with updated data
          updateChildComponents(transformation);
        });
      });

      // Handle pagination event (triggered by pagination.js), render targetPage.
      $pagination.on('ma:Pagination:Pagination', function (e, target) {
        var nextPage = target;

        // Get the current page, default to first page if not in global data object.
        var currentPage = masterData.pagination.currentPage ? masterData.pagination.currentPage : 1;
        if (target === "next") {
          nextPage = currentPage + 1;
        }
        if (target === "previous") {
          nextPage = currentPage - 1;
        }

        masterData.pagination = _helpersListingJs2["default"].transformPaginationData({ data: masterData, targetPage: nextPage });
        masterData.resultsHeading = _helpersListingJs2["default"].transformResultsHeading({ data: masterData, page: nextPage });
        _helpersListingJs2["default"].renderListingPage({ data: masterData, page: nextPage });

        var markers = getActiveMarkers({ data: masterData, page: nextPage });
        // Trigger child components render with updated data
        updateChildComponents({ data: masterData, markers: markers });
      });
    });

    // Trigger events to update child components with new data.
    function updateChildComponents(args) {
      $resultsHeading.trigger('ma:ResultsHeading:DataUpdated', [args.data.resultsHeading]);
      $map.trigger('ma:GoogleMap:MarkersUpdated', [{ markers: args.markers, place: args.place }]);
      $pagination.trigger('ma:Pagination:DataUpdated', [args.data.pagination]);
      if (args.clearedFilter) {
        $locationFilter.trigger('ma:FormFilter:DataUpdated', [args.clearedFilter]);
      }
    }
  });

  /**
   * Data initialization.
   */

  /**
   * Returns a master data structure with page level / listing item level data and markup, to reflect component state.
   *
   * @param listing
   *   The locationListing data structure to use as a source
   * @param markers
   *   The array of map markers created by component google map (googleMaps.js module)
   * @returns {Array}
   *   An array with the following structure:
   *    [
   *      maxItems: the max number of items to show per listing "page" if provided, defaults to all
   *      totalPages: the number of pages of items that should render, given the current filters
   *      resultsHeading: the data structure necessary to render a resultsHeading component
   *      items: an array of listing items [
   *        isActive: whether or not the listing should be shown, given current filters state
   *        page: the page that the listing, if active, will appear on, given the current sort order
   *        promo: the data structure for the imagePromo component
   *        markup: the compiled imagePromo markup
   *        marker: the related map marker data structure for the listing item
   *      ]
   *      pagination: the data structure necessary to render a pagination component
   *      selectors: the selectors for the listing, listing items, listing row, and map
   *    ]
   */
  function populateMasterDataSource(listing, markers) {
    // Populate master data structure
    var masterData = [];

    // Ensure locationListing.imagePromos.items is an array (the twig template json_encode()'s a php array)
    var promosArray = [];
    $.map(listing.imagePromos.items, function (val, index) {
      promosArray[index] = val;
    });
    listing.imagePromos.items = promosArray;

    // Ensure locationListing.pagination.pages is an array (the twig template json_encode()'s a php array)
    var pages = [];
    $.map(listing.pagination.pages, function (val, index) {
      pages[index] = val;
    });
    listing.pagination.pages = pages;

    // Get the current page from the initial data structure, default to 1 if none passed.
    var currentPage = 1;
    pages.forEach(function (page) {
      if (page.active) {
        currentPage = Number(page.text);
      }
    });

    // Get the listing imagePromos, generate markup for each
    var masterListing = listing.imagePromos.items,
        masterListingMarkup = _helpersListingJs2["default"].transformListing(masterListing, 'locationListingRow');

    // The max number of items per page, if designated in locationListing data structure, else all
    masterData.maxItems = listing.maxItems ? listing.maxItems : listing.imagePromos.items.length;
    // The initial results heading data structure
    masterData.resultsHeading = listing.resultsHeading;
    // The array of items and their respective page, in/active status, marker data, imagePromo data, and markup
    masterData.items = getMasterListingWithMarkupAndMarkers(masterListing, masterListingMarkup, markers, masterData.maxItems);
    // The initial pagination data structure + currentPage;
    masterData.pagination = listing.pagination;
    masterData.pagination.currentPage = currentPage;
    // The total number of pages, given the number of items and the maxItems variable
    masterData.totalPages = Math.ceil(masterData.items.length / masterData.maxItems);
    // Set the selector properties necessary to render
    masterData.selectors = {};
    masterData.selectors.container = container;
    masterData.selectors.parent = parent;
    masterData.selectors.row = row;
    masterData.selectors.map = mapCol;

    return masterData;
  }

  /**
   * Creates the master data structure items array
   *
   * @param listing
   *   The locationListing data structure
   * @param markup
   *   The generated array of item markup
   * @param markers
   *   The associated map markers for each item
   * @param max
   *   The maximum number of items per page
   * @returns {Array}
   *  An array of listing items with the following structure:
   *  [
   *      isActive: whether or not the listing should be shown, given current filters state
   *      page: the page that the listing, if active, will appear on, given the current sort order
   *      promo: the data structure for the imagePromo component
   *      markup: the compiled imagePromo markup
   *      marker: the related map marker data structure for the listing item
   *   ]
   */
  function getMasterListingWithMarkupAndMarkers(listing, markup, markers, max) {
    var items = [];
    markers.forEach(function (item, index) {
      items[index] = {
        isActive: true, // @todo consider checking for this in case of server side preprocessing of state
        page: Math.ceil((index + 1) / max),
        marker: item,
        markup: markup[index],
        data: listing[index]
      };
    });
    return items;
  }

  /**
   * Data transformation.
   */

  /**
   * The main data transformation wrapper, returns an instance of masterData which reflects the component state.
   *
   * @param data
   *  An instance of masterData to start from.
   * @param transformation
   *  An object representing the change in state (locationFilter form data, resultsHeading tag interaction, etc.)
   *
   * @returns {{data: *, markers: *}}
   *  An object with the current state masterData instance and an array of their related sorted markers to send to map.
   */
  function transformData(data, transformation) {
    // This data transformation potentially involves asynchronous google geocoding.
    // This jQuery deferered object allows us to wait for a return before moving on inside of the parent function (which invokes this function).
    // @see https://api.jquery.com/jquery.deferred/
    var promise = $.Deferred();
    var transformReturn = {};

    // First filter the data based on component state, then sort alphabetically by default.
    var filteredData = _helpersListingJs2["default"].filterListingData(data, transformation),
        sortedData = _helpersListingJs2["default"].sortDataAlphabetically(filteredData),
        place = '';

    // Sort data by location, if that filter is present.
    if (_helpersListingJs2["default"].hasFilter(filteredData.resultsHeading.tags, 'location')) {
      place = _helpersListingJs2["default"].getFilterValues(filteredData.resultsHeading.tags, 'location')[0]; // returns array
      // If place argument was selected from the locationFilter autocomplete (initiated on the zipcode text input).
      var autocompletePlace = ma.autocomplete.getPlace();
      // Geocode the address, then sort the markers and instance of locationListing masterData.
      ma.geocoder = ma.geocoder ? ma.geocoder : new google.maps.Geocoder();
      if (typeof autocompletePlace !== "undefined" && autocompletePlace.hasOwnProperty('place_id')) {
        // This is an asynchronous function
        _helpersListingJs2["default"].geocodePlaceId(autocompletePlace.place_id, function (result) {
          transformReturn.data = sortDataAroundPlace(result, filteredData);
          transformReturn.geocode = result;
          // Return the data sorted by location and the geocoded place object
          promise.resolve(transformReturn);
        });
      }
      // If place argument was populated from locationFilter (zipcode text input) but not from Place autocomplete.
      else {
          // This is an asynchronous function
          _helpersListingJs2["default"].geocodeAddressString(place, function (result) {
            transformReturn.data = sortDataAroundPlace(result, filteredData);
            transformReturn.geocode = result;
            // Return the data sorted by location and the geocoded place object
            promise.resolve(transformReturn);
          });
        }
    } else {
      // Return the data sorted by alphabet and the empty place object
      promise.resolve({ data: sortedData, place: place });
    }

    return promise;
  }

  /**
   * Returns the markers which correspond to a given "page" of location listing data.
   *
   * @param args
   *  An object with the following structure:
   *    {
   *      data: instance of filtered, sorted masterData off of which to base markers
   *      page: the target page of items/markers to render
   *    }
   *
   * @returns
   *   An array of corresponding map marker objects which should be rendered
   */
  function getActiveMarkers(args) {
    var data = args.data,
        page = args.page ? args.page : 1; // default to first page if non provided

    // Get just the markers from our active sorted/filtered data listing.
    return data.items.filter(function (item) {
      return item.isActive && item.page === page;
    }).map(function (item) {
      return item.marker;
    });
  }

  /**
   * Returns instance of location listing masterData, sorted proximity to place.
   *
   * @param geocode
   *   The geocode information by which to sort.
   * @param data
   *   The instance of location listing masterData.
   * @returns {*}
   *   Sorted instance of location listing masterData.
   */
  function sortDataAroundPlace(geocode, data) {
    // Get all existing marker distance from place, assign as marker property.
    for (var key in data.items) {
      if (data.items.hasOwnProperty(key)) {
        data.items[key].marker.distance = google.maps.geometry.spherical.computeDistanceBetween(geocode.geometry.location, data.items[key].marker.getPosition());
      }
    }

    // Sort existing markers by closest to the place.
    data.items.sort(function (a, b) {
      return a.marker.distance - b.marker.distance;
    });

    // Update each location listing item's page number based on new marker sort order.
    var paginated = _helpersListingJs2["default"].paginateItems(data.items, data.maxItems);
    data.items = paginated.items;
    data.totalPages = paginated.totalPages;
    data.place = geocode;

    // Return the newly sorted instance of location listing masterData.
    return data;
  }
})(window, document, jQuery);

;
module.exports = exports["default"];

},{"../helpers/listing.js":6,"../helpers/sticky.js":7}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = (function (window, document, $, undefined) {

  var windowWidth = window.innerWidth;

  $(window).resize(function () {
    windowWidth = window.innerWidth;
  });

  $('.js-main-nav').each(function () {
    var openClass = "is-open",
        closeClass = "is-closed",
        submenuClass = "show-submenu",
        $parent = $(this),
        $mainNavToggle = $parent.find('.js-main-nav-toggle'),
        $mainNavItems = $parent.find('.js-main-nav-toggle, .js-main-nav-top-link'),
        breakpoint = 840; // matches CSS breakpoint for Main Nav

    $mainNavItems.on('keydown', function (e) {
      // Grab all the DOM info we need...
      var $link = $(this),
          $topLevelLinks = $parent.find('.ma__main-nav__top-link'),
          open = $link.hasClass(openClass),
          $openContent = $parent.find('.js-main-nav-content.' + openClass),
          $focusedElement = $(document.activeElement),
          menuFlipped = windowWidth < breakpoint,

      // relevant if open..
      $topLevelItem = $focusedElement.parents('.ma__main-nav__item'),
          $topLevelLink = $topLevelItem.find('.ma__main-nav__top-link'),
          $dropdownLinks = $link.find('.ma__main-nav__subitem .ma__main-nav__link'),
          dropdownLinksLength = $dropdownLinks.length,
          focusIndexInDropdown = $dropdownLinks.index($focusedElement),

      // Easy access to the key that was pressed.
      keycode = e.keyCode,
          action = {
        'skip': keycode === 9,
        'close': keycode === 27,
        'left': keycode === 37,
        'right': keycode === 39,
        'up': keycode === 38,
        'down': keycode === 40
      };

      // Default behavior is prevented for all actions except 'skip'.
      if (action.close || action.left || action.right || action.up || action.down) {
        e.preventDefault();
      }

      // Skip out of the menu and close any currently-open submenus.
      if (action.skip) {
        hide($openContent);
        $link.removeClass(openClass);
        $topLevelLink.attr('aria-expanded', 'false');
        return;
      }

      // Navigate into or within a submenu. This is needed on up/down actions
      // (unless the menu is flipped and closed) and when using the right arrow
      // while the menu is flipped and submenu is closed.
      if ((action.up || action.down) && !(menuFlipped && !open) || action.right && menuFlipped && !open) {
        // Open pull down menu if necessary.
        if (!open) {
          show($topLevelItem.find('.js-main-nav-content'));
          $topLevelLink.attr('aria-expanded', 'true');
          $link.addClass(openClass);
        }

        // Adjust index of active menu item based on performed action.
        focusIndexInDropdown += action.up ? -1 : 1;
        // If the menu is flipped, skip the last item in each submenu. Otherwise,
        // skip the first item. This is done by repeating the index adjustment.
        if (menuFlipped) {
          if (focusIndexInDropdown === dropdownLinksLength - 1) {
            focusIndexInDropdown += action.up ? -1 : 1;
          }
        } else {
          if (focusIndexInDropdown === 0 || focusIndexInDropdown >= dropdownLinksLength) {
            focusIndexInDropdown += action.up ? -1 : 1;
          }
        }
        // Wrap around if at the end of the submenu.
        focusIndexInDropdown = (focusIndexInDropdown % dropdownLinksLength + dropdownLinksLength) % dropdownLinksLength;
        $dropdownLinks[focusIndexInDropdown].focus();
        return;
      }

      // Close menu and return focus to menubar
      if (action.close || menuFlipped && action.left) {
        hide($openContent);
        $link.removeClass(openClass);
        $topLevelLink.focus().attr('aria-expanded', 'false');
        return;
      }

      // Navigate between submenus. This is needed for left/right actions in
      // normal layout, or up/down actions in flipped layout (when nav is closed).
      if ((action.left || action.right) && !menuFlipped || (action.up || action.down) && menuFlipped && !open) {
        var index = $topLevelLinks.index($topLevelLink),
            prev = action.left || action.up,
            linkCount = $topLevelLinks.length;

        // hide content
        // If menubar focus
        //  - Change menubar item
        //
        // If dropdown focus
        //  - Open previous pull down menu and select first item
        hide($openContent);
        $topLevelLink.attr('aria-expanded', 'false');
        // Get previous item if left arrow, next item if right arrow.
        index += prev ? -1 : 1;
        // Wrap around if at the end of the set of menus.
        index = (index % linkCount + linkCount) % linkCount;
        $topLevelLinks[index].focus();
        return;
      }
    });
    $mainNavItems.on('mouseenter', function (e) {
      $(this).children('button').attr("aria-expanded", "true");

      if (windowWidth > breakpoint) {
        var $openContent = $(this).find('.js-main-nav-content');
        show($openContent);
      }
    });
    $mainNavItems.on('mouseleave', function (e) {
      $(this).children('button').attr("aria-expanded", "false");

      if (windowWidth > breakpoint) {
        var $openContent = $(this).find('.js-main-nav-content');
        hide($openContent);
      }
    });
    $mainNavToggle.children('button, a').on('click', function (e) {
      var $el = $(this),
          $elParent = $el.parent(),
          $content = $elParent.find('.js-main-nav-content'),
          $openContent = $parent.find('.js-main-nav-content.' + openClass),
          isOpen = $content.hasClass(openClass);

      // mobile
      if (windowWidth <= breakpoint) {
        e.preventDefault();
        // add open class to this item
        $elParent.addClass(openClass);
        show($content);
        $el.attr('aria-expanded', 'true');
      } else {
        hide($openContent);
        $el.attr('aria-expanded', 'false');

        if (!isOpen) {
          show($content);
          $el.attr('aria-expanded', 'true');
        }
      }
    });

    $('.js-close-sub-nav').on('click', function () {
      var $openContent = $parent.find('.js-main-nav-content.' + openClass);
      hide($openContent);
    });

    // Hide any open submenu content when the sidebar menu is closed
    $('.js-header-menu-button').click(function () {
      var $openContent = $parent.find('.js-main-nav-content.' + openClass);
      hide($openContent);
    });

    function hide($content) {
      $('body').removeClass(submenuClass);
      $parent.find("." + openClass).removeClass(openClass);

      if (windowWidth <= breakpoint) {
        $content.addClass(closeClass);
      } else {
        $content.stop(true, true).slideUp('fast', function () {
          $content.addClass(closeClass).slideDown(0);
        });
      }
    }

    function show($content) {
      $('body').addClass(submenuClass);
      if (windowWidth <= breakpoint) {
        $content.addClass(openClass).removeClass(closeClass);
      } else {
        $content.stop(true, true).delay(200).slideUp(0, function () {
          $content.addClass(openClass).removeClass(closeClass).slideDown('fast');
        });
      }
    }
  });
})(window, document, jQuery);

;
module.exports = exports["default"];

},{}],25:[function(require,module,exports){
// ****** Menu button ******
"use strict";

var menuButton = document.querySelector(".js-header-menu-button");

if (null !== menuButton) {
  menuButton.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("body").classList.toggle("show-menu");
  });
}

// ****** Main Header Search button on mobile should open the mobile menu  ******
var searchForm = document.querySelector(".js-header-search-menu .js-header-search-form");

if (null !== searchForm) {
  searchForm.addEventListener("submit", function (event) {
    if (window.innerWidth > 620) {
      return;
    }
    event.preventDefault();
    document.querySelector("body").classList.toggle("show-menu");
  });
}

},{}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersGetHandlebarTemplateJs = require("../helpers/getHandlebarTemplate.js");

var _helpersGetHandlebarTemplateJs2 = _interopRequireDefault(_helpersGetHandlebarTemplateJs);

exports['default'] = (function (window, document, $, undefined) {

  $('.js-org-selector').each(function (i) {
    var $el = $(this);
    var data = orgSelector[i];
    var compiledTemplate = (0, _helpersGetHandlebarTemplateJs2['default'])('orgInfo');
    var $select = $el.find('select').first();
    var $placeholder = $el.find('.js-org-info');

    //render the template based on the current value
    renderTemplate($select.val());

    // When the select changes
    $select.change(function () {
      //render the template based on the new value
      renderTemplate($select.val());
    });

    // Render the template based on value
    function renderTemplate(value) {
      if (typeof data.organizations[value] === "undefined") {
        $placeholder.html("");
        return false;
      }

      $placeholder.html(compiledTemplate(data.organizations[value]));

      return true;
    }
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/getHandlebarTemplate.js":4}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersGetHandlebarTemplateJs = require("../helpers/getHandlebarTemplate.js");

var _helpersGetHandlebarTemplateJs2 = _interopRequireDefault(_helpersGetHandlebarTemplateJs);

exports['default'] = (function (window, document, $, undefined) {

  if ($('.js-pagination').length === 0) {
    return;
  }

  // {{compare unicorns ponies operator="<"}}
  // 	I knew it, unicorns are just low-quality ponies!
  // {{/compare}}
  //
  // (defaults to == if operator omitted)
  //
  // {{equal unicorns ponies }}
  // 	That's amazing, unicorns are actually undercover ponies
  // {{/equal}}
  // (from http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/)
  Handlebars.registerHelper('compare', function (lvalue, rvalue, options) {

    if (arguments.length < 3) throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

    var operator = options.hash.operator || "==";

    var operators = {
      '==': function _(l, r) {
        return l == r;
      },
      '===': function _(l, r) {
        return l === r;
      },
      '!=': function _(l, r) {
        return l != r;
      },
      '<': function _(l, r) {
        return l < r;
      },
      '>': function _(l, r) {
        return l > r;
      },
      '<=': function _(l, r) {
        return l <= r;
      },
      '>=': function _(l, r) {
        return l >= r;
      },
      'typeof': function _typeof(l, r) {
        return typeof l == r;
      }
    };

    if (!operators[operator]) throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);

    var result = operators[operator](lvalue, rvalue);

    if (result) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  // Set up global component config
  var compiledTemplate = (0, _helpersGetHandlebarTemplateJs2['default'])('pagination'),
      prevButton = '.js-pagination-prev',
      nextButton = '.js-pagination-next',
      pageButton = '.js-pagination-page';

  $('.js-pagination').each(function () {
    var $el = $(this);

    // Listen for previous page button click and trigger pagination event.
    $el.on('click', prevButton, function () {
      $el.trigger('ma:Pagination:Pagination', ['previous']);
    });
    // Listen for next button click and trigger pagination event.
    $el.on('click', nextButton, function () {
      $el.trigger('ma:Pagination:Pagination', ['next']);
    });
    // Listen for page number button click and trigger pagination event;
    $el.on('click', pageButton, function (e) {
      var targetPageNumber = $(e.target).data('page');
      $el.trigger('ma:Pagination:Pagination', [targetPageNumber]);
    });

    // Listen for new data, render new pagination.
    $el.on('ma:Pagination:DataUpdated', function (e, data) {
      renderPagination({ data: data, $el: $el });
    });
  });

  /**
   * Renders the contents of a specific results pagination component.
   *
   * @param args
   *   The arguments object, can contain the following properties:
   *      data: data object from which to populate handlebars template variables (required),
   *      context: the parent component selector
   */
  function renderPagination(args) {
    // Don't attempt to render anything if we don't have new data.
    if (!args.data) {
      return;
    }

    // Create new markup using handlebars template, helper.
    var markup = compiledTemplate(args.data);
    args.$el.html(markup);
  }
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/getHandlebarTemplate.js":4}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $('.js-input-date').each(function () {
    var $el = $(this);
    var restrict = $el.data('restrict');
    var picker = new Pikaday({
      field: this,
      format: 'MM/DD/YYYY'
    });

    switch (restrict) {
      case 'max':
        picker.setMaxDate(new Date());
        break;
      case 'min':
        picker.setMinDate(new Date());
        break;
    }

    $el.attr('type', 'text');
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $('.js-ma-responsive-video').fitVids();
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersGetHandlebarTemplateJs = require("../helpers/getHandlebarTemplate.js");

var _helpersGetHandlebarTemplateJs2 = _interopRequireDefault(_helpersGetHandlebarTemplateJs);

exports['default'] = (function (window, document, $, undefined) {
  // Set up global component config
  var compiledTemplate = (0, _helpersGetHandlebarTemplateJs2['default'])('resultsHeading'),
      clearAllButton = '.js-results-heading-clear',
      // events triggered on parent
  filterButton = '.js-results-heading-tag'; // events triggered on parent

  $(".js-results-heading").each(function () {
    var $el = $(this);

    // Listen for clear all button click + trigger interaction event on parent.
    $el.on('click', clearAllButton, function () {
      $el.trigger('ma:ResultsHeading:ActiveTagClicked', [{ clearedFilter: 'all' }]);
    });

    // Listen for single filter button click and trigger interaction event on parent.
    $el.on('click', filterButton, function (e) {
      var clearedFilter = {
        'type': $(e.target).data('ma-filter-type'),
        'value': $(e.target).data('ma-filter-value'),
        'text': $(e.target).text()
      };

      $el.trigger('ma:ResultsHeading:ActiveTagClicked', [{ clearedFilter: clearedFilter }]);
    });

    // Listen for new results heading data, render new results heading.
    $el.on('ma:ResultsHeading:DataUpdated', function (e, data) {
      renderResultsHeading({ data: data, $el: $el });
    });
  });

  /**
   * Renders the contents of a specific results heading component.
   *
   * @param args
   *   The arguments object, can contain the following properties:
   *      data: data object from which to populate handlebars template variables (required),
   *      context: the parent component selector
   */
  function renderResultsHeading(args) {
    // Don't attempt to render anything if we don't have new data.
    if (!args.data) {
      return;
    }
    // Create new markup using handlebars template, helper.
    var markup = compiledTemplate(args.data);
    args.$el.html(markup);
  }
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/getHandlebarTemplate.js":4}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $('.js-ma-rich-text').each(function () {
    var $el = $(this);

    $el.find('table').wrap("<div class='ma__rich-text__table-wrapper'></div>");
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _helpersCssControlCodeJs = require("../helpers/cssControlCode.js");

var _helpersCssControlCodeJs2 = _interopRequireDefault(_helpersCssControlCodeJs);

exports["default"] = (function (window, document, $, undefined) {

  $(".js-scroll-anchors").each(function () {
    var $el = $(this),
        $elParent = $el.parent().css('position') === 'relative' ? $el.parent() : $el.parent().offsetParent(),
        $links = $el.find('.js-scroll-anchors-link'),
        elHeight = undefined,
        headerBuffer = 0,
        lowerLimit = undefined,
        upperLimit = undefined,
        debounceTimer = undefined,
        activeClass = "is-active",
        activeAnchorIndex = 0,
        anchors = [],
        numAnchors = 0,
        isMobile = false,
        linkScrolling = false;

    setVariables();

    // default assumption as to where the screen will load
    $el.attr('data-sticky', 'top');

    // update variables one more time to catch any post page load changes
    window.setTimeout(function () {
      setVariables();
    }, 1000);

    $links.on('click', function (e) {
      e.preventDefault();

      var $link = $(this);

      // is the menu closed on mobile
      if (!$el.hasClass('is-open') && isMobile) {
        // just show the menu
        $el.addClass('is-open');
        return;
      }

      activeAnchorIndex = $(this).data('index');
      // find the location of the desired link and scroll the page
      var position = anchors[activeAnchorIndex].position;
      // close the menu
      $el.removeClass('is-open');
      // prevent the scroll event from updating active links
      linkScrolling = true;

      $("html,body").stop(true, true).animate({ scrollTop: position }, '750', function () {
        linkScrolling = false;
        // Get the link hash target so we can bring focus to it
        var hash = anchors[activeAnchorIndex].hash;
        // bring focus to the item we just scrolled to
        $(hash).focus();
        // timing issue with window.scroll event firing.
        setTimeout(function () {
          // set this link as active.
          $el.find('.' + activeClass).removeClass(activeClass);
          $link.addClass(activeClass);
        }, 30);
      });
    });

    // if the content contains accordions,
    // readjust settings when there state changes.
    $('.js-accordion-link').on('click', function () {
      if (typeof debounceTimer === "number") {
        window.clearTimeout(debounceTimer);
      }
      debounceTimer = window.setTimeout(function () {
        setVariables();
        setPosition();
        activateLink();
      }, 400);
    });

    $el.find(".js-scroll-anchors-toggle").on('click', function () {
      $el.toggleClass('is-open');
    });

    // make the links sticky
    $(window).resize(function () {
      if (typeof debounceTimer === "number") {
        window.clearTimeout(debounceTimer);
      }
      debounceTimer = window.setTimeout(function () {
        setVariables();
        setPosition();
        activateLink();
      }, 300);
    });

    $(window).scroll(function () {
      setPosition();

      if (!linkScrolling) {
        activateLink();
      }
    });

    function setVariables() {
      var topOffset = 0;

      headerBuffer = 0;
      elHeight = $el.outerHeight(true);
      upperLimit = $elParent.offset().top;
      isMobile = (0, _helpersCssControlCodeJs2["default"])($el);

      if ($elParent[0].hasAttribute("style") && !isMobile) {
        $elParent.removeAttr('style');
      }

      if (isMobile) {
        headerBuffer = $('.js-sticky-header').height() || 0;
        upperLimit -= headerBuffer;
        topOffset = elHeight;
      }

      lowerLimit = upperLimit + $elParent.outerHeight(true) - $el.height();

      // locate the position of all of the anchor targets
      anchors = new Array();
      $links.each(function (i, e) {
        var $el = $(this),
            $link = $el.is('a') ? $el : $el.find('a'),
            hash = $link[0].hash,
            position = $(hash).offset() ? $(hash).offset().top - headerBuffer - topOffset : upperLimit;

        anchors[i] = { hash: hash, position: position };

        $el.data('index', i);
      });

      // record the number of anchors for performance
      numAnchors = anchors.length;
    }

    function setPosition() {
      var windowTop = $(window).scrollTop(),
          attr = $el.attr('data-sticky'),
          top = attr !== 'top' && windowTop <= upperLimit,
          middle = attr !== 'middle' && windowTop < lowerLimit && windowTop > upperLimit,
          bottom = attr !== 'bottom' && windowTop >= lowerLimit;

      if ($elParent[0].hasAttribute("style") && !isMobile) {
        $elParent.removeAttr('style');
      }

      if (!$elParent[0].hasAttribute("style") && isMobile && attr === 'middle') {
        $elParent.css({ 'paddingTop': elHeight });
      }

      if (top) {
        $el.attr('data-sticky', 'top');

        if (isMobile) {
          $elParent.removeAttr('style');
        }
      } else if (middle) {
        $el.attr('data-sticky', 'middle');

        if (isMobile) {
          $elParent.css({ 'paddingTop': elHeight });
        }
      } else if (bottom) {
        $el.attr('data-sticky', 'bottom');

        if (isMobile) {
          $elParent.removeAttr('style');
        }
      }
    }

    function activateLink() {
      // do we have more than one anchor
      if (numAnchors < 2 || linkScrolling) {
        return;
      }

      // get the current scroll position and offset by half the view port
      var windowTop = $(window).scrollTop() + window.innerHeight / 2,
          currentAnchor = activeAnchorIndex;

      // is there a prev target
      // and
      // is the current scroll position above the current target
      if (currentAnchor > 0 && windowTop < anchors[activeAnchorIndex].position) {
        // make the prev link active
        --activeAnchorIndex;
      }

      // is there a next target
      // and
      // is the current scroll position below the next target
      else if (currentAnchor < numAnchors - 1 && windowTop > anchors[activeAnchorIndex + 1].position) {
          // make the next link active
          ++activeAnchorIndex;
        }

      if (currentAnchor !== activeAnchorIndex) {
        // move the active flag
        $el.find('.' + activeClass).removeClass(activeClass);
        $links.eq(activeAnchorIndex).addClass(activeClass);
      }
    }
  });
})(window, document, jQuery);

;
module.exports = exports["default"];

},{"../helpers/cssControlCode.js":2}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = (function (window, document, $, undefined) {

  $('.js-util-nav').each(function () {
    var openClass = "is-open",
        closeClass = "is-closed",
        submenuClass = "show-utilmenu",
        $parent = $(this),
        waitForIt = null;

    $('.js-close-sub-nav').on('click', function () {
      var $openContent = $parent.find('.js-util-nav-content.' + openClass);
      hide($openContent);
    });

    $parent.find('.js-util-nav-toggle > a').on('click', function (e) {
      e.preventdefault;

      var open = $(this).hasClass(openClass),
          $content = $(this).next('.js-util-nav-content'),
          $openContent = $parent.find('.js-util-nav-content.' + openClass);

      // hide other content
      hide($openContent);

      if (open) {
        return;
      }
      // add open class to this item
      $(this).addClass(openClass);
      // add open class to the correct content based on index
      $content.attr("aria-hidden", "false");

      setTimeout(function () {
        $content.removeClass(closeClass).addClass(openClass);
        $('body').addClass(submenuClass);
      }, .1);
    });

    $parent.find('.js-close-util-nav').on('click', function (e) {
      e.preventDefault;

      hide($(this).closest('.js-util-nav-content'));
    });

    $('.js-close-sub-nav').on('click', function () {
      var $openContent = $parent.find('.js-util-nav-content.' + openClass);
      hide($openContent);
    });

    function hide($content) {
      $('body').removeClass(submenuClass);
      $parent.find("." + openClass).removeClass(openClass);
      $content.removeClass(openClass).addClass(closeClass);

      if (waitForIt) {
        clearTimeout(waitForIt);
      }
      waitForIt = setTimeout(function () {
        $content.attr("aria-hidden", "true");
      }, 1000);
    }
  });
})(window, document, jQuery);

;
module.exports = exports["default"];

},{}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = checkOverflow;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _unitsMonth = require('../units/month');

var _unitsConstants = require('../units/constants');

var _createParsingFlags = require('../create/parsing-flags');

var _createParsingFlags2 = _interopRequireDefault(_createParsingFlags);

function checkOverflow(m) {
    var overflow;
    var a = m._a;

    if (a && (0, _createParsingFlags2['default'])(m).overflow === -2) {
        overflow = a[_unitsConstants.MONTH] < 0 || a[_unitsConstants.MONTH] > 11 ? _unitsConstants.MONTH : a[_unitsConstants.DATE] < 1 || a[_unitsConstants.DATE] > (0, _unitsMonth.daysInMonth)(a[_unitsConstants.YEAR], a[_unitsConstants.MONTH]) ? _unitsConstants.DATE : a[_unitsConstants.HOUR] < 0 || a[_unitsConstants.HOUR] > 24 || a[_unitsConstants.HOUR] === 24 && (a[_unitsConstants.MINUTE] !== 0 || a[_unitsConstants.SECOND] !== 0 || a[_unitsConstants.MILLISECOND] !== 0) ? _unitsConstants.HOUR : a[_unitsConstants.MINUTE] < 0 || a[_unitsConstants.MINUTE] > 59 ? _unitsConstants.MINUTE : a[_unitsConstants.SECOND] < 0 || a[_unitsConstants.SECOND] > 59 ? _unitsConstants.SECOND : a[_unitsConstants.MILLISECOND] < 0 || a[_unitsConstants.MILLISECOND] > 999 ? _unitsConstants.MILLISECOND : -1;

        if ((0, _createParsingFlags2['default'])(m)._overflowDayOfYear && (overflow < _unitsConstants.YEAR || overflow > _unitsConstants.DATE)) {
            overflow = _unitsConstants.DATE;
        }
        if ((0, _createParsingFlags2['default'])(m)._overflowWeeks && overflow === -1) {
            overflow = _unitsConstants.WEEK;
        }
        if ((0, _createParsingFlags2['default'])(m)._overflowWeekday && overflow === -1) {
            overflow = _unitsConstants.WEEKDAY;
        }

        (0, _createParsingFlags2['default'])(m).overflow = overflow;
    }

    return m;
}

module.exports = exports['default'];

},{"../create/parsing-flags":43,"../units/constants":95,"../units/month":102}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createDate = createDate;
exports.createUTCDate = createUTCDate;

function createDate(y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date = new Date(y, m, d, h, M, s, ms);

    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}

function createUTCDate(y) {
    var date = new Date(Date.UTC.apply(null, arguments));

    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}

},{}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.prepareConfig = prepareConfig;
exports.createLocalOrUTC = createLocalOrUTC;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsIsArray = require('../utils/is-array');

var _utilsIsArray2 = _interopRequireDefault(_utilsIsArray);

var _utilsIsObject = require('../utils/is-object');

var _utilsIsObject2 = _interopRequireDefault(_utilsIsObject);

var _utilsIsObjectEmpty = require('../utils/is-object-empty');

var _utilsIsObjectEmpty2 = _interopRequireDefault(_utilsIsObjectEmpty);

var _utilsIsUndefined = require('../utils/is-undefined');

var _utilsIsUndefined2 = _interopRequireDefault(_utilsIsUndefined);

var _utilsIsNumber = require('../utils/is-number');

var _utilsIsNumber2 = _interopRequireDefault(_utilsIsNumber);

var _utilsIsDate = require('../utils/is-date');

var _utilsIsDate2 = _interopRequireDefault(_utilsIsDate);

var _utilsMap = require('../utils/map');

var _utilsMap2 = _interopRequireDefault(_utilsMap);

var _valid = require('./valid');

var _momentConstructor = require('../moment/constructor');

var _localeLocales = require('../locale/locales');

var _utilsHooks = require('../utils/hooks');

var _checkOverflow = require('./check-overflow');

var _checkOverflow2 = _interopRequireDefault(_checkOverflow);

var _fromStringAndArray = require('./from-string-and-array');

var _fromStringAndFormat = require('./from-string-and-format');

var _fromString = require('./from-string');

var _fromArray = require('./from-array');

var _fromObject = require('./from-object');

function createFromConfig(config) {
    var res = new _momentConstructor.Moment((0, _checkOverflow2['default'])(prepareConfig(config)));
    if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, 'd');
        res._nextDay = undefined;
    }

    return res;
}

function prepareConfig(config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || (0, _localeLocales.getLocale)(config._l);

    if (input === null || format === undefined && input === '') {
        return (0, _valid.createInvalid)({ nullInput: true });
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if ((0, _momentConstructor.isMoment)(input)) {
        return new _momentConstructor.Moment((0, _checkOverflow2['default'])(input));
    } else if ((0, _utilsIsDate2['default'])(input)) {
        config._d = input;
    } else if ((0, _utilsIsArray2['default'])(format)) {
        (0, _fromStringAndArray.configFromStringAndArray)(config);
    } else if (format) {
        (0, _fromStringAndFormat.configFromStringAndFormat)(config);
    } else {
        configFromInput(config);
    }

    if (!(0, _valid.isValid)(config)) {
        config._d = null;
    }

    return config;
}

function configFromInput(config) {
    var input = config._i;
    if ((0, _utilsIsUndefined2['default'])(input)) {
        config._d = new Date(_utilsHooks.hooks.now());
    } else if ((0, _utilsIsDate2['default'])(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        (0, _fromString.configFromString)(config);
    } else if ((0, _utilsIsArray2['default'])(input)) {
        config._a = (0, _utilsMap2['default'])(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        (0, _fromArray.configFromArray)(config);
    } else if ((0, _utilsIsObject2['default'])(input)) {
        (0, _fromObject.configFromObject)(config);
    } else if ((0, _utilsIsNumber2['default'])(input)) {
        // from milliseconds
        config._d = new Date(input);
    } else {
        _utilsHooks.hooks.createFromInputFallback(config);
    }
}

function createLocalOrUTC(input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
    }

    if ((0, _utilsIsObject2['default'])(input) && (0, _utilsIsObjectEmpty2['default'])(input) || (0, _utilsIsArray2['default'])(input) && input.length === 0) {
        input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;

    return createFromConfig(c);
}

},{"../locale/locales":67,"../moment/constructor":77,"../utils/hooks":122,"../utils/is-array":124,"../utils/is-date":125,"../utils/is-number":127,"../utils/is-object":129,"../utils/is-object-empty":128,"../utils/is-undefined":130,"../utils/map":132,"./check-overflow":34,"./from-array":37,"./from-object":38,"./from-string":41,"./from-string-and-array":39,"./from-string-and-format":40,"./valid":45}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.configFromArray = configFromArray;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsHooks = require('../utils/hooks');

var _dateFromArray = require('./date-from-array');

var _unitsYear = require('../units/year');

var _unitsWeekCalendarUtils = require('../units/week-calendar-utils');

var _unitsConstants = require('../units/constants');

var _local = require('./local');

var _utilsDefaults = require('../utils/defaults');

var _utilsDefaults2 = _interopRequireDefault(_utilsDefaults);

var _parsingFlags = require('./parsing-flags');

var _parsingFlags2 = _interopRequireDefault(_parsingFlags);

function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(_utilsHooks.hooks.now());
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]

function configFromArray(config) {
    var i,
        date,
        input = [],
        currentDate,
        yearToUse;

    if (config._d) {
        return;
    }

    currentDate = currentDateArray(config);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[_unitsConstants.DATE] == null && config._a[_unitsConstants.MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = (0, _utilsDefaults2['default'])(config._a[_unitsConstants.YEAR], currentDate[_unitsConstants.YEAR]);

        if (config._dayOfYear > (0, _unitsYear.daysInYear)(yearToUse) || config._dayOfYear === 0) {
            (0, _parsingFlags2['default'])(config)._overflowDayOfYear = true;
        }

        date = (0, _dateFromArray.createUTCDate)(yearToUse, 0, config._dayOfYear);
        config._a[_unitsConstants.MONTH] = date.getUTCMonth();
        config._a[_unitsConstants.DATE] = date.getUTCDate();
    }

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
    }

    // Check for 24:00:00.000
    if (config._a[_unitsConstants.HOUR] === 24 && config._a[_unitsConstants.MINUTE] === 0 && config._a[_unitsConstants.SECOND] === 0 && config._a[_unitsConstants.MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[_unitsConstants.HOUR] = 0;
    }

    config._d = (config._useUTC ? _dateFromArray.createUTCDate : _dateFromArray.createDate).apply(null, input);
    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
        config._a[_unitsConstants.HOUR] = 24;
    }
}

function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = (0, _utilsDefaults2['default'])(w.GG, config._a[_unitsConstants.YEAR], (0, _unitsWeekCalendarUtils.weekOfYear)((0, _local.createLocal)(), 1, 4).year);
        week = (0, _utilsDefaults2['default'])(w.W, 1);
        weekday = (0, _utilsDefaults2['default'])(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        var curWeek = (0, _unitsWeekCalendarUtils.weekOfYear)((0, _local.createLocal)(), dow, doy);

        weekYear = (0, _utilsDefaults2['default'])(w.gg, config._a[_unitsConstants.YEAR], curWeek.year);

        // Default to current week.
        week = (0, _utilsDefaults2['default'])(w.w, curWeek.week);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from begining of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to begining of week
            weekday = dow;
        }
    }
    if (week < 1 || week > (0, _unitsWeekCalendarUtils.weeksInYear)(weekYear, dow, doy)) {
        (0, _parsingFlags2['default'])(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        (0, _parsingFlags2['default'])(config)._overflowWeekday = true;
    } else {
        temp = (0, _unitsWeekCalendarUtils.dayOfYearFromWeeks)(weekYear, week, weekday, dow, doy);
        config._a[_unitsConstants.YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}

},{"../units/constants":95,"../units/week-calendar-utils":110,"../units/year":113,"../utils/defaults":118,"../utils/hooks":122,"./date-from-array":35,"./local":42,"./parsing-flags":43}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.configFromObject = configFromObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _unitsAliases = require('../units/aliases');

var _fromArray = require('./from-array');

var _utilsMap = require('../utils/map');

var _utilsMap2 = _interopRequireDefault(_utilsMap);

function configFromObject(config) {
    if (config._d) {
        return;
    }

    var i = (0, _unitsAliases.normalizeObjectUnits)(config._i);
    config._a = (0, _utilsMap2['default'])([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
        return obj && parseInt(obj, 10);
    });

    (0, _fromArray.configFromArray)(config);
}

},{"../units/aliases":94,"../utils/map":132,"./from-array":37}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.configFromStringAndArray = configFromStringAndArray;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _momentConstructor = require('../moment/constructor');

var _fromStringAndFormat = require('./from-string-and-format');

var _parsingFlags = require('./parsing-flags');

var _parsingFlags2 = _interopRequireDefault(_parsingFlags);

var _valid = require('./valid');

var _utilsExtend = require('../utils/extend');

var _utilsExtend2 = _interopRequireDefault(_utilsExtend);

// date from string and array of format strings

function configFromStringAndArray(config) {
    var tempConfig, bestMoment, scoreToBeat, i, currentScore;

    if (config._f.length === 0) {
        (0, _parsingFlags2['default'])(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
    }

    for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = (0, _momentConstructor.copyConfig)({}, config);
        if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        (0, _fromStringAndFormat.configFromStringAndFormat)(tempConfig);

        if (!(0, _valid.isValid)(tempConfig)) {
            continue;
        }

        // if there is any input that was not parsed add a penalty for that format
        currentScore += (0, _parsingFlags2['default'])(tempConfig).charsLeftOver;

        //or tokens
        currentScore += (0, _parsingFlags2['default'])(tempConfig).unusedTokens.length * 10;

        (0, _parsingFlags2['default'])(tempConfig).score = currentScore;

        if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
        }
    }

    (0, _utilsExtend2['default'])(config, bestMoment || tempConfig);
}

},{"../moment/constructor":77,"../utils/extend":120,"./from-string-and-format":40,"./parsing-flags":43,"./valid":45}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.configFromStringAndFormat = configFromStringAndFormat;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fromString = require('./from-string');

var _fromArray = require('./from-array');

var _parseRegex = require('../parse/regex');

var _parseToken = require('../parse/token');

var _formatFormat = require('../format/format');

var _checkOverflow = require('./check-overflow');

var _checkOverflow2 = _interopRequireDefault(_checkOverflow);

var _unitsConstants = require('../units/constants');

var _utilsHooks = require('../utils/hooks');

var _parsingFlags = require('./parsing-flags');

var _parsingFlags2 = _interopRequireDefault(_parsingFlags);

// constant that refers to the ISO standard
_utilsHooks.hooks.ISO_8601 = function () {};

// constant that refers to the RFC 2822 form
_utilsHooks.hooks.RFC_2822 = function () {};

// date from string and format string

function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === _utilsHooks.hooks.ISO_8601) {
        (0, _fromString.configFromISO)(config);
        return;
    }
    if (config._f === _utilsHooks.hooks.RFC_2822) {
        (0, _fromString.configFromRFC2822)(config);
        return;
    }
    config._a = [];
    (0, _parsingFlags2['default'])(config).empty = true;

    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string = '' + config._i,
        i,
        parsedInput,
        tokens,
        token,
        skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;

    tokens = (0, _formatFormat.expandFormat)(config._f, config._locale).match(_formatFormat.formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match((0, _parseRegex.getParseRegexForToken)(token, config)) || [])[0];
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
        if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
                (0, _parsingFlags2['default'])(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (_formatFormat.formatTokenFunctions[token]) {
            if (parsedInput) {
                (0, _parsingFlags2['default'])(config).empty = false;
            } else {
                (0, _parsingFlags2['default'])(config).unusedTokens.push(token);
            }
            (0, _parseToken.addTimeToArrayFromToken)(token, parsedInput, config);
        } else if (config._strict && !parsedInput) {
            (0, _parsingFlags2['default'])(config).unusedTokens.push(token);
        }
    }

    // add remaining unparsed input length to the string
    (0, _parsingFlags2['default'])(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        (0, _parsingFlags2['default'])(config).unusedInput.push(string);
    }

    // clear _12h flag if hour is <= 12
    if (config._a[_unitsConstants.HOUR] <= 12 && (0, _parsingFlags2['default'])(config).bigHour === true && config._a[_unitsConstants.HOUR] > 0) {
        (0, _parsingFlags2['default'])(config).bigHour = undefined;
    }

    (0, _parsingFlags2['default'])(config).parsedDateParts = config._a.slice(0);
    (0, _parsingFlags2['default'])(config).meridiem = config._meridiem;
    // handle meridiem
    config._a[_unitsConstants.HOUR] = meridiemFixWrap(config._locale, config._a[_unitsConstants.HOUR], config._meridiem);

    (0, _fromArray.configFromArray)(config);
    (0, _checkOverflow2['default'])(config);
}

function meridiemFixWrap(locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
        // nothing to do
        return hour;
    }
    if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
        // Fallback
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        return hour;
    } else {
        // this is not supposed to happen
        return hour;
    }
}

},{"../format/format":58,"../parse/regex":92,"../parse/token":93,"../units/constants":95,"../utils/hooks":122,"./check-overflow":34,"./from-array":37,"./from-string":41,"./parsing-flags":43}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.configFromISO = configFromISO;
exports.configFromRFC2822 = configFromRFC2822;
exports.configFromString = configFromString;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fromStringAndFormat = require('./from-string-and-format');

var _utilsHooks = require('../utils/hooks');

var _utilsDeprecate = require('../utils/deprecate');

var _parsingFlags = require('./parsing-flags');

var _parsingFlags2 = _interopRequireDefault(_parsingFlags);

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

var isoDates = [['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/], ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/], ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/], ['GGGG-[W]WW', /\d{4}-W\d\d/, false], ['YYYY-DDD', /\d{4}-\d{3}/], ['YYYY-MM', /\d{4}-\d\d/, false], ['YYYYYYMMDD', /[+-]\d{10}/], ['YYYYMMDD', /\d{8}/],
// YYYYMM is NOT allowed by the standard
['GGGG[W]WWE', /\d{4}W\d{3}/], ['GGGG[W]WW', /\d{4}W\d{2}/, false], ['YYYYDDD', /\d{7}/]];

// iso time formats and regexes
var isoTimes = [['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/], ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/], ['HH:mm:ss', /\d\d:\d\d:\d\d/], ['HH:mm', /\d\d:\d\d/], ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/], ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/], ['HHmmss', /\d\d\d\d\d\d/], ['HHmm', /\d\d\d\d/], ['HH', /\d\d/]];

var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format

function configFromISO(config) {
    var i,
        l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime,
        dateFormat,
        timeFormat,
        tzFormat;

    if (match) {
        (0, _parsingFlags2['default'])(config).iso = true;

        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        (0, _fromStringAndFormat.configFromStringAndFormat)(config);
    } else {
        config._isValid = false;
    }
}

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
var basicRfcRegex = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;

// date and time from ref 2822 format

function configFromRFC2822(config) {
    var string, match, dayFormat, dateFormat, timeFormat, tzFormat;
    var timezones = {
        ' GMT': ' +0000',
        ' EDT': ' -0400',
        ' EST': ' -0500',
        ' CDT': ' -0500',
        ' CST': ' -0600',
        ' MDT': ' -0600',
        ' MST': ' -0700',
        ' PDT': ' -0700',
        ' PST': ' -0800'
    };
    var military = 'YXWVUTSRQPONZABCDEFGHIKLM';
    var timezone, timezoneIndex;

    string = config._i.replace(/\([^\)]*\)|[\n\t]/g, ' ') // Remove comments and folding whitespace
    .replace(/(\s\s+)/g, ' ') // Replace multiple-spaces with a single space
    .replace(/^\s|\s$/g, ''); // Remove leading and trailing spaces
    match = basicRfcRegex.exec(string);

    if (match) {
        dayFormat = match[1] ? 'ddd' + (match[1].length === 5 ? ', ' : ' ') : '';
        dateFormat = 'D MMM ' + (match[2].length > 10 ? 'YYYY ' : 'YY ');
        timeFormat = 'HH:mm' + (match[4] ? ':ss' : '');

        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        if (match[1]) {
            // day of week given
            var momentDate = new Date(match[2]);
            var momentDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][momentDate.getDay()];

            if (match[1].substr(0, 3) !== momentDay) {
                (0, _parsingFlags2['default'])(config).weekdayMismatch = true;
                config._isValid = false;
                return;
            }
        }

        switch (match[5].length) {
            case 2:
                // military
                if (timezoneIndex === 0) {
                    timezone = ' +0000';
                } else {
                    timezoneIndex = military.indexOf(match[5][1].toUpperCase()) - 12;
                    timezone = (timezoneIndex < 0 ? ' -' : ' +') + ('' + timezoneIndex).replace(/^-?/, '0').match(/..$/)[0] + '00';
                }
                break;
            case 4:
                // Zone
                timezone = timezones[match[5]];
                break;
            default:
                // UT or +/-9999
                timezone = timezones[' GMT'];
        }
        match[5] = timezone;
        config._i = match.splice(1).join('');
        tzFormat = ' ZZ';
        config._f = dayFormat + dateFormat + timeFormat + tzFormat;
        (0, _fromStringAndFormat.configFromStringAndFormat)(config);
        (0, _parsingFlags2['default'])(config).rfc2822 = true;
    } else {
        config._isValid = false;
    }
}

// date from iso format or fallback

function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
    }

    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    configFromRFC2822(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    // Final attempt, use Input Fallback
    _utilsHooks.hooks.createFromInputFallback(config);
}

_utilsHooks.hooks.createFromInputFallback = (0, _utilsDeprecate.deprecate)('value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' + 'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' + 'discouraged and will be removed in an upcoming major release. Please refer to ' + 'http://momentjs.com/guides/#/warnings/js-date/ for more info.', function (config) {
    config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
});

},{"../utils/deprecate":119,"../utils/hooks":122,"./from-string-and-format":40,"./parsing-flags":43}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.createLocal = createLocal;

var _fromAnything = require('./from-anything');

function createLocal(input, format, locale, strict) {
    return (0, _fromAnything.createLocalOrUTC)(input, format, locale, strict, false);
}

},{"./from-anything":36}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = getParsingFlags;
function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty: false,
        unusedTokens: [],
        unusedInput: [],
        overflow: -2,
        charsLeftOver: 0,
        nullInput: false,
        invalidMonth: null,
        invalidFormat: false,
        userInvalidated: false,
        iso: false,
        parsedDateParts: [],
        meridiem: null,
        rfc2822: false,
        weekdayMismatch: false
    };
}

function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
}

module.exports = exports["default"];

},{}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.createUTC = createUTC;

var _fromAnything = require('./from-anything');

function createUTC(input, format, locale, strict) {
    return (0, _fromAnything.createLocalOrUTC)(input, format, locale, strict, true).utc();
}

},{"./from-anything":36}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.isValid = isValid;
exports.createInvalid = createInvalid;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsExtend = require('../utils/extend');

var _utilsExtend2 = _interopRequireDefault(_utilsExtend);

var _utc = require('./utc');

var _createParsingFlags = require('../create/parsing-flags');

var _createParsingFlags2 = _interopRequireDefault(_createParsingFlags);

var _utilsSome = require('../utils/some');

var _utilsSome2 = _interopRequireDefault(_utilsSome);

function isValid(m) {
    if (m._isValid == null) {
        var flags = (0, _createParsingFlags2['default'])(m);
        var parsedParts = _utilsSome2['default'].call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        var isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidMonth && !flags.invalidWeekday && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);

        if (m._strict) {
            isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
        }

        if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
        } else {
            return isNowValid;
        }
    }
    return m._isValid;
}

function createInvalid(flags) {
    var m = (0, _utc.createUTC)(NaN);
    if (flags != null) {
        (0, _utilsExtend2['default'])((0, _createParsingFlags2['default'])(m), flags);
    } else {
        (0, _createParsingFlags2['default'])(m).userInvalidated = true;
    }

    return m;
}

},{"../create/parsing-flags":43,"../utils/extend":120,"../utils/some":133,"./utc":44}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.abs = abs;
var mathAbs = Math.abs;

function abs() {
    var data = this._data;

    this._milliseconds = mathAbs(this._milliseconds);
    this._days = mathAbs(this._days);
    this._months = mathAbs(this._months);

    data.milliseconds = mathAbs(data.milliseconds);
    data.seconds = mathAbs(data.seconds);
    data.minutes = mathAbs(data.minutes);
    data.hours = mathAbs(data.hours);
    data.months = mathAbs(data.months);
    data.years = mathAbs(data.years);

    return this;
}

},{}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.add = add;
exports.subtract = subtract;

var _create = require('./create');

function addSubtract(duration, input, value, direction) {
    var other = (0, _create.createDuration)(input, value);

    duration._milliseconds += direction * other._milliseconds;
    duration._days += direction * other._days;
    duration._months += direction * other._months;

    return duration._bubble();
}

// supports only 2.0-style add(1, 's') or add(duration)

function add(input, value) {
    return addSubtract(this, input, value, 1);
}

// supports only 2.0-style subtract(1, 's') or subtract(duration)

function subtract(input, value) {
    return addSubtract(this, input, value, -1);
}

},{"./create":51}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.as = as;
exports.valueOf = valueOf;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bubble = require('./bubble');

var _unitsAliases = require('../units/aliases');

var _utilsToInt = require('../utils/to-int');

var _utilsToInt2 = _interopRequireDefault(_utilsToInt);

function as(units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days;
    var months;
    var milliseconds = this._milliseconds;

    units = (0, _unitsAliases.normalizeUnits)(units);

    if (units === 'month' || units === 'year') {
        days = this._days + milliseconds / 864e5;
        months = this._months + (0, _bubble.daysToMonths)(days);
        return units === 'month' ? months : months / 12;
    } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round((0, _bubble.monthsToDays)(this._months));
        switch (units) {
            case 'week':
                return days / 7 + milliseconds / 6048e5;
            case 'day':
                return days + milliseconds / 864e5;
            case 'hour':
                return days * 24 + milliseconds / 36e5;
            case 'minute':
                return days * 1440 + milliseconds / 6e4;
            case 'second':
                return days * 86400 + milliseconds / 1000;
            // Math.floor prevents floating point math errors here
            case 'millisecond':
                return Math.floor(days * 864e5) + milliseconds;
            default:
                throw new Error('Unknown unit ' + units);
        }
    }
}

// TODO: Use this.as('ms')?

function valueOf() {
    if (!this.isValid()) {
        return NaN;
    }
    return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + (0, _utilsToInt2['default'])(this._months / 12) * 31536e6;
}

function makeAs(alias) {
    return function () {
        return this.as(alias);
    };
}

var asMilliseconds = makeAs('ms');
exports.asMilliseconds = asMilliseconds;
var asSeconds = makeAs('s');
exports.asSeconds = asSeconds;
var asMinutes = makeAs('m');
exports.asMinutes = asMinutes;
var asHours = makeAs('h');
exports.asHours = asHours;
var asDays = makeAs('d');
exports.asDays = asDays;
var asWeeks = makeAs('w');
exports.asWeeks = asWeeks;
var asMonths = makeAs('M');
exports.asMonths = asMonths;
var asYears = makeAs('y');
exports.asYears = asYears;

},{"../units/aliases":94,"../utils/to-int":134,"./bubble":49}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.bubble = bubble;
exports.daysToMonths = daysToMonths;
exports.monthsToDays = monthsToDays;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsAbsFloor = require('../utils/abs-floor');

var _utilsAbsFloor2 = _interopRequireDefault(_utilsAbsFloor);

var _utilsAbsCeil = require('../utils/abs-ceil');

var _utilsAbsCeil2 = _interopRequireDefault(_utilsAbsCeil);

var _createDateFromArray = require('../create/date-from-array');

function bubble() {
    var milliseconds = this._milliseconds;
    var days = this._days;
    var months = this._months;
    var data = this._data;
    var seconds, minutes, hours, years, monthsFromDays;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!(milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0)) {
        milliseconds += (0, _utilsAbsCeil2['default'])(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;

    seconds = (0, _utilsAbsFloor2['default'])(milliseconds / 1000);
    data.seconds = seconds % 60;

    minutes = (0, _utilsAbsFloor2['default'])(seconds / 60);
    data.minutes = minutes % 60;

    hours = (0, _utilsAbsFloor2['default'])(minutes / 60);
    data.hours = hours % 24;

    days += (0, _utilsAbsFloor2['default'])(hours / 24);

    // convert days to months
    monthsFromDays = (0, _utilsAbsFloor2['default'])(daysToMonths(days));
    months += monthsFromDays;
    days -= (0, _utilsAbsCeil2['default'])(monthsToDays(monthsFromDays));

    // 12 months -> 1 year
    years = (0, _utilsAbsFloor2['default'])(months / 12);
    months %= 12;

    data.days = days;
    data.months = months;
    data.years = years;

    return this;
}

function daysToMonths(days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
}

function monthsToDays(months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
}

},{"../create/date-from-array":35,"../utils/abs-ceil":114,"../utils/abs-floor":115}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.Duration = Duration;
exports.isDuration = isDuration;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _unitsAliases = require('../units/aliases');

var _localeLocales = require('../locale/locales');

var _validJs = require('./valid.js');

var _validJs2 = _interopRequireDefault(_validJs);

function Duration(duration) {
    var normalizedInput = (0, _unitsAliases.normalizeObjectUnits)(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;

    this._isValid = (0, _validJs2['default'])(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds + seconds * 1e3 + // 1000
    minutes * 6e4 + // 1000 * 60
    hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days + weeks * 7;
    // It is impossible translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months + quarters * 3 + years * 12;

    this._data = {};

    this._locale = (0, _localeLocales.getLocale)();

    this._bubble();
}

function isDuration(obj) {
    return obj instanceof Duration;
}

},{"../locale/locales":67,"../units/aliases":94,"./valid.js":57}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.createDuration = createDuration;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constructor = require('./constructor');

var _utilsIsNumber = require('../utils/is-number');

var _utilsIsNumber2 = _interopRequireDefault(_utilsIsNumber);

var _utilsToInt = require('../utils/to-int');

var _utilsToInt2 = _interopRequireDefault(_utilsToInt);

var _utilsAbsRound = require('../utils/abs-round');

var _utilsAbsRound2 = _interopRequireDefault(_utilsAbsRound);

var _utilsHasOwnProp = require('../utils/has-own-prop');

var _utilsHasOwnProp2 = _interopRequireDefault(_utilsHasOwnProp);

var _unitsConstants = require('../units/constants');

var _unitsOffset = require('../units/offset');

var _createLocal = require('../create/local');

var _valid = require('./valid');

// ASP.NET json date format regex
var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

function createDuration(input, key) {
    var duration = input,

    // matching against regexp is expensive, do it on demand
    match = null,
        sign,
        ret,
        diffRes;

    if ((0, _constructor.isDuration)(input)) {
        duration = {
            ms: input._milliseconds,
            d: input._days,
            M: input._months
        };
    } else if ((0, _utilsIsNumber2['default'])(input)) {
        duration = {};
        if (key) {
            duration[key] = input;
        } else {
            duration.milliseconds = input;
        }
    } else if (!!(match = aspNetRegex.exec(input))) {
        sign = match[1] === '-' ? -1 : 1;
        duration = {
            y: 0,
            d: (0, _utilsToInt2['default'])(match[_unitsConstants.DATE]) * sign,
            h: (0, _utilsToInt2['default'])(match[_unitsConstants.HOUR]) * sign,
            m: (0, _utilsToInt2['default'])(match[_unitsConstants.MINUTE]) * sign,
            s: (0, _utilsToInt2['default'])(match[_unitsConstants.SECOND]) * sign,
            ms: (0, _utilsToInt2['default'])((0, _utilsAbsRound2['default'])(match[_unitsConstants.MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
        };
    } else if (!!(match = isoRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: parseIso(match[2], sign),
                M: parseIso(match[3], sign),
                w: parseIso(match[4], sign),
                d: parseIso(match[5], sign),
                h: parseIso(match[6], sign),
                m: parseIso(match[7], sign),
                s: parseIso(match[8], sign)
            };
        } else if (duration == null) {
            // checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference((0, _createLocal.createLocal)(duration.from), (0, _createLocal.createLocal)(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

    ret = new _constructor.Duration(duration);

    if ((0, _constructor.isDuration)(input) && (0, _utilsHasOwnProp2['default'])(input, '_locale')) {
        ret._locale = input._locale;
    }

    return ret;
}

createDuration.fn = _constructor.Duration.prototype;
createDuration.invalid = _valid.createInvalid;

function parseIso(inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.'));
    // apply sign while we're at it
    return (isNaN(res) ? 0 : res) * sign;
}

function positiveMomentsDifference(base, other) {
    var res = { milliseconds: 0, months: 0 };

    res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
        --res.months;
    }

    res.milliseconds = +other - +base.clone().add(res.months, 'M');

    return res;
}

function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
        return { milliseconds: 0, months: 0 };
    }

    other = (0, _unitsOffset.cloneWithOffset)(other, base);
    if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
    } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
    }

    return res;
}

},{"../create/local":42,"../units/constants":95,"../units/offset":103,"../utils/abs-round":116,"../utils/has-own-prop":121,"../utils/is-number":127,"../utils/to-int":134,"./constructor":50,"./valid":57}],52:[function(require,module,exports){
// Side effect imports
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

require('./prototype');

var _create = require('./create');

var _constructor = require('./constructor');

var _humanize = require('./humanize');

exports.createDuration = _create.createDuration;
exports.isDuration = _constructor.isDuration;
exports.getSetRelativeTimeRounding = _humanize.getSetRelativeTimeRounding;
exports.getSetRelativeTimeThreshold = _humanize.getSetRelativeTimeThreshold;

},{"./constructor":50,"./create":51,"./humanize":54,"./prototype":56}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.get = get;
exports.weeks = weeks;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _unitsAliases = require('../units/aliases');

var _utilsAbsFloor = require('../utils/abs-floor');

var _utilsAbsFloor2 = _interopRequireDefault(_utilsAbsFloor);

function get(units) {
    units = (0, _unitsAliases.normalizeUnits)(units);
    return this.isValid() ? this[units + 's']() : NaN;
}

function makeGetter(name) {
    return function () {
        return this.isValid() ? this._data[name] : NaN;
    };
}

var milliseconds = makeGetter('milliseconds');
exports.milliseconds = milliseconds;
var seconds = makeGetter('seconds');
exports.seconds = seconds;
var minutes = makeGetter('minutes');
exports.minutes = minutes;
var hours = makeGetter('hours');
exports.hours = hours;
var days = makeGetter('days');
exports.days = days;
var months = makeGetter('months');
exports.months = months;
var years = makeGetter('years');

exports.years = years;

function weeks() {
    return (0, _utilsAbsFloor2['default'])(this.days() / 7);
}

},{"../units/aliases":94,"../utils/abs-floor":115}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.getSetRelativeTimeRounding = getSetRelativeTimeRounding;
exports.getSetRelativeTimeThreshold = getSetRelativeTimeThreshold;
exports.humanize = humanize;

var _create = require('./create');

var round = Math.round;
var thresholds = {
    ss: 44, // a few seconds to seconds
    s: 45, // seconds to minute
    m: 45, // minutes to hour
    h: 22, // hours to day
    d: 26, // days to month
    M: 11 // months to year
};

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}

function relativeTime(posNegDuration, withoutSuffix, locale) {
    var duration = (0, _create.createDuration)(posNegDuration).abs();
    var seconds = round(duration.as('s'));
    var minutes = round(duration.as('m'));
    var hours = round(duration.as('h'));
    var days = round(duration.as('d'));
    var months = round(duration.as('M'));
    var years = round(duration.as('y'));

    var a = seconds <= thresholds.ss && ['s', seconds] || seconds < thresholds.s && ['ss', seconds] || minutes <= 1 && ['m'] || minutes < thresholds.m && ['mm', minutes] || hours <= 1 && ['h'] || hours < thresholds.h && ['hh', hours] || days <= 1 && ['d'] || days < thresholds.d && ['dd', days] || months <= 1 && ['M'] || months < thresholds.M && ['MM', months] || years <= 1 && ['y'] || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}

// This function allows you to set the rounding function for relative time strings

function getSetRelativeTimeRounding(roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof roundingFunction === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}

// This function allows you to set a threshold for relative time strings

function getSetRelativeTimeThreshold(threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}

function humanize(withSuffix) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime(this, !withSuffix, locale);

    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
}

},{"./create":51}],55:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.toISOString = toISOString;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsAbsFloor = require('../utils/abs-floor');

var _utilsAbsFloor2 = _interopRequireDefault(_utilsAbsFloor);

var abs = Math.abs;

function toISOString() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var seconds = abs(this._milliseconds) / 1000;
    var days = abs(this._days);
    var months = abs(this._months);
    var minutes, hours, years;

    // 3600 seconds -> 60 minutes -> 1 hour
    minutes = (0, _utilsAbsFloor2['default'])(seconds / 60);
    hours = (0, _utilsAbsFloor2['default'])(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    // 12 months -> 1 year
    years = (0, _utilsAbsFloor2['default'])(months / 12);
    months %= 12;

    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds;
    var total = this.asSeconds();

    if (!total) {
        // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return 'P0D';
    }

    return (total < 0 ? '-' : '') + 'P' + (Y ? Y + 'Y' : '') + (M ? M + 'M' : '') + (D ? D + 'D' : '') + (h || m || s ? 'T' : '') + (h ? h + 'H' : '') + (m ? m + 'M' : '') + (s ? s + 'S' : '');
}

},{"../utils/abs-floor":115}],56:[function(require,module,exports){
'use strict';

var _constructor = require('./constructor');

var _abs = require('./abs');

var _addSubtract = require('./add-subtract');

var _as = require('./as');

var _bubble = require('./bubble');

var _get = require('./get');

var _humanize = require('./humanize');

var _isoString = require('./iso-string');

var _momentLocale = require('../moment/locale');

var _valid = require('./valid');

// Deprecations

var _utilsDeprecate = require('../utils/deprecate');

var proto = _constructor.Duration.prototype;

proto.isValid = _valid.isValid;
proto.abs = _abs.abs;
proto.add = _addSubtract.add;
proto.subtract = _addSubtract.subtract;
proto.as = _as.as;
proto.asMilliseconds = _as.asMilliseconds;
proto.asSeconds = _as.asSeconds;
proto.asMinutes = _as.asMinutes;
proto.asHours = _as.asHours;
proto.asDays = _as.asDays;
proto.asWeeks = _as.asWeeks;
proto.asMonths = _as.asMonths;
proto.asYears = _as.asYears;
proto.valueOf = _as.valueOf;
proto._bubble = _bubble.bubble;
proto.get = _get.get;
proto.milliseconds = _get.milliseconds;
proto.seconds = _get.seconds;
proto.minutes = _get.minutes;
proto.hours = _get.hours;
proto.days = _get.days;
proto.weeks = _get.weeks;
proto.months = _get.months;
proto.years = _get.years;
proto.humanize = _humanize.humanize;
proto.toISOString = _isoString.toISOString;
proto.toString = _isoString.toISOString;
proto.toJSON = _isoString.toISOString;
proto.locale = _momentLocale.locale;
proto.localeData = _momentLocale.localeData;

proto.toIsoString = (0, _utilsDeprecate.deprecate)('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', _isoString.toISOString);
proto.lang = _momentLocale.lang;

},{"../moment/locale":83,"../utils/deprecate":119,"./abs":46,"./add-subtract":47,"./as":48,"./bubble":49,"./constructor":50,"./get":53,"./humanize":54,"./iso-string":55,"./valid":57}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = isDurationValid;
exports.isValid = isValid;
exports.createInvalid = createInvalid;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsToInt = require('../utils/to-int');

var _utilsToInt2 = _interopRequireDefault(_utilsToInt);

var _constructor = require('./constructor');

var _create = require('./create');

var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

function isDurationValid(m) {
    for (var key in m) {
        if (!(ordering.indexOf(key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
        }
    }

    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== (0, _utilsToInt2['default'])(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}

function isValid() {
    return this._isValid;
}

function createInvalid() {
    return (0, _create.createDuration)(NaN);
}

},{"../utils/to-int":134,"./constructor":50,"./create":51}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.addFormatToken = addFormatToken;
exports.formatMoment = formatMoment;
exports.expandFormat = expandFormat;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsZeroFill = require('../utils/zero-fill');

var _utilsZeroFill2 = _interopRequireDefault(_utilsZeroFill);

var _utilsIsFunction = require('../utils/is-function');

var _utilsIsFunction2 = _interopRequireDefault(_utilsIsFunction);

var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

exports.formattingTokens = formattingTokens;
var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

var formatFunctions = {};

var formatTokenFunctions = {};

exports.formatTokenFunctions = formatTokenFunctions;
// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }

function addFormatToken(token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === 'string') {
        func = function () {
            return this[callback]();
        };
    }
    if (token) {
        formatTokenFunctions[token] = func;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return (0, _utilsZeroFill2['default'])(func.apply(this, arguments), padded[1], padded[2]);
        };
    }
    if (ordinal) {
        formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
}

function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function makeFormatFunction(format) {
    var array = format.match(formattingTokens),
        i,
        length;

    for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
        } else {
            array[i] = removeFormattingTokens(array[i]);
        }
    }

    return function (mom) {
        var output = '',
            i;
        for (i = 0; i < length; i++) {
            output += (0, _utilsIsFunction2['default'])(array[i]) ? array[i].call(mom, format) : array[i];
        }
        return output;
    };
}

// format date using native date object

function formatMoment(m, format) {
    if (!m.isValid()) {
        return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

    return formatFunctions[format](m);
}

function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
    }

    return format;
}

},{"../utils/is-function":126,"../utils/zero-fill":135}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _calendar = require('./calendar');

var _formats = require('./formats');

var _invalid = require('./invalid');

var _ordinal = require('./ordinal');

var _relative = require('./relative');

// months

var _unitsMonth = require('../units/month');

// week

var _unitsWeek = require('../units/week');

// weekdays

var _unitsDayOfWeek = require('../units/day-of-week');

// meridiem

var _unitsHour = require('../units/hour');

var baseConfig = {
    calendar: _calendar.defaultCalendar,
    longDateFormat: _formats.defaultLongDateFormat,
    invalidDate: _invalid.defaultInvalidDate,
    ordinal: _ordinal.defaultOrdinal,
    dayOfMonthOrdinalParse: _ordinal.defaultDayOfMonthOrdinalParse,
    relativeTime: _relative.defaultRelativeTime,

    months: _unitsMonth.defaultLocaleMonths,
    monthsShort: _unitsMonth.defaultLocaleMonthsShort,

    week: _unitsWeek.defaultLocaleWeek,

    weekdays: _unitsDayOfWeek.defaultLocaleWeekdays,
    weekdaysMin: _unitsDayOfWeek.defaultLocaleWeekdaysMin,
    weekdaysShort: _unitsDayOfWeek.defaultLocaleWeekdaysShort,

    meridiemParse: _unitsHour.defaultLocaleMeridiemParse
};
exports.baseConfig = baseConfig;

},{"../units/day-of-week":97,"../units/hour":99,"../units/month":102,"../units/week":112,"./calendar":60,"./formats":63,"./invalid":64,"./ordinal":68,"./relative":71}],60:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.calendar = calendar;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsIsFunction = require('../utils/is-function');

var _utilsIsFunction2 = _interopRequireDefault(_utilsIsFunction);

var defaultCalendar = {
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    nextWeek: 'dddd [at] LT',
    lastDay: '[Yesterday at] LT',
    lastWeek: '[Last] dddd [at] LT',
    sameElse: 'L'
};

exports.defaultCalendar = defaultCalendar;

function calendar(key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return (0, _utilsIsFunction2['default'])(output) ? output.call(mom, now) : output;
}

},{"../utils/is-function":126}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Locale = Locale;

function Locale(config) {
    if (config != null) {
        this.set(config);
    }
}

},{}],62:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('./prototype');

var _locales = require('./locales');

var _utilsToInt = require('../utils/to-int');

var _utilsToInt2 = _interopRequireDefault(_utilsToInt);

(0, _locales.getSetGlobalLocale)('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function ordinal(number) {
        var b = number % 10,
            output = (0, _utilsToInt2['default'])(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
        return number + output;
    }
});

},{"../utils/to-int":134,"./locales":67,"./prototype":70}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.longDateFormat = longDateFormat;
var defaultLongDateFormat = {
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A'
};

exports.defaultLongDateFormat = defaultLongDateFormat;

function longDateFormat(key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
        return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
        return val.slice(1);
    });

    return this._longDateFormat[key];
}

},{}],64:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.invalidDate = invalidDate;
var defaultInvalidDate = 'Invalid date';

exports.defaultInvalidDate = defaultInvalidDate;

function invalidDate() {
    return this._invalidDate;
}

},{}],65:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.listMonths = listMonths;
exports.listMonthsShort = listMonthsShort;
exports.listWeekdays = listWeekdays;
exports.listWeekdaysShort = listWeekdaysShort;
exports.listWeekdaysMin = listWeekdaysMin;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsIsNumber = require('../utils/is-number');

var _utilsIsNumber2 = _interopRequireDefault(_utilsIsNumber);

var _locales = require('./locales');

var _createUtc = require('../create/utc');

function get(format, index, field, setter) {
    var locale = (0, _locales.getLocale)();
    var utc = (0, _createUtc.createUTC)().set(setter, index);
    return locale[field](utc, format);
}

function listMonthsImpl(format, index, field) {
    if ((0, _utilsIsNumber2['default'])(format)) {
        index = format;
        format = undefined;
    }

    format = format || '';

    if (index != null) {
        return get(format, index, field, 'month');
    }

    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
        out[i] = get(format, i, field, 'month');
    }
    return out;
}

// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function listWeekdaysImpl(localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
        if ((0, _utilsIsNumber2['default'])(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    } else {
        format = localeSorted;
        index = format;
        localeSorted = false;

        if ((0, _utilsIsNumber2['default'])(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    }

    var locale = (0, _locales.getLocale)(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
        return get(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
        out[i] = get(format, (i + shift) % 7, field, 'day');
    }
    return out;
}

function listMonths(format, index) {
    return listMonthsImpl(format, index, 'months');
}

function listMonthsShort(format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
}

function listWeekdays(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
}

function listWeekdaysShort(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
}

function listWeekdaysMin(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
}

},{"../create/utc":44,"../utils/is-number":127,"./locales":67}],66:[function(require,module,exports){
// Side effect imports
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

require('./prototype');

var _locales = require('./locales');

var _lists = require('./lists');

var _utilsDeprecate = require('../utils/deprecate');

var _utilsHooks = require('../utils/hooks');

require('./en');

exports.getSetGlobalLocale = _locales.getSetGlobalLocale;
exports.defineLocale = _locales.defineLocale;
exports.updateLocale = _locales.updateLocale;
exports.getLocale = _locales.getLocale;
exports.listLocales = _locales.listLocales;
exports.listMonths = _lists.listMonths;
exports.listMonthsShort = _lists.listMonthsShort;
exports.listWeekdays = _lists.listWeekdays;
exports.listWeekdaysShort = _lists.listWeekdaysShort;
exports.listWeekdaysMin = _lists.listWeekdaysMin;

_utilsHooks.hooks.lang = (0, _utilsDeprecate.deprecate)('moment.lang is deprecated. Use moment.locale instead.', _locales.getSetGlobalLocale);
_utilsHooks.hooks.langData = (0, _utilsDeprecate.deprecate)('moment.langData is deprecated. Use moment.localeData instead.', _locales.getLocale);

},{"../utils/deprecate":119,"../utils/hooks":122,"./en":62,"./lists":65,"./locales":67,"./prototype":70}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.getSetGlobalLocale = getSetGlobalLocale;
exports.defineLocale = defineLocale;
exports.updateLocale = updateLocale;
exports.getLocale = getLocale;
exports.listLocales = listLocales;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsIsArray = require('../utils/is-array');

var _utilsIsArray2 = _interopRequireDefault(_utilsIsArray);

var _utilsHasOwnProp = require('../utils/has-own-prop');

var _utilsHasOwnProp2 = _interopRequireDefault(_utilsHasOwnProp);

var _utilsIsUndefined = require('../utils/is-undefined');

var _utilsIsUndefined2 = _interopRequireDefault(_utilsIsUndefined);

var _utilsCompareArrays = require('../utils/compare-arrays');

var _utilsCompareArrays2 = _interopRequireDefault(_utilsCompareArrays);

var _utilsDeprecate = require('../utils/deprecate');

var _set = require('./set');

var _constructor = require('./constructor');

var _utilsKeys = require('../utils/keys');

var _utilsKeys2 = _interopRequireDefault(_utilsKeys);

var _baseConfig = require('./base-config');

// internal storage for locale config files
var locales = {};
var localeFamilies = {};
var globalLocale;

function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {
    var i = 0,
        j,
        next,
        locale,
        split;

    while (i < names.length) {
        split = normalizeLocale(names[i]).split('-');
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && (0, _utilsCompareArrays2['default'])(split, next, true) >= j - 1) {
                //the next array item is better than a shallower substring of this one
                break;
            }
            j--;
        }
        i++;
    }
    return null;
}

function loadLocale(name) {
    var oldLocale = null;
    // TODO: Find a better way to register and load all the locales in Node
    if (!locales[name] && typeof module !== 'undefined' && module && module.exports) {
        try {
            oldLocale = globalLocale._abbr;
            require('./locale/' + name);
            // because defineLocale currently also sets the global locale, we
            // want to undo that for lazy loaded locales
            getSetGlobalLocale(oldLocale);
        } catch (e) {}
    }
    return locales[name];
}

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.

function getSetGlobalLocale(key, values) {
    var data;
    if (key) {
        if ((0, _utilsIsUndefined2['default'])(values)) {
            data = getLocale(key);
        } else {
            data = defineLocale(key, values);
        }

        if (data) {
            // moment.duration._locale = moment._locale = data;
            globalLocale = data;
        }
    }

    return globalLocale._abbr;
}

function defineLocale(name, config) {
    if (config !== null) {
        var parentConfig = _baseConfig.baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
            (0, _utilsDeprecate.deprecateSimple)('defineLocaleOverride', 'use moment.updateLocale(localeName, config) to change ' + 'an existing locale. moment.defineLocale(localeName, ' + 'config) should only be used for creating a new locale ' + 'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
            parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
            } else {
                if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                    name: name,
                    config: config
                });
                return null;
            }
        }
        locales[name] = new _constructor.Locale((0, _set.mergeConfigs)(parentConfig, config));

        if (localeFamilies[name]) {
            localeFamilies[name].forEach(function (x) {
                defineLocale(x.name, x.config);
            });
        }

        // backwards compat for now: also set the locale
        // make sure we set the locale AFTER all child locales have been
        // created, so we won't end up with the child locale set.
        getSetGlobalLocale(name);

        return locales[name];
    } else {
        // useful for testing
        delete locales[name];
        return null;
    }
}

function updateLocale(name, config) {
    if (config != null) {
        var locale,
            parentConfig = _baseConfig.baseConfig;
        // MERGE
        if (locales[name] != null) {
            parentConfig = locales[name]._config;
        }
        config = (0, _set.mergeConfigs)(parentConfig, config);
        locale = new _constructor.Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;

        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    } else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}

// returns locale data

function getLocale(key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
    }

    if (!key) {
        return globalLocale;
    }

    if (!(0, _utilsIsArray2['default'])(key)) {
        //short-circuit everything else
        locale = loadLocale(key);
        if (locale) {
            return locale;
        }
        key = [key];
    }

    return chooseLocale(key);
}

function listLocales() {
    return (0, _utilsKeys2['default'])(locales);
}

},{"../utils/compare-arrays":117,"../utils/deprecate":119,"../utils/has-own-prop":121,"../utils/is-array":124,"../utils/is-undefined":130,"../utils/keys":131,"./base-config":59,"./constructor":61,"./set":72}],68:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.ordinal = ordinal;
var defaultOrdinal = '%d';
exports.defaultOrdinal = defaultOrdinal;
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

exports.defaultDayOfMonthOrdinalParse = defaultDayOfMonthOrdinalParse;

function ordinal(number) {
    return this._ordinal.replace('%d', number);
}

},{}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.preParsePostFormat = preParsePostFormat;

function preParsePostFormat(string) {
    return string;
}

},{}],70:[function(require,module,exports){
'use strict';

var _constructor = require('./constructor');

var _calendar = require('./calendar');

var _formats = require('./formats');

var _invalid = require('./invalid');

var _ordinal = require('./ordinal');

var _prePostFormat = require('./pre-post-format');

var _relative = require('./relative');

var _set = require('./set');

// Month

var _unitsMonth = require('../units/month');

// Week

var _unitsWeek = require('../units/week');

// Day of Week

var _unitsDayOfWeek = require('../units/day-of-week');

// Hours

var _unitsHour = require('../units/hour');

var proto = _constructor.Locale.prototype;

proto.calendar = _calendar.calendar;
proto.longDateFormat = _formats.longDateFormat;
proto.invalidDate = _invalid.invalidDate;
proto.ordinal = _ordinal.ordinal;
proto.preparse = _prePostFormat.preParsePostFormat;
proto.postformat = _prePostFormat.preParsePostFormat;
proto.relativeTime = _relative.relativeTime;
proto.pastFuture = _relative.pastFuture;
proto.set = _set.set;

proto.months = _unitsMonth.localeMonths;
proto.monthsShort = _unitsMonth.localeMonthsShort;
proto.monthsParse = _unitsMonth.localeMonthsParse;
proto.monthsRegex = _unitsMonth.monthsRegex;
proto.monthsShortRegex = _unitsMonth.monthsShortRegex;
proto.week = _unitsWeek.localeWeek;
proto.firstDayOfYear = _unitsWeek.localeFirstDayOfYear;
proto.firstDayOfWeek = _unitsWeek.localeFirstDayOfWeek;

proto.weekdays = _unitsDayOfWeek.localeWeekdays;
proto.weekdaysMin = _unitsDayOfWeek.localeWeekdaysMin;
proto.weekdaysShort = _unitsDayOfWeek.localeWeekdaysShort;
proto.weekdaysParse = _unitsDayOfWeek.localeWeekdaysParse;

proto.weekdaysRegex = _unitsDayOfWeek.weekdaysRegex;
proto.weekdaysShortRegex = _unitsDayOfWeek.weekdaysShortRegex;
proto.weekdaysMinRegex = _unitsDayOfWeek.weekdaysMinRegex;

proto.isPM = _unitsHour.localeIsPM;
proto.meridiem = _unitsHour.localeMeridiem;

},{"../units/day-of-week":97,"../units/hour":99,"../units/month":102,"../units/week":112,"./calendar":60,"./constructor":61,"./formats":63,"./invalid":64,"./ordinal":68,"./pre-post-format":69,"./relative":71,"./set":72}],71:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.relativeTime = relativeTime;
exports.pastFuture = pastFuture;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsIsFunction = require('../utils/is-function');

var _utilsIsFunction2 = _interopRequireDefault(_utilsIsFunction);

var defaultRelativeTime = {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
};

exports.defaultRelativeTime = defaultRelativeTime;

function relativeTime(number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return (0, _utilsIsFunction2['default'])(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
}

function pastFuture(diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return (0, _utilsIsFunction2['default'])(format) ? format(output) : format.replace(/%s/i, output);
}

},{"../utils/is-function":126}],72:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.set = set;
exports.mergeConfigs = mergeConfigs;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsIsFunction = require('../utils/is-function');

var _utilsIsFunction2 = _interopRequireDefault(_utilsIsFunction);

var _utilsExtend = require('../utils/extend');

var _utilsExtend2 = _interopRequireDefault(_utilsExtend);

var _utilsIsObject = require('../utils/is-object');

var _utilsIsObject2 = _interopRequireDefault(_utilsIsObject);

var _utilsHasOwnProp = require('../utils/has-own-prop');

var _utilsHasOwnProp2 = _interopRequireDefault(_utilsHasOwnProp);

function set(config) {
    var prop, i;
    for (i in config) {
        prop = config[i];
        if ((0, _utilsIsFunction2['default'])(prop)) {
            this[i] = prop;
        } else {
            this['_' + i] = prop;
        }
    }
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + '|' + /\d{1,2}/.source);
}

function mergeConfigs(parentConfig, childConfig) {
    var res = (0, _utilsExtend2['default'])({}, parentConfig),
        prop;
    for (prop in childConfig) {
        if ((0, _utilsHasOwnProp2['default'])(childConfig, prop)) {
            if ((0, _utilsIsObject2['default'])(parentConfig[prop]) && (0, _utilsIsObject2['default'])(childConfig[prop])) {
                res[prop] = {};
                (0, _utilsExtend2['default'])(res[prop], parentConfig[prop]);
                (0, _utilsExtend2['default'])(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
            } else {
                delete res[prop];
            }
        }
    }
    for (prop in parentConfig) {
        if ((0, _utilsHasOwnProp2['default'])(parentConfig, prop) && !(0, _utilsHasOwnProp2['default'])(childConfig, prop) && (0, _utilsIsObject2['default'])(parentConfig[prop])) {
            // make sure changes to properties don't modify parent config
            res[prop] = (0, _utilsExtend2['default'])({}, res[prop]);
        }
    }
    return res;
}

},{"../utils/extend":120,"../utils/has-own-prop":121,"../utils/is-function":126,"../utils/is-object":129}],73:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.addSubtract = addSubtract;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _getSet = require('./get-set');

var _unitsMonth = require('../units/month');

var _durationCreate = require('../duration/create');

var _utilsDeprecate = require('../utils/deprecate');

var _utilsHooks = require('../utils/hooks');

var _utilsAbsRound = require('../utils/abs-round');

var _utilsAbsRound2 = _interopRequireDefault(_utilsAbsRound);

// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            (0, _utilsDeprecate.deprecateSimple)(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' + 'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val;val = period;period = tmp;
        }

        val = typeof val === 'string' ? +val : val;
        dur = (0, _durationCreate.createDuration)(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

function addSubtract(mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = (0, _utilsAbsRound2['default'])(duration._days),
        months = (0, _utilsAbsRound2['default'])(duration._months);

    if (!mom.isValid()) {
        // No op
        return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (days) {
        (0, _getSet.set)(mom, 'Date', (0, _getSet.get)(mom, 'Date') + days * isAdding);
    }
    if (months) {
        (0, _unitsMonth.setMonth)(mom, (0, _getSet.get)(mom, 'Month') + months * isAdding);
    }
    if (updateOffset) {
        _utilsHooks.hooks.updateOffset(mom, days || months);
    }
}

var add = createAdder(1, 'add');
exports.add = add;
var subtract = createAdder(-1, 'subtract');
exports.subtract = subtract;

},{"../duration/create":51,"../units/month":102,"../utils/abs-round":116,"../utils/deprecate":119,"../utils/hooks":122,"./get-set":82}],74:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.getCalendarFormat = getCalendarFormat;
exports.calendar = calendar;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createLocal = require('../create/local');

var _unitsOffset = require('../units/offset');

var _utilsIsFunction = require('../utils/is-function');

var _utilsIsFunction2 = _interopRequireDefault(_utilsIsFunction);

var _utilsHooks = require('../utils/hooks');

function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : 'sameElse';
}

function calendar(time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || (0, _createLocal.createLocal)(),
        sod = (0, _unitsOffset.cloneWithOffset)(now, this).startOf('day'),
        format = _utilsHooks.hooks.calendarFormat(this, sod) || 'sameElse';

    var output = formats && ((0, _utilsIsFunction2['default'])(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, (0, _createLocal.createLocal)(now)));
}

},{"../create/local":42,"../units/offset":103,"../utils/hooks":122,"../utils/is-function":126}],75:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.clone = clone;

var _constructor = require('./constructor');

function clone() {
    return new _constructor.Moment(this);
}

},{"./constructor":77}],76:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.isAfter = isAfter;
exports.isBefore = isBefore;
exports.isBetween = isBetween;
exports.isSame = isSame;
exports.isSameOrAfter = isSameOrAfter;
exports.isSameOrBefore = isSameOrBefore;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constructor = require('./constructor');

var _unitsAliases = require('../units/aliases');

var _createLocal = require('../create/local');

var _utilsIsUndefined = require('../utils/is-undefined');

var _utilsIsUndefined2 = _interopRequireDefault(_utilsIsUndefined);

function isAfter(input, units) {
    var localInput = (0, _constructor.isMoment)(input) ? input : (0, _createLocal.createLocal)(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = (0, _unitsAliases.normalizeUnits)(!(0, _utilsIsUndefined2['default'])(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

function isBefore(input, units) {
    var localInput = (0, _constructor.isMoment)(input) ? input : (0, _createLocal.createLocal)(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = (0, _unitsAliases.normalizeUnits)(!(0, _utilsIsUndefined2['default'])(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

function isBetween(from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) && (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}

function isSame(input, units) {
    var localInput = (0, _constructor.isMoment)(input) ? input : (0, _createLocal.createLocal)(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = (0, _unitsAliases.normalizeUnits)(units || 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}

function isSameOrAfter(input, units) {
    return this.isSame(input, units) || this.isAfter(input, units);
}

function isSameOrBefore(input, units) {
    return this.isSame(input, units) || this.isBefore(input, units);
}

},{"../create/local":42,"../units/aliases":94,"../utils/is-undefined":130,"./constructor":77}],77:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.copyConfig = copyConfig;
exports.Moment = Moment;
exports.isMoment = isMoment;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsHooks = require('../utils/hooks');

var _utilsHasOwnProp = require('../utils/has-own-prop');

var _utilsHasOwnProp2 = _interopRequireDefault(_utilsHasOwnProp);

var _utilsIsUndefined = require('../utils/is-undefined');

var _utilsIsUndefined2 = _interopRequireDefault(_utilsIsUndefined);

var _createParsingFlags = require('../create/parsing-flags');

var _createParsingFlags2 = _interopRequireDefault(_createParsingFlags);

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties = _utilsHooks.hooks.momentProperties = [];

function copyConfig(to, from) {
    var i, prop, val;

    if (!(0, _utilsIsUndefined2['default'])(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (!(0, _utilsIsUndefined2['default'])(from._i)) {
        to._i = from._i;
    }
    if (!(0, _utilsIsUndefined2['default'])(from._f)) {
        to._f = from._f;
    }
    if (!(0, _utilsIsUndefined2['default'])(from._l)) {
        to._l = from._l;
    }
    if (!(0, _utilsIsUndefined2['default'])(from._strict)) {
        to._strict = from._strict;
    }
    if (!(0, _utilsIsUndefined2['default'])(from._tzm)) {
        to._tzm = from._tzm;
    }
    if (!(0, _utilsIsUndefined2['default'])(from._isUTC)) {
        to._isUTC = from._isUTC;
    }
    if (!(0, _utilsIsUndefined2['default'])(from._offset)) {
        to._offset = from._offset;
    }
    if (!(0, _utilsIsUndefined2['default'])(from._pf)) {
        to._pf = (0, _createParsingFlags2['default'])(from);
    }
    if (!(0, _utilsIsUndefined2['default'])(from._locale)) {
        to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
        for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from[prop];
            if (!(0, _utilsIsUndefined2['default'])(val)) {
                to[prop] = val;
            }
        }
    }

    return to;
}

var updateInProgress = false;

// Moment prototype object

function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
        this._d = new Date(NaN);
    }
    // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if (updateInProgress === false) {
        updateInProgress = true;
        _utilsHooks.hooks.updateOffset(this);
        updateInProgress = false;
    }
}

function isMoment(obj) {
    return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
}

},{"../create/parsing-flags":43,"../utils/has-own-prop":121,"../utils/hooks":122,"../utils/is-undefined":130}],78:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.creationData = creationData;

function creationData() {
    return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
    };
}

},{}],79:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.diff = diff;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsAbsFloor = require('../utils/abs-floor');

var _utilsAbsFloor2 = _interopRequireDefault(_utilsAbsFloor);

var _unitsOffset = require('../units/offset');

var _unitsAliases = require('../units/aliases');

function diff(input, units, asFloat) {
    var that, zoneDelta, delta, output;

    if (!this.isValid()) {
        return NaN;
    }

    that = (0, _unitsOffset.cloneWithOffset)(input, this);

    if (!that.isValid()) {
        return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

    units = (0, _unitsAliases.normalizeUnits)(units);

    if (units === 'year' || units === 'month' || units === 'quarter') {
        output = monthDiff(this, that);
        if (units === 'quarter') {
            output = output / 3;
        } else if (units === 'year') {
            output = output / 12;
        }
    } else {
        delta = this - that;
        output = units === 'second' ? delta / 1e3 : // 1000
        units === 'minute' ? delta / 6e4 : // 1000 * 60
        units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
        units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
        units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
        delta;
    }
    return asFloat ? output : (0, _utilsAbsFloor2['default'])(output);
}

function monthDiff(a, b) {
    // difference in months
    var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),

    // b is in (anchor - 1 month, anchor + 1 month)
    anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2,
        adjust;

    if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}

},{"../units/aliases":94,"../units/offset":103,"../utils/abs-floor":115}],80:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.toString = toString;
exports.toISOString = toISOString;
exports.inspect = inspect;
exports.format = format;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _formatFormat = require('../format/format');

var _utilsHooks = require('../utils/hooks');

var _utilsIsFunction = require('../utils/is-function');

var _utilsIsFunction2 = _interopRequireDefault(_utilsIsFunction);

_utilsHooks.hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
_utilsHooks.hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

function toString() {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}

function toISOString() {
    if (!this.isValid()) {
        return null;
    }
    var m = this.clone().utc();
    if (m.year() < 0 || m.year() > 9999) {
        return (0, _formatFormat.formatMoment)(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }
    if ((0, _utilsIsFunction2['default'])(Date.prototype.toISOString)) {
        // native implementation is ~50x faster, use it when we can
        return this.toDate().toISOString();
    }
    return (0, _formatFormat.formatMoment)(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
}

/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */

function inspect() {
    if (!this.isValid()) {
        return 'moment.invalid(/* ' + this._i + ' */)';
    }
    var func = 'moment';
    var zone = '';
    if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
        zone = 'Z';
    }
    var prefix = '[' + func + '("]';
    var year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';

    return this.format(prefix + year + datetime + suffix);
}

function format(inputString) {
    if (!inputString) {
        inputString = this.isUtc() ? _utilsHooks.hooks.defaultFormatUtc : _utilsHooks.hooks.defaultFormat;
    }
    var output = (0, _formatFormat.formatMoment)(this, inputString);
    return this.localeData().postformat(output);
}

},{"../format/format":58,"../utils/hooks":122,"../utils/is-function":126}],81:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.from = from;
exports.fromNow = fromNow;

var _durationCreate = require('../duration/create');

var _createLocal = require('../create/local');

var _momentConstructor = require('../moment/constructor');

function from(time, withoutSuffix) {
    if (this.isValid() && ((0, _momentConstructor.isMoment)(time) && time.isValid() || (0, _createLocal.createLocal)(time).isValid())) {
        return (0, _durationCreate.createDuration)({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function fromNow(withoutSuffix) {
    return this.from((0, _createLocal.createLocal)(), withoutSuffix);
}

},{"../create/local":42,"../duration/create":51,"../moment/constructor":77}],82:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.makeGetSet = makeGetSet;
exports.get = get;
exports.set = set;
exports.stringGet = stringGet;
exports.stringSet = stringSet;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _unitsAliases = require('../units/aliases');

var _unitsPriorities = require('../units/priorities');

var _utilsHooks = require('../utils/hooks');

var _utilsIsFunction = require('../utils/is-function');

var _utilsIsFunction2 = _interopRequireDefault(_utilsIsFunction);

function makeGetSet(unit, keepTime) {
    return function (value) {
        if (value != null) {
            set(this, unit, value);
            _utilsHooks.hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get(mom, unit) {
    return mom.isValid() ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

function set(mom, unit, value) {
    if (mom.isValid()) {
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
    }
}

// MOMENTS

function stringGet(units) {
    units = (0, _unitsAliases.normalizeUnits)(units);
    if ((0, _utilsIsFunction2['default'])(this[units])) {
        return this[units]();
    }
    return this;
}

function stringSet(units, value) {
    if (typeof units === 'object') {
        units = (0, _unitsAliases.normalizeObjectUnits)(units);
        var prioritized = (0, _unitsPriorities.getPrioritizedUnits)(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = (0, _unitsAliases.normalizeUnits)(units);
        if ((0, _utilsIsFunction2['default'])(this[units])) {
            return this[units](value);
        }
    }
    return this;
}

},{"../units/aliases":94,"../units/priorities":104,"../utils/hooks":122,"../utils/is-function":126}],83:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.locale = locale;
exports.localeData = localeData;

var _localeLocales = require('../locale/locales');

var _utilsDeprecate = require('../utils/deprecate');

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.

function locale(key) {
    var newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = (0, _localeLocales.getLocale)(key);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
}

var lang = (0, _utilsDeprecate.deprecate)('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function (key) {
    if (key === undefined) {
        return this.localeData();
    } else {
        return this.locale(key);
    }
});

exports.lang = lang;

function localeData() {
    return this._locale;
}

},{"../locale/locales":67,"../utils/deprecate":119}],84:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.min = min;
exports.max = max;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsDeprecate = require('../utils/deprecate');

var _utilsIsArray = require('../utils/is-array');

var _utilsIsArray2 = _interopRequireDefault(_utilsIsArray);

var _createLocal = require('../create/local');

var _createValid = require('../create/valid');

var prototypeMin = (0, _utilsDeprecate.deprecate)('moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
    var other = _createLocal.createLocal.apply(null, arguments);
    if (this.isValid() && other.isValid()) {
        return other < this ? this : other;
    } else {
        return (0, _createValid.createInvalid)();
    }
});

exports.prototypeMin = prototypeMin;
var prototypeMax = (0, _utilsDeprecate.deprecate)('moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
    var other = _createLocal.createLocal.apply(null, arguments);
    if (this.isValid() && other.isValid()) {
        return other > this ? this : other;
    } else {
        return (0, _createValid.createInvalid)();
    }
});

exports.prototypeMax = prototypeMax;
// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && (0, _utilsIsArray2['default'])(moments[0])) {
        moments = moments[0];
    }
    if (!moments.length) {
        return (0, _createLocal.createLocal)();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
        }
    }
    return res;
}

// TODO: Use [].sort instead?

function min() {
    var args = [].slice.call(arguments, 0);

    return pickBy('isBefore', args);
}

function max() {
    var args = [].slice.call(arguments, 0);

    return pickBy('isAfter', args);
}

},{"../create/local":42,"../create/valid":45,"../utils/deprecate":119,"../utils/is-array":124}],85:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createLocal = require('../create/local');

var _createUtc = require('../create/utc');

var _createValid = require('../create/valid');

var _constructor = require('./constructor');

var _minMax = require('./min-max');

var _now = require('./now');

var _prototype = require('./prototype');

var _prototype2 = _interopRequireDefault(_prototype);

function createUnix(input) {
    return (0, _createLocal.createLocal)(input * 1000);
}

function createInZone() {
    return _createLocal.createLocal.apply(null, arguments).parseZone();
}

exports.now = _now.now;
exports.min = _minMax.min;
exports.max = _minMax.max;
exports.isMoment = _constructor.isMoment;
exports.createUTC = _createUtc.createUTC;
exports.createUnix = createUnix;
exports.createLocal = _createLocal.createLocal;
exports.createInZone = createInZone;
exports.createInvalid = _createValid.createInvalid;
exports.momentPrototype = _prototype2['default'];

},{"../create/local":42,"../create/utc":44,"../create/valid":45,"./constructor":77,"./min-max":84,"./now":86,"./prototype":87}],86:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var now = function now() {
    return Date.now ? Date.now() : +new Date();
};
exports.now = now;

},{}],87:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _constructor = require('./constructor');

var _addSubtract = require('./add-subtract');

var _calendar = require('./calendar');

var _clone = require('./clone');

var _compare = require('./compare');

var _diff = require('./diff');

var _format = require('./format');

var _from = require('./from');

var _to = require('./to');

var _getSet = require('./get-set');

var _locale = require('./locale');

var _minMax = require('./min-max');

var _startEndOf = require('./start-end-of');

var _toType = require('./to-type');

var _valid = require('./valid');

var _creationData = require('./creation-data');

// Year

var _unitsYear = require('../units/year');

// Week Year

var _unitsWeekYear = require('../units/week-year');

// Quarter

var _unitsQuarter = require('../units/quarter');

// Month

var _unitsMonth = require('../units/month');

// Week

var _unitsWeek = require('../units/week');

// Day

var _unitsDayOfMonth = require('../units/day-of-month');

var _unitsDayOfWeek = require('../units/day-of-week');

var _unitsDayOfYear = require('../units/day-of-year');

// Hour

var _unitsHour = require('../units/hour');

// Minute

var _unitsMinute = require('../units/minute');

// Second

var _unitsSecond = require('../units/second');

// Millisecond

var _unitsMillisecond = require('../units/millisecond');

// Offset

var _unitsOffset = require('../units/offset');

// Timezone

var _unitsTimezone = require('../units/timezone');

// Deprecations

var _utilsDeprecate = require('../utils/deprecate');

var proto = _constructor.Moment.prototype;

proto.add = _addSubtract.add;
proto.calendar = _calendar.calendar;
proto.clone = _clone.clone;
proto.diff = _diff.diff;
proto.endOf = _startEndOf.endOf;
proto.format = _format.format;
proto.from = _from.from;
proto.fromNow = _from.fromNow;
proto.to = _to.to;
proto.toNow = _to.toNow;
proto.get = _getSet.stringGet;
proto.invalidAt = _valid.invalidAt;
proto.isAfter = _compare.isAfter;
proto.isBefore = _compare.isBefore;
proto.isBetween = _compare.isBetween;
proto.isSame = _compare.isSame;
proto.isSameOrAfter = _compare.isSameOrAfter;
proto.isSameOrBefore = _compare.isSameOrBefore;
proto.isValid = _valid.isValid;
proto.lang = _locale.lang;
proto.locale = _locale.locale;
proto.localeData = _locale.localeData;
proto.max = _minMax.prototypeMax;
proto.min = _minMax.prototypeMin;
proto.parsingFlags = _valid.parsingFlags;
proto.set = _getSet.stringSet;
proto.startOf = _startEndOf.startOf;
proto.subtract = _addSubtract.subtract;
proto.toArray = _toType.toArray;
proto.toObject = _toType.toObject;
proto.toDate = _toType.toDate;
proto.toISOString = _format.toISOString;
proto.inspect = _format.inspect;
proto.toJSON = _toType.toJSON;
proto.toString = _format.toString;
proto.unix = _toType.unix;
proto.valueOf = _toType.valueOf;
proto.creationData = _creationData.creationData;
proto.year = _unitsYear.getSetYear;
proto.isLeapYear = _unitsYear.getIsLeapYear;
proto.weekYear = _unitsWeekYear.getSetWeekYear;
proto.isoWeekYear = _unitsWeekYear.getSetISOWeekYear;
proto.quarter = proto.quarters = _unitsQuarter.getSetQuarter;
proto.month = _unitsMonth.getSetMonth;
proto.daysInMonth = _unitsMonth.getDaysInMonth;
proto.week = proto.weeks = _unitsWeek.getSetWeek;
proto.isoWeek = proto.isoWeeks = _unitsWeek.getSetISOWeek;
proto.weeksInYear = _unitsWeekYear.getWeeksInYear;
proto.isoWeeksInYear = _unitsWeekYear.getISOWeeksInYear;
proto.date = _unitsDayOfMonth.getSetDayOfMonth;
proto.day = proto.days = _unitsDayOfWeek.getSetDayOfWeek;
proto.weekday = _unitsDayOfWeek.getSetLocaleDayOfWeek;
proto.isoWeekday = _unitsDayOfWeek.getSetISODayOfWeek;
proto.dayOfYear = _unitsDayOfYear.getSetDayOfYear;
proto.hour = proto.hours = _unitsHour.getSetHour;
proto.minute = proto.minutes = _unitsMinute.getSetMinute;
proto.second = proto.seconds = _unitsSecond.getSetSecond;
proto.millisecond = proto.milliseconds = _unitsMillisecond.getSetMillisecond;
proto.utcOffset = _unitsOffset.getSetOffset;
proto.utc = _unitsOffset.setOffsetToUTC;
proto.local = _unitsOffset.setOffsetToLocal;
proto.parseZone = _unitsOffset.setOffsetToParsedOffset;
proto.hasAlignedHourOffset = _unitsOffset.hasAlignedHourOffset;
proto.isDST = _unitsOffset.isDaylightSavingTime;
proto.isLocal = _unitsOffset.isLocal;
proto.isUtcOffset = _unitsOffset.isUtcOffset;
proto.isUtc = _unitsOffset.isUtc;
proto.isUTC = _unitsOffset.isUtc;
proto.zoneAbbr = _unitsTimezone.getZoneAbbr;
proto.zoneName = _unitsTimezone.getZoneName;
proto.dates = (0, _utilsDeprecate.deprecate)('dates accessor is deprecated. Use date instead.', _unitsDayOfMonth.getSetDayOfMonth);
proto.months = (0, _utilsDeprecate.deprecate)('months accessor is deprecated. Use month instead', _unitsMonth.getSetMonth);
proto.years = (0, _utilsDeprecate.deprecate)('years accessor is deprecated. Use year instead', _unitsYear.getSetYear);
proto.zone = (0, _utilsDeprecate.deprecate)('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', _unitsOffset.getSetZone);
proto.isDSTShifted = (0, _utilsDeprecate.deprecate)('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', _unitsOffset.isDaylightSavingTimeShifted);

exports['default'] = proto;
module.exports = exports['default'];

},{"../units/day-of-month":96,"../units/day-of-week":97,"../units/day-of-year":98,"../units/hour":99,"../units/millisecond":100,"../units/minute":101,"../units/month":102,"../units/offset":103,"../units/quarter":105,"../units/second":106,"../units/timezone":108,"../units/week":112,"../units/week-year":111,"../units/year":113,"../utils/deprecate":119,"./add-subtract":73,"./calendar":74,"./clone":75,"./compare":76,"./constructor":77,"./creation-data":78,"./diff":79,"./format":80,"./from":81,"./get-set":82,"./locale":83,"./min-max":84,"./start-end-of":88,"./to":90,"./to-type":89,"./valid":91}],88:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.startOf = startOf;
exports.endOf = endOf;

var _unitsAliases = require('../units/aliases');

function startOf(units) {
    units = (0, _unitsAliases.normalizeUnits)(units);
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            this.month(0);
        /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
        /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
        /* falls through */
        case 'hour':
            this.minutes(0);
        /* falls through */
        case 'minute':
            this.seconds(0);
        /* falls through */
        case 'second':
            this.milliseconds(0);
    }

    // weeks are a special case
    if (units === 'week') {
        this.weekday(0);
    }
    if (units === 'isoWeek') {
        this.isoWeekday(1);
    }

    // quarters are also special
    if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
    }

    return this;
}

function endOf(units) {
    units = (0, _unitsAliases.normalizeUnits)(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    return this.startOf(units).add(1, units === 'isoWeek' ? 'week' : units).subtract(1, 'ms');
}

},{"../units/aliases":94}],89:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.valueOf = valueOf;
exports.unix = unix;
exports.toDate = toDate;
exports.toArray = toArray;
exports.toObject = toObject;
exports.toJSON = toJSON;

function valueOf() {
    return this._d.valueOf() - (this._offset || 0) * 60000;
}

function unix() {
    return Math.floor(this.valueOf() / 1000);
}

function toDate() {
    return new Date(this.valueOf());
}

function toArray() {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}

function toObject() {
    var m = this;
    return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
    };
}

function toJSON() {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
}

},{}],90:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.to = to;
exports.toNow = toNow;

var _durationCreate = require('../duration/create');

var _createLocal = require('../create/local');

var _momentConstructor = require('../moment/constructor');

function to(time, withoutSuffix) {
    if (this.isValid() && ((0, _momentConstructor.isMoment)(time) && time.isValid() || (0, _createLocal.createLocal)(time).isValid())) {
        return (0, _durationCreate.createDuration)({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function toNow(withoutSuffix) {
    return this.to((0, _createLocal.createLocal)(), withoutSuffix);
}

},{"../create/local":42,"../duration/create":51,"../moment/constructor":77}],91:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.isValid = isValid;
exports.parsingFlags = parsingFlags;
exports.invalidAt = invalidAt;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createValid = require('../create/valid');

var _utilsExtend = require('../utils/extend');

var _utilsExtend2 = _interopRequireDefault(_utilsExtend);

var _createParsingFlags = require('../create/parsing-flags');

var _createParsingFlags2 = _interopRequireDefault(_createParsingFlags);

function isValid() {
    return (0, _createValid.isValid)(this);
}

function parsingFlags() {
    return (0, _utilsExtend2['default'])({}, (0, _createParsingFlags2['default'])(this));
}

function invalidAt() {
    return (0, _createParsingFlags2['default'])(this).overflow;
}

},{"../create/parsing-flags":43,"../create/valid":45,"../utils/extend":120}],92:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.addRegexToken = addRegexToken;
exports.getParseRegexForToken = getParseRegexForToken;
exports.regexEscape = regexEscape;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsHasOwnProp = require('../utils/has-own-prop');

var _utilsHasOwnProp2 = _interopRequireDefault(_utilsHasOwnProp);

var _utilsIsFunction = require('../utils/is-function');

var _utilsIsFunction2 = _interopRequireDefault(_utilsIsFunction);

var match1 = /\d/;exports.match1 = match1;
//       0 - 9
var match2 = /\d\d/;exports.match2 = match2;
//      00 - 99
var match3 = /\d{3}/;exports.match3 = match3;
//     000 - 999
var match4 = /\d{4}/;exports.match4 = match4;
//    0000 - 9999
var match6 = /[+-]?\d{6}/;exports.match6 = match6;
// -999999 - 999999
var match1to2 = /\d\d?/;exports.match1to2 = match1to2;
//       0 - 99
var match3to4 = /\d\d\d\d?/;exports.match3to4 = match3to4;
//     999 - 9999
var match5to6 = /\d\d\d\d\d\d?/;exports.match5to6 = match5to6;
//   99999 - 999999
var match1to3 = /\d{1,3}/;exports.match1to3 = match1to3;
//       0 - 999
var match1to4 = /\d{1,4}/;exports.match1to4 = match1to4;
//       0 - 9999
var match1to6 = /[+-]?\d{1,6}/;exports.match1to6 = match1to6;
// -999999 - 999999

var matchUnsigned = /\d+/;exports.matchUnsigned = matchUnsigned;
//       0 - inf
var matchSigned = /[+-]?\d+/;exports.matchSigned = matchSigned;
//    -inf - inf

var matchOffset = /Z|[+-]\d\d:?\d\d/gi;exports.matchOffset = matchOffset;
// +00:00 -00:00 +0000 -0000 or Z
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi;exports.matchShortOffset = matchShortOffset;
// +00 -00 +00:00 -00:00 +0000 -0000 or Z

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/;exports.matchTimestamp = matchTimestamp;
// 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;

exports.matchWord = matchWord;

var regexes = {};

function addRegexToken(token, regex, strictRegex) {
    regexes[token] = (0, _utilsIsFunction2['default'])(regex) ? regex : function (isStrict, localeData) {
        return isStrict && strictRegex ? strictRegex : regex;
    };
}

function getParseRegexForToken(token, config) {
    if (!(0, _utilsHasOwnProp2['default'])(regexes, token)) {
        return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
}

// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
    }));
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

},{"../utils/has-own-prop":121,"../utils/is-function":126}],93:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.addParseToken = addParseToken;
exports.addWeekParseToken = addWeekParseToken;
exports.addTimeToArrayFromToken = addTimeToArrayFromToken;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsHasOwnProp = require('../utils/has-own-prop');

var _utilsHasOwnProp2 = _interopRequireDefault(_utilsHasOwnProp);

var _utilsIsNumber = require('../utils/is-number');

var _utilsIsNumber2 = _interopRequireDefault(_utilsIsNumber);

var _utilsToInt = require('../utils/to-int');

var _utilsToInt2 = _interopRequireDefault(_utilsToInt);

var tokens = {};

function addParseToken(token, callback) {
    var i,
        func = callback;
    if (typeof token === 'string') {
        token = [token];
    }
    if ((0, _utilsIsNumber2['default'])(callback)) {
        func = function (input, array) {
            array[callback] = (0, _utilsToInt2['default'])(input);
        };
    }
    for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
    }
}

function addWeekParseToken(token, callback) {
    addParseToken(token, function (input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
    });
}

function addTimeToArrayFromToken(token, input, config) {
    if (input != null && (0, _utilsHasOwnProp2['default'])(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
}

},{"../utils/has-own-prop":121,"../utils/is-number":127,"../utils/to-int":134}],94:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.addUnitAlias = addUnitAlias;
exports.normalizeUnits = normalizeUnits;
exports.normalizeObjectUnits = normalizeObjectUnits;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsHasOwnProp = require('../utils/has-own-prop');

var _utilsHasOwnProp2 = _interopRequireDefault(_utilsHasOwnProp);

var aliases = {};

function addUnitAlias(unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}

function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}

function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
        if ((0, _utilsHasOwnProp2['default'])(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }

    return normalizedInput;
}

},{"../utils/has-own-prop":121}],95:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var YEAR = 0;
exports.YEAR = YEAR;
var MONTH = 1;
exports.MONTH = MONTH;
var DATE = 2;
exports.DATE = DATE;
var HOUR = 3;
exports.HOUR = HOUR;
var MINUTE = 4;
exports.MINUTE = MINUTE;
var SECOND = 5;
exports.SECOND = SECOND;
var MILLISECOND = 6;
exports.MILLISECOND = MILLISECOND;
var WEEK = 7;
exports.WEEK = WEEK;
var WEEKDAY = 8;
exports.WEEKDAY = WEEKDAY;

},{}],96:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _momentGetSet = require('../moment/get-set');

var _formatFormat = require('../format/format');

var _aliases = require('./aliases');

var _priorities = require('./priorities');

var _parseRegex = require('../parse/regex');

var _parseToken = require('../parse/token');

var _constants = require('./constants');

var _utilsToInt = require('../utils/to-int');

var _utilsToInt2 = _interopRequireDefault(_utilsToInt);

// FORMATTING

(0, _formatFormat.addFormatToken)('D', ['DD', 2], 'Do', 'date');

// ALIASES

(0, _aliases.addUnitAlias)('date', 'D');

// PRIOROITY
(0, _priorities.addUnitPriority)('date', 9);

// PARSING

(0, _parseRegex.addRegexToken)('D', _parseRegex.match1to2);
(0, _parseRegex.addRegexToken)('DD', _parseRegex.match1to2, _parseRegex.match2);
(0, _parseRegex.addRegexToken)('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ? locale._dayOfMonthOrdinalParse || locale._ordinalParse : locale._dayOfMonthOrdinalParseLenient;
});

(0, _parseToken.addParseToken)(['D', 'DD'], _constants.DATE);
(0, _parseToken.addParseToken)('Do', function (input, array) {
    array[_constants.DATE] = (0, _utilsToInt2['default'])(input.match(_parseRegex.match1to2)[0], 10);
});

// MOMENTS

var getSetDayOfMonth = (0, _momentGetSet.makeGetSet)('Date', true);
exports.getSetDayOfMonth = getSetDayOfMonth;

},{"../format/format":58,"../moment/get-set":82,"../parse/regex":92,"../parse/token":93,"../utils/to-int":134,"./aliases":94,"./constants":95,"./priorities":104}],97:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.localeWeekdays = localeWeekdays;
exports.localeWeekdaysShort = localeWeekdaysShort;
exports.localeWeekdaysMin = localeWeekdaysMin;
exports.localeWeekdaysParse = localeWeekdaysParse;
exports.getSetDayOfWeek = getSetDayOfWeek;
exports.getSetLocaleDayOfWeek = getSetLocaleDayOfWeek;
exports.getSetISODayOfWeek = getSetISODayOfWeek;
exports.weekdaysRegex = weekdaysRegex;
exports.weekdaysShortRegex = weekdaysShortRegex;
exports.weekdaysMinRegex = weekdaysMinRegex;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _formatFormat = require('../format/format');

var _aliases = require('./aliases');

var _priorities = require('./priorities');

var _parseRegex = require('../parse/regex');

var _parseToken = require('../parse/token');

var _utilsToInt = require('../utils/to-int');

var _utilsToInt2 = _interopRequireDefault(_utilsToInt);

var _utilsIsArray = require('../utils/is-array');

var _utilsIsArray2 = _interopRequireDefault(_utilsIsArray);

var _utilsIndexOf = require('../utils/index-of');

var _utilsIndexOf2 = _interopRequireDefault(_utilsIndexOf);

var _utilsHasOwnProp = require('../utils/has-own-prop');

var _utilsHasOwnProp2 = _interopRequireDefault(_utilsHasOwnProp);

var _createUtc = require('../create/utc');

var _createParsingFlags = require('../create/parsing-flags');

var _createParsingFlags2 = _interopRequireDefault(_createParsingFlags);

// FORMATTING

(0, _formatFormat.addFormatToken)('d', 0, 'do', 'day');

(0, _formatFormat.addFormatToken)('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

(0, _formatFormat.addFormatToken)('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

(0, _formatFormat.addFormatToken)('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

(0, _formatFormat.addFormatToken)('e', 0, 0, 'weekday');
(0, _formatFormat.addFormatToken)('E', 0, 0, 'isoWeekday');

// ALIASES

(0, _aliases.addUnitAlias)('day', 'd');
(0, _aliases.addUnitAlias)('weekday', 'e');
(0, _aliases.addUnitAlias)('isoWeekday', 'E');

// PRIORITY
(0, _priorities.addUnitPriority)('day', 11);
(0, _priorities.addUnitPriority)('weekday', 11);
(0, _priorities.addUnitPriority)('isoWeekday', 11);

// PARSING

(0, _parseRegex.addRegexToken)('d', _parseRegex.match1to2);
(0, _parseRegex.addRegexToken)('e', _parseRegex.match1to2);
(0, _parseRegex.addRegexToken)('E', _parseRegex.match1to2);
(0, _parseRegex.addRegexToken)('dd', function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
(0, _parseRegex.addRegexToken)('ddd', function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
(0, _parseRegex.addRegexToken)('dddd', function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});

(0, _parseToken.addWeekParseToken)(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
        week.d = weekday;
    } else {
        (0, _createParsingFlags2['default'])(config).invalidWeekday = input;
    }
});

(0, _parseToken.addWeekParseToken)(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = (0, _utilsToInt2['default'])(input);
});

// HELPERS

function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
        return input;
    }

    if (!isNaN(input)) {
        return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }

    return null;
}

function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
}

// LOCALES

var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
exports.defaultLocaleWeekdays = defaultLocaleWeekdays;

function localeWeekdays(m, format) {
    if (!m) {
        return (0, _utilsIsArray2['default'])(this._weekdays) ? this._weekdays : this._weekdays['standalone'];
    }
    return (0, _utilsIsArray2['default'])(this._weekdays) ? this._weekdays[m.day()] : this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
}

var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
exports.defaultLocaleWeekdaysShort = defaultLocaleWeekdaysShort;

function localeWeekdaysShort(m) {
    return m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}

var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
exports.defaultLocaleWeekdaysMin = defaultLocaleWeekdaysMin;

function localeWeekdaysMin(m) {
    return m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}

function handleStrictParse(weekdayName, format, strict) {
    var i,
        ii,
        mom,
        llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];

        for (i = 0; i < 7; ++i) {
            mom = (0, _createUtc.createUTC)([2000, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'dddd') {
            ii = _utilsIndexOf2['default'].call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = _utilsIndexOf2['default'].call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = _utilsIndexOf2['default'].call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'dddd') {
            ii = _utilsIndexOf2['default'].call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = _utilsIndexOf2['default'].call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = _utilsIndexOf2['default'].call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = _utilsIndexOf2['default'].call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = _utilsIndexOf2['default'].call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = _utilsIndexOf2['default'].call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = _utilsIndexOf2['default'].call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = _utilsIndexOf2['default'].call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = _utilsIndexOf2['default'].call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeWeekdaysParse(weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
        return handleStrictParse.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already

        mom = (0, _createUtc.createUTC)([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
}

// MOMENTS

function getSetDayOfWeek(input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}

function getSetLocaleDayOfWeek(input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}

function getSetISODayOfWeek(input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }

    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
        return this.day() || 7;
    }
}

var defaultWeekdaysRegex = _parseRegex.matchWord;

function weekdaysRegex(isStrict) {
    if (this._weekdaysParseExact) {
        if (!(0, _utilsHasOwnProp2['default'])(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysStrictRegex;
        } else {
            return this._weekdaysRegex;
        }
    } else {
        if (!(0, _utilsHasOwnProp2['default'])(this, '_weekdaysRegex')) {
            this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
    }
}

var defaultWeekdaysShortRegex = _parseRegex.matchWord;

function weekdaysShortRegex(isStrict) {
    if (this._weekdaysParseExact) {
        if (!(0, _utilsHasOwnProp2['default'])(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysShortStrictRegex;
        } else {
            return this._weekdaysShortRegex;
        }
    } else {
        if (!(0, _utilsHasOwnProp2['default'])(this, '_weekdaysShortRegex')) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
}

var defaultWeekdaysMinRegex = _parseRegex.matchWord;

function weekdaysMinRegex(isStrict) {
    if (this._weekdaysParseExact) {
        if (!(0, _utilsHasOwnProp2['default'])(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysMinStrictRegex;
        } else {
            return this._weekdaysMinRegex;
        }
    } else {
        if (!(0, _utilsHasOwnProp2['default'])(this, '_weekdaysMinRegex')) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
}

function computeWeekdaysParse() {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var minPieces = [],
        shortPieces = [],
        longPieces = [],
        mixedPieces = [],
        i,
        mom,
        minp,
        shortp,
        longp;
    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = (0, _createUtc.createUTC)([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = (0, _parseRegex.regexEscape)(shortPieces[i]);
        longPieces[i] = (0, _parseRegex.regexEscape)(longPieces[i]);
        mixedPieces[i] = (0, _parseRegex.regexEscape)(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;

    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}

},{"../create/parsing-flags":43,"../create/utc":44,"../format/format":58,"../parse/regex":92,"../parse/token":93,"../utils/has-own-prop":121,"../utils/index-of":123,"../utils/is-array":124,"../utils/to-int":134,"./aliases":94,"./priorities":104}],98:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.getSetDayOfYear = getSetDayOfYear;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _formatFormat = require('../format/format');

var _aliases = require('./aliases');

var _priorities = require('./priorities');

var _parseRegex = require('../parse/regex');

var _year = require('./year');

var _createDateFromArray = require('../create/date-from-array');

var _parseToken = require('../parse/token');

var _utilsToInt = require('../utils/to-int');

var _utilsToInt2 = _interopRequireDefault(_utilsToInt);

// FORMATTING

(0, _formatFormat.addFormatToken)('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

(0, _aliases.addUnitAlias)('dayOfYear', 'DDD');

// PRIORITY
(0, _priorities.addUnitPriority)('dayOfYear', 4);

// PARSING

(0, _parseRegex.addRegexToken)('DDD', _parseRegex.match1to3);
(0, _parseRegex.addRegexToken)('DDDD', _parseRegex.match3);
(0, _parseToken.addParseToken)(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = (0, _utilsToInt2['default'])(input);
});

// HELPERS

// MOMENTS

function getSetDayOfYear(input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
}

},{"../create/date-from-array":35,"../format/format":58,"../parse/regex":92,"../parse/token":93,"../utils/to-int":134,"./aliases":94,"./priorities":104,"./year":113}],99:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.localeIsPM = localeIsPM;
exports.localeMeridiem = localeMeridiem;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _momentGetSet = require('../moment/get-set');

var _formatFormat = require('../format/format');

var _aliases = require('./aliases');

var _priorities = require('./priorities');

var _parseRegex = require('../parse/regex');

var _parseToken = require('../parse/token');

var _constants = require('./constants');

var _utilsToInt = require('../utils/to-int');

var _utilsToInt2 = _interopRequireDefault(_utilsToInt);

var _utilsZeroFill = require('../utils/zero-fill');

var _utilsZeroFill2 = _interopRequireDefault(_utilsZeroFill);

var _createParsingFlags = require('../create/parsing-flags');

var _createParsingFlags2 = _interopRequireDefault(_createParsingFlags);

// FORMATTING

function hFormat() {
    return this.hours() % 12 || 12;
}

function kFormat() {
    return this.hours() || 24;
}

(0, _formatFormat.addFormatToken)('H', ['HH', 2], 0, 'hour');
(0, _formatFormat.addFormatToken)('h', ['hh', 2], 0, hFormat);
(0, _formatFormat.addFormatToken)('k', ['kk', 2], 0, kFormat);

(0, _formatFormat.addFormatToken)('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + (0, _utilsZeroFill2['default'])(this.minutes(), 2);
});

(0, _formatFormat.addFormatToken)('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + (0, _utilsZeroFill2['default'])(this.minutes(), 2) + (0, _utilsZeroFill2['default'])(this.seconds(), 2);
});

(0, _formatFormat.addFormatToken)('Hmm', 0, 0, function () {
    return '' + this.hours() + (0, _utilsZeroFill2['default'])(this.minutes(), 2);
});

(0, _formatFormat.addFormatToken)('Hmmss', 0, 0, function () {
    return '' + this.hours() + (0, _utilsZeroFill2['default'])(this.minutes(), 2) + (0, _utilsZeroFill2['default'])(this.seconds(), 2);
});

function meridiem(token, lowercase) {
    (0, _formatFormat.addFormatToken)(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}

meridiem('a', true);
meridiem('A', false);

// ALIASES

(0, _aliases.addUnitAlias)('hour', 'h');

// PRIORITY
(0, _priorities.addUnitPriority)('hour', 13);

// PARSING

function matchMeridiem(isStrict, locale) {
    return locale._meridiemParse;
}

(0, _parseRegex.addRegexToken)('a', matchMeridiem);
(0, _parseRegex.addRegexToken)('A', matchMeridiem);
(0, _parseRegex.addRegexToken)('H', _parseRegex.match1to2);
(0, _parseRegex.addRegexToken)('h', _parseRegex.match1to2);
(0, _parseRegex.addRegexToken)('k', _parseRegex.match1to2);
(0, _parseRegex.addRegexToken)('HH', _parseRegex.match1to2, _parseRegex.match2);
(0, _parseRegex.addRegexToken)('hh', _parseRegex.match1to2, _parseRegex.match2);
(0, _parseRegex.addRegexToken)('kk', _parseRegex.match1to2, _parseRegex.match2);

(0, _parseRegex.addRegexToken)('hmm', _parseRegex.match3to4);
(0, _parseRegex.addRegexToken)('hmmss', _parseRegex.match5to6);
(0, _parseRegex.addRegexToken)('Hmm', _parseRegex.match3to4);
(0, _parseRegex.addRegexToken)('Hmmss', _parseRegex.match5to6);

(0, _parseToken.addParseToken)(['H', 'HH'], _constants.HOUR);
(0, _parseToken.addParseToken)(['k', 'kk'], function (input, array, config) {
    var kInput = (0, _utilsToInt2['default'])(input);
    array[_constants.HOUR] = kInput === 24 ? 0 : kInput;
});
(0, _parseToken.addParseToken)(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
});
(0, _parseToken.addParseToken)(['h', 'hh'], function (input, array, config) {
    array[_constants.HOUR] = (0, _utilsToInt2['default'])(input);
    (0, _createParsingFlags2['default'])(config).bigHour = true;
});
(0, _parseToken.addParseToken)('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[_constants.HOUR] = (0, _utilsToInt2['default'])(input.substr(0, pos));
    array[_constants.MINUTE] = (0, _utilsToInt2['default'])(input.substr(pos));
    (0, _createParsingFlags2['default'])(config).bigHour = true;
});
(0, _parseToken.addParseToken)('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[_constants.HOUR] = (0, _utilsToInt2['default'])(input.substr(0, pos1));
    array[_constants.MINUTE] = (0, _utilsToInt2['default'])(input.substr(pos1, 2));
    array[_constants.SECOND] = (0, _utilsToInt2['default'])(input.substr(pos2));
    (0, _createParsingFlags2['default'])(config).bigHour = true;
});
(0, _parseToken.addParseToken)('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[_constants.HOUR] = (0, _utilsToInt2['default'])(input.substr(0, pos));
    array[_constants.MINUTE] = (0, _utilsToInt2['default'])(input.substr(pos));
});
(0, _parseToken.addParseToken)('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[_constants.HOUR] = (0, _utilsToInt2['default'])(input.substr(0, pos1));
    array[_constants.MINUTE] = (0, _utilsToInt2['default'])(input.substr(pos1, 2));
    array[_constants.SECOND] = (0, _utilsToInt2['default'])(input.substr(pos2));
});

// LOCALES

function localeIsPM(input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return (input + '').toLowerCase().charAt(0) === 'p';
}

var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
exports.defaultLocaleMeridiemParse = defaultLocaleMeridiemParse;

function localeMeridiem(hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
}

// MOMENTS

// Setting the hour should keep the time, because the user explicitly
// specified which hour he wants. So trying to maintain the same hour (in
// a new timezone) makes sense. Adding/subtracting hours does not follow
// this rule.
var getSetHour = (0, _momentGetSet.makeGetSet)('Hours', true);
exports.getSetHour = getSetHour;

},{"../create/parsing-flags":43,"../format/format":58,"../moment/get-set":82,"../parse/regex":92,"../parse/token":93,"../utils/to-int":134,"../utils/zero-fill":135,"./aliases":94,"./constants":95,"./priorities":104}],100:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _momentGetSet = require('../moment/get-set');

var _formatFormat = require('../format/format');

var _aliases = require('./aliases');

var _priorities = require('./priorities');

var _parseRegex = require('../parse/regex');

var _parseToken = require('../parse/token');

var _constants = require('./constants');

var _utilsToInt = require('../utils/to-int');

var _utilsToInt2 = _interopRequireDefault(_utilsToInt);

// FORMATTING

(0, _formatFormat.addFormatToken)('S', 0, 0, function () {
    return ~ ~(this.millisecond() / 100);
});

(0, _formatFormat.addFormatToken)(0, ['SS', 2], 0, function () {
    return ~ ~(this.millisecond() / 10);
});

(0, _formatFormat.addFormatToken)(0, ['SSS', 3], 0, 'millisecond');
(0, _formatFormat.addFormatToken)(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
(0, _formatFormat.addFormatToken)(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
(0, _formatFormat.addFormatToken)(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
});
(0, _formatFormat.addFormatToken)(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
});
(0, _formatFormat.addFormatToken)(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
});
(0, _formatFormat.addFormatToken)(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
});

// ALIASES

(0, _aliases.addUnitAlias)('millisecond', 'ms');

// PRIORITY

(0, _priorities.addUnitPriority)('millisecond', 16);

// PARSING

(0, _parseRegex.addRegexToken)('S', _parseRegex.match1to3, _parseRegex.match1);
(0, _parseRegex.addRegexToken)('SS', _parseRegex.match1to3, _parseRegex.match2);
(0, _parseRegex.addRegexToken)('SSS', _parseRegex.match1to3, _parseRegex.match3);

var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
    (0, _parseRegex.addRegexToken)(token, _parseRegex.matchUnsigned);
}

function parseMs(input, array) {
    array[_constants.MILLISECOND] = (0, _utilsToInt2['default'])(('0.' + input) * 1000);
}

for (token = 'S'; token.length <= 9; token += 'S') {
    (0, _parseToken.addParseToken)(token, parseMs);
}
// MOMENTS

var getSetMillisecond = (0, _momentGetSet.makeGetSet)('Milliseconds', false);
exports.getSetMillisecond = getSetMillisecond;

},{"../format/format":58,"../moment/get-set":82,"../parse/regex":92,"../parse/token":93,"../utils/to-int":134,"./aliases":94,"./constants":95,"./priorities":104}],101:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _momentGetSet = require('../moment/get-set');

var _formatFormat = require('../format/format');

var _aliases = require('./aliases');

var _priorities = require('./priorities');

var _parseRegex = require('../parse/regex');

var _parseToken = require('../parse/token');

var _constants = require('./constants');

// FORMATTING

(0, _formatFormat.addFormatToken)('m', ['mm', 2], 0, 'minute');

// ALIASES

(0, _aliases.addUnitAlias)('minute', 'm');

// PRIORITY

(0, _priorities.addUnitPriority)('minute', 14);

// PARSING

(0, _parseRegex.addRegexToken)('m', _parseRegex.match1to2);
(0, _parseRegex.addRegexToken)('mm', _parseRegex.match1to2, _parseRegex.match2);
(0, _parseToken.addParseToken)(['m', 'mm'], _constants.MINUTE);

// MOMENTS

var getSetMinute = (0, _momentGetSet.makeGetSet)('Minutes', false);
exports.getSetMinute = getSetMinute;

},{"../format/format":58,"../moment/get-set":82,"../parse/regex":92,"../parse/token":93,"./aliases":94,"./constants":95,"./priorities":104}],102:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.daysInMonth = daysInMonth;
exports.localeMonths = localeMonths;
exports.localeMonthsShort = localeMonthsShort;
exports.localeMonthsParse = localeMonthsParse;
exports.setMonth = setMonth;
exports.getSetMonth = getSetMonth;
exports.getDaysInMonth = getDaysInMonth;
exports.monthsShortRegex = monthsShortRegex;
exports.monthsRegex = monthsRegex;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _momentGetSet = require('../moment/get-set');

var _utilsHasOwnProp = require('../utils/has-own-prop');

var _utilsHasOwnProp2 = _interopRequireDefault(_utilsHasOwnProp);

var _formatFormat = require('../format/format');

var _aliases = require('./aliases');

var _priorities = require('./priorities');

var _parseRegex = require('../parse/regex');

var _parseToken = require('../parse/token');

var _utilsHooks = require('../utils/hooks');

var _constants = require('./constants');

var _utilsToInt = require('../utils/to-int');

var _utilsToInt2 = _interopRequireDefault(_utilsToInt);

var _utilsIsArray = require('../utils/is-array');

var _utilsIsArray2 = _interopRequireDefault(_utilsIsArray);

var _utilsIsNumber = require('../utils/is-number');

var _utilsIsNumber2 = _interopRequireDefault(_utilsIsNumber);

var _utilsIndexOf = require('../utils/index-of');

var _utilsIndexOf2 = _interopRequireDefault(_utilsIndexOf);

var _createUtc = require('../create/utc');

var _createParsingFlags = require('../create/parsing-flags');

var _createParsingFlags2 = _interopRequireDefault(_createParsingFlags);

function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

// FORMATTING

(0, _formatFormat.addFormatToken)('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
});

(0, _formatFormat.addFormatToken)('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

(0, _formatFormat.addFormatToken)('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});

// ALIASES

(0, _aliases.addUnitAlias)('month', 'M');

// PRIORITY

(0, _priorities.addUnitPriority)('month', 8);

// PARSING

(0, _parseRegex.addRegexToken)('M', _parseRegex.match1to2);
(0, _parseRegex.addRegexToken)('MM', _parseRegex.match1to2, _parseRegex.match2);
(0, _parseRegex.addRegexToken)('MMM', function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
});
(0, _parseRegex.addRegexToken)('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
});

(0, _parseToken.addParseToken)(['M', 'MM'], function (input, array) {
    array[_constants.MONTH] = (0, _utilsToInt2['default'])(input) - 1;
});

(0, _parseToken.addParseToken)(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
        array[_constants.MONTH] = month;
    } else {
        (0, _createParsingFlags2['default'])(config).invalidMonth = input;
    }
});

// LOCALES

var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
exports.defaultLocaleMonths = defaultLocaleMonths;

function localeMonths(m, format) {
    if (!m) {
        return (0, _utilsIsArray2['default'])(this._months) ? this._months : this._months['standalone'];
    }
    return (0, _utilsIsArray2['default'])(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}

var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
exports.defaultLocaleMonthsShort = defaultLocaleMonthsShort;

function localeMonthsShort(m, format) {
    if (!m) {
        return (0, _utilsIsArray2['default'])(this._monthsShort) ? this._monthsShort : this._monthsShort['standalone'];
    }
    return (0, _utilsIsArray2['default'])(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}

function handleStrictParse(monthName, format, strict) {
    var i,
        ii,
        mom,
        llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
        // this is not used
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
            mom = (0, _createUtc.createUTC)([2000, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'MMM') {
            ii = _utilsIndexOf2['default'].call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = _utilsIndexOf2['default'].call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'MMM') {
            ii = _utilsIndexOf2['default'].call(this._shortMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = _utilsIndexOf2['default'].call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = _utilsIndexOf2['default'].call(this._longMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = _utilsIndexOf2['default'].call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeMonthsParse(monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = (0, _createUtc.createUTC)([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
            return i;
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
            return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
}

// MOMENTS

function setMonth(mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    if (typeof value === 'string') {
        if (/^\d+$/.test(value)) {
            value = (0, _utilsToInt2['default'])(value);
        } else {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (!(0, _utilsIsNumber2['default'])(value)) {
                return mom;
            }
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

function getSetMonth(value) {
    if (value != null) {
        setMonth(this, value);
        _utilsHooks.hooks.updateOffset(this, true);
        return this;
    } else {
        return (0, _momentGetSet.get)(this, 'Month');
    }
}

function getDaysInMonth() {
    return daysInMonth(this.year(), this.month());
}

var defaultMonthsShortRegex = _parseRegex.matchWord;

function monthsShortRegex(isStrict) {
    if (this._monthsParseExact) {
        if (!(0, _utilsHasOwnProp2['default'])(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsShortStrictRegex;
        } else {
            return this._monthsShortRegex;
        }
    } else {
        if (!(0, _utilsHasOwnProp2['default'])(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
    }
}

var defaultMonthsRegex = _parseRegex.matchWord;

function monthsRegex(isStrict) {
    if (this._monthsParseExact) {
        if (!(0, _utilsHasOwnProp2['default'])(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsStrictRegex;
        } else {
            return this._monthsRegex;
        }
    } else {
        if (!(0, _utilsHasOwnProp2['default'])(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
    }
}

function computeMonthsParse() {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var shortPieces = [],
        longPieces = [],
        mixedPieces = [],
        i,
        mom;
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = (0, _createUtc.createUTC)([2000, i]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
        shortPieces[i] = (0, _parseRegex.regexEscape)(shortPieces[i]);
        longPieces[i] = (0, _parseRegex.regexEscape)(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
        mixedPieces[i] = (0, _parseRegex.regexEscape)(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}

},{"../create/parsing-flags":43,"../create/utc":44,"../format/format":58,"../moment/get-set":82,"../parse/regex":92,"../parse/token":93,"../utils/has-own-prop":121,"../utils/hooks":122,"../utils/index-of":123,"../utils/is-array":124,"../utils/is-number":127,"../utils/to-int":134,"./aliases":94,"./constants":95,"./priorities":104}],103:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.cloneWithOffset = cloneWithOffset;
exports.getSetOffset = getSetOffset;
exports.getSetZone = getSetZone;
exports.setOffsetToUTC = setOffsetToUTC;
exports.setOffsetToLocal = setOffsetToLocal;
exports.setOffsetToParsedOffset = setOffsetToParsedOffset;
exports.hasAlignedHourOffset = hasAlignedHourOffset;
exports.isDaylightSavingTime = isDaylightSavingTime;
exports.isDaylightSavingTimeShifted = isDaylightSavingTimeShifted;
exports.isLocal = isLocal;
exports.isUtcOffset = isUtcOffset;
exports.isUtc = isUtc;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsZeroFill = require('../utils/zero-fill');

var _utilsZeroFill2 = _interopRequireDefault(_utilsZeroFill);

var _durationCreate = require('../duration/create');

var _momentAddSubtract = require('../moment/add-subtract');

var _momentConstructor = require('../moment/constructor');

var _formatFormat = require('../format/format');

var _parseRegex = require('../parse/regex');

var _parseToken = require('../parse/token');

var _createLocal = require('../create/local');

var _createFromAnything = require('../create/from-anything');

var _createUtc = require('../create/utc');

var _utilsIsDate = require('../utils/is-date');

var _utilsIsDate2 = _interopRequireDefault(_utilsIsDate);

var _utilsToInt = require('../utils/to-int');

var _utilsToInt2 = _interopRequireDefault(_utilsToInt);

var _utilsIsUndefined = require('../utils/is-undefined');

var _utilsIsUndefined2 = _interopRequireDefault(_utilsIsUndefined);

var _utilsCompareArrays = require('../utils/compare-arrays');

var _utilsCompareArrays2 = _interopRequireDefault(_utilsCompareArrays);

var _utilsHooks = require('../utils/hooks');

// FORMATTING

function offset(token, separator) {
    (0, _formatFormat.addFormatToken)(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + (0, _utilsZeroFill2['default'])(~ ~(offset / 60), 2) + separator + (0, _utilsZeroFill2['default'])(~ ~offset % 60, 2);
    });
}

offset('Z', ':');
offset('ZZ', '');

// PARSING

(0, _parseRegex.addRegexToken)('Z', _parseRegex.matchShortOffset);
(0, _parseRegex.addRegexToken)('ZZ', _parseRegex.matchShortOffset);
(0, _parseToken.addParseToken)(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(_parseRegex.matchShortOffset, input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
        return null;
    }

    var chunk = matches[matches.length - 1] || [];
    var parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + (0, _utilsToInt2['default'])(parts[2]);

    return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
}

// Return a moment from input, that is local/utc/zone equivalent to model.

function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = ((0, _momentConstructor.isMoment)(input) || (0, _utilsIsDate2['default'])(input) ? input.valueOf() : (0, _createLocal.createLocal)(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        _utilsHooks.hooks.updateOffset(res, false);
        return res;
    } else {
        return (0, _createLocal.createLocal)(input).local();
    }
}

function getDateOffset(m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
_utilsHooks.hooks.updateOffset = function () {};

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.

function getSetOffset(input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(_parseRegex.matchShortOffset, input);
            if (input === null) {
                return this;
            }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.add(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                (0, _momentAddSubtract.addSubtract)(this, (0, _durationCreate.createDuration)(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                _utilsHooks.hooks.updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
        return this;
    } else {
        return this._isUTC ? offset : getDateOffset(this);
    }
}

function getSetZone(input, keepLocalTime) {
    if (input != null) {
        if (typeof input !== 'string') {
            input = -input;
        }

        this.utcOffset(input, keepLocalTime);

        return this;
    } else {
        return -this.utcOffset();
    }
}

function setOffsetToUTC(keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
}

function setOffsetToLocal(keepLocalTime) {
    if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;

        if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
        }
    }
    return this;
}

function setOffsetToParsedOffset() {
    if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
        var tZone = offsetFromString(_parseRegex.matchOffset, this._i);
        if (tZone != null) {
            this.utcOffset(tZone);
        } else {
            this.utcOffset(0, true);
        }
    }
    return this;
}

function hasAlignedHourOffset(input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? (0, _createLocal.createLocal)(input).utcOffset() : 0;

    return (this.utcOffset() - input) % 60 === 0;
}

function isDaylightSavingTime() {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}

function isDaylightSavingTimeShifted() {
    if (!(0, _utilsIsUndefined2['default'])(this._isDSTShifted)) {
        return this._isDSTShifted;
    }

    var c = {};

    (0, _momentConstructor.copyConfig)(c, this);
    c = (0, _createFromAnything.prepareConfig)(c);

    if (c._a) {
        var other = c._isUTC ? (0, _createUtc.createUTC)(c._a) : (0, _createLocal.createLocal)(c._a);
        this._isDSTShifted = this.isValid() && (0, _utilsCompareArrays2['default'])(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }

    return this._isDSTShifted;
}

function isLocal() {
    return this.isValid() ? !this._isUTC : false;
}

function isUtcOffset() {
    return this.isValid() ? this._isUTC : false;
}

function isUtc() {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}

},{"../create/from-anything":36,"../create/local":42,"../create/utc":44,"../duration/create":51,"../format/format":58,"../moment/add-subtract":73,"../moment/constructor":77,"../parse/regex":92,"../parse/token":93,"../utils/compare-arrays":117,"../utils/hooks":122,"../utils/is-date":125,"../utils/is-undefined":130,"../utils/to-int":134,"../utils/zero-fill":135}],104:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addUnitPriority = addUnitPriority;
exports.getPrioritizedUnits = getPrioritizedUnits;
var priorities = {};

function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}

function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
        units.push({ unit: u, priority: priorities[u] });
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}

},{}],105:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.getSetQuarter = getSetQuarter;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _formatFormat = require('../format/format');

var _aliases = require('./aliases');

var _priorities = require('./priorities');

var _parseRegex = require('../parse/regex');

var _parseToken = require('../parse/token');

var _constants = require('./constants');

var _utilsToInt = require('../utils/to-int');

var _utilsToInt2 = _interopRequireDefault(_utilsToInt);

// FORMATTING

(0, _formatFormat.addFormatToken)('Q', 0, 'Qo', 'quarter');

// ALIASES

(0, _aliases.addUnitAlias)('quarter', 'Q');

// PRIORITY

(0, _priorities.addUnitPriority)('quarter', 7);

// PARSING

(0, _parseRegex.addRegexToken)('Q', _parseRegex.match1);
(0, _parseToken.addParseToken)('Q', function (input, array) {
    array[_constants.MONTH] = ((0, _utilsToInt2['default'])(input) - 1) * 3;
});

// MOMENTS

function getSetQuarter(input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}

},{"../format/format":58,"../parse/regex":92,"../parse/token":93,"../utils/to-int":134,"./aliases":94,"./constants":95,"./priorities":104}],106:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _momentGetSet = require('../moment/get-set');

var _formatFormat = require('../format/format');

var _aliases = require('./aliases');

var _priorities = require('./priorities');

var _parseRegex = require('../parse/regex');

var _parseToken = require('../parse/token');

var _constants = require('./constants');

// FORMATTING

(0, _formatFormat.addFormatToken)('s', ['ss', 2], 0, 'second');

// ALIASES

(0, _aliases.addUnitAlias)('second', 's');

// PRIORITY

(0, _priorities.addUnitPriority)('second', 15);

// PARSING

(0, _parseRegex.addRegexToken)('s', _parseRegex.match1to2);
(0, _parseRegex.addRegexToken)('ss', _parseRegex.match1to2, _parseRegex.match2);
(0, _parseToken.addParseToken)(['s', 'ss'], _constants.SECOND);

// MOMENTS

var getSetSecond = (0, _momentGetSet.makeGetSet)('Seconds', false);
exports.getSetSecond = getSetSecond;

},{"../format/format":58,"../moment/get-set":82,"../parse/regex":92,"../parse/token":93,"./aliases":94,"./constants":95,"./priorities":104}],107:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _formatFormat = require('../format/format');

var _parseRegex = require('../parse/regex');

var _parseToken = require('../parse/token');

var _utilsToInt = require('../utils/to-int');

var _utilsToInt2 = _interopRequireDefault(_utilsToInt);

// FORMATTING

(0, _formatFormat.addFormatToken)('X', 0, 0, 'unix');
(0, _formatFormat.addFormatToken)('x', 0, 0, 'valueOf');

// PARSING

(0, _parseRegex.addRegexToken)('x', _parseRegex.matchSigned);
(0, _parseRegex.addRegexToken)('X', _parseRegex.matchTimestamp);
(0, _parseToken.addParseToken)('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
(0, _parseToken.addParseToken)('x', function (input, array, config) {
    config._d = new Date((0, _utilsToInt2['default'])(input));
});

},{"../format/format":58,"../parse/regex":92,"../parse/token":93,"../utils/to-int":134}],108:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.getZoneAbbr = getZoneAbbr;
exports.getZoneName = getZoneName;

var _formatFormat = require('../format/format');

// FORMATTING

(0, _formatFormat.addFormatToken)('z', 0, 0, 'zoneAbbr');
(0, _formatFormat.addFormatToken)('zz', 0, 0, 'zoneName');

// MOMENTS

function getZoneAbbr() {
    return this._isUTC ? 'UTC' : '';
}

function getZoneName() {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}

},{"../format/format":58}],109:[function(require,module,exports){
// Side effect imports
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

require('./day-of-month');

require('./day-of-week');

require('./day-of-year');

require('./hour');

require('./millisecond');

require('./minute');

require('./month');

require('./offset');

require('./quarter');

require('./second');

require('./timestamp');

require('./timezone');

require('./week-year');

require('./week');

require('./year');

var _aliases = require('./aliases');

exports.normalizeUnits = _aliases.normalizeUnits;

},{"./aliases":94,"./day-of-month":96,"./day-of-week":97,"./day-of-year":98,"./hour":99,"./millisecond":100,"./minute":101,"./month":102,"./offset":103,"./quarter":105,"./second":106,"./timestamp":107,"./timezone":108,"./week":112,"./week-year":111,"./year":113}],110:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.dayOfYearFromWeeks = dayOfYearFromWeeks;
exports.weekOfYear = weekOfYear;
exports.weeksInYear = weeksInYear;

var _year = require('./year');

var _createLocal = require('../create/local');

var _createDateFromArray = require('../create/date-from-array');

// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
    fwd = 7 + dow - doy,

    // first-week day local weekday -- which local weekday is fwd
    fwdlw = (7 + (0, _createDateFromArray.createUTCDate)(year, 0, fwd).getUTCDay() - dow) % 7;

    return -fwdlw + fwd - 1;
}

// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday

function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear,
        resDayOfYear;

    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = (0, _year.daysInYear)(resYear) + dayOfYear;
    } else if (dayOfYear > (0, _year.daysInYear)(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - (0, _year.daysInYear)(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }

    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}

function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek,
        resYear;

    if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
    } else {
        resYear = mom.year();
        resWeek = week;
    }

    return {
        week: resWeek,
        year: resYear
    };
}

function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return ((0, _year.daysInYear)(year) - weekOffset + weekOffsetNext) / 7;
}

},{"../create/date-from-array":35,"../create/local":42,"./year":113}],111:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.getSetWeekYear = getSetWeekYear;
exports.getSetISOWeekYear = getSetISOWeekYear;
exports.getISOWeeksInYear = getISOWeeksInYear;
exports.getWeeksInYear = getWeeksInYear;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _formatFormat = require('../format/format');

var _aliases = require('./aliases');

var _priorities = require('./priorities');

var _parseRegex = require('../parse/regex');

var _parseToken = require('../parse/token');

var _weekCalendarUtils = require('./week-calendar-utils');

var _utilsToInt = require('../utils/to-int');

var _utilsToInt2 = _interopRequireDefault(_utilsToInt);

var _utilsHooks = require('../utils/hooks');

var _createLocal = require('../create/local');

var _createDateFromArray = require('../create/date-from-array');

// FORMATTING

(0, _formatFormat.addFormatToken)(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
});

(0, _formatFormat.addFormatToken)(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
});

function addWeekYearFormatToken(token, getter) {
    (0, _formatFormat.addFormatToken)(0, [token, token.length], 0, getter);
}

addWeekYearFormatToken('gggg', 'weekYear');
addWeekYearFormatToken('ggggg', 'weekYear');
addWeekYearFormatToken('GGGG', 'isoWeekYear');
addWeekYearFormatToken('GGGGG', 'isoWeekYear');

// ALIASES

(0, _aliases.addUnitAlias)('weekYear', 'gg');
(0, _aliases.addUnitAlias)('isoWeekYear', 'GG');

// PRIORITY

(0, _priorities.addUnitPriority)('weekYear', 1);
(0, _priorities.addUnitPriority)('isoWeekYear', 1);

// PARSING

(0, _parseRegex.addRegexToken)('G', _parseRegex.matchSigned);
(0, _parseRegex.addRegexToken)('g', _parseRegex.matchSigned);
(0, _parseRegex.addRegexToken)('GG', _parseRegex.match1to2, _parseRegex.match2);
(0, _parseRegex.addRegexToken)('gg', _parseRegex.match1to2, _parseRegex.match2);
(0, _parseRegex.addRegexToken)('GGGG', _parseRegex.match1to4, _parseRegex.match4);
(0, _parseRegex.addRegexToken)('gggg', _parseRegex.match1to4, _parseRegex.match4);
(0, _parseRegex.addRegexToken)('GGGGG', _parseRegex.match1to6, _parseRegex.match6);
(0, _parseRegex.addRegexToken)('ggggg', _parseRegex.match1to6, _parseRegex.match6);

(0, _parseToken.addWeekParseToken)(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = (0, _utilsToInt2['default'])(input);
});

(0, _parseToken.addWeekParseToken)(['gg', 'GG'], function (input, week, config, token) {
    week[token] = _utilsHooks.hooks.parseTwoDigitYear(input);
});

// MOMENTS

function getSetWeekYear(input) {
    return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
}

function getSetISOWeekYear(input) {
    return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
}

function getISOWeeksInYear() {
    return (0, _weekCalendarUtils.weeksInYear)(this.year(), 1, 4);
}

function getWeeksInYear() {
    var weekInfo = this.localeData()._week;
    return (0, _weekCalendarUtils.weeksInYear)(this.year(), weekInfo.dow, weekInfo.doy);
}

function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
        return (0, _weekCalendarUtils.weekOfYear)(this, dow, doy).year;
    } else {
        weeksTarget = (0, _weekCalendarUtils.weeksInYear)(input, dow, doy);
        if (week > weeksTarget) {
            week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
}

function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = (0, _weekCalendarUtils.dayOfYearFromWeeks)(weekYear, week, weekday, dow, doy),
        date = (0, _createDateFromArray.createUTCDate)(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
}

},{"../create/date-from-array":35,"../create/local":42,"../format/format":58,"../parse/regex":92,"../parse/token":93,"../utils/hooks":122,"../utils/to-int":134,"./aliases":94,"./priorities":104,"./week-calendar-utils":110}],112:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.localeWeek = localeWeek;
exports.localeFirstDayOfWeek = localeFirstDayOfWeek;
exports.localeFirstDayOfYear = localeFirstDayOfYear;
exports.getSetWeek = getSetWeek;
exports.getSetISOWeek = getSetISOWeek;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _formatFormat = require('../format/format');

var _aliases = require('./aliases');

var _priorities = require('./priorities');

var _parseRegex = require('../parse/regex');

var _parseToken = require('../parse/token');

var _utilsToInt = require('../utils/to-int');

var _utilsToInt2 = _interopRequireDefault(_utilsToInt);

var _createLocal = require('../create/local');

var _weekCalendarUtils = require('./week-calendar-utils');

// FORMATTING

(0, _formatFormat.addFormatToken)('w', ['ww', 2], 'wo', 'week');
(0, _formatFormat.addFormatToken)('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

(0, _aliases.addUnitAlias)('week', 'w');
(0, _aliases.addUnitAlias)('isoWeek', 'W');

// PRIORITIES

(0, _priorities.addUnitPriority)('week', 5);
(0, _priorities.addUnitPriority)('isoWeek', 5);

// PARSING

(0, _parseRegex.addRegexToken)('w', _parseRegex.match1to2);
(0, _parseRegex.addRegexToken)('ww', _parseRegex.match1to2, _parseRegex.match2);
(0, _parseRegex.addRegexToken)('W', _parseRegex.match1to2);
(0, _parseRegex.addRegexToken)('WW', _parseRegex.match1to2, _parseRegex.match2);

(0, _parseToken.addWeekParseToken)(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = (0, _utilsToInt2['default'])(input);
});

// HELPERS

// LOCALES

function localeWeek(mom) {
    return (0, _weekCalendarUtils.weekOfYear)(mom, this._week.dow, this._week.doy).week;
}

var defaultLocaleWeek = {
    dow: 0, // Sunday is the first day of the week.
    doy: 6 // The week that contains Jan 1st is the first week of the year.
};

exports.defaultLocaleWeek = defaultLocaleWeek;

function localeFirstDayOfWeek() {
    return this._week.dow;
}

function localeFirstDayOfYear() {
    return this._week.doy;
}

// MOMENTS

function getSetWeek(input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
}

function getSetISOWeek(input) {
    var week = (0, _weekCalendarUtils.weekOfYear)(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
}

},{"../create/local":42,"../format/format":58,"../parse/regex":92,"../parse/token":93,"../utils/to-int":134,"./aliases":94,"./priorities":104,"./week-calendar-utils":110}],113:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.daysInYear = daysInYear;
exports.getIsLeapYear = getIsLeapYear;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _momentGetSet = require('../moment/get-set');

var _formatFormat = require('../format/format');

var _aliases = require('./aliases');

var _priorities = require('./priorities');

var _parseRegex = require('../parse/regex');

var _parseToken = require('../parse/token');

var _utilsHooks = require('../utils/hooks');

var _constants = require('./constants');

var _utilsToInt = require('../utils/to-int');

var _utilsToInt2 = _interopRequireDefault(_utilsToInt);

// FORMATTING

(0, _formatFormat.addFormatToken)('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
});

(0, _formatFormat.addFormatToken)(0, ['YY', 2], 0, function () {
    return this.year() % 100;
});

(0, _formatFormat.addFormatToken)(0, ['YYYY', 4], 0, 'year');
(0, _formatFormat.addFormatToken)(0, ['YYYYY', 5], 0, 'year');
(0, _formatFormat.addFormatToken)(0, ['YYYYYY', 6, true], 0, 'year');

// ALIASES

(0, _aliases.addUnitAlias)('year', 'y');

// PRIORITIES

(0, _priorities.addUnitPriority)('year', 1);

// PARSING

(0, _parseRegex.addRegexToken)('Y', _parseRegex.matchSigned);
(0, _parseRegex.addRegexToken)('YY', _parseRegex.match1to2, _parseRegex.match2);
(0, _parseRegex.addRegexToken)('YYYY', _parseRegex.match1to4, _parseRegex.match4);
(0, _parseRegex.addRegexToken)('YYYYY', _parseRegex.match1to6, _parseRegex.match6);
(0, _parseRegex.addRegexToken)('YYYYYY', _parseRegex.match1to6, _parseRegex.match6);

(0, _parseToken.addParseToken)(['YYYYY', 'YYYYYY'], _constants.YEAR);
(0, _parseToken.addParseToken)('YYYY', function (input, array) {
    array[_constants.YEAR] = input.length === 2 ? _utilsHooks.hooks.parseTwoDigitYear(input) : (0, _utilsToInt2['default'])(input);
});
(0, _parseToken.addParseToken)('YY', function (input, array) {
    array[_constants.YEAR] = _utilsHooks.hooks.parseTwoDigitYear(input);
});
(0, _parseToken.addParseToken)('Y', function (input, array) {
    array[_constants.YEAR] = parseInt(input, 10);
});

// HELPERS

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}

// HOOKS

_utilsHooks.hooks.parseTwoDigitYear = function (input) {
    return (0, _utilsToInt2['default'])(input) + ((0, _utilsToInt2['default'])(input) > 68 ? 1900 : 2000);
};

// MOMENTS

var getSetYear = (0, _momentGetSet.makeGetSet)('FullYear', true);

exports.getSetYear = getSetYear;

function getIsLeapYear() {
    return isLeapYear(this.year());
}

},{"../format/format":58,"../moment/get-set":82,"../parse/regex":92,"../parse/token":93,"../utils/hooks":122,"../utils/to-int":134,"./aliases":94,"./constants":95,"./priorities":104}],114:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = absCeil;

function absCeil(number) {
    if (number < 0) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}

module.exports = exports["default"];

},{}],115:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = absFloor;

function absFloor(number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

module.exports = exports["default"];

},{}],116:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = absRound;

function absRound(number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

module.exports = exports["default"];

},{}],117:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = compareArrays;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _toInt = require('./to-int');

var _toInt2 = _interopRequireDefault(_toInt);

// compare two arrays, return the number of differences

function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;
    for (i = 0; i < len; i++) {
        if (dontConvert && array1[i] !== array2[i] || !dontConvert && (0, _toInt2['default'])(array1[i]) !== (0, _toInt2['default'])(array2[i])) {
            diffs++;
        }
    }
    return diffs + lengthDiff;
}

module.exports = exports['default'];

},{"./to-int":134}],118:[function(require,module,exports){
// Pick the first defined of two or three arguments.
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = defaults;

function defaults(a, b, c) {
    if (a != null) {
        return a;
    }
    if (b != null) {
        return b;
    }
    return c;
}

module.exports = exports["default"];

},{}],119:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.deprecate = deprecate;
exports.deprecateSimple = deprecateSimple;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _extend = require('./extend');

var _extend2 = _interopRequireDefault(_extend);

var _hooks = require('./hooks');

var _isUndefined = require('./is-undefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function warn(msg) {
    if (_hooks.hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

function deprecate(msg, fn) {
    var firstTime = true;

    return (0, _extend2['default'])(function () {
        if (_hooks.hooks.deprecationHandler != null) {
            _hooks.hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
            var args = [];
            var arg;
            for (var i = 0; i < arguments.length; i++) {
                arg = '';
                if (typeof arguments[i] === 'object') {
                    arg += '\n[' + i + '] ';
                    for (var key in arguments[0]) {
                        arg += key + ': ' + arguments[0][key] + ', ';
                    }
                    arg = arg.slice(0, -2); // Remove trailing comma and space
                } else {
                        arg = arguments[i];
                    }
                args.push(arg);
            }
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + new Error().stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

function deprecateSimple(name, msg) {
    if (_hooks.hooks.deprecationHandler != null) {
        _hooks.hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}

_hooks.hooks.suppressDeprecationWarnings = false;
_hooks.hooks.deprecationHandler = null;

},{"./extend":120,"./hooks":122,"./is-undefined":130}],120:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = extend;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _hasOwnProp = require('./has-own-prop');

var _hasOwnProp2 = _interopRequireDefault(_hasOwnProp);

function extend(a, b) {
    for (var i in b) {
        if ((0, _hasOwnProp2['default'])(b, i)) {
            a[i] = b[i];
        }
    }

    if ((0, _hasOwnProp2['default'])(b, 'toString')) {
        a.toString = b.toString;
    }

    if ((0, _hasOwnProp2['default'])(b, 'valueOf')) {
        a.valueOf = b.valueOf;
    }

    return a;
}

module.exports = exports['default'];

},{"./has-own-prop":121}],121:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = hasOwnProp;

function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}

module.exports = exports["default"];

},{}],122:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hooks = hooks;
exports.setHookCallback = setHookCallback;

var hookCallback;

function hooks() {
    return hookCallback.apply(null, arguments);
}

// This is done to register the method called with moment()
// without creating circular dependencies.
function setHookCallback(callback) {
    hookCallback = callback;
}

},{}],123:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var indexOf;

if (Array.prototype.indexOf) {
    exports["default"] = indexOf = Array.prototype.indexOf;
} else {
    exports["default"] = indexOf = function (o) {
        // I know
        var i;
        for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    };
}

exports["default"] = indexOf;
module.exports = exports["default"];

},{}],124:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = isArray;

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

module.exports = exports['default'];

},{}],125:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = isDate;

function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}

module.exports = exports['default'];

},{}],126:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = isFunction;

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}

module.exports = exports['default'];

},{}],127:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = isNumber;

function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
}

module.exports = exports['default'];

},{}],128:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = isObjectEmpty;

function isObjectEmpty(obj) {
    var k;
    for (k in obj) {
        // even if its not own property I'd still call it non-empty
        return false;
    }
    return true;
}

module.exports = exports["default"];

},{}],129:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = isObject;

function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
}

module.exports = exports['default'];

},{}],130:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = isUndefined;

function isUndefined(input) {
    return input === void 0;
}

module.exports = exports["default"];

},{}],131:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _hasOwnProp = require('./has-own-prop');

var _hasOwnProp2 = _interopRequireDefault(_hasOwnProp);

var keys;

if (Object.keys) {
    exports['default'] = keys = Object.keys;
} else {
    exports['default'] = keys = function (obj) {
        var i,
            res = [];
        for (i in obj) {
            if ((0, _hasOwnProp2['default'])(obj, i)) {
                res.push(i);
            }
        }
        return res;
    };
}

exports['default'] = keys;
module.exports = exports['default'];

},{"./has-own-prop":121}],132:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = map;

function map(arr, fn) {
    var res = [],
        i;
    for (i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i], i));
    }
    return res;
}

module.exports = exports["default"];

},{}],133:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var some;
if (Array.prototype.some) {
    exports["default"] = some = Array.prototype.some;
} else {
    exports["default"] = some = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;

        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

exports["default"] = some;
module.exports = exports["default"];

},{}],134:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = toInt;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _absFloor = require('./abs-floor');

var _absFloor2 = _interopRequireDefault(_absFloor);

function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = (0, _absFloor2['default'])(coercedNumber);
    }

    return value;
}

module.exports = exports['default'];

},{"./abs-floor":115}],135:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = zeroFill;

function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? forceSign ? '+' : '' : '-') + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}

module.exports = exports['default'];

},{}],136:[function(require,module,exports){
//! moment.js
//! version : 2.18.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libUtilsHooks = require('./lib/utils/hooks');

var _libMomentMoment = require('./lib/moment/moment');

var _libMomentCalendar = require('./lib/moment/calendar');

var _libLocaleLocale = require('./lib/locale/locale');

var _libDurationDuration = require('./lib/duration/duration');

var _libUnitsUnits = require('./lib/units/units');

var _libUtilsIsDate = require('./lib/utils/is-date');

var _libUtilsIsDate2 = _interopRequireDefault(_libUtilsIsDate);

_libUtilsHooks.hooks.version = '2.18.1';

(0, _libUtilsHooks.setHookCallback)(_libMomentMoment.createLocal);

_libUtilsHooks.hooks.fn = _libMomentMoment.momentPrototype;
_libUtilsHooks.hooks.min = _libMomentMoment.min;
_libUtilsHooks.hooks.max = _libMomentMoment.max;
_libUtilsHooks.hooks.now = _libMomentMoment.now;
_libUtilsHooks.hooks.utc = _libMomentMoment.createUTC;
_libUtilsHooks.hooks.unix = _libMomentMoment.createUnix;
_libUtilsHooks.hooks.months = _libLocaleLocale.listMonths;
_libUtilsHooks.hooks.isDate = _libUtilsIsDate2['default'];
_libUtilsHooks.hooks.locale = _libLocaleLocale.getSetGlobalLocale;
_libUtilsHooks.hooks.invalid = _libMomentMoment.createInvalid;
_libUtilsHooks.hooks.duration = _libDurationDuration.createDuration;
_libUtilsHooks.hooks.isMoment = _libMomentMoment.isMoment;
_libUtilsHooks.hooks.weekdays = _libLocaleLocale.listWeekdays;
_libUtilsHooks.hooks.parseZone = _libMomentMoment.createInZone;
_libUtilsHooks.hooks.localeData = _libLocaleLocale.getLocale;
_libUtilsHooks.hooks.isDuration = _libDurationDuration.isDuration;
_libUtilsHooks.hooks.monthsShort = _libLocaleLocale.listMonthsShort;
_libUtilsHooks.hooks.weekdaysMin = _libLocaleLocale.listWeekdaysMin;
_libUtilsHooks.hooks.defineLocale = _libLocaleLocale.defineLocale;
_libUtilsHooks.hooks.updateLocale = _libLocaleLocale.updateLocale;
_libUtilsHooks.hooks.locales = _libLocaleLocale.listLocales;
_libUtilsHooks.hooks.weekdaysShort = _libLocaleLocale.listWeekdaysShort;
_libUtilsHooks.hooks.normalizeUnits = _libUnitsUnits.normalizeUnits;
_libUtilsHooks.hooks.relativeTimeRounding = _libDurationDuration.getSetRelativeTimeRounding;
_libUtilsHooks.hooks.relativeTimeThreshold = _libDurationDuration.getSetRelativeTimeThreshold;
_libUtilsHooks.hooks.calendarFormat = _libMomentCalendar.getCalendarFormat;
_libUtilsHooks.hooks.prototype = _libMomentMoment.momentPrototype;

exports['default'] = _libUtilsHooks.hooks;
module.exports = exports['default'];

},{"./lib/duration/duration":52,"./lib/locale/locale":66,"./lib/moment/calendar":74,"./lib/moment/moment":85,"./lib/units/units":109,"./lib/utils/hooks":122,"./lib/utils/is-date":125}]},{},[8])

//# sourceMappingURL=index-generated.js.map
