import React, { useState, Suspense, useEffect, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import logo from './logo.svg'
import { BrowserRouter } from 'react-router-dom'
import { Spin } from "antd"
import Router from '@/router'
import AuthRouter from "@/router/utils/authRouter";
import { getToken } from './libs/util'
import { setUserInfo } from './store'
import './App.css'

function App(props) {
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    const userInfo = JSON.parse(getToken('userInfo'))
    if (userInfo) {
      dispatch(setUserInfo(userInfo))
    }
  }, [])
  return (
    <BrowserRouter>
          <Router />
    </BrowserRouter>
  )
}

export default App
