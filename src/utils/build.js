import appConfig from '@/configs/app.config'
 
const minify = (resource) => resource.replace(/^\s+|\r\n|\n|\r|(>)\s+(<)|\s+$/gm, '$1$2')

export const linksLoader = (urls) => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = url.rel
    link.href = url.href;
    document.head.appendChild(link);
  });
}

export const shadowBody = () => document.querySelector(appConfig.appName).shadowRoot?.querySelector('body')
export const shadowRoot = () => document.querySelector(appConfig.appName).shadowRoot

export function asyncGetContainer() {
  return new Promise(resolve => {
    const observer = new MutationObserver((mutations, me) => {
      const myContainer = shadowBody()
      if (myContainer) {
        me.disconnect();
        resolve(myContainer);
      }
    });
    observer.observe(document, {
      childList: true,
      subtree: true
    });
  });
}

export const modifyRoot = strings => strings.replaceAll(':root', ':host')

export const styleLoader = (...styles) => styles.map(minify)

// TODO: Check device or browser support CSSStyleSheet
const supportsConstructibleStylesheets = (() => {
  try { return !!new CSSStyleSheet(); }
  catch (e) { return false; }
})()

// TODO: Create CSSStyleSheet
function getOrCreateStylesheet(cssText) {
  const newSheet = new CSSStyleSheet();
  newSheet.replace(cssText);
  return newSheet
}

// TODO: Append StyleSheet
function appendStyleToHost(root, cssText) {
  const style = document.createElement("style");
  style.textContent = cssText
  root.prepend(style);
}

// TODO: IOS safari device body
function mordifyIOSSafariBody() {
  document.body.style.width = '100%'
  document.body.style.height = '100%'
  document.body.style.margin = '0'
  document.body.style.padding = '0'
}
// TODO: Check device is ios
const ios = (() => {
  if (typeof window === `undefined` || typeof navigator === `undefined`) return false;
  return /iPhone|iPad|iPod/i.test(navigator.userAgent || navigator.vendor);
})()

export const cssCompiler = (injectStyle) => {
  const root = shadowRoot()
  // * Optimize for Specific browser or device
  if (supportsConstructibleStylesheets) {
    // TODO: encapsulate styles in a new stylesheet
    root.adoptedStyleSheets = [...root.adoptedStyleSheets || [], getOrCreateStylesheet(injectStyle)]
  } else {
    appendStyleToHost(root, injectStyle)
  }

  ios && mordifyIOSSafariBody()
}