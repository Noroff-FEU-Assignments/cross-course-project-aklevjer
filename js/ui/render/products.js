import * as utils from "../../utils/index.js";

function createProductImage(imageSrc, altText) {
  return utils.createHTMLElement("img", null, null, null, null, imageSrc, altText);
}

function createProductTitle(productTitle, isShopPage) {
  return utils.createHTMLElement(isShopPage ? "h2" : "h3", null, utils.trimProductTitle(productTitle));
}

function createProductDescription(productDescription) {
  return utils.createHTMLElement("p", null, productDescription);
}

function createProductPrice(productPrice) {
  return utils.createHTMLElement("span", null, `$${productPrice}`);
}

function createProductItemContainer(productItemChildren, productId) {
  return utils.createHTMLElement("a", "product-container", null, productItemChildren, `/pages/shop/product/?id=${productId}`);
}

function createProductItem(product, isShopPage) {
  const productImg = createProductImage(product.image, product.title);
  const productTitle = createProductTitle(product.title, isShopPage);
  const productDescription = createProductDescription(product.description);
  const productPrice = createProductPrice(product.onSale ? product.discountedPrice : product.price);

  const productItemChildren = [productImg, productTitle, productDescription, productPrice];
  const productItemContainer = createProductItemContainer(productItemChildren, product.id);

  return productItemContainer;
}

export function renderProducts(products, parentElement, isShopPage) {
  utils.clearElement(parentElement);

  products.forEach((product) => {
    const createdProduct = createProductItem(product, isShopPage);
    parentElement.append(createdProduct);
  });
}
