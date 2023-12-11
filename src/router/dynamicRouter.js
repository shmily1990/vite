import router from "./index";
import { message } from 'ant-design-vue'
import store from '../store'
import Layout from '@/layouts/index.vue'

// 引入 views 文件夹下所有的 vue 文件
const module = import.meta.glob("@/views/**/*.vue");
/**
 * @description 初始化动态路由
 */
// 定义一个用于扁平化数据的函数
function flattenTree(tree) {
    const result = [];
    function flatten(node) {
        result.push(node);
        if (node.children && node.children.length > 0) {
            node.children.forEach(child => flatten(child));
        }
    }
    tree.forEach(node => flatten(node));
    return result;
}
export const initDynamicRoute = async () => {
    try {
        // 1.获取菜单列表 && 按钮权限（可合并到一个接口获取，根据后端不同可自行改造）
        await store.dispatch('getAuthMenuList')
        // 2.判断当前用户有没有菜单权限
        if (!store.state.menu.length) {
            message["error"]({
                message: "无权限访问"
            });
            store.commit('SET_USERINFO', null)
            router.replace('/login');
            return Promise.reject("No permission");
        }
        // 3.添加动态路由
        router.addRoute({
            path: '/',
            component: Layout,
            redirect: '/home',
            name: 'layout',
            hidden: false
        })
        flattenTree(JSON.parse(JSON.stringify(store.state.menu))).forEach(item => {
            item.children && delete item.children;
            item.component = module["/src/views" + item.path + "/index.vue"]
            item.meta = {
                role: item.role,
                title: item.title,
                icon: '',
                key: item.key
            }
            router.addRoute('layout', item);
        });
        // const routerItem = {
        //     path: '/404',
        //     name: 'error404',
        //     component: module["/src/views" + "errPage/404.vue"]
        // }
        // router.addRoute(routerItem)
        //     {
        //       path: '/404',
        //       name: 'error404',
        //       component: () => import('@/views/errPage/404.vue')
        //     },
        //     {
        //       path: '/:catchAll(.*)',
        //       redirect: '/404'
        //     }
    } catch (error) {
        // 当按钮 || 菜单请求出错时，重定向到登陆页
        store.commit('SET_USERINFO', null)
        router.replace('/login');
        return Promise.reject(error);
    }
};