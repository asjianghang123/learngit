<template>
	<div class="alarmview" v-bind:style="{width: totalwidth+'px'}" style="position: relative;top: 10px;margin: 0px 15px 0px 15px;">
            <div class="tabletitle" v-bind:style="{height: titleheight+'px'}">
                  <p>网元规模</p>
            </div>
		<el-table :data="alarmviewdata"  border style="width: 100%" :action="show" :height="cellheight" >
			<el-table-column label="小站总数" prop="total" :width="cellwidth*1.5">
      		</el-table-column>
      		<el-table-column label="京信" prop="jxnum" :width="cellwidth">
      		</el-table-column>
      		<el-table-column label="虹信" prop="hxnum" :width="cellwidth">
      		</el-table-column>
      		<el-table-column label="大唐" prop="dtnum" :width="cellwidth">
      		</el-table-column>
      		<el-table-column label="日海" prop="rhnum" :width="cellwidth">
      		</el-table-column>
      		<el-table-column label="中邮科" prop="zyknum" :width="cellwidth" >
      		</el-table-column>
      		<el-table-column label="规划eNB个数" prop="enbnum" :width="cellwidth*2">
      		</el-table-column>
      		<el-table-column label="已用eNB个数" prop="usedEnbnum" :width="cellwidth*2">
      		</el-table-column>
      	</el-table>
            <div class="tabletitle" v-bind:style="{height: titleheight+'px'}">
                  <p>活动告警单元</p>
            </div>
            <div class="chartTitle" v-bind:style="{width: chartTitlewidht+'px', height: charttitleheight+'px'}">
                  <p>{{ alarmnum }}</p>
                  <span style="background: #F70C04;color: white;border-radius: 4px;padding: 8px 8px 8px 8px;">告警总数</span> 
            </div>
            <div class="chartTitle" v-bind:style="{width: chartTitlewidht+'px', height: charttitleheight+'px'}">
                  <p>{{ closenum }}</p>
                  <span style="background: #4070FF;color: white;border-radius: 4px;padding: 8px 8px 8px 8px;">退服总数</span> 
            </div>
            <div class="chartTitle" v-bind:style="{width: chartTitlewidht+'px', height: charttitleheight+'px'}">
                  <p style="visibility: hidden">test</p>
                  <span style="background: #FF8040;color: white;border-radius: 4px;padding: 8px 8px 8px 8px;">告警级别</span> 
            </div>
            <div class="Alarmchart" id="alarm" v-bind:style="{width: chartwidht+'px', height: chartheight+'px'}">
            </div>
            <div class="closechart" id="close" v-bind:style="{width: chartwidht+'px', height: chartheight+'px'}">
            </div>
            <div class="levelchart" id="level" v-bind:style="{width: chartwidht+'px', height: chartheight+'px'}">
            </div>
	</div>
      
