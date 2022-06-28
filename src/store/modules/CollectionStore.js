import * as collectionApi from "@/api/collection";
import "whatwg-fetch";
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
    noResult: false,

    post: "",
    shop: "",
  },
  mutations: {
    ResetSearch(state) {
      state.SearchState = false;
      state.SearchResult = "";
      state.tag = null;
    },
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
    setPosts(state, data) {
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
    setnoResult(state, data) {
      state.noResult = data;
    },
    setPost(state, data) {
      state.post = data;
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
          .catch(function (error) {
            var res = error.response;
            if (res.status == 404) {
              context.commit("changeSearchResult", "");
            }
          });
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
    async fetchPosts(context) {
      let query = "",
        unit = 15,
        page = context.state.page;
      query += context.state.filterQuery;

      if (context.state.tag != null) {
        query += `&tag=${context.state.tag}`;
      } //태그가 있을경우

      if (context.state.completeFetch) {
        context.commit("setnoResult", false);
        context.state.completeFetch = false; // 무한 페이지 로드를 막기위한 플래그
        await collectionApi
          .fetchPosts(page, unit, query)
          .then(function (response) {
            if (response.status == 200) {
              context.commit("increasePage");
              context.commit("setPosts", response.data);
              context.commit("changeNoPost", false);
            }
            context.state.completeFetch = true; // 무한 페이지 로드를 막기위한 플래그
          })
          .catch(function (error) {
            let res = error.response;
            if (res.status == 404) {
              if (res.data.detail == "조건에 맞는 디자인이 존재하지 않습니다") {
                context.commit("resetPage");
                context.commit("changeNoPost", true);
              } else if (res.data.detail == "존재하지 않은 페이지입니다") {
                context.commit("setnoResult", true);
              }
            } else {
              console.log(error);
            }

            context.commit("setnoResult", true);
          });
      }
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
          console.log(res);
        });
    },
  },
};

export default CollectionStore;
