import loadmore from "./table/loadmore";

export default function directive(app) {
  app.directive("loadMore", loadmore);
}
