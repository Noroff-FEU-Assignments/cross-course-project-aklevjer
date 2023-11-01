export function trimProductTitle(productTitle) {
  return productTitle.replace("Rainy Days ", "");
}

export function updatePageTitle(title) {
  document.title += ` - ${title}`;
}

export function updateMetaDescription(description) {
  const metaDescription = document.head.querySelector("meta[name='description']");
  metaDescription.setAttribute("content", description);
}
