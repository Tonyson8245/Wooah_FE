import * as shopApi from "@/api/shops";
const ShopStore = {
  namespaced: true,
  state: {
    MapView: true,

    //설정 시도
    districtData: [],
    sido: 1,
    sigungu: 0,
    newDistrictSet: "",
    mapCenter: [], // 지도 중심

    //샵 리스트 데이터
    totalpage: 0,
    shops: "",
    currentpage: 0,
    focusmarker: null,

    //shop 마커데이터
    shop: null,

    //shop 상세 데이터
    shopimg: [],
    shopinfo: null,
    currentimagepage: 1,
    noResult: true,
    completeFetch: true, // 포스트 가져오기 플래그

    //검색
    keyword: false,
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

      if (payload[1] != 0) state.sigungu = payload[1].id;
      else state.sigungu = 0;

      state.newDistrictSet = payload[2]; // 갱신 확인법
      state.shop = null;
    },
    FetchTotalpage(state, payload) {
      if (payload == null) payload = 0;
      state.totalpage = payload;
    },
    FetchShops(state, payload) {
      if (payload == null) payload = "";
      state.shops = payload;
    },
    SetFocusmarker(state, payload) {
      state.focusmarker = payload;
    },
    SetShop(state, payload) {
      state.shop = payload;
    }, // 샵 마커 최상위로 올리기위한 mutation
    FetchShopinfo(state, payload) {
      state.shopinfo = payload;
    },
    IncreaseImagePage(state) {
      state.currentimagepage++;
    },
    ResetImagePage(state) {
      state.currentimagepage = 1;
      state.shopimg = [];
    },
    FetchShopImage(state, payload) {
      state.shopimg.push.apply(state.shopimg, payload);
    },
    SetNoResult(state, payload) {
      state.noResult = payload;
    },
    SetKeyword(state, payload) {
      state.keyword = payload;
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
    async getShopDetail(context, id) {
      await shopApi
        .getShopDetail(id)
        .then(function (response) {
          context.commit("FetchShopinfo", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async getShopImage(context, id) {
      context.commit("IncreaseImagePage");
      context.state.completeFetch = false; // 무한 페이지 로드를 막기위한 플래그
      await shopApi
        .getShopImg(id, context.state.currentimagepage) // id와 페이지
        .then((response) => {
          if (response.status == 200) {
            context.commit("FetchShopImage", response.data);
          }
        })
        .catch(function (error) {
          let res = error.response;
          if (res.status == 404) {
            context.commit(`SetNoResult`, false);
          }
        });
    },
    async searchShops(context, payload) {
      // payload.keyword,payload.page
      await shopApi
        .searchShops(
          payload.page,
          context.state.sido,
          context.state.sigungu,
          payload.keyword
        )
        .then(function (response) {
          context.commit("FetchTotalpage", response.data.total_page);
          context.commit("FetchShops", response.data.shops);
        })
        .catch(function (error) {
          if (error.response.status == 404) {
            context.commit("FetchTotalpage", null);
            context.commit("FetchShops", null);
          }
        });
    },
  },
};

export default ShopStore;
