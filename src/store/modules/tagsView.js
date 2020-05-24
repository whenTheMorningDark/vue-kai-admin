const state = {
  visitedViews: [],
  cachedViews: []
};

const actions = {
  addView({
    dispatch
  }, view) {
    console.log("asd");
    dispatch("addVisitedView", view);
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
    console.log(state.visitedViews);
    console.log(view);
    for (const [i, v] of state.visitedViews.entries()) {
      console.log(i);
      console.log(v);
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