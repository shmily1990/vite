export default {
    code: 0,
    data: {
        menus: [
            {
                name: 'index',
                path: '/index',
                title: '首页',
                role: 1,
                icon: '',
                key: '1000001'
            },
            {
                name: 'about',
                path: '/about',
                title: '引导页',
                role: 2,
                icon: '',
                key: '1000002'
            },
            {
                name: 'tool',
                path: '/tool',
                redirect: '/tool/option1',
                hidden: false,
                title: '工具箱',
                role: 3,
                icon: '',
                key: '1000003',
                children: [
                    {
                        name: 'option1',
                        path: '/tool/option1',
                        title: 'option1',
                        role: 30,
                        icon: '',
                        key: '1000004'
                    },
                    {
                        name: 'option2',
                        path: '/tool/option2',
                        title: 'option2',
                        role: 31,
                        icon: '',
                        key: '1000005'
                    }
                ]
            },
            {
                name: 'chart',
                path: '/chart',
                title: '图表',
                role: 4,
                icon: '',
                key: '1000006'
            },
        ],
        userInfo: {
            username: 'admin',
            token: '232323',
            userId: '1'
        }
    }
}