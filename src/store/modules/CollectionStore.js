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
        unit = 24,
        page = context.state.page;
      query += context.state.filterQuery;

      await collectionApi
        .fetchNewPost(page, unit, query)
        .then(function (response) {
          context.commit("setPost", response.data);
          context.commit("increasePage");
          console.log("페이지 추우가아");
        })
        .catch(function () {});
    },
  },
};

export default CollectionStore;
