/* 监听table滚动
 *  当滚动到底部时，触发loadMore事件
 */
export default {
  created(el, binding) {
    const selectorWrap = el.getElementsByClassName("el-scrollbar__wrap")[0];
    const { value } = binding;
    selectorWrap.addEventListener("scroll", () => {
      const { clientHeight, scrollTop, scrollHeight } = selectorWrap;
      if (scrollHeight - (clientHeight + scrollTop) <= 1) {
        value();
      }
    });
  },
};
