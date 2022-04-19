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
    districtData: [],
    sido: 1,
    sigungu: 1,

    //샵 리스트 데이터
    totalpage: 0,
    shops: shops,
    currentpage: 0,
    focusmarker: null,

    //shop 데이터
    shop: null,
  },
  mutations: {
    SetMapView(state, payload) {
      state.MapView = payload;
    },
    FetchDistrictData(state, payload) {
      state.districtData = payload;
    },
    SetDistrict(state, payload) {
      state.sido = payload[0].id;
      state.sigungu = payload[1].id;
    },
    FetchTotalpage(state, payload) {
      state.totalpage = payload;
    },
    FetchShops(state, payload) {
      state.shops = payload;
    },
    SetFocusmarker(state, payload) {
      state.focusmarker = payload;
    },
    SetShop(state, payload) {
      state.shop = payload;
    },
  },
  actions: {
    async getShops(context, page) {
      await shopApi
        .getShops(page, context.state.sido, context.state.sigungu)
        .then(function (response) {
          context.commit("FetchTotalpage", response.data.total_page);
          context.commit("FetchShops", response.data.shops);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async getDistricts(context) {
      await shopApi
        .getDistricts()
        .then(function (response) {
          context.commit("FetchDistrictData", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};

export default ShopStore;
