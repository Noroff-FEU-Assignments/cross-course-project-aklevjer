import * as ui from "../index.js";
import * as utils from "../../utils/index.js";

/**
 * Automaticly format the credit card number by adding a space after every four digits
 * Inspiration: https://www.vrsofttech.com/javascript/credit-card-number-auto-format-using-javascript
 */
function autoFormatCreditCardNumber(event) {
  if (event.key === "Backspace") return;

  setTimeout(() => {
    const creditCardNumber = event.target.value;

    if (creditCardNumber.length < 19) {
      event.target.value = creditCardNumber.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
    }
  });
}

// Automatically format the expiry date by adding a "/" after the second digit
function autoFormatExpiryDate(event) {
  if (event.key === "Backspace") return;

  setTimeout(() => {
    const expiryDate = event.target.value;

    if (expiryDate.length === 2) {
      event.target.value += "/";
    }
  });
}

function initInputListeners(inputElements) {
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("change", () => {
      ui.toggleInputError(inputElement, utils.validateInput(inputElement));
    });

    if (inputElement.name === "creditcardnumber") {
      inputElement.addEventListener("keydown", autoFormatCreditCardNumber);
    }

    if (inputElement.name === "expdate") {
      inputElement.addEventListener("keydown", autoFormatExpiryDate);
    }
  });
}

function handleCheckoutSubmit(event, inputElements) {
  event.preventDefault();

  let allInputsValid = true;

  inputElements.forEach((inputElement) => {
    const inputValid = utils.validateInput(inputElement);
    ui.toggleInputError(inputElement, inputValid);

    if (!inputValid) {
      allInputsValid = false;
    }
  });

  if (allInputsValid) {
    ui.clearCart();
    location.href = "/pages/checkout/success/";
  }
}

export function initCheckoutForm() {
  const checkoutForm = document.querySelector(".checkout-stages");
  // prettier-ignore
  const inputElements = [
    checkoutForm.email,
    checkoutForm.firstname,
    checkoutForm.lastname,
    checkoutForm.streetaddress,
    checkoutForm.postcode,
    checkoutForm.city,
    checkoutForm.country,
    checkoutForm.creditcardnumber,
    checkoutForm.expdate,
    checkoutForm.cvv
  ];

  initInputListeners(inputElements);
  checkoutForm.addEventListener("submit", (event) => handleCheckoutSubmit(event, inputElements));
}
