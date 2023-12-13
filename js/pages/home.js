import * as api from "../api/index.js";
import * as constants from "../constants/index.js";
import * as ui from "../ui/index.js";

export async function homePage() {
  try {
    const featuredProducts = await api.fetchProducts(constants.apiParamsFeatured);
    const productsContainer = document.querySelector(".bestsellers-container");

    ui.renderProducts(featuredProducts, productsContainer, false);
    ui.initCarousel();
  } catch (error) {
    console.error(error);
    ui.showErrorMessage();
  }
}
