/**
 * @file App config
 * @module config.app
 */

export const META = Object.freeze({
  appName: 'waypro-app',
})

export const INITIAL_LINKS = [
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
    as: 'font',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    as: 'font',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Material+Icons',
  },
  // ? Css reset
  // {
  //   rel: "stylesheet",
  //   href: "https://cdn.jsdelivr.net/gh/jgthms/minireset.css@master/minireset.min.css",
  // }
]

export const INITIAL_SCRIPTS = {
  threeMap: import.meta.env.VITE_EXTERNAL_THREE_MAP,
  threeModule: import.meta.env.VITE_EXTERNAL_THREE_MODULE,
  coreTryOn: import.meta.env.VITE_TRY_ON_CORE,
}

export const LINE = Object.freeze({
  account: import.meta.env.VITE_LINE_ACCOUNT,
  uri: `${window.location.origin}${window.location.pathname}`, // import.meta.env.VITE_LP_URL,
})

export const QUESTIONNAIRE = Object.freeze({
  uri: 'https://ws.formzu.net/sfgen/S534939494/?ref=line&openExternalBrowser=1',
})

// export const APP_VERSION = __APP_VERSION__
