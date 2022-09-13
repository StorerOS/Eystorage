import app from './modules/app'

const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userInfo: state => state.user.userInfo,
  codeData: state => state.code.defaultCode,
  lang: state => state.app.lang
}
export default getters
