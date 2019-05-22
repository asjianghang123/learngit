<template>
  <div id="citiesFlowChart" :style="{ height: '180px'}"></div>
</template>

<script>
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/bar')
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
        let citiesFlowChart = echarts.init(document.getElementById('citiesFlowChart'))
        // 绘制图表
        citiesFlowChart.setOption({
          title: { 
            text: '全省各地市每日流量 单位(G)',
            textStyle: {
              color: '#000',
              fontStyle: 'bolder',
              lineHeight: 30,
            }
          },
          color: ['#3398DB'],
          tooltip : {
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
          xAxis : [{
            type : 'category',
            data : ['广州', '深圳', '东莞', '佛山', '珠海', '中山', '惠州', '江门', '汕头', '澜州', '汕尾', '揭阳', '湛江', '茂名', '阳江', '云浮', '肇庆', '清远', '梅州', '韶关', '河源'],
            axisTick: {
              alignWithLabel: false
            },
            axisLabel:{
              formatter:function(value){
                return value.split("").join("\n");
              }
            }
          }],
          yAxis : [{
            type : 'value',
            axisTick: {
              show: false
            }
          }],
          series : [{
            name:'流量',
            type:'bar',
            barWidth: 10,
            data:[70000, 54678, 23456, 67479, 23246, 90765, 23456, 45676, 98293, 112934, 12221, 56787, 101222, 33445, 33333, 56678, 56665, 34745, 98475, 56334, 23345],
            // color: '#1ac4a5',
            itemStyle: {
              normal: { 
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#56b0e4'
                }, {
                  offset: 1,
                  color: '#53d8C5'
                }])
              }
            }
          }]
        })
      }
    }
  }
</script>

<style>
  
</style>