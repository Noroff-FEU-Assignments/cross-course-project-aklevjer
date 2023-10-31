import * as constants from "../constants/index.js";

export async function fetchProducts() {
  const response = await fetch(constants.apiUrl);
  const products = await response.json();

  if (!response.ok) {
    throw new Error(response.status);
  }

  return products;
}

export async function fetchProductById(productId) {
  const response = await fetch(constants.apiUrl + productId);
  const product = await response.json();

  if (!response.ok) {
    throw new Error(response.status);
  }

  return product;
}
