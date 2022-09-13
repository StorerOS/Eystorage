import Cookies from 'js-cookie'

const TokenKey = 'auth_token'
const userInfoKey = 'user_info'
const langKey = 'lang'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  const userInfo = Cookies.get(userInfoKey)
  return userInfo ? JSON.parse(userInfo) : null
}

export function setUserInfo(info) {
  return Cookies.set(userInfoKey, info)
}

export function removeUserInfo() {
  return Cookies.remove(userInfoKey)
}
export function getLang() {
  return Cookies.get(langKey)
}

export function setLang(token) {
  return Cookies.set(langKey, token)
}

export function removeAllAuthInfo() {
  Object.keys(Cookies.get()).forEach((key) => {
    Cookies.remove(key)
  })
  window.localStorage.clear()
}
