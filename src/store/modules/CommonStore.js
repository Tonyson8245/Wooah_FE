import * as CommonApi from "@/api/common";

const CommonStore = {
  namespaced: true,
  state: {
    width: ``,
    height: ``,

    districtData: [],
    sido: 1,
    sigungu: 0,
  },
  mutations: {
    SetSize(state, payload) {
      state.height = payload[1];
      state.width = payload[0];
    },

    FetchDistrictData(state, payload) {
      state.districtData = payload;
    },
    SetDistrict(state, payload) {
      state.sido = payload[0].id;

      if (payload[1] != 0) state.sigungu = payload[1].id;
      else state.sigungu = 0;

      state.newDistrictSet = payload[2]; // 갱신 확인법
    },
  },
  actions: {
    async getDistricts(context) {
      await CommonApi.getDistricts()
        .then(function (response) {
          context.commit("FetchDistrictData", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};

export default CommonStore;
