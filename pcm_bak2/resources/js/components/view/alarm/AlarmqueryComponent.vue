<template>
	<div class="alarmQuery" style="width: 99%;position: relative;top: 10px; margin: 0px 15px 0px 15px;">
		<input style="display: none;height: 10px;" :action="getOption">
		<el-row :gutter="20" style="height: 60px;">
			<el-col :span="4">
				<el-date-picker v-model="date" type="daterange" value-format="yyyy-MM-dd" range-separator="到" start-placeholder="开始日期" end-placeholder="结束日期">
    			</el-date-picker>
    		</el-col>
    		<el-col :span="5">
    			<el-select v-model="level" placeholder="原始级别" v-loading="loading.SelectOptionsStatus" multiple>
			    	<el-option v-for="item in levels" :key="item.level" :label="item.label" :value="item.label">
			    	</el-option>
			  	</el-select>
    		</el-col>
    		<el-col :span="5">
    			<el-select v-model="alarmstatus" placeholder="告警状态" v-loading="loading.SelectOptionsStatus" multiple>
			    	<el-option v-for="item in alarmstatuses" :key="item.alarmstatus" :label="item.label" :value="item.label">
			    	</el-option>
			  	</el-select>
    		</el-col>
    		<el-col :span="5">
    			<el-select v-model="location" placeholder="地市" v-loading="loading.SelectOptionsStatus" multiple>
			    	<el-option v-for="item in locations" :key="item.location" :label="item.label" :value="item.label">
			    	</el-option>
			  	</el-select>
    		</el-col>
    		<el-col :span="5">
    			<el-select v-model="alarmstyle" placeholder="告警类型" v-loading="loading.SelectOptionsStatus" multiple>
			    	<el-option v-for="item in alarmstyles" :key="item.alarmstyle" :label="item.label" :value="item.label">
			    	</el-option>
			  	</el-select>
    		</el-col>
    	</el-row>
    	<el-row :gutter="20" style="height: 60px;">
    		<el-col :span="6">
    			<el-input v-model="alarmtitle" placeholder="告警标题"></el-input>
    		</el-col>
    		<el-col :span="6">
    			<el-input v-model="alarmdevicenum" placeholder="设备识别号"></el-input>
    		</el-col>
    		<el-col :span="6">
    			<el-input v-model="alarmNEstyle" placeholder="告警网元设备类型"></el-input>
    		</el-col>
    		<el-col :span="6">
    			<el-input v-model="alarmNEname" placeholder="告警网元名称"></el-input>
    		</el-col>
    	</el-row>
    	<el-row :gutter="20">
    		<el-col :span="3" :offset="18">
    			<el-button type="primary" icon="el-icon-search" @click="AlarmQuery" :loading="loading.queryStatus">查询</el-button>
    		</el-col>
    		<el-col :span="3" >
    			<el-button type="primary" icon="el-icon-download" @click="AlarmDownload" >导出</el-button>
    		</el-col>
    	</el-row>
    	<div v-if="IsQuery!==0">
    		<TablesComponent></TablesComponent>
    	</div>
	</div>
