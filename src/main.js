import { createApp } from "vue";
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

app
  .use(VueGtag, {
    config: { id: "G-V9WCQE12V1" },
  })
  .use(router)
  .use(store)
  .component("GDialog", GDialog)
  .mount("#app");
// GA
