export default {
  namespaced: true,
  state: {
    validations: {},

    noResult: false,
  },
  mutations: {
    setValidationError(state, error) {
      state.validations = error;
    },
    setnoResult(state, data) {
      state.noResult = data;
    },
  },
};
