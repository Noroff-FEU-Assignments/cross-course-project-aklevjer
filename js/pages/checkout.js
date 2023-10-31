import * as ui from "../ui/index.js";
import * as utils from "../utils/index.js";

export function checkoutPage() {
  const cart = utils.loadFromStorage();
  const cartContainer = document.querySelector(".order-review-table tbody");

  ui.renderCart(cart, cartContainer);
}
