import * as comparisonApi from "@/api/comparison";
const ComparisonStore = {
  namespaced: true,
  state: {
    type: "hand",
    totalStep: 3,
    step: 1,
    substep: 1,
    procedure_table: "",
    query: [],
    result: "",
  },
  watch: {
    step(a) {
      if (a > this.totalStep) {
        this.step = 1;
      }
    },
  },
  mutations: {
    setQuery(state, payload) {
      state.query[payload.index] = payload.value;
    },
    resetQuery(state) {
      state.query = [];
    },
    resetStep(state) {
      state.step = 1;
    },
    setType(state, payload) {
      state.type = payload;
      state.step = 1;
      state.substep = 1;
    },
    increseStep(state) {
      state.step++;
      state.substep = 1;
    },
    increseSubStep(state) {
      state.substep++;
    },
    setTotalStep(state, payload) {
      state.totalStep = payload;
    },
    setProcedure_table(state, payload) {
      state.procedure_table = payload;
    },
    setResult(state, payload) {
      state.result = payload;
    },
  },
  actions: {
    async fetchProcedure(context) {
      await comparisonApi
        .fetchProcedure()
        .then(function (response) {
          context.commit("setProcedure_table", response.data);
        })
        .catch(function () {});
    },
    async fetchPriceList(context, payload) {
      var newQuery = "";
      context.state.query.forEach((e) => {
        if (e != null) newQuery += e + " ";
      });

      context.commit("resetQuery");

      await comparisonApi
        .fetchPriceList(newQuery, payload.sido, payload.sigungu)
        .then(function (response) {
          context.commit("setResult", response.data);
        })
        .catch(function () {
          context.commit("setResult", []);
        });
    },
  },
};

export default ComparisonStore;
