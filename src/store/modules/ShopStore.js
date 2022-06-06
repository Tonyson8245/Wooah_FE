import * as shopApi from "@/api/shops";
import "whatwg-fetch";
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
    currentpage: 1,
    focusmarker: null,
    noResultlist: false,
    pageReset: false,

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

    //사이즈
    media: "desktop",
  },
  mutations: {
    SetMedia(state, payload) {
      state.media = payload;
    },
    Reset(state) {
      state.focusmarker = null;
      state.noResultlist = false;
      state.pageReset = false;

      state.shop = null;

      state.shopimg = [];
      state.shopinfo = null;
      state.currentimagepage = 1;

      state.keyword = false;
    },
    SetCurrentPage(state, payload) {
      state.currentpage = payload;
    },
    SetnoResultlist(state, payload) {
      state.noResultlist = payload;
    },
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
      state.keyword = false;
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
      state.noResult = true;
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
      if (context.state.keyword == false) {
        if (page == 1) context.commit("SetCurrentPage", 1);
        await shopApi
          .getShops(page, context.state.sido, context.state.sigungu)
          .then(function (response) {
            context.commit("FetchTotalpage", response.data.total_page);
            context.commit("FetchShops", response.data.shops);
            context.commit("SetnoResultlist", false);
          })
          .catch(function (error) {
            if (error.response.status == 404) {
              context.commit("FetchTotalpage", null);
              context.commit("FetchShops", null);
              context.commit("SetnoResultlist", true);
            }
          });
      }
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
          // context.commit("SetShop", id); //샵 id 를 vuex에 저장
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async getShopImage(context, id) {
      context.state.completeFetch = false; // 무한 페이지 로드를 막기위한 플래그
      await shopApi
        .getShopImg(id, context.state.currentimagepage) // id와 페이지
        .then((response) => {
          if (response.status == 200) {
            context.commit("FetchShopImage", response.data);
            context.commit("IncreaseImagePage");
          }
        })
        .catch(function (error) {
          let res = error.response;
          if (res.status == 404) {
            context.commit(`SetNoResult`, false);
          }
        });

      await shopApi
        .getShopImg(id, context.state.currentimagepage) //
        .catch(function (error) {
          let res = error.response;
          if (res.status == 404) {
            context.commit(`SetNoResult`, false);
          }
        }); //다음 페이지 유무 확인용
    },
    async searchShops(context, payload) {
      if (payload.page == 1) context.commit("SetCurrentPage", 1);
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
          context.commit("SetnoResultlist", false);
        })
        .catch(function (error) {
          if (error.response.status == 404) {
            context.commit("FetchTotalpage", null);
            context.commit("FetchShops", null);
            context.commit("SetnoResultlist", true);
          }
        });
    },
  },
};

export default ShopStore;
