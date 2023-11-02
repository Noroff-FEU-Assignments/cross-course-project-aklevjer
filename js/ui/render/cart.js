import * as ui from "../index.js";
import * as utils from "../../utils/index.js";

function createProductImage(imageSrc, altText) {
  return utils.createHTMLElement("img", null, null, null, null, imageSrc, altText);
}

function createProductTitle(productTitle) {
  return utils.createHTMLElement("h3", null, utils.trimProductTitle(productTitle));
}

function createProductColor(productColor) {
  return utils.createHTMLElement("p", null, productColor);
}

function createProductStock() {
  return utils.createHTMLElement("span", "in-stock", "In stock");
}

function createProductInfoContainer(productInfoContainerChildren) {
  return utils.createHTMLElement("div", "cart-product-info", null, productInfoContainerChildren);
}

function createProductContainer(productContainerChildren) {
  return utils.createHTMLElement("div", "cart-product", null, productContainerChildren);
}

function createProductWrapper(productContainer) {
  return utils.createHTMLElement("td", null, null, [productContainer]);
}

function createProductSize(size) {
  const productSize = utils.createHTMLElement("td", null, size);
  productSize.dataset.label = "Size";
  return productSize;
}

function createProductQuantity(quantity) {
  const productQuantity = utils.createHTMLElement("td", null, `${quantity}x`);
  productQuantity.dataset.label = "Quantity";
  return productQuantity;
}

function createProductTotal(totalPrice) {
  const productTotal = utils.createHTMLElement("td", null, `$${totalPrice.toFixed(2)}`);
  productTotal.dataset.label = "Total";
  return productTotal;
}

function createProductDeleteBtn(product) {
  const productDeleteBtn = utils.createHTMLElement("button", ["cta", "round-cta"], "x");
  productDeleteBtn.addEventListener("click", () => ui.removeFromCart(product));
  return productDeleteBtn;
}

function createProductDeleteBtnContainer(productDeleteBtn) {
  return utils.createHTMLElement("td", null, null, [productDeleteBtn]);
}

function createCartItemContainer(cartItemContainerChildren) {
  return utils.createHTMLElement("tr", null, null, cartItemContainerChildren);
}

function createCartItem(product, totalPrice) {
  const productImage = createProductImage(product.image, product.title);

  const productTitle = createProductTitle(product.title);
  const productColor = createProductColor(product.baseColor);
  const productStock = createProductStock();
  const productInfoContainerChildren = [productTitle, productColor, productStock];
  const productInfoContainer = createProductInfoContainer(productInfoContainerChildren);

  const productContainerChildren = [productImage, productInfoContainer];
  const productContainer = createProductContainer(productContainerChildren);
  const productWrapper = createProductWrapper(productContainer);

  const productSize = createProductSize(product.size);
  const productQuantity = createProductQuantity(product.quantity);
  const productTotal = createProductTotal(totalPrice);

  const productDeleteBtn = createProductDeleteBtn(product);
  const productDeleteBtnContainer = createProductDeleteBtnContainer(productDeleteBtn);

  const cartItemContainerChildren = [productWrapper, productSize, productQuantity, productTotal, productDeleteBtnContainer];
  const cartItemContainer = createCartItemContainer(cartItemContainerChildren);

  return cartItemContainer;
}

function updateSubtotal(subtotal) {
  const orderReviewSubtotal = document.querySelector(".order-review-subtotal");
  const orderSummarySubtotal = document.querySelector(".order-summary-subtotal");
  const orderSummaryTotal = document.querySelector(".order-summary-total");

  subtotal = subtotal.toFixed(2);

  orderReviewSubtotal.innerText = `Subtotal: $${subtotal}`;
  orderSummarySubtotal.innerText = `$${subtotal}`;
  orderSummaryTotal.innerText = `$${subtotal}`;
}

function initCheckoutCTA() {
  const checkoutCTA = document.querySelector(".order-summary-wrapper .cta");
  checkoutCTA.addEventListener("click", ui.clearCart);
}

export function renderCart(cart) {
  const cartContainer = document.querySelector(".cart-container");
  utils.clearElement(cartContainer);

  let subtotal = 0;

  cart.forEach((product) => {
    const totalPrice = product.price * product.quantity;
    subtotal += totalPrice;

    const createdCartItem = createCartItem(product, totalPrice);
    cartContainer.append(createdCartItem);
  });

  updateSubtotal(subtotal);
  initCheckoutCTA();
}