</template>
<script>
      var echarts = require('echarts/lib/echarts');
      // 引入柱状图
      require('echarts/lib/chart/bar');
      // 引入提示框和标题组件
      require('echarts/lib/component/tooltip');
      require('echarts/lib/component/title');

      var fixWidth= document.documentElement.clientWidth;
      var fixHeight= document.documentElement.clientHeight;
      
	export default{
		data(){
			return {
                        cellwidth: 0,
				alarmviewdata:[{
                              total: '1020',
                              jxnum: '400',
                              hxnum: '120',
                              dtnum: '200',
                              rhnum: '150',
                              zyknum: '150',
                              enbnum: '9403',
                              usedEnbnum: '621'
                        }],
                        totalwidth: 0,
                        cellheight: 0,
                        height:50,
                        chartwidht:0,
                        chartheight:0,
                        titleheight:0,
                        charttitleheight:0,
                        chartTitlewidht:0,
                        alarmnum: '200',
                        closenum: '300',
                        alarmlevel: ""
			}
		},
            computed: {
                  show(){
                        this.cellwidth = parseInt((fixWidth-150)/10);
                        this.totalwidth = parseInt(this.cellwidth*10.4);
                        this.cellheight = 100;
                        this.titleheight = this.cellheight/2;
                        this.chartheight = parseInt(fixHeight-this.cellheight-this.titleheight*2)-150;
                        this.charttitleheight=150;
                        this.chartwidht = parseInt((fixWidth-100)/3);
                        this.chartTitlewidht = this.chartwidht;

                  }
            },
            mounted() {
                  var alarmChart = echarts.init(document.getElementById('alarm'));
                  alarmChart.setOption({
                        title: {
                              text: '告警总数'
                        },
                        tooltip: {},
                        xAxis: {
                              data: ['广州', '深圳', '东莞', '佛山', '珠海', '中山', '惠州', '江门', '汕头', '潮州', '汕尾', '揭阳', '湛江', '茂名', '阳江', '云浮', '肇庆', '清远', '梅州', '韶关', '河源'],
                              axisTick: {
                                alignWithLabel: false
                              },
                              axisLabel:{
                                formatter:function(value){
                                  return value.split("").join("\n");
                                }
                              }
                        },
                        yAxis: {},
                        series: [{
                              name: '告警',
                              type: 'bar',
                              data: [5, 2, 3, 9, 1, 2, 5, 6, 4, 2, 12, 2, 14, 5, 8, 6, 7, 8, 9, 10, 3],
                              barWidth : 10,
                              itemStyle: {
                                    normal: {
                                          color:'#40FFFF'
                                    }
                              }
                        }]
                  });
                  var closechart = echarts.init(document.getElementById('close'));
                  closechart.setOption({
                        title: {
                              text: '退服总数'
                        },
                        tooltip: {},
                        xAxis: {
                              data: ['广州', '深圳', '东莞', '佛山', '珠海', '中山', '惠州', '江门', '汕头', '潮州', '汕尾', '揭阳', '湛江', '茂名', '阳江', '云浮', '肇庆', '清远', '梅州', '韶关', '河源'],
                              axisTick: {
                                alignWithLabel: false
                              },
                              axisLabel:{
                                formatter:function(value){
                                  return value.split("").join("\n");
                                }
                              }
                        },
                        yAxis: {},
                        series: [{
                              name: '退服',
                              type: 'bar',
                              data: [5, 10, 6, 6, 2, 1, 5, 6, 8, 12, 3, 3, 5, 7, 8, 12, 1, 2, 3, 4, 9],
                              barWidth : 10,
                              itemStyle: {
                                    normal: {
                                          color:'#4070FF'
                                    }
                              }
                        }]
                  }, false);
                  var levelchart = echarts.init(document.getElementById('level'));
                  levelchart.setOption({
                        title: {
                              text: '告警级别'
                        },
                        tooltip: {},
                        xAxis: {
                              data: ['紧急', '重要', '次要', '警告']
                        },
                        yAxis: {},
                        series: [{
                              name: '级别',
                              type: 'bar',
                              barWidth : 10,
                              data: [5, 2, 3, 2],
                              itemStyle: {
                                    normal: {
                                          color:'#FF8040'
                                    }
                              }
                        }]
                  });
            }
	}
</script>
<style>
      .el-table__empty-block {
            display: none ;
      }
      body .el-table th.gutter{
            display: table-cell!important;
      }/*防止单元格错位*/
      body .el-table colgroup.gutter{
            display: table-cell!important;
      }/*防止单元格错位*/
      .tabletitle {
            padding: 8px 8px;
            background-color: #B2F7F7;
            border-radius: 4px;
            /*border-left: 5px solid #50bfff;*/
            margin: 0px 0;    
      }
      .Alarmchart {
            float: left;
      }
      .closechart {
            float: left;
      }
      .levelchart {
            float: left;
      }
      .chartTitle {
            float: left;
            font-size: 20px;
            text-align: center;
            margin: auto;

      }
      .alarmview .has-gutter tr th {
            background: #D4D6D5;
            font-weight: bolder!important;
            color:black;
      }
</style>