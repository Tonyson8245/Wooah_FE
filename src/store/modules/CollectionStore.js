import * as collectionApi from "@/api/collection";

const CollectionStore = {
  namespaced: true,
  state: {
    SearchState: false,
    SearchResult: "",
    Ranktags: "",

    posts: [],
    page: 0,
    tag: null,
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
    resetPage(state) {
      state.page = 0;
      state.posts = [];
    },
    setPost(state, data) {
      state.posts.push.apply(state.posts, data);
    },
    setfilterQuery(state, data) {
      state.filterQuery = data;
      state.completeFetch = true;
    },
    changeTag(state, data) {
      state.tag = data;
    },
    InitTag(state) {
      state.tag = null;
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
      context.commit("increasePage");
      let query = "",
        unit = 16,
        page = context.state.page;
      query += context.state.filterQuery;

      if (context.state.tag != null) {
        query += `&tag=${context.state.tag}`;
      } //태그가 있을경우

      if (context.state.completeFetch) {
        context.state.completeFetch = false; // 무한 페이지 로드를 막기위한 플래그
        await collectionApi
          .fetchNewPost(page, unit, query)
          .then(function (response) {
            context.commit("setPost", response.data);

            context.state.completeFetch = true; // 무한 페이지 로드를 막기위한 플래그
          })
          .catch(function () {});
      }
    },
  },
};

export default CollectionStore;
