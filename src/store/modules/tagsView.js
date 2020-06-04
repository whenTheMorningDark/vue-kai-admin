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
  },
  // 删除其它标签
  delOthersViews({
    dispatch,
    state
  }, view) {
    return new Promise(resolve => {
      dispatch("delOthersVisitedViews", view);
      dispatch("delOthersCachedViews", view);
    });
  },
  delOthersVisitedViews({
    commit,
    state
  }, view) {
    return new Promise(resolve => {
      commit("DEL_OTHERS_VISITED_VIEWS", view);
    });
  },
  delOthersCachedViews({
    commit,
    state
  }, view) {
    return new Promise(resolve => {
      commit("DEL_OTHERS_CACHED_VIEWS", view);
      resolve([...state.cachedViews]);
    });
  },
  // 删除所有的标签
  delAllViews({
    dispatch,
    state
  }, view) {
    return new Promise(resolve => {
      dispatch("delAllVisitedViews", view);
      dispatch("delAllCachedViews", view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      });
    });
  },
  delAllVisitedViews({
    commit,
    state
  }) {
    return new Promise(resolve => {
      commit("DEL_ALL_VISITED_VIEWS");
      resolve([...state.visitedViews]);
    });
  },
  delAllCachedViews({
    commit,
    state
  }) {
    return new Promise(resolve => {
      commit("DEL_ALL_CACHED_VIEWS");
      resolve([...state.cachedViews]);
    });
  }
};
const mutations = {
  // 删除所有的标签
  DEL_ALL_VISITED_VIEWS: (state, view) => {
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix);
    state.visitedViews = affixTags;
  },
  DEL_ALL_CACHED_VIEWS: state => {
    state.cachedViews = [];
  },
  // 删除其它标签
  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => v.meta.affix || v.path === view.path);
  },
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    const index = state.cachedViews.indexOf(view.name);
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1);
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = [];
    }
  },
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