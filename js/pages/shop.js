import * as api from "../api/index.js";
import * as constants from "../constants/index.js";
import * as ui from "../ui/index.js";

export async function shopPage() {
  try {
    const products = await api.fetchProducts(constants.apiParamsAll);
    const productsList = document.querySelector(".products-list");

    ui.renderProducts(products, productsList, true);
  } catch (error) {
    console.error(error);
    ui.showErrorMessage();
  }
}
