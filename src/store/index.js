import { createStore } from "vuex";
import alertStore from "@/store/modules/alertStore";
import CollectionStore from "@/store/modules/CollectionStore";
import error from "@/store/error";

const store = createStore({
  state() {
    return {};
  },
  mutations: {},
  modules: {
    alertStore: alertStore,
    collectionStore: CollectionStore,
    error,
  },
});

export default store;
