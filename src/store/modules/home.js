const getDefaultState = () => {
  return {
    isRouteLeave: false,
    lastBlockInfo: {}
  }
}

const state = getDefaultState()

const getters = {
  lastBlockInfo(state) {
    return state.lastBlockInfo
  },
  isRouteLeave(state) {
    return state.isRouteLeave
  }
}

const mutations = {
  SET_LAST_BLOCK_INFO: (state, info) => {
    state.lastBlockInfo = info || {}
  },
  SET_ROUTE_LEAVE: (state, flag) => {
    state.isRouteLeave = flag
  }
}

const actions = {
  setLastBlockInfo({ commit }, info) {
    commit('SET_LAST_BLOCK_INFO', info)
  },
  setRouteLeave({ commit }, flag) {
    commit('SET_ROUTE_LEAVE', flag)
  }
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}

