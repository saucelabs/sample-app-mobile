import SyncStorage from 'sync-storage';

export class ShoppingCart {

  static addItem(itemId) {
    // pull out our current cart contents
    var curContents = ShoppingCart.getCartContents();

    if (curContents.indexOf(itemId) < 0) {
      // Item's not yet present - add it now
      curContents.push(itemId);

      // We modified our cart, so store it now
      ShoppingCart.setCartContents(curContents);
    }
  }

  static removeItem(itemId) {
    // pull out our current cart contents
    var curContents = ShoppingCart.getCartContents();
    var itemIndex = curContents.indexOf(itemId);

    if (itemIndex >= 0) {
      // Remove this item from the array
      curContents.splice(itemIndex, 1);

      // We modified our cart, so store it now
      ShoppingCart.setCartContents(curContents);
    }
  }

  static isItemInCart(itemId) {
    // pull out our current cart contents
    var curContents = ShoppingCart.getCartContents();

    // If the item is in the array, return true
    return (curContents.indexOf(itemId) >= 0);
  }

  static getCartContents() {
    // pull out our current cart contents
    var curContents = SyncStorage.get('cart-contents');

    if (typeof curContents === 'string') {
      // We have an existing cart, so deserialize it now since localStorage stores in JSON strings
      curContents = JSON.parse(curContents);
    } else {
      // Make an empty list if the cart is not a string (which means it's a new cart)
      curContents = [];
    }

    return curContents;
  }

  static setCartContents(newContents) {
    // If we're here, we had a valid username and password.
    // Store the username in our session storage.
    SyncStorage.set('cart-contents', JSON.stringify(newContents));

    // Notify our listeners
    ShoppingCart.LISTENERS.forEach((curListener) => {
      curListener.forceUpdate();
    });
  }

  static resetCart() {
    SyncStorage.set('cart-contents', JSON.stringify([]));

    // Notify our listeners
    ShoppingCart.LISTENERS.forEach((curListener) => {
      curListener.forceUpdate();
    });
  }

  static registerCartListener(handler) {
    ShoppingCart.LISTENERS.push(handler);
  }
}

ShoppingCart.LISTENERS = [];
