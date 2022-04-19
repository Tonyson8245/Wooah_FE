import shops from "../../assets/dummy/shop";
import shopinfo from "../../assets/dummy/shopinfo";
import shopimg from "../../assets/dummy/shopimages";
import * as shopApi from "@/api/shops";
const ShopStore = {
  namespaced: true,
  state: {
    MapView: true,
    shopinfo: shopinfo,
    shopimg: shopimg,

    //설정 시도
    sido: 1,
    sigungu: 1,

    //샵 리스트 데이터
    totalpage: 0,
    shops: shops,
    currentpage: 0,
  },
  mutations: {
    SetMapView(state, payload) {
      state.MapView = payload;
    },
  },
  actions: {
    async getShops(context, page) {
      await shopApi
        .getShops(page, context.state.sido, context.state.sigungu)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};

export default ShopStore;
