/**
 * Býr til element með nafni og bætir við öðrum elementum eða texta nóðum.
 * @param {string} name Nafn á elementi
 * @param {Record<string, string | EventListener>} attributes Eiginleikar á elementi, strengir eða föll.
 * @param  {...string | HTMLElement} children Hugsanleg börn: önnur element eða strengir
 * @returns {HTMLElement} Elementi með gefnum börnum
 */
export function el(name, attributes = {}, ...children) {
  const e = document.createElement(name);

  for (const key of Object.keys(attributes)) {
    if (typeof attributes[key] === 'function') {
      e.addEventListener(key, attributes[key]);
      continue;
    }
    e.setAttribute(key, attributes[key]);
  }

  for (const child of children) {
    if (!child) {
      console.warn('Child is null', name, attributes);

      continue;
    }

    if (typeof child === 'string' || typeof child === 'number') {
      e.appendChild(document.createTextNode(child.toString()));
    } else {
      e.appendChild(child);
    }
  }

  return e;
}

/**
 * Fjarlægir öll börn `element`.
 * @param {Element} element Element sem á að tæma
 */
export function empty(element) {
  if (!element || !element.firstChild) {
    return;
  }

  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Setur texta í element sem passar við `selector`.
 * Skilar `true` ef gekk, annars `false` (element fannst ekki).
 * @param {string} selector CSS selector
 * @param {string} text Texti
 * @returns {boolean}
 */
export function setText(selector, text) {
  const element = document.querySelector(selector);

  if (!element) {
    return false;
  }

  element.textContent = text;
  return true;
}
