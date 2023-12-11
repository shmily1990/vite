<template>
  <div class="about" ref="canvasWrapper">
    <!-- <span>这是引导页</span>
    <a-button type="primary" @click="toggleFullScreen">全屏</a-button> -->
  </div>
</template>
<script setup>
import { onMounted, ref } from  "vue"
import * as THREE from "three"
// import { reactive } from 'vue'
// const toggleFullScreen = () => {
//   const ele = document.documentElement.getElementsByClassName('about')[0]
//   if (ele.requestFullscreen) {
//     ele.requestFullscreen()
//   } else if (ele.mozRequestFullscreen) {
//     ele.mozRequestFullScreen()
//   } else if (ele.webkitRequestFullscreen) {
//     ele.webkitRequestFullscreen()
//   } else if (ele.msRequestFullscreen) {
//     ele.mozRequestFullScreen()
//   }
// }
const canvasWrapper = ref(null);
    let scene, camera, renderer, cube;

    onMounted(() => {
      // 创建场景
      scene = new THREE.Scene();

      // 创建相机
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 100, 1000);
      camera.position.z = 5;

      // 创建渲染器
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      // 将渲染器添加到组件的 DOM 中
      canvasWrapper.value.appendChild(renderer.domElement);

      // 创建立方体
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // 动画循环
      animate();
      // renderer.render(scene, camera);
    });

    function animate() {
      requestAnimationFrame(animate);

      // 使立方体旋转
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }
</script>
<style lang="scss">
.about {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
