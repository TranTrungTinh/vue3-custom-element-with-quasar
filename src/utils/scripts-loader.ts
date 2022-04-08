/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Module for loading scripts asynchronously in a specific order.
export const scriptsLoader = (function() {
  
  // @public API
  const moduleApi = Object.create(null);
  moduleApi.load = load;
  moduleApi.reset = reset;
  moduleApi.addScript = addScript;
  moduleApi.afterLoad = afterLoad;
  moduleApi.onComplete = onComplete;
  
  // @private
  const noop = (_scriptSrc = null) => {};
  let _scripts = [],
      _afterLoad = noop,
      _onComplete = noop;
      
  // @private
  function removeDuplicatedScripts() {
    const uniques = [];
    const notFound = -1;
    _scripts.forEach(function (item) {
      if (uniques.indexOf(item) === notFound) uniques.push(item);
    });
    return uniques;
  }

  // @private
  function createScriptElement() {
    // gets the first script in the list
    const scriptSrc = _scripts.shift();
    // all scripts were loaded
    if (!scriptSrc) return _onComplete();
    const js = document.createElement('script');
    js.type = 'text/javascript';
    js.src = scriptSrc;
    js.defer = true;
    js.onload = function onLoadCallback() {
      // 
      _afterLoad(scriptSrc);
      // loads the next script
      createScriptElement();
    };
    js.onerror = console.error;
    const s: AnyObject = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(js, s);
  }

  // @public
  // Receive an URL or a list of URLs for each script to be loaded.
  function addScript(scriptSrc) {
    _scripts = _scripts.concat(scriptSrc);
    return moduleApi;
  }

  // @public
  // Run the task to load scripts in the specified order.
  function load() {
    _scripts = removeDuplicatedScripts();
    createScriptElement();
  }

  // @public
  // Clear the array of scripts, or cancels the load of scripts.
  function reset() {
    _scripts.length = 0;
    _onComplete = _afterLoad = noop;
    return moduleApi;
  }

  // @public
  // Callback executed after each script has been loaded.
  function afterLoad(callback) {
    if (typeof callback === 'function') {
      _afterLoad = callback;
    }
    return moduleApi;
  }
  
  // @public
  // Callback executed after all scripts have been loaded.
  function onComplete(callback) {
    if (typeof callback === 'function') {
      _onComplete = callback;
    }
    return moduleApi;
  }

  // @public API
  return moduleApi;
}());

export const linksLoader = (urls) => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = url.rel
    link.href = url.href;
    document.head.appendChild(link);
  });
}
