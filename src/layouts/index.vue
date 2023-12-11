<template>
  <a-layout class="layout-con">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <a-image :width="50" src="https://aliyuncdn.antdv.com/vue.png" />
        <span v-if="!collapsed">管理系统</span>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
        :items="menuData"
        @click="handJump"
        ></a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff;align-items: center; padding: 0 20px;display: flex;justify-content: space-between;">
        <div class="left">
            <MenuFoldOutlined
          v-if="collapsed"
          class="trigger"
          style="font-size: 30px"
          @click="() => (collapsed = !collapsed)"
        />
        <MenuUnfoldOutlined style="font-size: 30px" v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        </div>
        <div class="right">
            <a-dropdown>
                <a class="ant-dropdown-link" @click.prevent>
                {{userInfo.username}}
                <DownOutlined />
                </a>
                <template #overlay>
                    <a-menu>
                        <a-menu-item @click="loginOut">
                            <a href="javascript:;">退出登录</a>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
        
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup>
import {
  MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined, UserOutlined
} from '@ant-design/icons-vue';
import { computed, ref, onMounted, h } from 'vue';
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { resetRouter } from '@/router'
import { message } from 'ant-design-vue';
const selectedKeys = ref([]);
const menuData = ref([])
const collapsed = ref(false);
const store = useStore()
const router = useRouter()
const route = useRoute()
const userInfo = computed(() => store.state.userInfo)
const menu = computed(() => store.state.menu)
// 递归
const traverseTree = (data) => {
    return data.map(item => {
        const newObj = {
            ...item,
            label: item.title,
            icon: h(UserOutlined)
        }
        if (newObj.children && newObj.children.length) {
            newObj.children = traverseTree(newObj.children)
        }
        return newObj
    })
}
const initMenu = () => {
    const data = traverseTree(menu.value)
    menuData.value = data
}
const handJump = ({ item }) => {
    router.push(item.path)
}
onMounted(() => {
    selectedKeys.value = [route.meta.key]
    menu.value.length && initMenu()
})
const loginOut = () => {
    store.dispatch('loginOut').then(() => {
    message.success('退出成功')
    resetRouter()
    router.push({ path: '/login' })
})
}
</script>
<style lang="scss" scoped>
.layout-con {
    width: 100%;
    height: 100%;
    .logo {
        text-align: center;
        padding: 5px;
        color: #fff;
    }
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>