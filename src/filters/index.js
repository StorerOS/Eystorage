/*
 * @Author: yaohongbin
 * @Date: 2021-11-29 17:07:17
 * @LastEditors: yaohongbin
 * @LastEditTime: 2022-06-28 16:08:06
 * @FilePath: \node-user-frontend\src\filters\index.js
 */

import _ from 'lodash'
/**
 * @description: 数字加分隔符
 * @param {Number | String} val
 * @param {Number} count
 * @param {String} sign
 * @return {String}
 */
export function numberSegmentation(val, count = 3, sign = ',') {
  if (!val) return ''
  const valString = String(val)
  const reg =
    valString.indexOf('.') > -1
      ? new RegExp(`\\B(?=(\\d{${count}})+\\.)`, 'g')
      : new RegExp(`\\B(?=(\\d{${count}})+$)`, 'g')
  return valString.replace(reg, sign)
}

/**
 * @description: 获取文本第一个字符
 * @param {Number | String} val
 * @return {String}
 */
export function firstTextChar(val) {
  return String(val) && String(val).charAt(0).toLocaleUpperCase() || ''
}

export function byte2Anys(val, { unit = 'GiB', autoUnit = false, maxLength = 3, hasUnit = false }) {
  const negative = val < 0 ? '-' : ''
  const value = Math.abs(val)
  const units = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB']
  if (!_.isNumber(Number(val))) {
    new Error('illegal data format, should use Number')
    return
  }
  if (!autoUnit) {
    const idx = units.findIndex(item => item === unit)
    const size = idx === -1 ? 1 : idx
    const result = Math.round((value / Math.pow(1024, size + 1)) * 100) / 100
    return hasUnit ? negative + result + unit : negative + result
  }
  const maxLengthSize = Math.pow(10, maxLength)
  const idx = units.findIndex((item, index) => (value / Math.pow(1024, index + 1)) < maxLengthSize)
  if (idx === -1) {
    const result = Math.round((value / Math.pow(1024, units.length)) * 100) / 100
    return hasUnit ? negative + result + 'PB' : negative + result
  }
  const result = Math.round((value / Math.pow(1024, idx + 1)) * 100) / 100
  return hasUnit ? negative + result + units[idx] : negative + result
}
export function hiddenMiddleText(str, length = 0, startCount = 4, endCount) {
  if (str.length <= 8) return str
  if (!str) return ''
  const val = String(str)
  if (length === 0 || val.length > length) {
    return `${val.slice(0, startCount)}...${val.slice(-(endCount || startCount))}`
  }
  return val
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

export function interceptionText(value, count = 3) {
  if (!value) return ''
  return String(value).slice(0, count)
}
