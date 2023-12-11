<template>
<div class="login">
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="用户名"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="密码"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit" :disabled="isFetching" :loading="isFetching">登录</a-button>
    </a-form-item>
  </a-form>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import { initDynamicRoute } from '@/router/dynamicRouter'
import { message } from 'ant-design-vue'
const formState = reactive({
  username: '',
  password: '',
  remember: true,
});
const isFetching = ref(false)
const store = useStore()
const router = useRouter()
const onFinish = async values => {
    isFetching.value = true
    try {
        await store.dispatch('handleLogin', { username: values.username, password: values.password })
        await initDynamicRoute();
        // 这里可以清除一些数据
        router.push('/')
        message.success('登录成功')
    } catch(error) {
        message.error('用户名或者密码错误')
    }
    finally {
        isFetching.value = false
    }
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
</script>
<style scoped>
.login {
    width: 500px;
    padding-top: 60px;
}
</style>