import { setCssVar } from 'quasar'
import { META } from '@/configs/app.config'

const minifier = (resource: string) => resource.replace(/^\s+|\r\n|\n|\r|(>)\s+(<)|\s+$/gm, '$1$2')

export const linksLoader = (
  urls: { rel: string; href: string; as?: string; crossorigin?: string }[]
) => {
  urls.forEach((url) => {
    const link = document.createElement('link')
    link.rel = url.rel
    link.href = url.href
    url.as && (link.as = url.as)
    link.crossOrigin = url.crossorigin || null
    document.head.appendChild(link)
  })
}

export const componentTagName = () => document.querySelector(META.appName) as HTMLElement
export const shadowRoot = () => componentTagName()?.shadowRoot as ShadowRoot
export const shadowBody = () => shadowRoot()?.getElementById(META.appName) as HTMLElement

export const asyncGetContainer = () => {
  return new Promise((resolve) => {
    const observer = new MutationObserver((mutations, me) => {
      const myContainer = shadowBody()
      if (myContainer) {
        me.disconnect()
        resolve(myContainer)
      }
    })
    observer.observe(document, {
      childList: true,
      subtree: true,
    })
  })
}

export const modifyRoot = (strings: string) =>
  strings.replaceAll(':root', ':host').replaceAll('rem;', 'em;')
export const styleLoader = (...styles: string[]) => styles.map(minifier).join('')

const createCustomEvent = (name, args = []) => {
  return new CustomEvent(name, {
    bubbles: false,
    composed: true,
    cancelable: false,
    detail: !args.length ? self : args.length === 1 ? args[0] : args,
  })
}

export const createEventProxies = (component) => {
  const eventNames = component.emits
  const customEvent = {}
  if (eventNames) {
    eventNames.forEach((evName) => {
      const handlerName = `on${evName[0].toUpperCase()}${evName.substring(1)}`

      customEvent[handlerName] = (...args: any) => {
        shadowRoot().dispatchEvent(createCustomEvent(evName, args))
      }
    })
  }
  return customEvent
}

// TODO: Check device or browser support CSSStyleSheet
const supportsConstructibleStylesheets = (() => {
  try {
    return !!new CSSStyleSheet()
  } catch (e) {
    return false
  }
})()

// TODO: Create CSSStyleSheet
function getOrCreateStylesheet(cssText: string): CSSStyleSheet {
  const newSheet: any = new CSSStyleSheet()
  newSheet.replace(cssText)
  return newSheet
}

// TODO: Append StyleSheet
function appendStyleToHost(root, cssText) {
  const style = document.createElement('style')
  style.textContent = cssText
  root.prepend(style)
}

// TODO: IOS safari device body
function modifyIOSSafariBody() {
  document.body.style.width = '100%'
  document.body.style.height = '100%'
  document.body.style.margin = '0'
  document.body.style.padding = '0'
}
// TODO: Check device is ios
// const isAppleSafari = (() => {
//   const appleExpression = /Apple/i;
//   const safariExpression = /Safari/i;

//   return appleExpression.test(navigator.vendor) && safariExpression.test(navigator.userAgent)
// })()

export const cssCompiler = (injectStyle: string) => {
  const root = shadowRoot()
  // * Optimize for Specific browser or device
  if (supportsConstructibleStylesheets) {
    // TODO: encapsulate styles in a new stylesheet
    root.adoptedStyleSheets = [
      ...(root.adoptedStyleSheets || []),
      getOrCreateStylesheet(injectStyle),
    ]
  } else {
    appendStyleToHost(root, injectStyle)
  }

  modifyIOSSafariBody()
}

export const setCssColor = (key: string, value: string) => {
  setCssVar(key, value, shadowRoot as any)
}
