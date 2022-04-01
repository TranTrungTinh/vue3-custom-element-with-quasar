/**
 * @file App config
 * @module config.app
 */

export const META = Object.freeze({
  appName: "glasson-helloo",
})

export const INITIAL_LINKS = [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Material+Icons",
  },
  // ? Css reset
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/gh/jgthms/minireset.css@master/minireset.min.css",
  }
]