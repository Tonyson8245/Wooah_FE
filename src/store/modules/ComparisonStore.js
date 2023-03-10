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

    noQuery: false,
  },

  mutations: {
    setNoQuery(state, payload) {
      state.noQuery = payload;
    },
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
    }, // 시술 목록 가져옴
    async fetchPriceList(context, payload) {
      var newQuery = "";
      var body_part = "";
      context.state.query.forEach((e) => {
        if (e != null) newQuery += e + ".";
      }); // 배열을 API 에 맞느는 쿼리 형태로 만듬

      if (context.state.type == "hand") body_part = `HAND`;
      else body_part = `FOOT`;

      // context.commit("resetQuery"); 쿼리 초기화
      if (newQuery == "") context.commit("setNoQuery", true);
      else {
        context.commit("setNoQuery", false);
        await comparisonApi
          .fetchPriceList(newQuery, body_part, payload.sido, payload.sigungu)
          .then(function (response) {
            context.commit("setResult", response.data);
          })
          .catch(function (error) {
            console.log("실패" + error);
            context.commit("setResult", "");
          });
      }
    },
  },
};

export default ComparisonStore;
