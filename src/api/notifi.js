import request from '@/utils/request'

export function getAddressSelectList(data) {
  return request({
    url: '/platform/add/alert/select/address',
    method: 'post',
    data
  })
}

export function getChainTypeSelectList(data) {
  return request({
    url: '/platform/add/alert/select/chain/type',
    method: 'post',
    data
  })
}
export function getProjectSelectList(data) {
  return request({
    url: '/platform/add/alert/select/project',
    method: 'post',
    data
  })
}
export function getPredefRuleList(data) {
  return request({
    url: '/platform/list/predef/rule',
    method: 'post',
    data
  })
}
export function getLogAddressList(data) {
  return request({
    url: '/platform/log/select/address',
    method: 'post',
    data
  })
}
export function getLogProjectList(data) {
  return request({
    url: '/platform/log/select/project',
    method: 'post',
    data
  })
}
export function getLogTxTypeList(data) {
  return request({
    url: '/platform/log/select/tx/type',
    method: 'post',
    data
  })
}

export function getLogList(data) {
  return request({
    url: '/platform/list/alert/log',
    method: 'post',
    data
  })
}
