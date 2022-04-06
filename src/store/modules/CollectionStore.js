import * as collectionApi from "@/api/collection";

const CollectionStore = {
  namespaced: true,
  state: {
    SearchState: false,
    SearchResult: "",
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
  },
};

export default CollectionStore;
