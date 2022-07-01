import * as collectionApi from "@/api/collection";
import * as mainApi from "@/api/main";
import * as shopApi from "@/api/shops";
import "whatwg-fetch";
const MainStore = {
  namespaced: true,
  state: {
    designs: [],
    tagrank: [],
    monthlyart: [],
    shops: [],
  },
  mutations: {
    setDesign(state, data) {
      state.designs = data;
    },
    setTagrank(state, data) {
      state.tagrank = data;
    },
    setMonthlyart(state, data) {
      state.monthlyart = data;
    },
    setShops(state, data) {
      state.shops = data;
    },
  },
  actions: {
    async fetchDesigns(context) {
      let query = null,
        unit = 8,
        page = 1;

      await collectionApi
        .fetchPosts(page, unit, query)
        .then(function (response) {
          if (response.status == 200) {
            context.commit("setDesign", response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async fetchTagrank(context, qty) {
      await mainApi
        .fetchTagrank(qty)
        .then(function (response) {
          if (response.status == 200) {
            context.commit("setTagrank", response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async fetchThumbnails(context) {
      await mainApi
        .fetchThumbnails(1, 0)
        .then(function (response) {
          if (response.status == 200) {
            context.commit("setMonthlyart", response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async getShops(context, payload) {
      await shopApi
        .getShops(1, payload.sido, payload.sigungu)
        .then(function (response) {
          context.commit("setShops", response.data.shops);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};

export default MainStore;
