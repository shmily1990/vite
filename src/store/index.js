import { createStore } from 'vuex'
import requestData from '../mock/mockMenus'
import requestUserData from '../mock/mockUserMenus'
import { setToken, removeToken } from '../libs/util'
import requestApi from '../api/request'
export default createStore({
    state: {
        userInfo: {},
        menu: []
    },
    mutations: {
        SET_USERINFO(state, data) {
            state.userInfo = data
        },
        SET_MENU(state, data) {
            state.menu = data
        }
    },
    actions: {
        loginOut({ commit }) {
            return new Promise((resolve) => {
                commit('SET_USERINFO', {})
                commit('SET_MENU', [])
                removeToken('userInfo')
                resolve()
            })
        },
        handleLogin({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (username === 'admin' && password === '123456') {
                        const { data: { userInfo } } = requestData
                        commit('SET_USERINFO', userInfo)
                        setToken('userInfo', userInfo)
                        commit('SET_MENU', [])
                        resolve('成功')
                    } else {
                        if (username === 'user' && password === '123456') {
                            const { data: { userInfo } } = requestUserData
                            commit('SET_USERINFO', userInfo)
                            setToken('userInfo', userInfo)
                            resolve('成功')
                        } else {
                            reject('用户名或者密码不正确')
                        }
                    }
                }, 500)
            })
        },
        getAuthMenuList({ commit, state }) {
            return new Promise((resolve) => {
                const url = state.userInfo.userId === '1' ? 'getAdminPermission' : 'getUserPermission'
                requestApi(url, 'post', {}).then(({ menus }) => {
                    commit('SET_MENU', menus)
                    resolve(menus)
                })
                // setTimeout(() => {
                //     const { data: { menus } } = state.userInfo.userId === '1' ? requestData : requestUserData
                //         commit('SET_MENU', menus)
                //         resolve(menus)
                // }, 500)
            })
        }
    },
    modules: {},
})