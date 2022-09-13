import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, getUserInfo, setUserInfo, removeAllAuthInfo } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userInfo: getUserInfo() || null
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_INFO: (state, info) => {
    state.userInfo = info
  },
  SET_ALL_USER_INFO: (state, data) => {
    state.token = data.auth_token
    state.userInfo = data
    setToken(data.auth_token)
    setUserInfo(data)
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { email, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ email: email.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_ALL_USER_INFO', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(async(res) => {
        if (res.header.code === 0) {
          await dispatch('resetToken')
        } else {
          reject(res)
          return
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      resetRouter()
      removeAllAuthInfo()
      commit('RESET_STATE')
      resolve()
    })
  },
  setToken({ commit }, token) {
    commit('SET_TOKEN', token)
  },
  setUserInfo({ commit }, info) {
    commit('SET_USER_INFO', info)
  },
  // set all user info
  setAllUserInfo({ commit }, data) {
    commit('SET_ALL_USER_INFO', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

