import request from '@/utils/request'

export function vagueSearchAddress(data) {
  return request({
    url: '/platform/fuzzy/search/address',
    method: 'post',
    data
  })
}
export function searchAddress(data) {
  return request({
    url: '/platform/search/address',
    method: 'post',
    data
  })
}
export function uploadImage(data) {
  return request({
    url: '/platform/upload/image',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
export function submitImage(data) {
  return request({
    url: '/platform/submit/image',
    method: 'post',
    data
  })
}
export function openInfo(data) {
  return request({
    url: '/platform/open/info',
    method: 'post',
    data
  })
}
export function updateAk(data) {
  return request({
    url: '/platform/update/aksk',
    method: 'post',
    data
  })
}
export function sendEmailCode(data) {
  return request({
    url: '/platform/send/email/code',
    method: 'post',
    data
  })
}
export function sendEmailCode2(data) {
  return request({
    url: '/send/email',
    method: 'post',
    data
  })
}
export function subTopic(data) {
  return request({
    url: '/wc/topic/subscribe',
    method: 'post',
    data
  })
}
export function bindDid(data) {
  return request({
    url: '/wc/bind/did',
    method: 'post',
    data
  })
}
export function wcLogin(data) {
  return request({
    url: '/wc/user/login',
    method: 'post',
    data
  })
}
export function changeEmail(data) {
  return request({
    url: '/platform/change/email',
    method: 'post',
    data
  })
}
export function bindEmail(data) {
  return request({
    url: '/platform/bind/email',
    method: 'post',
    data
  })
}
