<template>
<div class="StationInfo" style="position: relative;top: 10px;">
  <div id="top">    
    <el-row type="flex" justify="end">
      <el-col :span="6">
        <el-input size="small" v-model="fileNames" placeholder="请选择上传文件..." readonly style="max-width: 150px"></el-input>
        <el-button size="small" type="primary" onclick="stationFile.click()" icon="el-icon-folder-opened">选择文件</el-button>
        <input type="file" style="display: none;" id="stationFile" ref="SF" @change="selectFile" multiple>
        <el-button size="small" type="primary" @click="StationUploadFile" :loading="loading.StationUploadStatus" icon="el-icon-upload2">上传</el-button>
        <el-button size="small" type="primary" @click="TemplateExport" :loading="loading.ExportTemplateStatus" icon="el-icon-download">下载模板</el-button>
      </el-col>
      <el-col :span="15">
        <el-form :inline="true" :model="formQuery" class="demo-form-inline">
          <el-form-item label="地市">
            <el-select v-model="formQuery.city" placeholder="请选择地市">
              <!-- <el-option label="北京" value="北京"></el-option> -->
              <el-option v-for="item in citys" :label="item.label" :value="item.label" :key="item.label"></el-option>
            </el-select>
            <!-- <el-select v-model="formQuery.city" filterable placeholder="请选择地市">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="小站名称">
            <el-input v-model="formQuery.stationName" placeholder="小站名称"></el-input>
          </el-form-item>
          <el-form-item label="eNodeBID">
            <el-input v-model="formQuery.eNodeBID" placeholder="eNodeBID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="refresh" :action="getQueryDatas" :loading="loading.StationInfoStatus" icon="el-icon-search">刷新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="3">
        <el-button id="StationExport" size="medium" type="primary" @click="StationExport" :loading="loading.StationExportStatus" icon="el-icon-download">导出</el-button>
        <el-button name="eNodeB" size="medium" type="primary" @click="handleClick">eNodeB</el-button>
      </el-col>
    </el-row>
  </div>
  <StationinfotableComponent :table="table" :formQuery="formQuery"></StationinfotableComponent>
</div>
</template>
<style>
  body .el-table th.gutter{
    display: table-cell!important;
  }/*防止单元格错位*/
  body .el-table colgroup.gutter{
    display: table-cell!important;
  }/*防止单元格错位*/
  .StationInfo {
    margin: 0px 15px 0px 15px;
  }
  .StationInfo .tableDatas th {
    background: #409EFF;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font: 15px Medium;
    font-weight: bold;
    /* color: #606266; */
    color: #303133;
  }
