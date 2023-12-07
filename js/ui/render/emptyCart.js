import * as utils from "../../utils/index.js";

function createEmptyCartTitle() {
  return utils.createHTMLElement("h1", null, "Your cart is currently empty");
}

function createEmptyCartBody() {
  return utils.createHTMLElement("p", null, "Explore our wide range of products and start adding items to your cart today!");
}

function createEmptyCartCTA() {
  return utils.createHTMLElement("a", "cta", "Shop now", null, "/pages/shop/");
}

function createEmptyCartContainer(emptyCartChildren) {
  return utils.createHTMLElement("section", "empty-cart", null, emptyCartChildren);
}

function removeCheckoutStages() {
  const checkoutStages = document.querySelector(".checkout-stages");
  checkoutStages.remove();
}

export function renderEmptyCart() {
  const mainElement = document.querySelector("main");

  const emptyCartTitle = createEmptyCartTitle();
  const emptyCartBody = createEmptyCartBody();
  const emptyCartCTA = createEmptyCartCTA();

  const emptyCartChildren = [emptyCartTitle, emptyCartBody, emptyCartCTA];
  const emptyCartContainer = createEmptyCartContainer(emptyCartChildren);

  removeCheckoutStages();
  mainElement.append(emptyCartContainer);
}
