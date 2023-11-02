import * as ui from "./index.js";
import * as utils from "../utils/index.js";

export function updateCartCount() {
  const cart = utils.loadFromStorage();
  let totalCount = 0;

  cart.forEach((cartProduct) => {
    totalCount += cartProduct.quantity;
  });

  const cartCount = document.querySelector(".cart-count");
  cartCount.innerText = `(${totalCount})`;
}

export function addToCart(product) {
  const cart = utils.loadFromStorage();
  const existingProductIndex = cart.findIndex((cartProduct) => cartProduct.id === product.id);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity++;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  utils.saveToStorage(cart);
  updateCartCount();
}

export function removeFromCart(product) {
  const cart = utils.loadFromStorage();
  const updatedCart = cart.filter((cartProduct) => cartProduct.id !== product.id);

  utils.saveToStorage(updatedCart);
  updateCartCount();

  if (updatedCart.length) {
    ui.renderCart(updatedCart);
  } else {
    ui.renderEmptyCart();
  }
}

export function clearCart() {
  utils.removeFromStorage();
}
