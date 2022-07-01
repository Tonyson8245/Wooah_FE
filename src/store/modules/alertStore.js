const AlertStore = {
  namespaced: true,
  state: {
    dialogState: false,
    dialogComment: "",
    dialogResult: null, // 확인 취소값
  },
  mutations: {
    ChangeState(state) {
      return (state.dialogState = !state.dialogState);
    },
    ChangeComment(state, data) {
      return (state.dialogComment = data);
    },
    ChangeResult(state, data) {
      state.dialogResult = data;
      state.dialogState = false;
    },
  },
};

export default AlertStore;
