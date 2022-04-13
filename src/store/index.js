import { createStore } from "vuex";
import alertStore from "@/store/modules/alertStore";
import CollectionStore from "@/store/modules/CollectionStore";
import error from "@/store/error";
import ShopStore from "@/store/modules/ShopStore";

const store = createStore({
  state() {
    return {};
  },
  mutations: {},
  modules: {
    alertStore: alertStore,
    collectionStore: CollectionStore,
    error,
    ShopStore,
  },
});

export default store;
