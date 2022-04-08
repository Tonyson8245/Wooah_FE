import * as collectionApi from "@/api/collection";

const CollectionStore = {
  namespaced: true,
  state: {
    SearchState: false,
    SearchResult: "",
    Ranktags: "",

    posts: [],
    page: 1,
    tag: null,
    filterQuery: "",
    completeFetch: true, // 포스트 가져오기 플래그
    noPost: false, // 포스트가 아예없음
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
    changeTag(state, data) {
      state.tag = data;
    },
    InitTag(state) {
      state.tag = null;
    },
    changeNoPost(state, data) {
      state.noPost = data;
    },
    InitSearchResult(state) {
      state.SearchResult = "";
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
        unit = 15,
        page = context.state.page;
      query += context.state.filterQuery;

      if (context.state.tag != null) {
        query += `&tag=${context.state.tag}`;
      } //태그가 있을경우

      if (context.state.completeFetch) {
        context.commit("increasePage");
        context.state.completeFetch = false; // 무한 페이지 로드를 막기위한 플래그
        await collectionApi
          .fetchNewPost(page, unit, query)
          .then(function (response) {
            if (response.status == 200) {
              context.commit("setPost", response.data);
              context.commit("changeNoPost", false);
            } else if (response.status == 204) {
              context.commit("changeNoPost", true);
              context.commit("resetPage");
              // context.commit("error/setnoResult", true);
            } else console.log(response);
            context.state.completeFetch = true; // 무한 페이지 로드를 막기위한 플래그
          })
          .catch(function () {});
      }
    },
  },
};

export default CollectionStore;
