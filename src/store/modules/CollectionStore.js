import * as collectionApi from "@/api/collection";

const CollectionStore = {
  namespaced: true,
  state: {
    SearchState: false,
    SearchResult: "",
    Ranktags: "",

    posts: [],
    page: 1,
    tag: "",
    filterQuery: "",
    completeFetch: true, // 포스트 가져오기 플래그
  },
  mutations: {
    ChangeSearchOn(state) {
      state.SearchState = true;
    },
    ChangeSearchOff(state) {
      state.SearchState = false;
    },
    changeSearchResult(state, data) {
      state.SearchResult = data;
    },
    changeRanktags(state, data) {
      state.Ranktags = data;
    },
    increasePage(state) {
      state.page++;
    },
    decreasePage(state) {
      state.page--;
    },
    resetPage(state) {
      state.page = 1;
      state.posts = [];
    },
    setPost(state, data) {
      state.posts.push.apply(state.posts, data);
    },
    setfilterQuery(state, data) {
      state.filterQuery = data;
      state.completeFetch = true;
    },
  },
  actions: {
    async searchTag(context, keyword) {
      if (keyword != "") {
        await collectionApi
          .search(keyword)
          .then(function (response) {
            context.commit("changeSearchResult", response.data);
          })
          .catch(function () {});
        keyword = "";
      } else context.commit("changeSearchResult", "");
    },
    async fetchRankTag(context) {
      await collectionApi
        .fetchRankTags()
        .then(function (response) {
          context.commit("changeRanktags", response.data);
        })
        .catch(function () {});
    },
    async fetchPost(context) {
      let query = "",
        unit = 16,
        page = context.state.page;
      query += context.state.filterQuery;

      if (context.state.completeFetch) {
        context.state.completeFetch = false; // 무한 페이지 로드를 막기위한 플래그
        await collectionApi
          .fetchNewPost(page, unit, query)
          .then(function (response) {
            console.log(response);
            context.commit("setPost", response.data);
            context.commit("increasePage");
            context.state.completeFetch = true; // 무한 페이지 로드를 막기위한 플래그
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
};

export default CollectionStore;
