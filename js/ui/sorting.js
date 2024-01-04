import * as ui from "./index.js";

function sortProducts(products, defaultSortedProducts, sortOrder) {
  switch (sortOrder) {
    case "name-ascending":
      return products.sort((a, b) => (a.name > b.name ? 1 : -1));
    case "name-descending":
      return products.sort((a, b) => (b.name > a.name ? 1 : -1));
    case "price-ascending":
      return products.sort((a, b) => a.prices.price - b.prices.price);
    case "price-descending":
      return products.sort((a, b) => b.prices.price - a.prices.price);
    default:
      return defaultSortedProducts;
  }
}

export function initProductSorting(products, parentElement) {
  const sortSelect = document.querySelector("#sort-select");
  const defaultSortedProducts = [...products];

  sortSelect.addEventListener("change", () => {
    const sortedProducts = sortProducts(products, defaultSortedProducts, sortSelect.value);
    ui.renderProducts(sortedProducts, parentElement, true);
  });
}
