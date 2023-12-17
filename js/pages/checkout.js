import * as ui from "../ui/index.js";
import * as utils from "../utils/index.js";

export function checkoutPage() {
  const cart = utils.loadFromStorage();

  if (cart.length) {
    ui.renderCart(cart);
    ui.initCheckoutForm();
  } else {
    ui.renderEmptyCart();
  }
}
