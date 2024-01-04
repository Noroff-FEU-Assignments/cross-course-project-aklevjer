import * as utils from "../../utils/index.js";

function createProductImage(imageSrc, altText) {
  return utils.createHTMLElement("img", null, null, null, null, imageSrc, altText);
}

function createProductTitle(productTitle, isShopPage) {
  return utils.createHTMLElement(isShopPage ? "h2" : "h3", null, productTitle);
}

function createProductPrice(productPrice) {
  const productPriceDollars = (productPrice / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
  return utils.createHTMLElement("span", null, productPriceDollars);
}

function createProductItemContainer(productItemChildren, productId) {
  return utils.createHTMLElement("a", "product-container", null, productItemChildren, `/pages/shop/product/?id=${productId}`);
}

function createProductItem(product, isShopPage) {
  const productImg = createProductImage(product.images[0].src, product.images[0].alt);
  const productTitle = createProductTitle(product.name, isShopPage);
  const productShortDescription = utils.parseHTML(product.short_description);
  const productPrice = createProductPrice(product.prices.price);

  const productItemChildren = [productImg, productTitle, ...productShortDescription, productPrice];
  const productItemContainer = createProductItemContainer(productItemChildren, product.id);

  return productItemContainer;
}

function showProductsCount(count) {
  const productsCount = document.querySelector(".products-count");
  productsCount.textContent = `Showing all ${count} products`;
}

export function renderProducts(products, parentElement, isShopPage) {
  utils.clearElement(parentElement);

  products.forEach((product) => {
    const createdProduct = createProductItem(product, isShopPage);
    parentElement.append(createdProduct);
  });

  if (isShopPage) {
    showProductsCount(products.length);
  }
}
