<template>
  <div id="alarmNumsChart" :style="{ height: '180px'}"></div>
</template>

<script>
  let echarts = require('echarts/lib/echarts')
  require("echarts/lib/component/legendScroll");
  require('echarts/lib/chart/pie')
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
        let alarmNumsChart = echarts.init(document.getElementById('alarmNumsChart'))
        // 绘制图表
        alarmNumsChart.setOption({
          // tooltip: {
          //   trigger: 'item',
          //   formatter: "{a} <br/>{b}: {c} ({d}%)"
          // },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:['退服基站数','告警数量','退服小区数']
          },
          series: [{
            name:'告警概览',
            type:'pie',
            radius: ['50%', '80%'],
            // center: ['60%', '60%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                // position: 'center',
                position:'inner', //标签的位置
                textStyle : {
                  fontWeight : 'bold' ,
                  fontSize : '16'    //文字的字体大小
                },
                formatter:'{c}'//'{d}%'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '12',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data:[
              {value:335, name:'退服基站数', itemStyle:{normal:{color:'#27a3d9'}}},
              {value:310, name:'告警数量', itemStyle:{normal:{color:'#1ac4a5'}}},
              {value:234, name:'退服小区数', itemStyle:{normal:{color:'#f1bd46'}}}
            ]
          }],
          // color: ['#27a3d9', '#1ac4a5', '#f1bd46']
        })
      }
    }
  }
</script>

<style>
  
</style>