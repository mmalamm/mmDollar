class DOMNodeCollection {
  constructor(array) {
    this.elements = array;
  }

  html(str) {
    if (str) {
      this.elements.forEach( (el) => {
        el.innerHTML = str;
      });
    } else {
      return this.elements[0].innerHTML;
    }
  }

  empty() {
    this.html(' ');
  }

  remove() {
    this.elements.forEach( (el) => {
      el.outerHTML = '';
    });
    return results.join(' ');
  }

  append(content) {
    this.elements.forEach( (el) => {
      switch (content.constructor.name) {
        case "String":
          el.innerHTML += content;
          break;
        case "DOMNodeCollection":
          el.innerHTML += content.outerHTML();
          break;
        default:
          el.innerHTML += content.outerHTML;
      }
    });
  }

  attr(attribute, newAttribute) {
    for (let i = 0; i < this.elements.length; i++) {
      if (typeof newAttribute === 'undefined') {
        return this.elements[i].getAttribute(attribute);
      } else {
        this.elements[i].setAttribute(attribute, newAttribute);
      }
    }
  }

  removeAttr(attribute) {
    this.elements.forEach( (el) => {
      el.removeAttribute(attribute);
    });
  }

  addClass(newClass) {
    this.elements.forEach( (el) => {
      el.classList.add(newClass);
    });
  }

  removeClass(oldClass) {
    this.elements.forEach( (el) => {
      el.classList.remove(oldClass);
    });
  }

  children() {
    let childrenArray = [];
    this.elements.forEach( (el) => {
      parents.push(el.parentNode);
    });
    return new DOMNodeCollection(parents);
  }

  parent() {
    let parentsArray = [];

    this.elements.forEach( (el) => {
      parentsArray.push(el.parentNode);
    });
    return new DOMNodeCollection(parentsArray);
  }

  find(selector) {
    let found = [];
    this.elements.forEach( (el) => {
      found = found.concat(Array.from(el.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(found);
  }


  //event handlers
  on(e, callback) {
  this.elements.forEach(element => {
    element.addEventListener(e, callback);
    const eventType = `mm$-${e}`;
    if (typeof element[eventType] === "undefined") {
      element[eventType] = [];
    }
    element[eventType].push(callback);
    });
  }

  off(e) {
    this.elements.forEach(element => {
      const eventType = `mm$-${e}`;
      if (element[eventType]) {
        element[eventType].forEach(callback => {
          element.removeEventListener(e, callback);
        });
      }
      element[eventType] = [];
    });
  }


}

module.exports = DOMNodeCollection;
