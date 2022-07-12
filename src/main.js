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
import LogRocket from "logrocket";
import VueGtag from "vue-gtag";

let emitter = mitt();
let app = createApp(App);
let G_ID;
app.config.globalProperties.emitter = emitter;

LogRocket.init("gyqcnb/wooah");

Sentry.init({
  app,
  dsn: "https://fb9f9134899d483096cc6eefde05e786@o1306762.ingest.sentry.io/6549726",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", "https://www.wooah.kro.kr/", /^\//],
      attachProps: true,
      logErrors: false,
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(router);

//develop // G_ID=G-V9WCQE12V
//production //G_ID=G-94T10DHKSC
if (process.env.NODE_ENV == "production") G_ID = `G-94T10DHKSC`;
else G_ID = `G-V9WCQE12V1`;
app
  .use(VueGtag, {
    config: {
      id: G_ID, // develop
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
