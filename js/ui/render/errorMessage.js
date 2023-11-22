import * as utils from "../../utils/index.js";

function createErrorIcon() {
  return utils.createHTMLElement("img", "icon", null, null, null, "/images/icons/error_icon_large.svg", "Error icon");
}

function createErrorTitle() {
  return utils.createHTMLElement("strong", null, "Error");
}

function createErrorBody(message) {
  return utils.createHTMLElement("p", null, message);
}

function createErrorInfoContainer(errorInfoChildren) {
  return utils.createHTMLElement("div", null, null, errorInfoChildren);
}

function changeSpinnerIntoErrorMsg(errorMessageElements) {
  const loadingSpinner = document.querySelector(".loading-spinner");

  loadingSpinner.classList.replace("loading-spinner", "error-message");
  loadingSpinner.append(...errorMessageElements);
}

export function showErrorMessage(message = "Ooops! We couldn't get the data right now.") {
  const errorIcon = createErrorIcon();

  const errorTitle = createErrorTitle();
  const errorBody = createErrorBody(message);
  const errorInfoChildren = [errorTitle, errorBody];
  const errorInfoContainer = createErrorInfoContainer(errorInfoChildren);

  const errorMessageElements = [errorIcon, errorInfoContainer];
  changeSpinnerIntoErrorMsg(errorMessageElements);
}

export function toggleInputError(inputElement, showError) {
  const inputContainer = inputElement.parentElement;
  const errorIcon = inputContainer.querySelector(".input-error-icon");
  const errorMessage = inputContainer.querySelector(".input-error-message");

  inputElement.classList.toggle("input-error-border", !showError);
  errorIcon.classList.toggle("hidden", showError);
  errorMessage.classList.toggle("hidden", showError);
}
