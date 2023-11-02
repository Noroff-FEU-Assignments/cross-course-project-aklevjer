import * as api from "../api/index.js";
import * as ui from "../ui/index.js";
import * as utils from "../utils/index.js";

export async function productPage() {
  try {
    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    const product = await api.fetchProductById(id);
    const productTitle = utils.trimProductTitle(product.title);

    utils.updatePageTitle(productTitle);
    utils.updateMetaDescription(product.description);

    const breadcrumbsCurrent = document.querySelector(".breadcrumbs strong");
    breadcrumbsCurrent.innerText = productTitle;

    ui.renderProductDetails(product);
  } catch (error) {
    console.error(error);
    ui.showErrorMessage();
  }
}
