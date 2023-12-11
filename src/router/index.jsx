import React from "react";
import { useRoutes, Navigate } from "react-router-dom"
import lazyLoad from "@/router/utils/lazyLoad";
import Layout from '../layouts'
import Login from '@/views/login'
import ErrPage403 from '@/views/errPage/403'
import ErrPage404 from "../views/errPage/404";
import AuthRouter from "@/router/utils/authRouter";

const routes = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        element: <AuthRouter><Layout /></AuthRouter>,
        children: [
            {
                path: 'home',
                element: lazyLoad(React.lazy(() => import("@/views/home"))),
            },
            {
                path: 'about',
                element: lazyLoad(React.lazy(() => import("@/views/about"))),
            },
            {
                path: 'chart',
                element: lazyLoad(React.lazy(() => import("@/views/chart"))),
            },
            {
                path: 'tool',
                emelent: <Navigate to={'/tool/option1'} />,
                children: [
                    {
                        path: '/tool/option1',
                        index: true,
                        element: lazyLoad(React.lazy(() => import("@/views/tool/option1"))),
                    },
                    {
                        path: '/tool/option2',
                        element: lazyLoad(React.lazy(() => import("@/views/tool/option2"))),
                    }
                ]
            }
        ]
    },
    {
        path: '/403',
        element: <ErrPage403 />
    },
    {
        path: '/',
        element: <Navigate to="/home" />
    },
    // 配置404，需要放在最后
    {
        path: '/*',
        element: <ErrPage404 />
    }
]

const Router = () => {
    return useRoutes(routes)
}

export default Router