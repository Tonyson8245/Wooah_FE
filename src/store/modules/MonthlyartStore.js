import * as MonthlyApi from "@/api/montlyart";
import * as collectionApi from "@/api/collection";

const MonthlyartStore = {
  namespaced: true,
  state: {
    thumbnails: ``,
    nothumbnails: false,

    arts: [],
    total_amount: 0,
    page: 1,
    noPost: false, // 포스트가 아예없음
    noResult: false,

    //모달 용
    shop: "",
    post: "",
  },
  mutations: {
    fetchThumbnails(state, payload) {
      state.thumbnails = payload;
    }, // 썸네일 설정
    setNoThumbnails(state, payload) {
      state.nothumbnails = payload;
    }, // noThumbnail 활성화
    resetThumbnail(state) {
      state.thumbnails = ``;
    },

    setArts(state, payload) {
      state.arts.push.apply(state.arts, payload);
    }, // arts 추가
    setTotal_amount(state, payload) {
      state.total_amount = payload;
    }, // 전체 이미지 수
    setNoResult(state, payload) {
      state.noResult = payload;
    }, // 응답이 없을 경우 이걸 true 로 한다.
    increasePage(state) {
      state.page += 1;
    },

    resetPost(state) {
      state.page = 1;
      state.total_amount = 0;
      state.arts = [];
      state.noResult = false;
      state.noPost = false;
    },
  },
  actions: {
    async getThumbnails(context, payload) {
      await MonthlyApi.getThumbnails(payload.sido, payload.sigungu)
        .then(function (response) {
          context.commit("fetchThumbnails", response.data);
          context.commit("setNoThumbnails", false);
        })
        .catch(function (error) {
          if (error.response.status == 404) {
            context.commit("fetchThumbnails", ``);
            context.commit("setNoThumbnails", true);
          } else console.log(error.response);
        });
    },
    async getPosts(context, payload) {
      context.commit("setNoResult", true); //데이터 없음
      await MonthlyApi.getPosts(
        context.state.page,
        payload.sido,
        payload.sigungu,
        payload.price_range
      )
        .then((res) => {
          var data = res.data;
          context.commit("setNoResult", false); // 먼저 데이터
          context.commit("setArts", data.arts); // 이미지 데이터 추가
          context.commit("setTotal_amount", data.total_amount); // 전체 디자인 갯수

          context.commit("increasePage"); // 페이지 올리기
        })
        .catch(() => {});
    },
    async fetchPost(context, id) {
      await collectionApi
        .fetchPost(id)
        .then(function (response) {
          if (response.status == 200) {
            context.state.post = response.data;
            context.state.shop = response.data.shop;
          }
        })
        .catch(function (error) {
          let res = error.response;
          if (res.status == 404) {
            context.commit(`changeNoPost`, true);
          } else console.log(res);
        });
    },
  },
};

export default MonthlyartStore;
