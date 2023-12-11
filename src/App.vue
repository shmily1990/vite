<template>
    <router-view></router-view>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { getToken } from '@/libs/util'
const store = useStore()
onBeforeMount(() => {
  const userInfo = JSON.parse(getToken('userInfo'))
  store.commit('SET_USERINFO', userInfo ? userInfo : null)
})
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #323233;
  width: 100%;
  height: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
