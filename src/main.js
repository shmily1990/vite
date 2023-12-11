import 'ant-design-vue/dist/reset.css';
import store from './store'
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import echarts from '@/components/echarts/index.vue'
import requestApi from './api/request'

const app = createApp(App)
app.config.globalProperties.requestApi = requestApi // 把requestApi 挂载到全局
app.use(router)
app.use(store)
app.component('Echarts', echarts)
app.use(Antd).mount('#app')
