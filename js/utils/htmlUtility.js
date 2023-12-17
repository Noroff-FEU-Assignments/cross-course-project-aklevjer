export function createHTMLElement(tagname, classnames = null, text = null, children = null, url = null, src = null, alt = null) {
  const element = document.createElement(tagname);

  if (Array.isArray(classnames) && classnames.length) {
    element.classList.add(...classnames);
  } else if (typeof classnames === "string" && classnames.trim() !== "") {
    element.classList.add(classnames);
  }

  if (text) {
    element.textContent = text;
  }

  if (Array.isArray(children) && children.length) {
    element.append(...children);
  }

  if (url) {
    element.href = url;
  }

  if (src && alt) {
    element.setAttribute("src", src);
    element.setAttribute("alt", alt);
  }

  return element;
}

export function clearElement(element) {
  element.innerHTML = "";
}

export function parseHTML(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return doc.body.children;
}
