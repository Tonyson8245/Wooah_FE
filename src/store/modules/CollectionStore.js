import * as collectionApi from "@/api/collection";

const CollectionStore = {
  namespaced: true,
  state: {
    SearchState: false,
    SearchResult: "",
    Ranktags: "",
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
  },
};

export default CollectionStore;
