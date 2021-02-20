const getters = {
  sidebar: (state) => state.app.sidebar,
  language: (state) => state.app.language,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  permission_routes: (state) => state.permission.routes,
  token: (state) => state.user.token,
  roles: (state) => state.user.userInfo.userName, // 当前用户名称
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  currentTarget: (state) => state.echart.currentTarget
};
// eslint-disable-next-line eol-last
export default getters;