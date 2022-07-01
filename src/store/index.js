import { createStore } from "vuex";
import alertStore from "@/store/modules/alertStore";
import CollectionStore from "@/store/modules/CollectionStore";
import error from "@/store/error";
import ShopStore from "@/store/modules/ShopStore";
import CommonStore from "@/store/modules/CommonStore";
import MonthlyartStore from "@/store/modules/MonthlyartStore";
import ComparisonStore from "@/store/modules/ComparisonStore";
import MainStore from "@/store/modules/MainStore";

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
    ComparisonStore,
    MainStore,
  },
});

export default store;
