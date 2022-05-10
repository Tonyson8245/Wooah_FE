import "whatwg-fetch";
const ComparisonStore = {
  namespaced: true,
  state: {
    type: "hand",
    focusNum: 1,
  },
  mutations: {
    setType(state, payload) {
      state.type = payload;
    },
    increaseNum(state) {
      state.focusNum++;
    },
  },
  actions: {},
};

export default ComparisonStore;
