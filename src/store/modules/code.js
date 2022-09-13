const state = {
  defaultCode: {
    uri: '',
    tips: '',
    title: '',
    icon: '',
    visible: false
  }
}
const mutations = {
  UPDATE_CODE_DATA(state, payload) {
    state.defaultCode = payload
  }
}
const actions = {
  updateCodeData({ commit }, payload) {
    const { uri, tips, title, visible, icon } = payload
    commit('UPDATE_CODE_DATA', {
      uri: uri || '',
      tips: tips || '',
      title: title || '',
      icon: icon || '',
      visible: visible || false
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
