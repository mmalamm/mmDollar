const DOMNodeCollection = require('./dom_node_collection.js');

window.mm$ = (el) => {
  let array;
  if (typeof el === 'string') {
    let nodeList = document.querySelectorAll(el);
    let array = Array.from(nodeList);
  } else {
    let array = [el];
  }
  return new DOMNodeCollection(array);
};
