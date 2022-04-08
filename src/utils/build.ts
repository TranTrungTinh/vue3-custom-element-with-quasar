import { META } from "@/configs/app.config";

const minify = (resource: string) =>
  resource.replace(/^\s+|\r\n|\n|\r|(>)\s+(<)|\s+$/gm, "$1$2");

export const linksLoader = (urls: { rel: string; href: string }[]) => {
  urls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = url.rel;
    link.href = url.href;
    document.head.appendChild(link);
  });
};

export const shadowRoot = () => document.querySelector(META.appName)?.shadowRoot as AnyObject

export const shadowBody = () =>
  document.querySelector(META.appName)?.shadowRoot?.querySelector("body");

export function asyncGetContainer() {
  return new Promise((resolve) => {
    const observer = new MutationObserver((mutations, me) => {
      const myContainer = shadowBody();
      if (myContainer) {
        me.disconnect();
        resolve(myContainer);
      }
    });
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  });
}

export const modifyRoot = (strings: string) => strings.replaceAll(":root", ":host").replaceAll('@charset "UTF-8"', '')
export const styleLoader = (...styles: string[]) => styles.map(minify);

// TODO: Check device or browser support CSSStyleSheet
const supportsConstructibleStylesheets = (() => {
  try { return !!new CSSStyleSheet(); }
  catch (e) { return false; }
})()

// TODO: Create CSSStyleSheet
function getOrCreateStylesheet(cssText: string): CSSStyleSheet {
  const newSheet: any = new CSSStyleSheet();
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

export const cssCompiler = (injectStyle: string) => {
  const root = shadowRoot()
  // * Optimize for Specific browser or device
  if (supportsConstructibleStylesheets) {
    root.adoptedStyleSheets = [...root.adoptedStyleSheets || [], getOrCreateStylesheet(injectStyle)]
  } else {
    appendStyleToHost(root, injectStyle)
  }

  ios && mordifyIOSSafariBody()
}