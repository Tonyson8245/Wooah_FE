const AlertStore = {
  namespaced: true,
  state: {
    dialogState: false,
  },
  mutations: {
    ChangeState(state) {
      return (state.dialogState = !state.dialogState);
    },
  },
};

export default AlertStore;