</template>
<script>
	import {download} from '@/mixin/download.js';
	import TablesComponent from './TablesComponent';
	export default {
		mixins:[
			download
		],
		data() {
			return {
				date: '',
				levels:[],
				level: "",
				alarmstatuses:[],
				alarmstatus:"",
				locations:[],
				location:"",
				alarmstyles:[],
				alarmstyle:"",
				alarmtitle: "",
				alarmdevicenum: "",
				alarmNEstyle: "",
				alarmNEname: "",
				loading: {
		           SelectOptionsStatus: false,
		           queryStatus: false
		        },
		        IsQuery: 0,
		        downloadurl:""
			}
		},
		components: {
			TablesComponent: TablesComponent	
		},
		created() {
			this.$store.dispatch("getAlarmSelectOptions");
		},
		computed: {
			getOption() {
				this.IsQuery = this.$store.getters.getAlarmQueryStatus;
				if (this.$store.getters.getSelectOptionsStatus == 1) {
					this.loading.SelectOptionsStatus = true;
	          	}
	          	if (this.$store.getters.getSelectOptionsStatus == 2) {
	          		this.loading.SelectOptionsStatus = false;
	            	this.levels = this.$store.getters.getSelectOptions["origSeverity"] || [];
	            	this.alarmstatuses = this.$store.getters.getSelectOptions["alarmStatus"] || [];
	            	this.locations = this.$store.getters.getSelectOptions["locationInfo"] || [];
	            	this.alarmstyles = this.$store.getters.getSelectOptions["alarmType"] || [];
	          	}
	          	if (this.$store.getters.getAlarmQueryStatus == 1) {
	          		this.loading.queryStatus = true;
	          	}
	          	if (this.$store.getters.getAlarmQueryStatus == 2) {
	          		
	          		this.loading.queryStatus = false;
	          	}
			}
		},
		methods:{
			AlarmQuery() {
				this.downloadurl = "";
				if (this.date == '' || this.date == null) {
					this.$message({
			          	message: '请选择日期',
			          	type: 'warning'
			        });
			        return;
				}
				this.$store.dispatch("getAlarmQueryDatas", {
					date: this.date,
					origSeverity: this.level,
					alarmstatus: this.alarmStatus,
					locationInfo: this.location,
					alarmstyle: this.alarmType,
					alarmTitle: this.alarmtitle,
					factorycode: this.alarmdevicenum,
					neType: this.alarmNEstyle,
					neName: this.alarmNEname
				});
			},
			AlarmDownload() {
				if (this.$store.getters.getAlarmQueryStatus == 1) {
					this.$message({
			          	message: '正在查询请稍后',
			          	type: 'warning'
			        });
			        return;
				}
				if (this.$store.getters.getAlarmQueryStatus == 2) {
					this.downloadurl = this.$store.getters.getAlarmQueryDatas.downloadurl;
				}
				var uerAgent = navigator.userAgent.toLowerCase();
              	var format = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
              	var matches = uerAgent.match(format);
              	var browerInfo = matches[1].replace(/version/, "'safari");
              	if (browerInfo == "chrome") {
	                this.download_chrome(this.downloadurl);
	                this.$notify({
	                  message: '导出成功',
	                  type: 'success'
	                });
	                this.loading.qatExport = false;
	            } else if (browerInfo == "firefox") {
	                this.download_firefox(this.downloadurl);
	                this.$notify({
	                  message: '导出成功',
	                  type: 'success'
	                });
	                this.loading.qatExport = false;
	            }
			}
		}
	}
</script>
<style>
	.alarmQuery .el-button{
		width: 60%;
		/*height: 60px;*/
		/*font-size: 25px;*/
	}
	.alarmQuery .el-select {
		width: 100%;
	}
	.alarmQuery .el-range-input{
		/*font-size: 15px!important;*/
	}
	.alarmQuery .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
      width: 100%;
      /*height: 60px;*/
      /*font-size: 20px;*/
    }
    .alarmQuery .el-input__inner{
    	width: 100%;
    	/*height: 60px;*/
    	/*font-size: 20px;*/
    }
    .alarmQuery .el-scrollbar__view .el-select-dropdown__item{
    	/*font-size: 20px!important;*/
    }
    .alarmQuery .el-select-dropdown__empty{
    	/*font-size: 20px!important;*/
    }
    .alarmQuery .el-range-separator {
    	width: 10%!important;
      	/*font-size: 15px!important;*/
      	/*display:inline-block!important;*/
      	/*text-align:center;*/
      	/*height: 60%!important;*/
      	/*line-height:32px;*/
      	text-align:center!important;
    }
    .alarmQuery .has-gutter tr th {
      background: #CDCDCD;
      font-weight: bolder!important;
      color:black;
    }
</style>