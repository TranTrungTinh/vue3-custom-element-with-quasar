export function parseInputData (jsonString) {
  try {
    const output = JSON.parse(jsonString);
    if (output && typeof output === "object") {
      return output
    }
  }
  catch (e) {
    return null;
  }
};

export function unProxify(val) {
  if (val instanceof Array) return val.map(unProxify)
  if (val instanceof Object) return Object.fromEntries(Object.entries(Object.assign({},val)).map(([k,v])=>[k,unProxify(v)]))
  return val
}