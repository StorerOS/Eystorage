import Vue from 'vue'
import Router from 'vue-router'
import { getHostEnv } from '@/utils/index'
import { docsHostMap } from '@/utils/data-const'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import PortalLayout from '@/views/portal/layout'
import CalibrationLayout from '@/views/calibration/layout'
import fullScreenLayout from '@/views/calibration/layout/fullscreen'

const docsHostURL = docsHostMap[getHostEnv()]

const componentRouterView = {
  render(h) { return h('router-view') }
}

const documentRender = (h, context) => {
  const vnodes = [
    <div class='menu-content'>
      <div class='menu-content__title'>Documentation <i class='el-icon-arrow-right'/></div>
      <div class='menu-content__main'>Integrate with Eynode product's API</div>
    </div>
  ]
  return vnodes
}

export { getCompletePath } from './utils'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

export const backstageRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/file/list'
  },
  {
    path: '/file',
    name: 'Flie',
    component: Layout,
    meta: { title: 'My files', icon: 'ic_menu_address', hiddenChild: true },
    children: [{
      path: 'list',
      name: 'List',
      component: () => import('@/views/backstage/files/index'),
      meta: { title: 'route.name.MyFile' }
    }]
  },
  {
    path: '/userInfo',
    name: 'UserInfo',
    component: Layout,
    hidden: true,
    meta: { title: 'UserInfo', icon: 'ic_menu_address' },
    children: [{
      path: 'index',
      name: 'UserInfoIndex',
      component: () => import('@/views/backstage/userInfo/index'),
      meta: { title: 'route.name.UserInfoIndex' }
    }]
  },
  {
    path: '/openApi',
    name: 'OpenApi',
    component: Layout,
    meta: { title: 'OpenAPI', icon: 'ic_menu_api', hiddenChild: true },
    children: [{
      path: 'index',
      name: 'OpenApiIndex',
      component: () => import('@/views/backstage/openApi/index'),
      meta: { title: 'route.name.OpenAPI' }
    }]
  }
]

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: PortalLayout,
    name: 'Root',
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/portal/home/index'),
        meta: { title: 'route.name.Home', showFooter: true }
      },
      {
        path: '/bind/checkout',
        name: 'BindEmail',
        component: CalibrationLayout,
        hidden: true,
        children: [
          {
            path: 'email',
            component: () => import('@/views/calibration/email/bind-checkout-email'),
            meta: { title: 'route.name.BindCheckoutEmail' }
          }
        ]
      },
      {
        path: '/bind/email/:email',
        name: 'BindEmail',
        component: CalibrationLayout,
        hidden: true,
        children: [
          {
            path: '/',
            component: () => import('@/views/calibration/email/bind-email'),
            meta: { title: 'route.name.BindEmail' }
          }
        ]
      },
      {
        path: '/login',
        name: 'Login',
        component: CalibrationLayout,
        hidden: true,
        children: [
          {
            path: '/',
            component: () => import('@/views/calibration/login/index'),
            meta: { title: 'route.name.SIGNIN' }
          }
        ]
      },
      {
        path: '/contactUs',
        name: 'contactUs',
        component: CalibrationLayout,
        hidden: true,
        children: [
          {
            path: '/',
            component: () => import('@/views/calibration/contact-us/index'),
            meta: { title: 'route.name.ContactUs' }
          }
        ]
      },
      {
        path: '/register',
        name: 'Register',
        component: CalibrationLayout,
        hidden: true,
        children: [
          {
            path: '/',
            component: () => import('@/views/calibration/register/index'),
            meta: { title: 'route.name.Register' }
          }
        ]
      },
      {
        path: '/set-email/:email',
        name: 'SetEmail',
        component: CalibrationLayout,
        hidden: true,
        children: [
          {
            path: '/',
            component: () => import('@/views/calibration/email/set-email'),
            meta: { title: 'route.name.SetEmail' }
          }
        ]
      },
      {
        path: '/set-password/:type/:code',
        name: 'SetPassowrd',
        component: CalibrationLayout,
        hidden: true,
        children: [
          {
            path: '/',
            component: () => import('@/views/calibration/set-password/index'),
            meta: { title: 'route.name.SetPassword' }
          }
        ]
      },
      {
        path: '/verify/:type/:email',
        name: 'Verify',
        component: CalibrationLayout,
        hidden: true,
        children: [
          {
            path: '/',
            component: () => import('@/views/calibration/verify/index'),
            meta: { title: 'route.name.Verify' }
          }
        ]
      },
      {
        path: '/verify/:type/:token/:email',
        name: 'Verify',
        component: CalibrationLayout,
        hidden: true,
        children: [
          {
            path: '/',
            component: () => import('@/views/calibration/verify/index'),
            meta: { title: 'route.name.Verify' }
          }
        ]
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
  ...backstageRoutes
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
