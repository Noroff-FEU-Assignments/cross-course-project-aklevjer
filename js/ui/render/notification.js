import * as utils from "../../utils/index.js";

function createSuccessIcon() {
  return utils.createHTMLElement("img", "icon", null, null, null, "/images/icons/success_icon_small.svg", "Success icon");
}

function createNotifyBody(message) {
  return utils.createHTMLElement("p", null, message);
}

function createNotifyContainer(notifyChildren) {
  const notifyContainer = utils.createHTMLElement("div", "notification", null, notifyChildren);
  notifyContainer.setAttribute("role", "alert");
  return notifyContainer;
}

function initNotifyMessage(notifyContainer, successIcon) {
  successIcon.addEventListener("load", () => notifyContainer.classList.add("notification-open"), { once: true });
  notifyContainer.addEventListener("animationend", notifyContainer.remove, { once: true });
}

export function showNotifyMessage(message) {
  const successIcon = createSuccessIcon();
  const notifyBody = createNotifyBody(message);

  const notifyChildren = [successIcon, notifyBody];
  const notifyContainer = createNotifyContainer(notifyChildren);

  document.body.append(notifyContainer);

  initNotifyMessage(notifyContainer, successIcon);
}
