import * as ui from "../index.js";
import * as utils from "../../utils/index.js";

function initInputListeners(inputElements) {
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("change", () => {
      ui.toggleInputError(inputElement, utils.validateInput(inputElement));
    });
  });
}

function handleContactSubmit(event, inputElements) {
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
    ui.showNotifyMessage("Your message was sent!");
  }
}

export function initContactForm() {
  const contactForm = document.querySelector(".contact-form");
  const inputElements = [contactForm.name, contactForm.email, contactForm.subject, contactForm.message];

  initInputListeners(inputElements);
  contactForm.addEventListener("submit", (event) => handleContactSubmit(event, inputElements));
}
