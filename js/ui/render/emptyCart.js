import * as utils from "../../utils/index.js";

function createEmptyCartTitle() {
  return utils.createHTMLElement("h1", null, "Your cart is currently empty");
}

function createEmptyCartBody() {
  return utils.createHTMLElement("p", null, "Explore our wide range of products and start adding items to your cart today!");
}

function createEmptyCartCTA() {
  return utils.createHTMLElement("a", "cta", "Continue shopping", null, "/pages/shop/");
}

function createEmptyCartMsg() {
  const emptyCartTitle = createEmptyCartTitle();
  const emptyCartBody = createEmptyCartBody();
  const emptyCartCTA = createEmptyCartCTA();

  const emptyCartMsgElements = [emptyCartTitle, emptyCartBody, emptyCartCTA];
  return emptyCartMsgElements;
}

function changeCheckoutIntoEmptyCart(emptyCartMsgElements) {
  const checkoutStages = document.querySelector(".checkout-stages");
  utils.clearElement(checkoutStages);

  checkoutStages.classList.replace("checkout-stages", "empty-cart");
  checkoutStages.append(...emptyCartMsgElements);
}

export function renderEmptyCart() {
  const emptyCartMsgElements = createEmptyCartMsg();
  changeCheckoutIntoEmptyCart(emptyCartMsgElements);
}
