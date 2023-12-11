export default {
    code: 0,
    data: {
        menus: [
            {
                name: 'index',
                path: '/home',
                title: '首页'
            },
            {
                name: 'about',
                path: '/about',
                title: '引导页',
                role: 2,
                icon: '',
            },
            {
                name: 'tool',
                path: '/tool',
                redirect: '/tool/option1',
                hidden: false,
                title: '工具箱',
                role: 3,
                icon: '',
                children: [
                    {
                        name: 'option1',
                        path: '/tool/option1',
                        title: 'option1',
                        role: 30,
                        icon: ''
                    },
                    {
                        name: 'option2',
                        path: '/tool/option2',
                        title: 'option2',
                        role: 31,
                        icon: ''
                    }
                ]
            },
            {
                name: 'chart',
                path: '/chart',
                title: '图表',
                role: 4,
                icon: ''
            },
        ],
        userInfo: {
            username: 'admin',
            token: '232323',
            userId: '1'
        }
    }
}