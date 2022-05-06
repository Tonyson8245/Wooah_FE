import * as MonthlyApi from "@/api/montlyart";

const MonthlyartStore = {
  namespaced: true,
  state: {
    thumbnails: ``,
    nothumbnails: false,
  },
  mutations: {
    fetchThumbnails(state, payload) {
      state.thumbnails = payload;
    },
    setNoThumbnails(state, payload) {
      state.nothumbnails = payload;
    },
  },
  actions: {
    async getThumbnails(context, payload) {
      await MonthlyApi.getThumbnails(payload[0], payload[1])
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
  },
};

export default MonthlyartStore;
