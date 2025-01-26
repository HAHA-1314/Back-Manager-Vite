const Dict = {
  namespaced: true,
  state: {
    //直接初始化字典
    dict: [
      {
        dict_type: "groupId",
        dict_name: "分组ID",
        dict_value: [
          {
            value: 1,
            label: "前端组",
          },
          {
            value: 2,
            label: "后端组",
          },
          {
            value: 3,
            label: "AI组",
          },
          {
            value: 4,
            label: "电控组",
          },
          {
            value: 5,
            label: "机械组",
          },
          {
            value: 6,
            label: "运营组",
          },
          {
            value: 7,
            label: "项目组",
          },
        ],
      },
    ],
  },
  actions: {
    // 获取字典
    getDictValue({ commit }, _key) {
      const dict = this.state.dict.dict;
    //   console.log(dict.length);
      if (_key == null && _key == "") {
        return null;
      }
      try {
        for (let i = 0; i < dict.length; i++) {
          if (dict[i].dict_type == _key) {
            return dict[i].dict_value;
          }
        }
      } catch (e) {
        return null;
      }
    },
  },
};

export default Dict;
