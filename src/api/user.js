import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/platform/logout',
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: '/platform/register/account',
    method: 'post',
    data
  })
}

export function checkValidity(data) {
  return request({
    url: '/verdict/time',
    method: 'post',
    data
  })
}

export function sendEmail(data) {
  return request({
    url: '/send/email',
    method: 'post',
    data
  })
}

export function recoverPassword(data) {
  return request({
    url: '/reset/password',
    method: 'post',
    data
  })
}
export function forgetPassword(data) {
  return request({
    url: '/platform/forget/password',
    method: 'post',
    data
  })
}
export function unlockAccount(data) {
  return request({
    url: '/platform/unlock/account',
    method: 'post',
    data
  })
}
export function sessionValidity() {
  return request({
    url: '/session/timeout',
    method: 'post',
    data: {}
  })
}

export function getRequestTotalData() {
  return request({
    url: '/data/display',
    method: 'post',
    data: {}
  })
}

export function userTradeHitory(data) {
  return request({
    url: '/platform/trade/history',
    method: 'post',
    data
  })
}
export function userAccountOverview(data) {
  return request({
    url: '/platform/account/overview',
    method: 'post',
    data
  })
}
export function userAddressList(data) {
  return request({
    url: '/platform/list/address',
    method: 'post',
    data
  })
}
export function userAddObserve(data) {
  return request({
    url: '/platform/add/address',
    method: 'post',
    data
  })
}
export function userDelObserve(data) {
  return request({
    url: '/platform/delete/address',
    method: 'post',
    data
  })
}

export function userUsedManage(data) {
  return request({
    url: '/platform/used/manage',
    method: 'post',
    data: {}
  })
}
export function userAlertRuleList(data) {
  return request({
    url: '/platform/list/alert/rule',
    method: 'post',
    data
  })
}
export function userAddRule(data) {
  return request({
    url: '/platform/add/alert/rule',
    method: 'post',
    data
  })
}
export function userEditRule(data) {
  return request({
    url: '/platform/edit/alert/rule',
    method: 'post',
    data
  })
}
export function userDelRule(data) {
  return request({
    url: '/platform/delete/alert/rule',
    method: 'post',
    data
  })
}
export function userDetail(data) {
  return request({
    url: '/platform/user/detail',
    method: 'post',
    data
  })
}
export function userChangeRate(data) {
  return request({
    url: '/platform/change/exrate',
    method: 'post',
    data
  })
}
export function userChangeEmail(data) {
  return request({
    url: '/platform/change/email',
    method: 'post',
    data
  })
}
export function userOperLog(data) {
  return request({
    url: '/platform/list/oper/log',
    method: 'post',
    data
  })
}

export function fileList(data) {
  return request({
    url: '/storage/list',
    method: 'post',
    data
  })
}
export function uploadFile(data) {
  return request({
    url: '/storage/upload',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data
  })
}
export function downloadFile(data) {
  return request({
    url: '/storage/download',
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
    },
    method: 'post',
    data
  })
}
export function delFile(data) {
  return request({
    url: '/storage/delete',
    method: 'post',
    data
  })
}

