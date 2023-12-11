import { useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { getToken } from "../../libs/util";
import store from "../../store";
import requestAdmin from '../../mock/mockMenus'
import { setAuthRouters } from "../../store"
import requestApi from '../../api/request'
import { useEffect, useState } from "react";
import { Spin } from "antd";

/**
 * @description 路由守卫组件
 * */
const flattenTree = (tree) => {
    const result = [];
    function flatten(node) {
        result.push(node.path);
        if (node.children && node.children.length > 0) {
            node.children.forEach(child => flatten(child));
        }
    }
    tree.forEach(node => flatten(node));
    return result;
}
const AuthRouter = (props) => {
    const { pathname } = useLocation();
    const dispatch = useDispatch()
    const { authRouters } = useSelector(state => state.user)

    const getMenu = async () => {
        const { menus } = await requestApi('getAdminPermission', 'post', {})
        dispatch(setAuthRouters(menus))
    }
	// // * 判断当前路由是否需要访问权限(不需要权限直接放行)
	// if (!route.meta?.requiresAuth) return props.children;

	// * 判断是否有Token
	const userInfo = JSON.parse(getToken('userInfo'))
	if (!userInfo?.token) return <Navigate to="/login" replace />;
    // 判断有没有获取动态路由, 没有就调接口获取一下
    const routerList = flattenTree(authRouters)
    if (!routerList.includes(pathname)) {
        // 没有权限
        return <Navigate to="/403" replace />;
    }
    

    useEffect(() => {
        if (userInfo && userInfo.token && !authRouters.length) {
            // 查询后端路由表
            getMenu()
        }
    }, [])

	// * 当前账号有权限返回 Router，正常访问页面
	return props.children;
}

export default AuthRouter