<template>
  <div class="chart">
    <echarts width="100%" height="500px" :option="state.option"></echarts>
    <div class="outer"></div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
const state = reactive({
    option: {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    },
  })
</script>
<style lang="scss">
.about {
  .outer {
    width: 800px;
    height: 500px;
  }
}

</style>
