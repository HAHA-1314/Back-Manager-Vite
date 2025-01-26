const Setting = {
  namespaced: true,
  state: {
    title: import.meta.env.VITE_APP_TITLE,
  },
  mutations: {
    setTitle(state, meta) {
      document.title = meta + " - " + state.title;
    },
  },
};

export default Setting;
