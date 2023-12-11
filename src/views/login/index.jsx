import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { Button, Checkbox, Form, Input } from "antd";
import { setUserInfo, setAuthRouters } from '../../store'
import { message } from "antd";
import { setToken } from "../../libs/util";
import requestApi from '../../api/request'
const App = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const onFinish = (values) => {
    setLoading(true)
    const { username, password } = values
    setTimeout(() => {
        if (username === 'admin' && password === '123456') {
            message.success('登录成功')
            const user = {
                name: 'admin',
                userId: 22,
                token: 23
            }
            setToken('userInfo', user)
            dispatch(setUserInfo(user))
            requestApi('getAdminPermission', 'post', {}).then(({ menus }) => {
                dispatch(setAuthRouters(menus))
                navigate('/home')
            }).catch(error => {
                message.error('获取用户权限失败')
            })
            
        } else {
            message.error('登录失败')
        }
        setLoading(false)
    }, 3000)
  };
const onFinishFailed = (errorInfo) => {
console.log("Failed:", errorInfo);
};
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" loading={loading}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
export default App;
