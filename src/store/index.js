import { createStore } from "vuex";
import alertStore from "@/store/modules/alertStore";
import CollectionStore from "@/store/modules/CollectionStore";

const store = createStore({
  state() {
    return {};
  },
  mutations: {},
  modules: {
    alertStore: alertStore,
    collectionStore: CollectionStore,
  },
});

export default store;
