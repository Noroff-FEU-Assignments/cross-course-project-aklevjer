import * as ui from "../index.js";
import * as utils from "../../utils/index.js";

function createProductImage(imageSrc, altText) {
  return utils.createHTMLElement("img", null, null, null, null, imageSrc, altText);
}

function createProductTitle(productTitle) {
  return utils.createHTMLElement("h3", null, productTitle);
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
  const productTotalDollars = totalPrice.toLocaleString("en-US", { style: "currency", currency: "USD" });
  const productTotal = utils.createHTMLElement("td", null, productTotalDollars);
  productTotal.dataset.label = "Total";
  return productTotal;
}

function createProductDeleteSymbol() {
  const productDeleteSymbol = utils.createHTMLElement("span", null, "x");
  productDeleteSymbol.setAttribute("aria-hidden", "true");
  return productDeleteSymbol;
}

function createProductDeleteSrText() {
  return utils.createHTMLElement("span", "sr-only", "Remove from cart");
}

function createProductDeleteBtn(product, productDeleteBtnChildren) {
  const productDeleteBtn = utils.createHTMLElement("button", ["cta", "round-cta"], null, productDeleteBtnChildren);
  productDeleteBtn.addEventListener("click", () => ui.removeFromCart(product));
  return productDeleteBtn;
}

function createProductDeleteBtnContainer(productDeleteBtn) {
  return utils.createHTMLElement("td", null, null, [productDeleteBtn]);
}

function createCartItemContainer(cartItemContainerChildren) {
  return utils.createHTMLElement("tr", null, null, cartItemContainerChildren);
}

function findProductColor(product) {
  const colorAttribute = product.attributes.find((attribute) => attribute.name === "Color");
  return colorAttribute ? colorAttribute.terms[0].name : "Unknown";
}

function createCartItem(product, totalPrice) {
  const productImage = createProductImage(product.images[0].src, product.images[0].alt);

  const productTitle = createProductTitle(product.name);
  const productColorName = findProductColor(product);
  const productColor = createProductColor(productColorName);
  const productStock = createProductStock();
  const productInfoContainerChildren = [productTitle, productColor, productStock];
  const productInfoContainer = createProductInfoContainer(productInfoContainerChildren);

  const productContainerChildren = [productImage, productInfoContainer];
  const productContainer = createProductContainer(productContainerChildren);
  const productWrapper = createProductWrapper(productContainer);

  const productSize = createProductSize(product.size);
  const productQuantity = createProductQuantity(product.quantity);
  const productTotal = createProductTotal(totalPrice);

  const productDeleteSymbol = createProductDeleteSymbol();
  const productDeleteSrText = createProductDeleteSrText();
  const productDeleteBtnChildren = [productDeleteSymbol, productDeleteSrText];
  const productDeleteBtn = createProductDeleteBtn(product, productDeleteBtnChildren);
  const productDeleteBtnContainer = createProductDeleteBtnContainer(productDeleteBtn);

  const cartItemContainerChildren = [productWrapper, productSize, productQuantity, productTotal, productDeleteBtnContainer];
  const cartItemContainer = createCartItemContainer(cartItemContainerChildren);

  return cartItemContainer;
}

function updateSubtotal(subtotal) {
  const orderReviewSubtotal = document.querySelector(".order-review-subtotal");
  const orderSummarySubtotal = document.querySelector(".order-summary-subtotal");
  const orderSummaryTotal = document.querySelector(".order-summary-total");

  subtotal = subtotal.toLocaleString("en-US", { style: "currency", currency: "USD" });

  orderReviewSubtotal.textContent = `Subtotal: ${subtotal}`;
  orderSummarySubtotal.textContent = subtotal;
  orderSummaryTotal.textContent = subtotal;
}

function showCheckoutStages() {
  const checkoutStages = document.querySelector(".checkout-stages");
  checkoutStages.classList.remove("hidden");
}

export function renderCart(cart) {
  const cartContainer = document.querySelector(".cart-container");
  utils.clearElement(cartContainer);

  let subtotal = 0;

  cart.forEach((product) => {
    const productPrice = product.prices.price / 100;
    const totalPrice = productPrice * product.quantity;
    subtotal += totalPrice;

    const createdCartItem = createCartItem(product, totalPrice);
    cartContainer.append(createdCartItem);
  });

  updateSubtotal(subtotal);
  showCheckoutStages();
}
