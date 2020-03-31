/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable indent */
import {
  login,
  logout,
  getInfo
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
const state = {
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  token: getToken()
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}
const actions = {
  login({
    commit
  }, useInfo) {
    const {
      username,
      password
    } = useInfo;
    return new Promise((reslove, reject) => {
      login({
        username: username.trim(),
        password
      }).then(res => {
        // console.log(res)
        const {
          data
        } = res;
        // console.log(commit)
        commit('SET_TOKEN', data.token)
        setToken(data.token);
        reslove();
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(res => {
        const {
          data
        } = res;
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const {
          roles,
          name,
          avatar,
          introduction
        } = data
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}