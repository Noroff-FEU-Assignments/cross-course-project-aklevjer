import * as pages from "./pages/index.js";
import * as ui from "./ui/index.js";

ui.updateCartCount();

switch (location.pathname) {
  case "/":
    pages.homePage();
    break;
  case "/pages/shop/":
    pages.shopPage();
    break;
  case "/pages/shop/product/":
    pages.productPage();
    break;
  case "/pages/checkout/":
    pages.checkoutPage();
    break;
}
