import { createSlice, configureStore } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {},
        menus: [],
        authRouters: []
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setAge: (state, action) => {
            state.age = action.payload
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
        setMenus: (state, action) => {
            state.menus = action.payload
        },
        setAuthRouters: (state, action) => {
            state.authRouters = action.payload
        }
    }
})

export const { setName, setAge, setUserInfo, setMenus, setAuthRouters } = userSlice.actions

const store  = configureStore({
    reducer: {
       user: userSlice.reducer 
    }
})

export default store