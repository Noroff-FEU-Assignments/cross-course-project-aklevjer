import * as api from "../api/index.js";
import * as ui from "../ui/index.js";
import * as utils from "../utils/index.js";

export async function productPage() {
  try {
    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    const product = await api.fetchProductById(id);
    utils.updatePageTitle(product.name);

    const breadcrumbsCurrent = document.querySelector(".breadcrumbs strong");
    breadcrumbsCurrent.textContent = product.name;

    ui.renderProductDetails(product);
  } catch (error) {
    console.error(error);
    ui.showErrorMessage();
  }
}
