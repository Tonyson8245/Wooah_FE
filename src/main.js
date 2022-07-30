import { createApp, nextTick } from "vue";
import App from "./App.vue";
import router from "./router";

import mitt from "mitt";
import store from "./store/index.js";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "gitart-vue-dialog/dist/style.css";
import { GDialog } from "gitart-vue-dialog";
import "whatwg-fetch";
import VueGtag from "vue-gtag";

let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter;

Sentry.init({
  app,
  dsn: process.env.VUE_APP_Sentry,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", process.env.VUP_APP_URL, /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  enabled: process.env.NODE_ENV !== "development",
});

app.use(router);

app
  .use(VueGtag, {
    config: {
      id: process.env.VUE_APP_G_ID, // develop
      params: {
        send_page_view: false,
      },
      debug_mode: true,
    },
  })
  .use(store)
  .component("GDialog", GDialog)
  .mount("#app");

router.afterEach((to) => {
  //nextTick은 Dom이 업데이트 된 후 실행됩니다.
  nextTick(() => {
    document.title = to.meta.title;
  });
});
