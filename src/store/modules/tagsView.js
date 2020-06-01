const state = {
  visitedViews: [],
  cachedViews: []
};

const actions = {
  addView({
    dispatch
  }, view) {
    // console.log("asd");
    dispatch("addVisitedView", view);
    dispatch("addCachedView", view);
  },
  addCachedView({
    commit
  }, view) {
    commit("ADD_CACHED_VIEW", view);
  },
  addVisitedView({
    commit
  }, view) {
    commit("ADD_VISITED_VIEW", view);
  },
  delView({
    dispatch,
    state
  }, view) {
    // console.log(view);
    return new Promise(resolve => {
      dispatch("delVisitedView", view);
      resolve({
        visitedViews: [...state.visitedViews]
      });
    });
  },
  // 刷新
  delCachedView({
    commit,
    state
  }, view) {
    return new Promise(resolve => {
      commit("DEL_CACHED_VIEW", view);
      resolve([...state.cachedViews]);
    });
  },
  delVisitedView({
    commit,
    state
  }, view) {
    return new Promise(resolve => {
      commit("DEL_VISITED_VIEW", view);
      resolve([...state.visitedViews]);
    });
  }
};
const mutations = {
  DEL_CACHED_VIEW: (state, view) => {
    const index = state.cachedViews.indexOf(view.name);
    index > -1 && state.cachedViews.splice(index, 1);
  },
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) {
      return;
    }
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name);
    }
  },
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) {
      return;
    }
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || "no-name"
      })
    );
  },
  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1);
        break;
      }
      // if (v.path === view.path) {
      //   console.log(v);
      // }
    }
  }

};


export default {
  namespaced: true,
  state,
  actions,
  mutations
};