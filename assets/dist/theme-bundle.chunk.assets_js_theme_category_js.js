"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_category_js"],{

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Category)
/* harmony export */ });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var cart;
var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_5__.defaultModal)();
var previewModal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_5__["default"])('#previewModal')[0];
function updateRemoveAllItemsBtnVisibility() {
  fetch('/api/storefront/cart').then(function (response) {
    return response.json();
  }).then(function (data) {
    var removeAllItemsBtn = document.querySelector('#removeAllItems');
    if (data.length > 0 && removeAllItemsBtn) {
      removeAllItemsBtn.style.display = 'inline-block';
    } else if (removeAllItemsBtn) {
      removeAllItemsBtn.style.display = 'none';
    }
  });
}
function getCart(url) {
  return fetch(url, {
    method: "GET",
    credentials: "same-origin"
  }).then(function (response) {
    return response.json();
  })["catch"](function (error) {
    return console.error(error);
  });
}
;
function createCart(lineItems) {
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: lineItems
  };
  return fetch('/api/storefront/carts', options).then(function (response) {
    return response.json();
  })["catch"](function (err) {
    return console.error(err);
  });
}
function addCartItem(url, cartId, cartItems) {
  return fetch(url + cartId + '/items', {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cartItems)
  }).then(function (response) {
    return response.json();
  })["catch"](function (error) {
    return console.error(error);
  });
}
;
function getCartContent(cartItemId, onComplete) {
  var options = {
    template: 'cart/preview',
    params: {
      suggest: cartItemId
    },
    config: {
      cart: {
        suggestions: {
          limit: 4
        }
      }
    }
  };
  _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.cart.getContent(options, onComplete);
}
function updateCartContent(modal, cartItemId, onComplete) {
  getCartContent(cartItemId, function (err, response) {
    if (err) {
      return;
    }
    $('.modal-content').html(response);
    $('.loadingOverlay').hide();

    // Update cart counter
    var $body = $('body');
    var $cartQuantity = $('[data-cart-quantity]', modal.$content);
    var $cartCounter = $('.navUser-action .cart-count');
    var quantity = $cartQuantity.data('cartQuantity') || 0;
    $cartCounter.addClass('cart-count--positive');
    $body.trigger('cart-quantity-update', quantity);
    if (onComplete) {
      onComplete(response);
    }
  });
}
var Category = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Category, _CatalogPage);
  function Category(context) {
    var _this;
    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = (0,_theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__.createTranslationDictionary)(context);
    return _this;
  }
  var _proto = Category.prototype;
  _proto.setLiveRegionAttributes = function setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
    $element.attr({
      role: roleType,
      'aria-live': ariaLiveStatus
    });
  };
  _proto.makeShopByPriceFilterAccessible = function makeShopByPriceFilterAccessible() {
    var _this2 = this;
    if (!$('[data-shop-by-price]').length) return;
    if ($('.navList-action').hasClass('is-active')) {
      $('a.navList-action.is-active').focus();
    }
    $('a.navList-action').on('click', function () {
      return _this2.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive');
    });
  };
  _proto.onReady = function onReady() {
    var _this3 = this;
    this.$modal = null;
    this.$overlay = $('[data-cart] .loadingOverlay').hide();
    this.arrangeFocusOnSortBy();
    updateRemoveAllItemsBtnVisibility();
    getCart('/api/storefront/carts').then(function (data) {
      cart = data;
    })["catch"](function (error) {
      return console.error(error);
    });
    var addAllItemsToCartBtn = document.querySelector('#addAllToCart');
    if (addAllItemsToCartBtn) {
      addAllItemsToCartBtn.addEventListener('click', function (e) {
        e.preventDefault;
        $('.modal-content').html('');
        if (cart.length) {
          var cartId = cart[0].id;
          console.log(cartId);
          addCartItem('/api/storefront/carts/', cartId, {
            "lineItems": [{
              "quantity": 1,
              "productId": 112
            }]
          }).then(function (data) {
            modal.open({
              clearContent: true
            });
            // console.log(data);
            var physicalItemsArray = data.lineItems.physicalItems;
            updateCartContent(previewModal, physicalItemsArray[0].id);
          })["catch"](function (error) {
            return (0,_global_modal__WEBPACK_IMPORTED_MODULE_5__.showAlertModal)(error);
          });
        } else {
          createCart('{"lineItems":[{"quantity":1,"productId":112}],"locale":"en"}').then(function (data) {
            modal.open({
              clearContent: true
            });
            var physicalItemsArray = data.lineItems.physicalItems;
            updateCartContent(previewModal, physicalItemsArray[0].id);
          });
        }
      });
    }
    var removeAllItemsBtn = document.querySelector('#removeAllItems');
    if (removeAllItemsBtn) {
      removeAllItemsBtn.addEventListener('click', function (e) {
        e.preventDefault;
        $('.modal-content').html('');
        var cartId = '';
        fetch('/api/storefront/cart').then(function (response) {
          return response.json();
        }).then(function (data) {
          cartId = data[0].id;
          var options = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          };
          return fetch("/api/storefront/carts/" + cartId, options);
        }).then(function (response) {
          if (response.ok) {
            modal.open({
              clearContent: true
            });
            $('.loadingOverlay').hide();
            $('.modal-content').html('<div class="modal-header"><h1 class="modal-header-title">Your cart has been emptied.</h1></div>');
          }
        });
      });
    }
    $(document).on('click', 'button.modal-close', function (e) {
      window.location.reload();
    });
    $('[data-button-type="add-cart"]').on('click', function (e) {
      return _this3.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite');
    });
    this.makeShopByPriceFilterAccessible();
    (0,_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);
    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__.hooks.on('sortBy-submitted', this.onSortBySubmit);
    }
    $('a.reset-btn').on('click', function () {
      return _this3.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite');
    });
    this.ariaNotifyNoProducts();

    // product image swapping on category page
    $('.card-img-container--slider > .card-image').on('mouseenter', function () {
      $('.card-img-container--slider > img:nth-of-type(1)').css('z-index', '999');
    }).on('mouseleave', function () {
      $('.card-img-container--slider > img:nth-of-type(1)').css('z-index', '');
    });
  };
  _proto.ariaNotifyNoProducts = function ariaNotifyNoProducts() {
    var $noProductsMessage = $('[data-no-products-notification]');
    if ($noProductsMessage.length) {
      $noProductsMessage.focus();
    }
  };
  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this$validationDicti = this.validationDictionary,
      onMinPriceError = _this$validationDicti.price_min_evaluation,
      onMaxPriceError = _this$validationDicti.price_max_evaluation,
      minPriceNotEntered = _this$validationDicti.price_min_not_entered,
      maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
      onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $('#product-listing-container');
    var $facetedSearchContainer = $('#faceted-search-container');
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: 'category/product-listing',
        sidebar: 'category/sidebar'
      },
      showMore: 'category/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };
  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTranslationDictionary": () => (/* binding */ createTranslationDictionary)
