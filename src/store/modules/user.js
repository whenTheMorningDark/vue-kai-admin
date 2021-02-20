import {setStorage, getStorage, TOKEN_KEY, USER_KEY} from "@/utils/localStroage";
const state = {
  userInfo: getStorage(USER_KEY) || {},
  token: getStorage(TOKEN_KEY) || "",
};

const actions = {


};
const mutations = {
  // 设置当前token
  SET_TOKEN(state, token) {
    state.token = token;
    setStorage(TOKEN_KEY, token);
  },
  // 设置用户信息
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
    setStorage(USER_KEY, userInfo);
  }
};


export default {
  namespaced: true,
  state,
  actions,
  mutations
};