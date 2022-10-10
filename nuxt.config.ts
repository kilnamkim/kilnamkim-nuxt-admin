import { NuxtConfig } from "@nuxt/types";
import oidcMockServer from "./api/oidcmockserver";

export default <NuxtConfig>{
  build: {
    extractCSS: true,
  },
  router: {
    middleware: ["auth"],
  },
  serverMiddleware: ["~/api/auth"],
  buildModules: ["@nuxt/typescript-build"],
  modules: ["bootstrap-vue/nuxt", "@nuxtjs/axios", "@nuxtjs/auth-next"],
  components: true,
  axios: {
    proxy: true,
  },
  proxy: {
    "/api": "http://localhost:3000",
    "/laravel": {
      target: "https://laravel-auth.nuxtjs.app",
      pathRewrite: { "^/laravel": "/" },
    },
  },
  auth: {
    redirect: {
      callback: "/callback",
      logout: "/signed-out",
    },
    strategies: {
      local: {
        token: {
          property: "token.accessToken",
        },
      },
      localRefresh: {
        scheme: "refresh",
        token: {
          property: "token.accessToken",
          maxAge: 15,
        },
        refreshToken: {
          property: "token.refreshToken",
          data: "refreshToken",
          maxAge: false,
        },
      },
    },
  },
};
