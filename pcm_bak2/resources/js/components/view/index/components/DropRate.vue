<template>
  <div id="dropRateChart" :style="{ height: '180px'}"></div>
</template>

<script>
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/bar')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    name: 'hello',
    data() {
      return {
        
      }
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let dropRateChart = echarts.init(document.getElementById('dropRateChart'))
        // 绘制图表
        dropRateChart.setOption({
          title: { 
            text: '掉线率 单位(%)',
            textStyle: {
              color: '#000',
              fontStyle: 'bolder',
              lineHeight: 30,
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          // legend: {
          //   data: ['今天', '昨天', '上周同期']
          // },
          grid: {
            top: '15%',
            left: '19%'
          },
          xAxis: {
            type: 'value',
            axisTick: {
              show: false
            },
            max: 1
          },
          yAxis: {
            type: 'category',
            data: ['上周同期', '昨天', '今天'],
            axisTick: {
              show: false
            },
            // max: 2
          },
          series: [{
            // color: ['#27a3d9'],
            barWidth: 15,
            type: 'bar',
            data: [0.34,0.56,0.13],
            itemStyle: {
              normal: { 
                barBorderRadius: 5,
                color: function(params) { 
                  //首先定义一个数组 
                  var colorList = [ 
                    '#f1bd46', '#1ac4a5', '#27a3d9'
                  ]; 
                  return colorList[params.dataIndex] 
                }, 
                //以下为是否显示 
                label: { 
                  show: false 
                },
                shadowColor: '#ccc',
                shadowOffsetX: 5,
                shadowOffsetY: 5,
                shadowBlur: 20
              } 
            }
          }]
        });
      }
    }
  }
  
  
</script>

<style>
  
</style>