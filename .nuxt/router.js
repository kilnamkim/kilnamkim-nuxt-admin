import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _304924ec = () => interopDefault(import('../pages/callback.vue' /* webpackChunkName: "pages/callback" */))
const _11fd5118 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _750e9624 = () => interopDefault(import('../pages/public.vue' /* webpackChunkName: "pages/public" */))
const _9d01b208 = () => interopDefault(import('../pages/secure.vue' /* webpackChunkName: "pages/secure" */))
const _1ea9a1bc = () => interopDefault(import('../pages/signed-out.vue' /* webpackChunkName: "pages/signed-out" */))
const _2d59b45d = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/callback",
    component: _304924ec,
    name: "callback"
  }, {
    path: "/login",
    component: _11fd5118,
    name: "login"
  }, {
    path: "/public",
    component: _750e9624,
    name: "public"
  }, {
    path: "/secure",
    component: _9d01b208,
    name: "secure"
  }, {
    path: "/signed-out",
    component: _1ea9a1bc,
    name: "signed-out"
  }, {
    path: "/",
    component: _2d59b45d,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
