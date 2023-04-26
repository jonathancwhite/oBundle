import utils from '@bigcommerce/stencil-utils';
import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';
import { createTranslationDictionary } from '../theme/common/utils/translations-utils';
import modalFactory, { defaultModal, showAlertModal, ModalEvents } from './global/modal';

let cart;
const modal = defaultModal();
let previewModal = modalFactory('#previewModal')[0];

function updateRemoveAllItemsBtnVisibility() {
	fetch('/api/storefront/cart')
		.then(response => response.json())
		.then (data => {
			const removeAllItemsBtn = document.querySelector('#removeAllItems');
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
	})
	.then(response => response.json())
	.catch(error => console.error(error));
};

function createCart(lineItems) {
	const options = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: lineItems
	  };

	  return fetch('/api/storefront/carts', options)
		.then(response => response.json())
		.catch(err => console.error(err));
}

function addCartItem(url, cartId, cartItems) {
	return fetch(url + cartId + '/items', {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(cartItems),
	})
	.then(response => response.json())
	.catch(error => console.error(error));
};

function getCartContent(cartItemId, onComplete) {
	const options = {
		template: 'cart/preview',
		params: {
			suggest: cartItemId,
		},
		config: {
			cart: {
				suggestions: {
					limit: 4,
				},
			},
		},
	};

	utils.api.cart.getContent(options, onComplete);
}

function updateCartContent(modal, cartItemId, onComplete) {
	getCartContent(cartItemId, (err, response) => {
		if (err) {
			return;
		}

		$('.modal-content').html(response);
		$('.loadingOverlay').hide();

		// Update cart counter
		const $body = $('body');
		const $cartQuantity = $('[data-cart-quantity]', modal.$content);
		const $cartCounter = $('.navUser-action .cart-count');
		const quantity = $cartQuantity.data('cartQuantity') || 0;

		$cartCounter.addClass('cart-count--positive');
		$body.trigger('cart-quantity-update', quantity);

		if (onComplete) {
			onComplete(response);
		}
	});
}



export default class Category extends CatalogPage {
    constructor(context) {
        super(context);
        this.validationDictionary = createTranslationDictionary(context);
    }

    setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
        $element.attr({
            role: roleType,
            'aria-live': ariaLiveStatus,
        });
    }

    makeShopByPriceFilterAccessible() {
        if (!$('[data-shop-by-price]').length) return;

        if ($('.navList-action').hasClass('is-active')) {
            $('a.navList-action.is-active').focus();
        }

        $('a.navList-action').on('click', () => this.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive'));
    }

    onReady() {
		this.$modal = null;
		this.$overlay = $('[data-cart] .loadingOverlay')
            .hide();
        this.arrangeFocusOnSortBy();

		updateRemoveAllItemsBtnVisibility();
		getCart('/api/storefront/carts')
			.then(data => {
				cart = data;
			})
			.catch(error => console.error(error))


		const addAllItemsToCartBtn = document.querySelector('#addAllToCart');
        if (addAllItemsToCartBtn) {
            addAllItemsToCartBtn.addEventListener('click', (e) => {
				e.preventDefault;
				$('.modal-content').html('');
				if (cart.length) {
					let cartId = cart[0].id;
					console.log(cartId);

					addCartItem('/api/storefront/carts/', cartId, {
						"lineItems": [
							{
								"quantity": 1,
								"productId": 112
							}
						]
					})
					.then(data => {
						modal.open({clearContent: true});
						// console.log(data);
						let physicalItemsArray = data.lineItems.physicalItems;
						updateCartContent(previewModal, physicalItemsArray[0].id)

					})
					.catch(error => {
						return showAlertModal(error);
					});

				} else {
					createCart('{"lineItems":[{"quantity":1,"productId":112}],"locale":"en"}')
					.then(data => {
						modal.open({clearContent: true});
						let physicalItemsArray = data.lineItems.physicalItems;
						updateCartContent(previewModal, physicalItemsArray[0].id)
					});

				}
            });
        }

        const removeAllItemsBtn = document.querySelector('#removeAllItems');
        if (removeAllItemsBtn) {
            removeAllItemsBtn.addEventListener('click', (e) => {
				e.preventDefault;
				$('.modal-content').html('');
				let cartId = '';
                fetch('/api/storefront/cart')
					.then(response => response.json())
					.then (data => {
						cartId = data[0].id;

						const options = {method: 'DELETE', headers: {'Content-Type': 'application/json'}};

						return fetch(`/api/storefront/carts/${cartId}`, options)
					})
					.then(response => {
						if (response.ok) {
							modal.open({clearContent: true});
							$('.loadingOverlay').hide();
							$('.modal-content').html('<div class="modal-header"><h1 class="modal-header-title">Your cart has been emptied.</h1></div>');
						}
					})
            });
        }

		$(document).on('click', 'button.modal-close', function(e) {
			window.location.reload();
		})


        $('[data-button-type="add-cart"]').on('click', (e) => this.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite'));

        this.makeShopByPriceFilterAccessible();

        compareProducts(this.context);

        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        $('a.reset-btn').on('click', () => this.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite'));

        this.ariaNotifyNoProducts();

		// product image swapping on category page
		$('.card-img-container--slider > .card-image').on('mouseenter', function() {
			$('.card-img-container--slider > img:nth-of-type(1)').css('z-index', '999');
		}).on('mouseleave', function() {
			$('.card-img-container--slider > img:nth-of-type(1)').css('z-index', '');

		})
    }

    ariaNotifyNoProducts() {
        const $noProductsMessage = $('[data-no-products-notification]');
        if ($noProductsMessage.length) {
            $noProductsMessage.focus();
        }
    }

    initFacetedSearch() {
        const {
            price_min_evaluation: onMinPriceError,
            price_max_evaluation: onMaxPriceError,
            price_min_not_entered: minPriceNotEntered,
            price_max_not_entered: maxPriceNotEntered,
            price_invalid_value: onInvalidPrice,
        } = this.validationDictionary;
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('body').triggerHandler('compareReset');

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        }, {
            validationErrorMessages: {
                onMinPriceError,
                onMaxPriceError,
                minPriceNotEntered,
                maxPriceNotEntered,
                onInvalidPrice,
            },
        });
    }
}
