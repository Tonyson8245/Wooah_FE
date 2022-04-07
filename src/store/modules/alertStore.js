const AlertStore = {
  namespaced: true,
  state: {
    dialogState: false,
    dialogComment: "",
  },
  mutations: {
    ChangeState(state) {
      return (state.dialogState = !state.dialogState);
    },
    ChangeComment(state, data) {
      return (state.dialogComment = data);
    },
  },
};

export default AlertStore;
