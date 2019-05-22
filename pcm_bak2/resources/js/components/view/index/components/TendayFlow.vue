<template>
  <div id="tendayFlowChart" :style="{ height: '180px'}"></div>
</template>

<script>
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/line')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')

  export default {
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let tendayFlowChart = echarts.init(document.getElementById('tendayFlowChart'))
        // 绘制图表
        tendayFlowChart.setOption({
          title: { 
            text: '全省近10日流量 单位(G)',
            textStyle: {
              color: '#000',
              fontStyle: 'bolder',
              lineHeight: 30,
            }
          },
          // tooltip: {
          //   trigger: 'axis',
          //   axisPointer: {
          //     type: 'cross',
          //     animation: false,
          //     label: {
          //       backgroundColor: '#ccc',
          //       borderColor: '#aaa',
          //       borderWidth: 1,
          //       shadowBlur: 0,
          //       shadowOffsetX: 0,
          //       shadowOffsetY: 0,
          //       textStyle: {
          //         color: '#222'
          //       }
          //     }
          //   },
          //   formatter: function (params) {
          //     return params[0]['axisValue']+ '<br />' + params[0]['data'];
          //   }
          // },
          tooltip: {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7', '4-8', '4-9', '4-10'],
            axisTick: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            axisTick: {
              show: false
            }
          },
          series: [{
            data: [82000, 93224, 90142, 93434, 12904, 13303, 13205, 34334, 45234, 29384],
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                  color: '#27a3d9'
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#27a3d9'
                }, {
                  offset: 1,
                  color: '#fff'
                }])
              }
            },
          }]
        })
      }
    }
  }
</script>

<style>
  
</style>