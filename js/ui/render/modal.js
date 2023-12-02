import * as utils from "../../utils/index.js";

function createModalCloseSymbol() {
  const modalCloseSymbol = utils.createHTMLElement("span", null, "x");
  modalCloseSymbol.setAttribute("aria-hidden", "true");
  return modalCloseSymbol;
}

function createModalCloseSrText() {
  return utils.createHTMLElement("span", "sr-only", "Close modal");
}

function createModalCloseBtn(modalCloseBtnChildren) {
  return utils.createHTMLElement("button", "modal-close-button", null, modalCloseBtnChildren);
}

function createModalContent(modalChildren) {
  return utils.createHTMLElement("div", "modal-content", null, modalChildren);
}

function createModalContainer(modalContent) {
  const modalContainer = utils.createHTMLElement("div", "modal", null, [modalContent]);

  modalContainer.addEventListener("click", (event) => {
    // Close modal if user clicks outside of the image
    if (!event.target.classList.contains("modal-image")) {
      toggleModalOpen(modalContainer);
      modalContainer.addEventListener("transitionend", modalContainer.remove, { once: true });
    }
  });

  return modalContainer;
}

function toggleModalOpen(modalContainer) {
  modalContainer.classList.toggle("modal-open");
  document.body.classList.toggle("disable-scroll");
}

function initModal(modalContainer, modalImage) {
  modalImage.classList.replace("product-image", "modal-image");
  modalImage.addEventListener("load", () => toggleModalOpen(modalContainer), { once: true });
}

export function renderModal(event) {
  const modalImage = event.target.cloneNode();

  const modalCloseSymbol = createModalCloseSymbol();
  const modalCloseSrText = createModalCloseSrText();
  const modalCloseBtnChildren = [modalCloseSymbol, modalCloseSrText];
  const modalCloseBtn = createModalCloseBtn(modalCloseBtnChildren);

  const modalChildren = [modalCloseBtn, modalImage];
  const modalContent = createModalContent(modalChildren);

  const modalContainer = createModalContainer(modalContent);
  document.body.append(modalContainer);

  initModal(modalContainer, modalImage);
}
