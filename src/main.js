import { createApp, nextTick } from "vue";
import App from "./App.vue";
import router from "./router";
import mitt from "mitt";
import store from "./store/index.js";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "gitart-vue-dialog/dist/style.css";
import { GDialog } from "gitart-vue-dialog";
import "whatwg-fetch";
import VueGtag from "vue-gtag";

let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter;

//develop // G_ID=G-V9WCQE12V1
//production //G_ID=G-94T10DHKSC
app
  .use(VueGtag, {
    config: {
      id: `G-94T10DHKSC`,
      params: {
        send_page_view: false,
      },
      debug_mode: true,
    },
  })
  .use(router)
  .use(store)
  .component("GDialog", GDialog)
  .mount("#app");

router.afterEach((to) => {
  //nextTick은 Dom이 업데이트 된 후 실행됩니다.
  nextTick(() => {
    document.title = to.meta.title;
  });
});
