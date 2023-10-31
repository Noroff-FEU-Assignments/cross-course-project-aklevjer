import * as api from "../api/index.js";
import * as ui from "../ui/index.js";

export async function shopPage() {
  try {
    const products = await api.fetchProducts();

    const productsList = document.querySelector(".products-list");
    ui.renderProducts(products, productsList, true);
  } catch (error) {
    console.error(error);
    ui.showErrorMessage();
  }
}
