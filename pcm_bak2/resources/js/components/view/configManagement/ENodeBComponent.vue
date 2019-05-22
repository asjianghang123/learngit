<template>
<div class="eNodeB" style="position: relative;top: 10px;">
  <div id="top">
    <el-row :gutter="20">      
      <el-col :span="20">
        <el-form :inline="true" :model="formQuery" class="demo-form-inline">
          <el-form-item label="地市">
            <el-select v-model="formQuery.city" placeholder="请选择地市">
              <el-option v-for="item in citys" :label="item.label" :value="item.label" :key="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="eNodeBID">
            <el-input v-model="formQuery.eNodeBID" placeholder="eNodeBID"></el-input>
          </el-form-item>
          <el-form-item>          
            <el-button size="small" type="primary" @click="refresh" :action="getQueryDatas" :loading="loading.eNodeBStatus" icon="el-icon-search">刷新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="2" justify="end">    
        <el-button id="eNodeBExport" @click="eNodeBExport" size="medium" type="primary" :loading="loading.eNodeBExportStatus" icon="el-icon-download">导出</el-button>
      </el-col>
    </el-row>
  </div>
  <ENodeBtableComponent :table="table" :formQuery="formQuery"></ENodeBtableComponent>
</div>
</template>
<style>
  body .el-table th.gutter{
    display: table-cell!important;
  }/*防止单元格错位*/
  body .el-table colgroup.gutter{
    display: table-cell!important;
  }/*防止单元格错位*/
  .eNodeB {
    margin: 0px 15px 0px 15px;
  }
  .eNodeB #top {
    /* background: #DFE3E0; */
  }
  .eNodeB .tableDatas th {
    background: #409EFF;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    /* font: 15px Medium; */
    font: 15px;
    font-weight: bold;
    /* color: #606266; */
    /* color: #000000; */
    color: #303133;
  }
</style>
<script>
  import {download} from '@/mixin/download.js';
  import ENodeBtableComponent from './ENodeBtableComponent';
  export default {
    mixins:[
      download
    ],
    data() {
      return {
        table: 'enodeb',
        formQuery: {
          city: '',
          eNodeBID: '',
        },
        /*options: {
          citys: [],
        },*/
        citys: [],
        loading: {
          eNodeBStatus: false,
          eNodeBExportStatus: false,
        },
        downloadurl: '',
      }
    },
    components: {
      ENodeBtableComponent: ENodeBtableComponent,
    },
    created() {
      this.$store.dispatch("geteNodeBDatas", {
        query: {
          table: this.table,
          // queryParams: this.formQuery,
        }
      });
    },
    computed: {
      getQueryDatas() {
        // if(this.$store.getter.get){}
        // console.log(this.table);
        if (this.$store.getters.geteNodeBstatus == 1) {
          this.loading.eNodeBStatus = true;
        }
        if (this.$store.getters.geteNodeBstatus == 2) {
          this.loading.eNodeBStatus = false;
          this.citys = this.$store.getters.geteNodeBDatas.options.city;
          // console.log(this.citys);
        }
        if (this.$store.getters.geteNodeBExportStatus == 1) {
          this.loading.eNodeBExportStatus = true;
        }

        /*if (this.$store.getters.geteNodeBExportStatus == 2) {
          this.loading.eNodeBExportStatus = false;
        }*/
      }
    },
    methods: {
      refresh() {
        this.formQuery.city = '';
        this.formQuery.eNodeBID = '';
        this.$store.dispatch("geteNodeBDatas",{
          query: {
            table: this.table
            // queryParams: this.formQuery,
          }
        });
      },
      eNodeBExport() {
        // console.log('123');
        var uerAgent = navigator.userAgent.toLowerCase();
        var format = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
        var matches = uerAgent.match(format);
        var browerInfo = matches[1].replace(/version/, "'safari");
        this.downloadurl = "";
        this.$store.dispatch("eNodeBExport", {
          table: this.table,
          queryParams: this.formQuery
        }).then(() => {
          if (this.$store.getters.geteNodeBExportStatus == 2) {
            this.downloadurl = this.$store.getters.geteNodeBExportPath.downloadurl;
            console.log(this.downloadurl);
            if (this.downloadurl != "") {
              if (browerInfo == "chrome") {
                this.download_chrome(this.downloadurl);
                this.$notify({
                  message: '导出成功',
                  type: 'success'
                });
                this.loading.eNodeBExportStatus = false;
              } else if (browerInfo == "firefox") {
                this.download_firefox(this.downloadurl);
                this.$notify({
                  message: '导出成功',
                  type: 'success'
                });
                this.loading.eNodeBExportStatus = false;
              }
            }
          }
        }).catch()
      },    
    }
  }
</script>