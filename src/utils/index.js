/**
 * Created by PanJiaChen on 16/11/18.
 */

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

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @description: 计算和当前时间的差异
 * @param {Date} date
 * @return {String}
 */
export function timeAgo(date) {
  if (!date || String(new Date(date)) === 'Invalid Date') {
    throw new Error('Date format error: ' + date)
  }
  const d = new Date(date)
  const now = Date.now()
  const diff = (now - d) / 1000

  const minutes = 60
  const hours = minutes * 60
  const days = hours * 24

  const diffSeconds = Math.floor(diff % minutes)
  const diffMinutes = Math.floor((diff % hours) / minutes)
  const diffHours = Math.floor((diff % days) / hours)

  let timeText = ''
  if (diff < minutes) {
    timeText = `${diffSeconds}秒前`
  } else if (diff < hours) {
    timeText = `${Math.floor(diff / minutes)}分钟${diffSeconds}秒前`
  } else if (diff < days) {
    timeText = `${Math.floor(diff / hours)}小时${diffMinutes}分钟${diffSeconds}秒前`
  } else {
    timeText = `${Math.floor(diff / days)}天${diffHours}小时${diffMinutes}分钟${diffSeconds}秒前`
  }
  return timeText
}

export function getHostEnv() {
  const { hostname } = window.location
  const envName = hostname.match(/^(\w+)\-*.*$/)
  const envs = ['dev', 'test', 'stag', 'prod']
  const matchName = envName[1]
  if (envs.includes(matchName)) {
    return matchName
  } else if (!(hostname === 'localhost' || /^\d+\.\d+.\d+\.\d+$/.test(hostname))) {
    return 'prod'
  }
  return 'dev'
}
