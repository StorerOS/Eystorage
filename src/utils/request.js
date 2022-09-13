import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import fileDownload from 'js-file-download'
import _ from 'lodash'

async function requestDataOrBlob(res) {
  let resBlob = ''
  if (res && res.data) resBlob = res.data
  let resData = null
  try {
    const data = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.addEventListener('about', reject)
      reader.addEventListener('error', reject)
      reader.addEventListener('loadend', () => {
        resolve(reader.result)
      })
      reader.readAsText(resBlob)
    })
    resData = JSON.parse(data)
  // eslint-disable-next-line no-empty
  } catch (err) {}
  return { resData, resBlob }
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30 * 1000, // request timeout
  responseType: 'blob'
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Auth-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  async response => {
    const { resData, resBlobData } = await requestDataOrBlob(response)
    const resHeader = resData.header

    if ([0].includes(resHeader && resHeader.code)) {
      return resData
    }

    let disposition = response.headers['content-disposition']
    if (disposition) {
      disposition = decodeURIComponent(disposition)
    }

    if (disposition && disposition.includes('attachment')) { // 下载文件
      const fileNameReg = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      const fileNameMatchList = fileNameReg.exec(disposition)
      let filename
      if (fileNameMatchList && fileNameMatchList[1]) {
        filename = fileNameMatchList[1].replace(/['"]/g, '')
      }
      if (resData) { // 能正常解析数据说明下载失败，没正常返回
        return Promise.reject(resData)
      } else { // 下载成功
        fileDownload(resBlobData, filename)
        return
      }
    } else {
      Message.closeAll()
      if ([1045, 1043].includes(resHeader.code)) {
        return Promise.reject(resHeader)
      }
      Message({
        message: resHeader.message || 'Server Error',
        type: 'error',
        duration: 5 * 1000
      })
      if ([1001].includes(resHeader.code)) {
        // to re-login
        MessageBox.confirm('The account is already logged in elsewhere, please pay attention to account security.', 'Risk warning', {
          showClose: false,
          confirmButtonText: 'Re-register',
          showCancelButton: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          type: 'error'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            window.location.href = '/#/login'
          })
        })
      }
      const { config } = response
      const resSerialize = JSON.stringify(
        _.assign(resHeader || { message: 'Server Error' }, {
          requestConfigUrl: config.url,
          requestConfigBody: config.data
        })
      )
      return Promise.reject(resSerialize)
    }
  },
  error => {
    console.log('err' + error) // for debug
    if (error.response.status === 401) {
      // 处理token失效鉴权失败的问题
      MessageBox.confirm('Session timed out, please log in again', 'Timeout prompt', {
        confirmButtonText: 'Re-register',
        showClose: false,
        showCancelButton: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: 'error'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          window.location.href = '/#/login'
        })
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
