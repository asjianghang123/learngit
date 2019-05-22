<template>
  <div id="rrcRateChart" :style="{ height: '180px'}"></div>
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
        let rrcRateChart = echarts.init(document.getElementById('rrcRateChart'))
        // 绘制图表
        rrcRateChart.setOption({
          title: { 
            text: 'RRC 单位(%)',
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
            left: '10%'
          },
          xAxis: {
            type: 'value',
            axisTick: {
              show: false
            },
            min: 95
          },
          yAxis: {
            type: 'category',
            data: ['上周同期', '昨天', '今天'],
            axisTick: {
              show: false
            }
            // max: 2
          },
          series: [{
            // color: ['#27a3d9'],
            name: '今天',
            barWidth: 15,
            type: 'bar',
            data: [97,98,96],
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
          }/*,{
            color: ['#1ac4a5'],
            name: '昨天',
            barWidth: 15,
            type: 'bar',
            data: [25],
            itemStyle: {
              barBorderRadius: 5,
            }
          },{
            color: ['#f1bd46'],
            name: '上周同期',
            barWidth: 15,
            type: 'bar',
            data: [40],
            itemStyle: {
              barBorderRadius: 5,
            }
          }*/]
        });
      }
    }
  }
  
  
</script>

<style>
  
</style>