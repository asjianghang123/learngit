<template>
  <div style="position: relative;top: 10px;" class="paramcheck">
      <el-row :action="getQueryDatas" class="choose" style="padding:10px 0px 10px 0px;">
            <el-col :span="5">
                  <el-select v-model="location" placeholder="地市" multiple size="medium" class="selectoption">
                        <el-option v-for="item in locations" :key="item.location" :label="item.label" :value="item.label">
                        </el-option>
                  </el-select>
            </el-col>
            <el-col :span="5">
                  <el-input placeholder="eNodeBid" v-model="enodeid" suffix-icon="el-icon-search" clearable></el-input>
            </el-col>
            <el-col :span="5" :action="getQueryDatas"> 
                  <el-input placeholder="CEL_ID" v-model="cellid" suffix-icon="el-icon-search" clearable></el-input>
            </el-col>
            <el-col :span="5"> 
                  <el-input placeholder="小站名称" v-model="cellname" suffix-icon="el-icon-search" clearable></el-input>
            </el-col>
            <el-col :span="2">
                  <el-button type="primary" icon="el-icon-refresh" @click="refresh" :loading="loading.getParamDatasStatus" style="float:right;">更新</el-button>
            </el-col>
            <el-col :span="2" >
                  <el-button type="primary" icon="el-icon-download" @click="exportParam" :loading="loading.exportStatus" style="float:right;">导出</el-button>
            </el-col>
      </el-row>
       <el-tabs v-model="activeName" type="card" @tab-click="handleClick" stretch>
          <el-tab-pane label="CM-CC数据-小区属性" name="CM_CC_view" ></el-tab-pane>
          <el-tab-pane label="CM-CE数据-基站属性" name="CM_CE_view"></el-tab-pane>
          <el-tab-pane label="CM-CP数据-LTE小区参数" name="CM_CP_view" ></el-tab-pane>
          <el-tab-pane label="CM-EP数据-LTE基站参数" name="CM_EP_view"></el-tab-pane>
       </el-tabs>
      <ParamtableComponent :location="querylocation" :enodeid="queryenodeid" :cellid="querycellid" :cellname="querycellname" :table="tablename"></ParamtableComponent>
  </div>
</template>
<style>
	.paramcheck .choose {
    background: #DFE3E0;
  }
  .paramcheck .selectoption .el-input{
    height: 40px;
  }
  .paramcheck {
    margin: 0px 15px 0px 15px;
  }
</style>
<script>
	import {download} from '@/mixin/download.js';
	import ParamtableComponent from './ParamtableComponent';
  	export default {
  		mixins:[
			download
		],
        data() {
              return {
                    location:[],
                    locations: '',
                    enodeid: '',
                    cellid: '',
                    cellname: '',
                    activeName: 'CM_CC_view',
                    querylocation: [],
                    queryenodeid: '',
                    querycellid: '',
                    querycellname: '',
                    tablename: '',
                    loading: {
                    	exportStatus: false,
                    	getParamDatasStatus: false
                    },
                    downloadurl: ''

              }
        },
        components: {
        	ParamtableComponent: ParamtableComponent
        },
        created() {
        	this.$store.dispatch("getParamDatas", {
  				table: this.activeName
  			});
        },
        computed: {
        	getQueryDatas(){
				// if (this.$store.getters.getParamDatasStatus == 2) {
				this.querylocation = this.location;
				this.queryenodeid = this.enodeid;
				this.querycellid = this.cellid;
				this.querycellname = this.cellname;
				this.tablename = this.activeName
				if (this.$store.getters.getParamExportStatus == 1) {
					this.loading.exportStatus = true;
				}
				if (this.$store.getters.getParamDatasStatus == 1) {
					this.loading.getParamDatasStatus = true;
				}
				if (this.$store.getters.getParamDatasStatus == 2) {
					this.loading.getParamDatasStatus = false;
				}
				if (this.$store.getters.getParamExportStatus == 2) {
					this.loading.exportStatus = false;
					
				}
				// }
        	}
        },
        methods: {
  			handleClick(tab, event) {
  				this.$store.dispatch("getParamDatas", {
  					table: this.activeName
  				});
  			},
  			refresh() {
  				this.$store.dispatch("getParamDatas", {
  					table: this.activeName
  				});
  			},
  			exportParam() {
  				var uerAgent = navigator.userAgent.toLowerCase();
              	var format = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
              	var matches = uerAgent.match(format);
              	var browerInfo = matches[1].replace(/version/, "'safari");
                this.downloadurl = "";
  				this.$store.dispatch("ExportParam", {
  					table: this.activeName,
  					location: this.location,
  					enodeid: this.enodeid,
  					cellid: this.cellid,
  					cellname: this.cellname
  				}).then(()=>{
            if(this.$store.getters.getParamExportStatus == 2) {
              this.downloadurl = this.$store.getters.getParamExprotPath.downloadurl;
            }
  					// self.downloadurl = self.$store.getters.getParamExprotPath.downloadurl;
  					if (browerInfo == "chrome") {
		                this.download_chrome(this.downloadurl);
		                this.$notify({
		                  message: '导出成功',
		                  type: 'success'
		                });
		                this.loading.exportStatus = false;
		            } else if (browerInfo == "firefox") {
		                this.download_firefox(this.downloadurl);
		                this.$notify({
		                  message: '导出成功',
		                  type: 'success'
		                });
		                this.loading.exportStatus = false;
		            }
  				});

  			}
        }
  	}
</script>