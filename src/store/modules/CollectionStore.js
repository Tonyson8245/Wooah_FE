import axios from "axios";
axios.defaults.timeout = 500;

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
        try {
          await axios
            .get(`api/tags?query=${keyword}`)
            .then(function (response) {
              console.log("then");
              console.log(response.data);
              context.commit("changeSearchResult", response.data);
            })
            .catch(function (error) {
              console.log("axioscatch" + error.response.status);
            });
          keyword = "";
        } catch (error) {
          console.error("catch" + error);
        }
      } else context.commit("changeSearchResult", "");
    },
  },
};

export default CollectionStore;
