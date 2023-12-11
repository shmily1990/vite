import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
import Layout from '@/layouts/index.vue'
import store from '../store'
import { initDynamicRoute } from './dynamicRouter'

const whiteList = [] // 白名单

const staticRouters = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  }
]
// const dynamicRouters = [
//   {
//     path: '/',
//     component: Layout,
//     name: 'layout',
//     redirect: '/index',
//     hidden: false,
//     children: [
//       {
//         name: 'index',
//         path: '/index',
//         component: Home,
//         meta: {
//           role: 1,
//           title: '首页',
//           icon: '',
//           key: '1000001'
//         }
//       },
//       {
//         name: 'about',
//         path: '/about',
//         component: () => import('../views/about/index.vue'),
//         meta: {
//           role: 2,
//           title: '引导页',
//           icon: '',
//           key: '1000002'
//         }
//       },
//       {
//         name: 'tool',
//         path: '/tool',
//         redirect: '/tool/option1',
//         hidden: false,
//         component: () => import('../views/tool/index.vue'),
//         meta: {
//           role: 2,
//           title: '工具箱',
//           icon: '',
//           key: '1000003'
//         },
//         children: [
//           {
//             name: 'option1',
//             path: '/tool/option1',
//             meta: {
//               role: 20,
//               title: 'option1',
//               icon: '',
//               key: '1000004'
//             },
//             component: () => import('../views/tool/option1/index.vue'),
//           },
//           {
//             name: 'page2',
//             path: '/tool/option2',
//             meta: {
//               role: 21,
//               title: 'option2',
//               icon: '',
//               key: '1000005'
//             },
//             component: () => import('../views/tool/option2/index.vue'),
//           }
//         ]
//       },
//       {
//         name: 'chart',
//         path: '/chart',
//         component: () => import('../views/chart/index.vue'),
//         meta: {
//           role: 3,
//           title: '图标',
//           icon: '',
//           key: '1000006'
//         }
//       },
//       {
//         path: '/404',
//         name: 'error404',
//         component: () => import('@/views/errPage/404.vue')
//       },
//       {
//         path: '/:catchAll(.*)',
//         redirect: '/404'
//       }
//   ]
//   },
// ]
const router = createRouter({
  history: createWebHistory(),
  routes: staticRouters
})
// 路由钩子
router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') {
    return next()
  } 
  // 4.判断访问页面是否在路由白名单地址中，如果存在直接放行
  if (whiteList.includes(to.path)) return next()
  const userInfo = store.state.userInfo
  if (!userInfo) return next({ path: '/login', replace: true})
  // 6.如果没有菜单列表，就重新请求菜单列表并添加动态路由
  if (!store.state.menu.length) {
    await initDynamicRoute();
    return next({ ...to, replace: true });
  }
  // 7.正常访问页面
  next();
})

/**
 * @description 重置路由
 */
export const resetRouter = () => {
  const routers = router.getRoutes()
  routers.forEach(item => {
    if (item.path !== '/login') {
      router.removeRoute(item.name);
    }
  })
};
export default router
