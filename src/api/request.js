import axios from 'axios'
import { getToken } from '@/libs/util'
import qs from 'qs'
import { message } from 'antd'
import apiUrl from './apiUrl'

const instance = axios.create({
    baseURL: 'https://mock.mengxuegu.com/mock/654c3811a6dde808a695f1f7', // import.meta.env.VITE_BASE_API,
    timeout: 5000
})

instance.interceptors.request.use(config => {
    // 拦截业务逻辑
    // 如果本地又token就在头部携带
    // 1. 获取用户信息对象
    const userInfo = JSON.parse(getToken('userInfo'))
    // 判断是否有token
    if (userInfo.token) {
        config.headers.Authorization = `Bearer ${userInfo.token}`
    }
    if (config.type === 'json') {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    } else if (config.type === 'form-data') {
        config.headers['Content-Type'] = 'multipart/form-data'
    } else {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        config.data = qs.stringify(config.data)
    }
    return config
}, err => {
    return Promise.reject(err)
})

// res => res.data  取出data数据，将来调用接口的时候直接拿到的就是后台的数据
instance.interceptors.response.use(res => res.data, err => {
    const status = err.response.status === 401
    let msg = null
    switch (status) {
        case 400:
            msg = '请求错误'
            break
        case 401:
            msg = '请求错误'
            break
        case 404:
            msg = '请求地址出错'
            break
        case 500:
            msg = '服务器内部错误'
            break
        case 501:
            msg = '服务未实现'
            break
        default:
            msg = '请求失败'
            break
    }
    message.error(msg)
    // 401 状态码，进入该函数
    if (status === 401) {
        // 1. 清空无效用户信息
        // 2. 跳转到登录页
        // 3. 跳转需要传参（当前路由地址）给登录页码
        // store.commit('user/setUser', {})
        // // 当前路由地址
        // // 组件里头：`/user?a=10` $route.path === /user  $route.fullPath === /user?a=10
        // // js模块中：router.currentRoute.value.fullPath 就是当前路由地址，router.currentRoute 是ref响应式数据
        // const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
        // // encodeURIComponent 转换uri编码，防止解析地址出问题
        // router.push('/login?redirectUrl=' + fullPath)
    }
    return Promise.reject(err)
})

export default (url, method, submitData, type = 'json') => {
    return instance({
        url: apiUrl[url],
        method,
        [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
        type
    })
}