</style>
<script>
  import {download} from '@/mixin/download.js';
  import StationinfotableComponent from './StationinfotableComponent';
  export default {
    mixins:[
      download
    ],
    data() {
      return {
        // filename: '请选择上传文件...',
        formData: '',
        fileNames: '',
        /*options: [
          {
            value: '上海',
            label: '上海'
          },
          {
            value: '北京',
            label: '北京'
          },
        ],*/
        table: "小站",
        formQuery: {
          city: '',
          stationName: '',
          eNodeBID: '',
        },
        citys: [],
        loading: {
          StationInfoStatus: false,
          StationUploadStatus: false,  
          StationExportStatus: false,
          ExportTemplateStatus: false
        },
        downloadurl: "",
        downloadTemplateurl: 'templates/StationInfo_Template.xlsx',
      }
    },
    components: {
      StationinfotableComponent: StationinfotableComponent
    },
    created() {
      // console.log(this.table);
      this.$store.dispatch("getStationInfoDatas", {
        query: {
          table: this.table
          // queryParams: this.formQuery
        }
      });
    },
    computed: {
      getQueryDatas() {
        // console.log(this.$store.getters.getStationInfoDatas);
        /*if(this.$store.getters.getStationInfoStatus == 1) {
          this.loading.StationInfoStatus = true;
        }*/
        if(this.$store.getters.getStationInfoStatus == 2) {
          // this.loading.StationInfoStatus = false;
          this.citys = this.$store.getters.getStationInfoDatas.options.city;
          // console.log(this.citys);
        }
        if(this.$store.getters.getStationUploadStatus == 1){        
          this.loading.StationUploadStatus = true;
        }
        if(this.$store.getters.getStationExportStatus == 1) {
          this.loading.StationExportStatus = true;
          // this.tableHeads = this.$store.getters.getStationInfoDatas.tableHeads;
          // this.tableDatas = this.$store.getters.getStationInfoDatas.tableDatas;
          // this.downloadurl = this.$store.getters.getStationInfoDatas.downloadurl;
        }
        // console.log(this.tableDatas);   
      }
    },
    methods: {
      current_change: function(currentPage) {
            this.currentPage = currentPage;
      },
      size_change: function(sizeChange) {
            this.pagesize = sizeChange;
      },      
      refresh() {
        // this.table = '';
        this.formQuery.city = '';
        this.formQuery.stationName = '';
        this.formQuery.eNodeBID = '';
        this.$store.dispatch("getStationInfoDatas", {
          query: {
            table: this.table,
            // queryParams: this.formQuery
          }
        });
      },
      selectFile: function(){
        var self = this;
        var formData = new FormData();
        if(self.$refs.SF.files.length > 3) {
          self.$notify.info({
            title: '提示',
            message: '最多同时上传3个文件',
          });
        } else {
          // console.log(this.$refs.SF.files);
          for(var i=0,len=self.$refs.SF.files.length;i<len;i++) {
            formData.append('file'+[i], self.$refs.SF.files[i]);
            // this.fileNames.push(self.$refs.SF.files[i].name);
            this.fileNames += self.$refs.SF.files[i].name + '; ';
          }
          this.formData = formData;
          // console.log(formData);
          // console.log(this.fileNames);
        }
      },
      StationUploadFile: function(){
        if(this.$refs.SF.value == "") {
          return this.$notify.info({
            title: '提示',
            message: '请选择文件...',
          });
        } else {   
          // console.log(this.formData);
          var header = "'Content-Type': 'multipart/form-data'";
              this.$store.dispatch("StationUploadFile", {
                data: this.formData,
                header: header
              }).then(() => {
                if (this.$store.getters.getStationUploadStatus == 2) {
                  this.$notify({
                    showClose: true,
                    message: '导入成功',
                    type: 'success'
                  });
                  this.loading.StationUploadStatus = false;
                  // 重新加载数据
                  this.$store.dispatch("getStationInfoDatas", {
                    query: {
                      table: this.table,
                      // queryParams: this.formQuery
                    }
                  });
                } else if (this.$store.getters.getStationUploadStatus == 3) {
                  this.$notify.error({
                    title: '错误',
                    message: '字段名称不能对应,请对照模板',
                  });
                  this.loading.StationUploadStatus = false;
                } else if (this.$store.getters.getStationUploadStatus == 4) {
                  this.$notify.error({
                    title: '错误',
                    message: '文件读取失败',
                  });
                  this.loading.StationUploadStatus = false;
                }
                this.fileNames = ''; // 上传成功后将显示上传文件名赋空值
              });
              this.$refs.SF.value = "";//清除input里的值
        }

      },
      TemplateExport: function() {
        var uerAgent = navigator.userAgent.toLowerCase();
        var format = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
        var matches = uerAgent.match(format);
        var browerInfo = matches[1].replace(/version/, "'safari");
        console.log(this.downloadTemplateurl);    
        this.loading.ExportTemplateStatus = true;
        // var Promises = new Promise();
        const p = new Promise((resolve, reject) => {         
          setTimeout(() => {
            if (browerInfo == "chrome") {
              this.download_chrome(this.downloadTemplateurl)
              // resolve();
            } else if (browerInfo == "firefox") {
              this.download_firefox(this.downloadTemplateurl)
              // resolve();
            }
            resolve();
          }, 1000)
        });
        p.then(() => {
          this.loading.ExportTemplateStatus = false;
          this.$notify({
            message: '下载成功',
            type: 'success'
          });
        });
        p.catch((error) => {
          this.$notify({
            message: error,
            type: 'error'
          });
        });
      },
      StationExport: function() {
        var uerAgent = navigator.userAgent.toLowerCase();
        var format = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
        var matches = uerAgent.match(format);
        var browerInfo = matches[1].replace(/version/, "'safari");
        this.downloadurl = "";
        if(this.$store.getters.getStationInfoStatus == 1){
          return this.$message({
            message: '正在查询请稍后...',
            type: 'warning'
          });
        }
        this.$store.dispatch("StationExport", {
          table: this.table,
          queryParams: this.formQuery
        })
        .then(() => {
          if (this.$store.getters.getStationExportStatus == 2) {
            this.downloadurl = this.$store.getters.getStationExportPath.downloadurl;
            console.log(this.downloadurl);
            if (this.downloadurl != "") {
              if (browerInfo == "chrome") {
                this.download_chrome(this.downloadurl);
                this.$notify({
                  message: '导出成功',
                  type: 'success'
                });
                this.loading.StationExportStatus = false;
              } else if (browerInfo == "firefox") {
                this.download_firefox(this.downloadurl);
                this.$notify({
                  message: '导出成功',
                  type: 'success'
                });
                this.loading.StationExportStatus = false;
              }
            }
          }
        })
        .catch();
      },
      handleClick() {
        this.$router.push({ path: `/dashboard/eNBInfo` });
      }
    }
  }
</script>