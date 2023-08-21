<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量<span>99999</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!-- 盒子将来展示图形图标的节点 -->
    <div ref="charts" class="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import * as echarts from 'echarts'
// 水球图扩展插件
import 'echarts-liquidfill'

const people = ref('1112222人')
const charts = ref<any>(null)

onMounted(() => {
  const chartsInstance = echarts.init(charts.value)
  chartsInstance.setOption({
    // title: {
    //   text: '水球图'
    // },
    xAxis: {},
    yAxis: {},
    series: {
      type: 'liquidFill',
      data: [0.6, 0.4, 0.2],
      waveAnimation: true,
      animationDuration: 3,
      animationDurationUpdate: 0,
      radius: '100%',
      outline: {
        show: true,
        borderDistance: 8,
        itemStyle: {
          color: 'red',
          borderColor: '#294D99',
          borderWidth: 8,
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.25)'
        }
      }
    },
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0
    }
  })
})

</script>

<style lang="scss" scoped>
.box {
  background: url("../../images/dataScreen-main-lb.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  
  .top {
    .title {
      color: white;
      font-size: 20px;
      margin-left: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url("../../images/dataScreen-title.png") no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right {
      float: right;
      color: white;
      font-size: 20px;
      span {
        color: #FFD700;
      }
    }
  }

  .number {
    padding: 10px;
    margin-top: 30px;
    display: flex;
    span {
      flex: 1;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: url("../../images/total.png") no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }

  .charts {
    width: 100%;
    height: 250px;
  }
}
</style>