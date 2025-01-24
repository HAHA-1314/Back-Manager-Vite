const Setting = {
  state: {
    title: import.meta.env.VITE_APP_TITLE,
  },
  mutation: {
    setTitle(meta) {
      document.title = meta + " - " + state.title;
    },
  },
};

export default Setting;
