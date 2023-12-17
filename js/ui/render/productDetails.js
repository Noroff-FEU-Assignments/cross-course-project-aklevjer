import * as ui from "../index.js";
import * as utils from "../../utils/index.js";

function createProductImageContainer(productImage) {
  return utils.createHTMLElement("div", null, null, [productImage]);
}

function createProductImage(imageSrc, altText) {
  const productImage = utils.createHTMLElement("img", "product-image", null, null, null, imageSrc, altText);
  productImage.addEventListener("click", ui.renderModal);
  return productImage;
}

function createProductTitle(productTitle) {
  return utils.createHTMLElement("h1", null, productTitle);
}

function createProductColor(productColor) {
  return utils.createHTMLElement("p", "product-color", productColor);
}

function createProductPrice(productPrice) {
  const productPriceDollars = (productPrice / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
  return utils.createHTMLElement("span", null, productPriceDollars);
}

function createProductStock() {
  return utils.createHTMLElement("span", "in-stock", "In stock");
}

function createPriceStockContainer(priceStockChildren) {
  return utils.createHTMLElement("div", "price-stock", null, priceStockChildren);
}

function createSizeLabel() {
  const sizeLabel = utils.createHTMLElement("label", "sr-only", "Size");
  sizeLabel.setAttribute("for", "size");
  return sizeLabel;
}

function createSizeOptions(sizes) {
  const sizeOptions = sizes.map((size) => {
    const sizeOption = utils.createHTMLElement("option", null, size.name);
    sizeOption.value = size.name;
    return sizeOption;
  });

  return sizeOptions;
}

function createSizeSelect(sizeOptions) {
  const sizeSelect = utils.createHTMLElement("select", null, null, sizeOptions);
  sizeSelect.id = "size";
  sizeSelect.name = "size";
  return sizeSelect;
}

function createProductCTA() {
  const productCTA = utils.createHTMLElement("input", "cta");
  productCTA.type = "submit";
  productCTA.value = "Add to cart";
  return productCTA;
}

function createCheckoutCTA() {
  return utils.createHTMLElement("a", ["cta", "clear-blue-cta", "hidden"], "Go to checkout", null, "/pages/checkout/");
}

function createProductForm(product, productFormChildren) {
  const productForm = utils.createHTMLElement("form", null, null, productFormChildren);

  productForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const sizeSelect = productForm.size;
    const checkoutCTA = productForm.querySelector(".clear-blue-cta");

    product.size = sizeSelect.value;
    checkoutCTA.classList.remove("hidden");

    ui.addToCart(product);
    ui.showNotifyMessage(`‘${product.name}’ added to cart!`);
  });

  return productForm;
}

function createProductDetailsContainer(productDetailsChildren) {
  return utils.createHTMLElement("div", "product-specific-content", null, productDetailsChildren);
}

function findProductColor(product) {
  const colorAttribute = product.attributes.find((attribute) => attribute.name === "Color");
  return colorAttribute ? colorAttribute.terms[0].name : "Unknown";
}

function findProductSizes(product) {
  const sizeAttribute = product.attributes.find((attribute) => attribute.name === "Size");
  return sizeAttribute ? sizeAttribute.terms : [];
}

function createProduct(product) {
  const productImage = createProductImage(product.images[0].src, product.images[0].alt);
  const productImageContainer = createProductImageContainer(productImage);

  const productTitle = createProductTitle(product.name);
  const productColorName = findProductColor(product);
  const productColor = createProductColor(productColorName);
  const productDescriptions = utils.parseHTML(product.description);

  const productPrice = createProductPrice(product.prices.price);
  const productStock = createProductStock();
  const priceStockChildren = [productPrice, productStock];
  const priceStockContainer = createPriceStockContainer(priceStockChildren);

  const sizeLabel = createSizeLabel();
  const sizes = findProductSizes(product);
  const sizeOptions = createSizeOptions(sizes);
  const sizeSelect = createSizeSelect(sizeOptions);
  const productCTA = createProductCTA();
  const checkoutCTA = createCheckoutCTA();
  const productFormChildren = [sizeLabel, sizeSelect, productCTA, checkoutCTA];
  const productForm = createProductForm(product, productFormChildren);

  const productDetailsChildren = [productTitle, productColor, ...productDescriptions, priceStockContainer, productForm];
  const productDetailsContainer = createProductDetailsContainer(productDetailsChildren);

  const productDetailsElements = [productImageContainer, productDetailsContainer];
  return productDetailsElements;
}

export function renderProductDetails(product) {
  const productContainer = document.querySelector(".product-specific");
  utils.clearElement(productContainer);

  const createdProduct = createProduct(product);
  productContainer.append(...createdProduct);
}
