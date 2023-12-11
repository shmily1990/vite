import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { setUserInfo } from '../store'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined, SmileOutlined
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import { Layout, Menu, Button, theme, Dropdown, Space, Image, message } from "antd";
import { removeToken } from "../libs/util";
import logo from '../logo.svg'
import './index.css'
const { Header, Sider, Content } = Layout;
const LayoutCom = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([])
  const { userInfo, authRouters } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [menuData, setMenuData] = useState([])
  const navigator = useNavigate()
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  useEffect(() => {
    setDefaultSelectedKeys([window.location.pathname])
  }, [menuData])
  useEffect(() => {
    initMenu()
  }, [authRouters])

  const initMenu = () => {
    const data = traverseTree(authRouters)
    console.log(data)
    setMenuData(data)
  }

  const handJump = (a) => {
    setDefaultSelectedKeys([a.key])
    navigator(a.key)
  }

  // 递归
const traverseTree = (data) => {
    return data.map(item => {
        const newObj = {
            ...item,
            label: item.title,
            key: item.path,
            icon: <UserOutlined />
        }
        if (newObj.children && newObj.children.length) {
            newObj.children = traverseTree(newObj.children)
        }
        return newObj
    })
}

const handleCollapsed = () => {
    setCollapsed((v) => !v)
}

const loginOut = () => {
    dispatch(setUserInfo({}))
    removeToken('userInfo')
    message.success('退出登录成功')
    navigator('/login')
}
  return (
    <div className="layout">
      <Layout style={{ height: '100%', width: '100%' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <div className="logo">
                 <Image
                        width={50}
                        src={logo}
                    />
                    {
                        !collapsed ? <span>管理系统</span> : null
                    }
            </div>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={defaultSelectedKeys}
            items={menuData}
            onClick={handJump}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: '0 12px',
              background: colorBgContainer,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={handleCollapsed}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="right">
                <Dropdown
                    menu={{
                        items: [{
                            key: '1',
                            label: (<a onClick={loginOut}>退出登录</a>)
                        }]
                    }}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            {userInfo.name}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default LayoutCom;
