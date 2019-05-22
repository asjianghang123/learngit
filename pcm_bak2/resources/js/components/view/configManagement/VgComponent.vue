<template>
	<div class="VG" style="position: relative;top: 10px;">
		<el-row>
			<el-col :span="8">
				<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
					<el-tab-pane label="网关配置总览" name="网关配置总览" ></el-tab-pane>
					<el-tab-pane label="网关配置查询" name="网关配置查询"></el-tab-pane>
				</el-tabs>
			</el-col>
			<el-col :span="8" :offset="8">
				<input type="file" style="display: none;" name="VGImport" id="VGImport" ref="VG" @change="uploadVGExcel" multiple>
				<el-button type="primary" onclick="VGImport.click()" :loading="loading.uploadVGStatus" style="float: right;">网关配置表导入</el-button>
			</el-col>
		</el-row>
		<component v-bind:is="currentTabComponent"></component>
	</div>
</template>
<style>
  .VG .el-icon-arrow-right {
    display: none;
  }
  .VG .el-icon-arrow-left {
    display: none;
  }
  .VG .has-gutter tr .is-leaf{
    background: #0ED3F1;
  }
  .VG {
    margin: 0px 15px 0px 15px;
  }
</style>
<script>
	import VgviewComponent from './VgviewComponent.vue';
	import VgqueryComponent from './VgqueryComponent.vue';
	export default {
  		data() {
  			return {
  				activeName: "网关配置总览",
  				table: "统计表",
          choose:"VgviewComponent",
          loading: {
            uploadVGStatus: false,
            uploadSiteStatus: false
          },
  			}
  		},
  		components: {
        	VgviewComponent,
        	VgqueryComponent
    	},
    	created() {
    		this.$store.dispatch("getTableDatas", {
    			table: this.table
        });
    	},
    	computed: {
        currentTabComponent() {
          if (this.$store.getters.getuploadVGStatus == 1) {
            this.loading.uploadVGStatus = true;
          }
          if (this.$store.getters.getuploadVGStatus == 2) {
            
            this.loading.uploadVGStatus = false;
            
          }
          if (this.$store.getters.getuploadSiteStatus == 1) {
            this.loading.uploadSiteStatus = true;
          }
          if (this.$store.getters.getuploadSiteStatus == 2) {
            this.loading.uploadSiteStatus = false;
          }
          return this.choose;
        }
    	},
  		methods:{
  			uploadVGExcel: function(){
          var self = this;
  				var formData = new FormData();
          if (self.$refs.VG.files.length > 10) {
            self.$notify.info({
              title: '提示',
              message: '上传文件最多10个',
            });
          } else {
            for (var i=0,len=self.$refs.VG.files.length;i<len;i++) {
              formData.append('file'+i, self.$refs.VG.files[i]);
            }
            var config = "'Content-Type': 'multipart/form-data'";
            this.$store.dispatch("uploadVGExcel", {
              params: formData,
              config: config
            }).then(function(){
              if (self.$store.getters.getuploadVGStatus == 2) {
                self.$notify({
                  showClose: true,
                  message: '导入成功',
                  type: 'success'
                });
                self.$store.dispatch("getTableDatas", {
                  table: self.table
                });
              } else if (self.$store.getters.getuploadVGStatus == 3) {
                self.$notify.error({
                  title: '错误',
                  message: '字段名称不能对应',
                });
                self.loading.uploadVGStatus = false;
              } else if (self.$store.getters.getuploadVGStatus == 4) {
                self.$notify.error({
                  title: '错误',
                  message: '虚拟网关配置表中有重复数据',
                });
                self.loading.uploadVGStatus = false;
              }
            });
            
            
            this.$refs.VG.value = "";//清除input里的值    
          }
          
          
  			},
        // uploadSiteExcel: function(){
        //   var self = this;
        //   var formData = new FormData();
        //   formData.append('file', this.$refs.Site.files[0]);
        //   var config = "'Content-Type': 'multipart/form-data'";
        //   this.$store.dispatch("uploadSiteExcel", {
        //     params: formData,
        //     config: config
        //   }).then(function(){
        //     if (self.$store.getters.getuploadSiteStatus == 2) {
        //       self.$notify({
        //         showClose: true,
        //         message: '导入成功',
        //         type: 'success'
        //       });
        //       self.$store.dispatch("getTableDatas", {
        //         table: self.table
        //       });
        //     } else if (self.$store.getters.getuploadSiteStatus == 3) {
        //       self.$notify.error({
        //         title: '错误',
        //         message: '字段名称不能对应',
        //       });
        //       self.loading.uploadSiteStatus = false;
        //     } else if (self.$store.getters.getuploadSiteStatus == 4) {
        //       self.$notify.error({
        //         title: '错误',
        //         message: '位置跟踪区表中有重复数据',
        //       });
        //       self.loading.uploadSiteStatus = false;
        //     }
        //   });
          
        //   this.$refs.Site.value = "";//清除input里的值    
        // },
  			handleClick(tab, event) {
  				this.activeName = tab.label;
  				if (this.activeName == "网关配置总览") {
            this.choose = "VgviewComponent";
    				this.table = "统计表";
    			} else if (this.activeName == "网关配置查询") {
    				this.table = "汇总表";
            this.choose = "VgqueryComponent";
    			}
    			this.$store.dispatch("getTableDatas", {
    				table: this.table
          });
  			}
  		}
  	}
</script>