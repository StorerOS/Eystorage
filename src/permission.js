import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { constantRoutes } from '@/router/index'
import vue from 'vue'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/404'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(vue.$t(to.meta.title))

  const hasToken = getToken()
  const rootItem = to.matched[0]
  if (whiteList.includes(to.path) || (rootItem && rootItem.name === 'Root' || rootItem.name === 'Query')) {
    next()
  } else if (hasToken) {
    const { userInfo } = store.getters
    const hasGetUserInfo = userInfo && userInfo.user_did
    if (hasGetUserInfo) {
      next()
    } else {
      await store.dispatch('user/resetToken')
      Message.error('Server Error')
      next(`/login?redirect=${to.path}`)
    }
  } else {
    Message.error('Server Error')
    // other pages that do not have permission to access are redirected to the login page.
    next(`/login?redirect=${to.path}`)
  }
  NProgress.done()
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
