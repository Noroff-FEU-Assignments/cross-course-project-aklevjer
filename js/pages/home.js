import * as api from "../api/index.js";
import * as ui from "../ui/index.js";

export async function homePage() {
  try {
    const products = await api.fetchProducts();

    const productsOnSale = products.filter((product) => product.onSale);
    const productsContainer = document.querySelector(".bestsellers-container");

    ui.renderProducts(productsOnSale, productsContainer, false);
    ui.initCarousel();
  } catch (error) {
    console.error(error);
    ui.showErrorMessage();
  }
}
