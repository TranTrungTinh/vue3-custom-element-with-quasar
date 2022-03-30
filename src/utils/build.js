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

export const shadowBody = () => document.querySelector(appConfig.appName).shadowRoot.querySelector('body')

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