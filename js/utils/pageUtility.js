export function trimProductTitle(productTitle) {
  return productTitle.replace("Rainy Days ", "");
}

export function setPageTitle(title) {
  document.title += ` ${title}`;
}

export function setMetaDescription(description) {
  const metaDescription = document.head.querySelector("meta[name='description']");
  metaDescription.setAttribute("content", description);
}
