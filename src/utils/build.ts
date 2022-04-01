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

export const modifyRoot = (strings: string) => strings.replaceAll(":root", ":host");

export const styleLoader = (...styles: string[]) => styles.map(minify);