/* harmony export */ });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jYXRlZ29yeV9qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQStDO0FBQ0k7QUFDZjtBQUNvQjtBQUNKO0FBQ21DO0FBQ0U7QUFFekYsSUFBSVUsSUFBSTtBQUNSLElBQU1DLEtBQUssR0FBR0osMkRBQVksRUFBRTtBQUM1QixJQUFJSyxZQUFZLEdBQUdOLHlEQUFZLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRW5ELFNBQVNPLGlDQUFpQ0EsQ0FBQSxFQUFHO0VBQzVDQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FDM0JDLElBQUksQ0FBQyxVQUFBQyxRQUFRO0lBQUEsT0FBSUEsUUFBUSxDQUFDQyxJQUFJLEVBQUU7RUFBQSxFQUFDLENBQ2pDRixJQUFJLENBQUUsVUFBQUcsSUFBSSxFQUFJO0lBQ2QsSUFBTUMsaUJBQWlCLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGlCQUFpQixDQUFDO0lBQ25FLElBQUlILElBQUksQ0FBQ0ksTUFBTSxHQUFHLENBQUMsSUFBSUgsaUJBQWlCLEVBQUU7TUFDekNBLGlCQUFpQixDQUFDSSxLQUFLLENBQUNDLE9BQU8sR0FBRyxjQUFjO0lBQ2pELENBQUMsTUFBTSxJQUFJTCxpQkFBaUIsRUFBRTtNQUM3QkEsaUJBQWlCLENBQUNJLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07SUFDekM7RUFDRCxDQUFDLENBQUM7QUFDSjtBQUVBLFNBQVNDLE9BQU9BLENBQUNDLEdBQUcsRUFBRTtFQUNyQixPQUFPWixLQUFLLENBQUNZLEdBQUcsRUFBRTtJQUNqQkMsTUFBTSxFQUFFLEtBQUs7SUFDYkMsV0FBVyxFQUFFO0VBQ2QsQ0FBQyxDQUFDLENBQ0RiLElBQUksQ0FBQyxVQUFBQyxRQUFRO0lBQUEsT0FBSUEsUUFBUSxDQUFDQyxJQUFJLEVBQUU7RUFBQSxFQUFDLFNBQzVCLENBQUMsVUFBQVksS0FBSztJQUFBLE9BQUlD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c0YsK0JBQStCO0VBQ25HLElBQU1DLGdCQUFnQixHQUFHUixzQkFBc0IsQ0FBQ0ssd0JBQXdCLEVBQUVDLGdDQUFnQyxFQUFFQywrQkFBK0IsQ0FBQztFQUM1SSxJQUFNRSxhQUFhLEdBQUdYLE1BQU0sQ0FBQ1ksTUFBTSxDQUFDRixnQkFBZ0IsQ0FBQ2IsWUFBWSxDQUFDLENBQUM7RUFDbkUsSUFBTWdCLGVBQWUsR0FBR2IsTUFBTSxDQUFDQyxJQUFJLENBQUNTLGdCQUFnQixDQUFDYixZQUFZLENBQUMsQ0FBQyxDQUFDaUIsR0FBRyxDQUFDLFVBQUFDLEdBQUc7SUFBQSxPQUFJQSxHQUFHLENBQUNDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsR0FBRyxFQUFFO0VBQUEsRUFBQztFQUVwRyxPQUFPSixlQUFlLENBQUNLLE1BQU0sQ0FBQyxVQUFDQyxHQUFHLEVBQUVKLEdBQUcsRUFBRVosQ0FBQyxFQUFLO0lBQzNDZ0IsR0FBRyxDQUFDSixHQUFHLENBQUMsR0FBR0osYUFBYSxDQUFDUixDQUFDLENBQUM7SUFDM0IsT0FBT2dCLEdBQUc7RUFDZCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDVixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IHsgaG9va3MgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgQ2F0YWxvZ1BhZ2UgZnJvbSAnLi9jYXRhbG9nJztcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSAnLi9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cyc7XG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tICcuL2NvbW1vbi9mYWNldGVkLXNlYXJjaCc7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuLi90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcbmltcG9ydCBtb2RhbEZhY3RvcnksIHsgZGVmYXVsdE1vZGFsLCBzaG93QWxlcnRNb2RhbCwgTW9kYWxFdmVudHMgfSBmcm9tICcuL2dsb2JhbC9tb2RhbCc7XG5cbmxldCBjYXJ0O1xuY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcbmxldCBwcmV2aWV3TW9kYWwgPSBtb2RhbEZhY3RvcnkoJyNwcmV2aWV3TW9kYWwnKVswXTtcblxuZnVuY3Rpb24gdXBkYXRlUmVtb3ZlQWxsSXRlbXNCdG5WaXNpYmlsaXR5KCkge1xuXHRmZXRjaCgnL2FwaS9zdG9yZWZyb250L2NhcnQnKVxuXHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcblx0XHQudGhlbiAoZGF0YSA9PiB7XG5cdFx0XHRjb25zdCByZW1vdmVBbGxJdGVtc0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZW1vdmVBbGxJdGVtcycpO1xuXHRcdFx0aWYgKGRhdGEubGVuZ3RoID4gMCAmJiByZW1vdmVBbGxJdGVtc0J0bikge1xuXHRcdFx0XHRyZW1vdmVBbGxJdGVtc0J0bi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG5cdFx0XHR9IGVsc2UgaWYgKHJlbW92ZUFsbEl0ZW1zQnRuKSB7XG5cdFx0XHRcdHJlbW92ZUFsbEl0ZW1zQnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHR9XG5cdFx0fSk7XG59XG5cbmZ1bmN0aW9uIGdldENhcnQodXJsKSB7XG5cdHJldHVybiBmZXRjaCh1cmwsIHtcblx0XHRtZXRob2Q6IFwiR0VUXCIsXG5cdFx0Y3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIlxuXHR9KVxuXHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG5cdC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVDYXJ0KGxpbmVJdGVtcykge1xuXHRjb25zdCBvcHRpb25zID0ge1xuXHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcblx0XHRib2R5OiBsaW5lSXRlbXNcblx0ICB9O1xuXG5cdCAgcmV0dXJuIGZldGNoKCcvYXBpL3N0b3JlZnJvbnQvY2FydHMnLCBvcHRpb25zKVxuXHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcblx0XHQuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XG59XG5cbmZ1bmN0aW9uIGFkZENhcnRJdGVtKHVybCwgY2FydElkLCBjYXJ0SXRlbXMpIHtcblx0cmV0dXJuIGZldGNoKHVybCArIGNhcnRJZCArICcvaXRlbXMnLCB7XG5cdFx0bWV0aG9kOiBcIlBPU1RcIixcblx0XHRjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuXHRcdGhlYWRlcnM6IHtcblx0XHRcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG5cdFx0fSxcblx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShjYXJ0SXRlbXMpLFxuXHR9KVxuXHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG5cdC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG59O1xuXG5mdW5jdGlvbiBnZXRDYXJ0Q29udGVudChjYXJ0SXRlbUlkLCBvbkNvbXBsZXRlKSB7XG5cdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0dGVtcGxhdGU6ICdjYXJ0L3ByZXZpZXcnLFxuXHRcdHBhcmFtczoge1xuXHRcdFx0c3VnZ2VzdDogY2FydEl0ZW1JZCxcblx0XHR9LFxuXHRcdGNvbmZpZzoge1xuXHRcdFx0Y2FydDoge1xuXHRcdFx0XHRzdWdnZXN0aW9uczoge1xuXHRcdFx0XHRcdGxpbWl0OiA0LFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9O1xuXG5cdHV0aWxzLmFwaS5jYXJ0LmdldENvbnRlbnQob3B0aW9ucywgb25Db21wbGV0ZSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNhcnRDb250ZW50KG1vZGFsLCBjYXJ0SXRlbUlkLCBvbkNvbXBsZXRlKSB7XG5cdGdldENhcnRDb250ZW50KGNhcnRJdGVtSWQsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG5cdFx0aWYgKGVycikge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdCQoJy5tb2RhbC1jb250ZW50JykuaHRtbChyZXNwb25zZSk7XG5cdFx0JCgnLmxvYWRpbmdPdmVybGF5JykuaGlkZSgpO1xuXG5cdFx0Ly8gVXBkYXRlIGNhcnQgY291bnRlclxuXHRcdGNvbnN0ICRib2R5ID0gJCgnYm9keScpO1xuXHRcdGNvbnN0ICRjYXJ0UXVhbnRpdHkgPSAkKCdbZGF0YS1jYXJ0LXF1YW50aXR5XScsIG1vZGFsLiRjb250ZW50KTtcblx0XHRjb25zdCAkY2FydENvdW50ZXIgPSAkKCcubmF2VXNlci1hY3Rpb24gLmNhcnQtY291bnQnKTtcblx0XHRjb25zdCBxdWFudGl0eSA9ICRjYXJ0UXVhbnRpdHkuZGF0YSgnY2FydFF1YW50aXR5JykgfHwgMDtcblxuXHRcdCRjYXJ0Q291bnRlci5hZGRDbGFzcygnY2FydC1jb3VudC0tcG9zaXRpdmUnKTtcblx0XHQkYm9keS50cmlnZ2VyKCdjYXJ0LXF1YW50aXR5LXVwZGF0ZScsIHF1YW50aXR5KTtcblxuXHRcdGlmIChvbkNvbXBsZXRlKSB7XG5cdFx0XHRvbkNvbXBsZXRlKHJlc3BvbnNlKTtcblx0XHR9XG5cdH0pO1xufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyBDYXRhbG9nUGFnZSB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcbiAgICB9XG5cbiAgICBzZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkZWxlbWVudCwgcm9sZVR5cGUsIGFyaWFMaXZlU3RhdHVzKSB7XG4gICAgICAgICRlbGVtZW50LmF0dHIoe1xuICAgICAgICAgICAgcm9sZTogcm9sZVR5cGUsXG4gICAgICAgICAgICAnYXJpYS1saXZlJzogYXJpYUxpdmVTdGF0dXMsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUoKSB7XG4gICAgICAgIGlmICghJCgnW2RhdGEtc2hvcC1ieS1wcmljZV0nKS5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAoJCgnLm5hdkxpc3QtYWN0aW9uJykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAkKCdhLm5hdkxpc3QtYWN0aW9uLmlzLWFjdGl2ZScpLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkKCdhLm5hdkxpc3QtYWN0aW9uJykub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkKCdzcGFuLnByaWNlLWZpbHRlci1tZXNzYWdlJyksICdzdGF0dXMnLCAnYXNzZXJ0aXZlJykpO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG5cdFx0dGhpcy4kbW9kYWwgPSBudWxsO1xuXHRcdHRoaXMuJG92ZXJsYXkgPSAkKCdbZGF0YS1jYXJ0XSAubG9hZGluZ092ZXJsYXknKVxuICAgICAgICAgICAgLmhpZGUoKTtcbiAgICAgICAgdGhpcy5hcnJhbmdlRm9jdXNPblNvcnRCeSgpO1xuXG5cdFx0dXBkYXRlUmVtb3ZlQWxsSXRlbXNCdG5WaXNpYmlsaXR5KCk7XG5cdFx0Z2V0Q2FydCgnL2FwaS9zdG9yZWZyb250L2NhcnRzJylcblx0XHRcdC50aGVuKGRhdGEgPT4ge1xuXHRcdFx0XHRjYXJ0ID0gZGF0YTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpXG5cblxuXHRcdGNvbnN0IGFkZEFsbEl0ZW1zVG9DYXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZEFsbFRvQ2FydCcpO1xuICAgICAgICBpZiAoYWRkQWxsSXRlbXNUb0NhcnRCdG4pIHtcbiAgICAgICAgICAgIGFkZEFsbEl0ZW1zVG9DYXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdDtcblx0XHRcdFx0JCgnLm1vZGFsLWNvbnRlbnQnKS5odG1sKCcnKTtcblx0XHRcdFx0aWYgKGNhcnQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0bGV0IGNhcnRJZCA9IGNhcnRbMF0uaWQ7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coY2FydElkKTtcblxuXHRcdFx0XHRcdGFkZENhcnRJdGVtKCcvYXBpL3N0b3JlZnJvbnQvY2FydHMvJywgY2FydElkLCB7XG5cdFx0XHRcdFx0XHRcImxpbmVJdGVtc1wiOiBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcInF1YW50aXR5XCI6IDEsXG5cdFx0XHRcdFx0XHRcdFx0XCJwcm9kdWN0SWRcIjogMTEyXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC50aGVuKGRhdGEgPT4ge1xuXHRcdFx0XHRcdFx0bW9kYWwub3Blbih7Y2xlYXJDb250ZW50OiB0cnVlfSk7XG5cdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhkYXRhKTtcblx0XHRcdFx0XHRcdGxldCBwaHlzaWNhbEl0ZW1zQXJyYXkgPSBkYXRhLmxpbmVJdGVtcy5waHlzaWNhbEl0ZW1zO1xuXHRcdFx0XHRcdFx0dXBkYXRlQ2FydENvbnRlbnQocHJldmlld01vZGFsLCBwaHlzaWNhbEl0ZW1zQXJyYXlbMF0uaWQpXG5cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2hvd0FsZXJ0TW9kYWwoZXJyb3IpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y3JlYXRlQ2FydCgne1wibGluZUl0ZW1zXCI6W3tcInF1YW50aXR5XCI6MSxcInByb2R1Y3RJZFwiOjExMn1dLFwibG9jYWxlXCI6XCJlblwifScpXG5cdFx0XHRcdFx0LnRoZW4oZGF0YSA9PiB7XG5cdFx0XHRcdFx0XHRtb2RhbC5vcGVuKHtjbGVhckNvbnRlbnQ6IHRydWV9KTtcblx0XHRcdFx0XHRcdGxldCBwaHlzaWNhbEl0ZW1zQXJyYXkgPSBkYXRhLmxpbmVJdGVtcy5waHlzaWNhbEl0ZW1zO1xuXHRcdFx0XHRcdFx0dXBkYXRlQ2FydENvbnRlbnQocHJldmlld01vZGFsLCBwaHlzaWNhbEl0ZW1zQXJyYXlbMF0uaWQpXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0fVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZW1vdmVBbGxJdGVtc0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZW1vdmVBbGxJdGVtcycpO1xuICAgICAgICBpZiAocmVtb3ZlQWxsSXRlbXNCdG4pIHtcbiAgICAgICAgICAgIHJlbW92ZUFsbEl0ZW1zQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdDtcblx0XHRcdFx0JCgnLm1vZGFsLWNvbnRlbnQnKS5odG1sKCcnKTtcblx0XHRcdFx0bGV0IGNhcnRJZCA9ICcnO1xuICAgICAgICAgICAgICAgIGZldGNoKCcvYXBpL3N0b3JlZnJvbnQvY2FydCcpXG5cdFx0XHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuXHRcdFx0XHRcdC50aGVuIChkYXRhID0+IHtcblx0XHRcdFx0XHRcdGNhcnRJZCA9IGRhdGFbMF0uaWQ7XG5cblx0XHRcdFx0XHRcdGNvbnN0IG9wdGlvbnMgPSB7bWV0aG9kOiAnREVMRVRFJywgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9fTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIGZldGNoKGAvYXBpL3N0b3JlZnJvbnQvY2FydHMvJHtjYXJ0SWR9YCwgb3B0aW9ucylcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0XHRcdGlmIChyZXNwb25zZS5vaykge1xuXHRcdFx0XHRcdFx0XHRtb2RhbC5vcGVuKHtjbGVhckNvbnRlbnQ6IHRydWV9KTtcblx0XHRcdFx0XHRcdFx0JCgnLmxvYWRpbmdPdmVybGF5JykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0XHQkKCcubW9kYWwtY29udGVudCcpLmh0bWwoJzxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj48aDEgY2xhc3M9XCJtb2RhbC1oZWFkZXItdGl0bGVcIj5Zb3VyIGNhcnQgaGFzIGJlZW4gZW1wdGllZC48L2gxPjwvZGl2PicpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cdFx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgJ2J1dHRvbi5tb2RhbC1jbG9zZScsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHR9KVxuXG5cbiAgICAgICAgJCgnW2RhdGEtYnV0dG9uLXR5cGU9XCJhZGQtY2FydFwiXScpLm9uKCdjbGljaycsIChlKSA9PiB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCQoZS5jdXJyZW50VGFyZ2V0KS5uZXh0KCksICdzdGF0dXMnLCAncG9saXRlJykpO1xuXG4gICAgICAgIHRoaXMubWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpO1xuXG4gICAgICAgIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQpO1xuXG4gICAgICAgIGlmICgkKCcjZmFjZXRlZFNlYXJjaCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEZhY2V0ZWRTZWFyY2goKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XG4gICAgICAgICAgICBob29rcy5vbignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnYS5yZXNldC1idG4nKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLnNldExpdmVSZWdpb25zQXR0cmlidXRlcygkKCdzcGFuLnJlc2V0LW1lc3NhZ2UnKSwgJ3N0YXR1cycsICdwb2xpdGUnKSk7XG5cbiAgICAgICAgdGhpcy5hcmlhTm90aWZ5Tm9Qcm9kdWN0cygpO1xuXG5cdFx0Ly8gcHJvZHVjdCBpbWFnZSBzd2FwcGluZyBvbiBjYXRlZ29yeSBwYWdlXG5cdFx0JCgnLmNhcmQtaW1nLWNvbnRhaW5lci0tc2xpZGVyID4gLmNhcmQtaW1hZ2UnKS5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCgnLmNhcmQtaW1nLWNvbnRhaW5lci0tc2xpZGVyID4gaW1nOm50aC1vZi10eXBlKDEpJykuY3NzKCd6LWluZGV4JywgJzk5OScpO1xuXHRcdH0pLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKCcuY2FyZC1pbWctY29udGFpbmVyLS1zbGlkZXIgPiBpbWc6bnRoLW9mLXR5cGUoMSknKS5jc3MoJ3otaW5kZXgnLCAnJyk7XG5cblx0XHR9KVxuICAgIH1cblxuICAgIGFyaWFOb3RpZnlOb1Byb2R1Y3RzKCkge1xuICAgICAgICBjb25zdCAkbm9Qcm9kdWN0c01lc3NhZ2UgPSAkKCdbZGF0YS1uby1wcm9kdWN0cy1ub3RpZmljYXRpb25dJyk7XG4gICAgICAgIGlmICgkbm9Qcm9kdWN0c01lc3NhZ2UubGVuZ3RoKSB7XG4gICAgICAgICAgICAkbm9Qcm9kdWN0c01lc3NhZ2UuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRGYWNldGVkU2VhcmNoKCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBwcmljZV9taW5fZXZhbHVhdGlvbjogb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgICAgcHJpY2VfbWF4X2V2YWx1YXRpb246IG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICAgIHByaWNlX21pbl9ub3RfZW50ZXJlZDogbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgcHJpY2VfbWF4X25vdF9lbnRlcmVkOiBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICBwcmljZV9pbnZhbGlkX3ZhbHVlOiBvbkludmFsaWRQcmljZSxcbiAgICAgICAgfSA9IHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnk7XG4gICAgICAgIGNvbnN0ICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciA9ICQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJCgnI2ZhY2V0ZWQtc2VhcmNoLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBwcm9kdWN0c1BlclBhZ2UgPSB0aGlzLmNvbnRleHQuY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2U7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvcF9ieV9wcmljZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RMaXN0aW5nOiAnY2F0ZWdvcnkvcHJvZHVjdC1saXN0aW5nJyxcbiAgICAgICAgICAgICAgICBzaWRlYmFyOiAnY2F0ZWdvcnkvc2lkZWJhcicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hvd01vcmU6ICdjYXRlZ29yeS9zaG93LW1vcmUnLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKHJlcXVlc3RPcHRpb25zLCAoY29udGVudCkgPT4ge1xuICAgICAgICAgICAgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZyk7XG4gICAgICAgICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VySGFuZGxlcignY29tcGFyZVJlc2V0Jyk7XG5cbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDAsXG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JNZXNzYWdlczoge1xuICAgICAgICAgICAgICAgIG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICAgICAgICBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgICAgICAgbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgICAgIG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgICAgICBvbkludmFsaWRQcmljZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSA9IChjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IGFjdGl2ZURpY3Rpb25hcnkgPSBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5KHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04pO1xuICAgIGNvbnN0IGxvY2FsaXphdGlvbnMgPSBPYmplY3QudmFsdWVzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcblxuICAgIHJldHVybiB0cmFuc2xhdGlvbktleXMucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufTtcbiJdLCJuYW1lcyI6WyJ1dGlscyIsImhvb2tzIiwiQ2F0YWxvZ1BhZ2UiLCJjb21wYXJlUHJvZHVjdHMiLCJGYWNldGVkU2VhcmNoIiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IiwibW9kYWxGYWN0b3J5IiwiZGVmYXVsdE1vZGFsIiwic2hvd0FsZXJ0TW9kYWwiLCJNb2RhbEV2ZW50cyIsImNhcnQiLCJtb2RhbCIsInByZXZpZXdNb2RhbCIsInVwZGF0ZVJlbW92ZUFsbEl0ZW1zQnRuVmlzaWJpbGl0eSIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJyZW1vdmVBbGxJdGVtc0J0biIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImxlbmd0aCIsInN0eWxlIiwiZGlzcGxheSIsImdldENhcnQiLCJ1cmwiLCJtZXRob2QiLCJjcmVkZW50aWFscyIsImVycm9yIiwiY29uc29sZSIsImNyZWF0ZUNhcnQiLCJsaW5lSXRlbXMiLCJvcHRpb25zIiwiaGVhZGVycyIsImJvZHkiLCJlcnIiLCJhZGRDYXJ0SXRlbSIsImNhcnRJZCIsImNhcnRJdGVtcyIsIkpTT04iLCJzdHJpbmdpZnkiLCJnZXRDYXJ0Q29udGVudCIsImNhcnRJdGVtSWQiLCJvbkNvbXBsZXRlIiwidGVtcGxhdGUiLCJwYXJhbXMiLCJzdWdnZXN0IiwiY29uZmlnIiwic3VnZ2VzdGlvbnMiLCJsaW1pdCIsImFwaSIsImdldENvbnRlbnQiLCJ1cGRhdGVDYXJ0Q29udGVudCIsIiQiLCJodG1sIiwiaGlkZSIsIiRib2R5IiwiJGNhcnRRdWFudGl0eSIsIiRjb250ZW50IiwiJGNhcnRDb3VudGVyIiwicXVhbnRpdHkiLCJhZGRDbGFzcyIsInRyaWdnZXIiLCJDYXRlZ29yeSIsIl9DYXRhbG9nUGFnZSIsIl9pbmhlcml0c0xvb3NlIiwiY29udGV4dCIsIl90aGlzIiwiY2FsbCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5IiwiX3Byb3RvIiwicHJvdG90eXBlIiwic2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMiLCIkZWxlbWVudCIsInJvbGVUeXBlIiwiYXJpYUxpdmVTdGF0dXMiLCJhdHRyIiwicm9sZSIsIm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUiLCJfdGhpczIiLCJoYXNDbGFzcyIsImZvY3VzIiwib24iLCJvblJlYWR5IiwiX3RoaXMzIiwiJG1vZGFsIiwiJG92ZXJsYXkiLCJhcnJhbmdlRm9jdXNPblNvcnRCeSIsImFkZEFsbEl0ZW1zVG9DYXJ0QnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImlkIiwibG9nIiwib3BlbiIsImNsZWFyQ29udGVudCIsInBoeXNpY2FsSXRlbXNBcnJheSIsInBoeXNpY2FsSXRlbXMiLCJvayIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY3VycmVudFRhcmdldCIsIm5leHQiLCJpbml0RmFjZXRlZFNlYXJjaCIsIm9uU29ydEJ5U3VibWl0IiwiYmluZCIsInNldExpdmVSZWdpb25zQXR0cmlidXRlcyIsImFyaWFOb3RpZnlOb1Byb2R1Y3RzIiwiY3NzIiwiJG5vUHJvZHVjdHNNZXNzYWdlIiwiX3RoaXMkdmFsaWRhdGlvbkRpY3RpIiwib25NaW5QcmljZUVycm9yIiwicHJpY2VfbWluX2V2YWx1YXRpb24iLCJvbk1heFByaWNlRXJyb3IiLCJwcmljZV9tYXhfZXZhbHVhdGlvbiIsIm1pblByaWNlTm90RW50ZXJlZCIsInByaWNlX21pbl9ub3RfZW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsInByaWNlX21heF9ub3RfZW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwicHJpY2VfaW52YWxpZF92YWx1ZSIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwicHJvZHVjdHNQZXJQYWdlIiwiY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2UiLCJyZXF1ZXN0T3B0aW9ucyIsImNhdGVnb3J5Iiwic2hvcF9ieV9wcmljZSIsInByb2R1Y3RzIiwicHJvZHVjdExpc3RpbmciLCJzaWRlYmFyIiwic2hvd01vcmUiLCJmYWNldGVkU2VhcmNoIiwiY29udGVudCIsInRyaWdnZXJIYW5kbGVyIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInZhbGlkYXRpb25FcnJvck1lc3NhZ2VzIiwiZGVmYXVsdCIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5IiwiT2JqZWN0Iiwia2V5cyIsImNob29zZUFjdGl2ZURpY3Rpb25hcnkiLCJpIiwiYXJndW1lbnRzIiwicGFyc2UiLCJ1bmRlZmluZWQiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsIm1hcCIsImtleSIsInNwbGl0IiwicG9wIiwicmVkdWNlIiwiYWNjIl0sInNvdXJjZVJvb3QiOiIifQ==