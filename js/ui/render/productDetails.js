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
  return utils.createHTMLElement("h1", null, utils.trimProductTitle(productTitle));
}

function createProductColor(productColor) {
  return utils.createHTMLElement("p", "product-color", productColor);
}

function createProductDescription(productDescription) {
  return utils.createHTMLElement("p", null, productDescription);
}

function createProductPrice(productPrice) {
  return utils.createHTMLElement("span", null, `$${productPrice}`);
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
    const sizeOption = utils.createHTMLElement("option", null, size);
    sizeOption.value = size;
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

  productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const form = e.target;
    const checkoutCTA = productForm.querySelector(".clear-blue-cta");

    product.size = form.size.value;
    checkoutCTA.classList.remove("hidden");

    ui.addToCart(product);
    ui.showNotifyMessage(`‘${utils.trimProductTitle(product.title)}’ added to cart!`);
  });

  return productForm;
}

function createProductDetailsContainer(productDetailsChildren) {
  return utils.createHTMLElement("div", "product-specific-content", null, productDetailsChildren);
}

function createProduct(product) {
  const productImage = createProductImage(product.image, product.title);
  const productImageContainer = createProductImageContainer(productImage);

  const productTitle = createProductTitle(product.title);
  const productColor = createProductColor(product.baseColor);
  const productDescription = createProductDescription(product.description);

  const productPrice = createProductPrice(product.onSale ? product.discountedPrice : product.price);
  const productStock = createProductStock();
  const priceStockChildren = [productPrice, productStock];
  const priceStockContainer = createPriceStockContainer(priceStockChildren);

  const sizeLabel = createSizeLabel();
  const sizeOptions = createSizeOptions(product.sizes);
  const sizeSelect = createSizeSelect(sizeOptions);
  const productCTA = createProductCTA();
  const checkoutCTA = createCheckoutCTA();
  const productFormChildren = [sizeLabel, sizeSelect, productCTA, checkoutCTA];
  const productForm = createProductForm(product, productFormChildren);

  const productDetailsChildren = [productTitle, productColor, productDescription, priceStockContainer, productForm];
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
