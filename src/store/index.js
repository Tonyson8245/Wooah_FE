import { createStore } from "vuex";
import alertStore from "@/store/modules/alertStore";

const store = createStore({
  state() {
    return {};
  },
  mutations: {},
  modules: {
    alertStore: alertStore,
  },
});

export default store;
