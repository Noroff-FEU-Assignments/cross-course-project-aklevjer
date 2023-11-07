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

function changeCheckoutIntoEmptyCart(emptyCartElements) {
  const checkoutStages = document.querySelector(".checkout-stages");
  utils.clearElement(checkoutStages);

  checkoutStages.classList.replace("checkout-stages", "empty-cart");
  checkoutStages.append(...emptyCartElements);
}

export function renderEmptyCart() {
  const emptyCartTitle = createEmptyCartTitle();
  const emptyCartBody = createEmptyCartBody();
  const emptyCartCTA = createEmptyCartCTA();

  const emptyCartElements = [emptyCartTitle, emptyCartBody, emptyCartCTA];
  changeCheckoutIntoEmptyCart(emptyCartElements);
}
