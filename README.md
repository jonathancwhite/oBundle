# Special Item: A BigCommerce Theme Builder Test

This test, provided by oBundle, is a BigCommerce Theme Builder test. The assignment was to create a product in its own category and add some minor features to the category page. These features included an "Add All Items To Cart" button, a "Remove All Items" button, and a hover effect that showed the secondary image of the product.

## Steps Taken:
- Created a trial store in BigCommerce
- Created a new product titled "Special Items" and added it to a new category called "Special Items"
- Edited category.html to have two new buttons (Add All & Remove All)
- Edited category.js to include the javascript for adding items to the cart and removing the cart
  - Check to see if a cart was already active
  - If there was no active cart
    - Create a new cart with the item
  - If there was an active cart
    - Add the item to the cart
  - If any items were in the cart, we show the remove all button
  - Remove all deletes the cart
  - Added confirmation messages and page reloads (this is not ideal, but for sake of time was used to update the cart)
    - The idea behind using a reload was that most users are used to being directed to the cart.php page anyways, so a minor refresh doesn't change the UX too much from default Cornerstone
    - I would personally install a minicart to handle cart updates and then allow the frontend to update the cart quantity on completion of any requests
- BONUS: Added banner to the top of the page when user is signed in
  - Includes customer details (i.e. name, email, phone, etc)


## Access:
- Store Link: https://obundle-test-i10.mybigcommerce.com/
- Preview Code: vu6fnz9jf1

## Acknowledgements
- [BigCommerce StoreFront API Documentation](https://developer.bigcommerce.com/docs/rest-storefront)