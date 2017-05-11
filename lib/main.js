const DOMNodeCollection = require('./dom_node_collection.js');

const _docReadyCallbacks = [];
let _docReady = false;

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

mm$.merge = (baseObj, ...otherObjs) => {
  otherObjs.forEach( obj => {
    obj.keys.forEach( key => {
      baseObj[key] = obj[key];
    });
  });
  return baseObj;
};

mm$.formQuery = obj => {
  let output = '';
  obj.keys.forEach( key => {
    output += key + '=' + obj[key] + '&';
  });
};

mm$.ajax = options => {
  const req = new XMLHttpRequest();
  const defaultReq = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: 'GET',
    url: '',
    success: () => {},
    error: () => [],
    data: {}
  };

  options = mm$.merge(defaultReq, options);
  options.method = options.method.toUpperCase();

  if (options.method === 'GET') {
    options.url += '?' + formQuery(options.data);
  }

  req.open(options.method, options.url, true);
  req.onload = e => {
    (req.status === 200) ?
      options.success(req.response) : options.error(req.response);
  };

  req.send(JSON.stringify(options.data));
};
