import { createStore } from "vuex";
import alertStore from "@/store/modules/alertStore";
import CollectionStore from "@/store/modules/CollectionStore";
import error from "@/store/error";
import ShopStore from "@/store/modules/ShopStore";
import CommonStore from "@/store/modules/CommonStore";
import MonthlyartStore from "./modules/MonthlyartStore";

const store = createStore({
  state() {
    return {
      pagecondintion: false,
    };
  },
  mutations: {
    Setpagecondition(state, payload) {
      state.pagecondintion = payload;
    },
  },
  modules: {
    alertStore: alertStore,
    collectionStore: CollectionStore,
    error,
    ShopStore,
    CommonStore,
    MonthlyartStore,
  },
});

export default store;
